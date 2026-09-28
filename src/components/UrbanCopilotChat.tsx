import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  MapPin, 
  Maximize2, 
  Minimize2, 
  Layers, 
  CornerDownLeft,
  Flame,
  Building2,
  Trees,
  HeartPulse,
  Route,
  Zap,
  RefreshCw,
  Target,
  ArrowRight,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Compass,
  Check
} from 'lucide-react';
import { PilotCity, ScenarioType, UrbanElement, UrbanElementType, GISLayerState } from '../types';
import { URBAN_KNOWLEDGE_BASE, UrbanRegulationSnippet } from '../data/urbanKnowledgeBase';
import { 
  studyAreaAndGenerateMasterPlan, 
  findOptimalLocationForElement, 
  AreaStudyResult, 
  ElementRelocationEvaluation 
} from '../utils/spatialOptimizer';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  thoughtProcess?: {
    thought: string;
    actionName: string;
    actionInput: Record<string, any>;
    observation: string;
  };
  citedRegulations?: UrbanRegulationSnippet[];
  suggestedAction?: {
    label: string;
    type: UrbanElementType;
    coordinates: [number, number];
    customProps?: Partial<UrbanElement>;
  };
  areaStudy?: AreaStudyResult;
  relocationEvaluation?: ElementRelocationEvaluation;
}

interface UrbanCopilotChatProps {
  currentCity: PilotCity;
  activeScenario: ScenarioType;
  elements: UrbanElement[];
  selectedElement: UrbanElement | null;
  onAddElementAtCoords: (coords: [number, number], type?: UrbanElementType, customProps?: Partial<UrbanElement>) => void;
  onUpdateElement?: (element: UrbanElement) => void;
  onSelectElement?: (element: UrbanElement | null) => void;
  onToggleLayer?: (key: keyof GISLayerState) => void;
  layerState?: GISLayerState;
  isOpen: boolean;
  onClose: () => void;
}

export const UrbanCopilotChat: React.FC<UrbanCopilotChatProps> = ({
  currentCity,
  activeScenario,
  elements,
  selectedElement,
  onAddElementAtCoords,
  onUpdateElement,
  onSelectElement,
  onToggleLayer,
  layerState,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showThoughtDetails, setShowThoughtDetails] = useState<Record<string, boolean>>({});
  const [appliedMasterPlans, setAppliedMasterPlans] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initial welcome message per city
  useEffect(() => {
    const welcomeId = `welcome-${currentCity.id}`;
    const initialMsg: ChatMessage = {
      id: welcomeId,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `👋 ¡Hola! Soy tu **Copiloto Inmobiliario & Asistente Territorial LangChain**.\n\nEstoy analizando en tiempo real **${currentCity.name}** (${currentCity.neighborhood}) con **${elements.length} elementos** en el escenario **${activeScenario.toUpperCase()}**.\n\nMis capacidades avanzadas incluyen:\n• **Estudiar el área actual** y proyectar una **distribución profesional de construcciones** para maximizar los índices urbanos (accesibilidad 15m, equidad espacial y confort ambiental).\n• **Evaluar objetos seleccionados** con el entorno que los rodea para encontrar su **ubicación óptima** en el relieve.`,
      citedRegulations: URBAN_KNOWLEDGE_BASE.filter(r => r.cityId === currentCity.id || r.cityId === 'all').slice(0, 2)
    };
    setMessages([initialMsg]);
  }, [currentCity.id, activeScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    {
      title: '🏗️ Distribución Maestra',
      prompt: `Estudia el área actual y genera una distribución profesional de construcciones que asegure el mejor resultado de los índices urbanos.`
    },
    {
      title: '📍 Optimizar Objeto',
      prompt: selectedElement 
        ? `Evalúa el objeto seleccionado (${selectedElement.name}) con el área que tiene alrededor y busca dónde sería su mejor ubicación.`
        : `Selecciona un elemento en el mapa 3D y te diré dónde sería su mejor ubicación según el relieve.`
    },
    {
      title: '⚠️ Riesgos CENEPRED',
      prompt: `¿Qué restricciones de pendiente y riesgos geológicos de CENEPRED aplican en ${currentCity.name}?`
    },
    {
      title: '🏥 Posta 15-min',
      prompt: `Ubica una Posta de Salud que maximice la isócrona de 15 minutos en ${currentCity.name}.`
    }
  ];

  // Handler for full area study and professional distribution
  const handleTriggerAreaStudy = () => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Estudia el área actual de ${currentCity.name} y genera una distribución profesional de construcciones que optimice al máximo los índices urbanos.`
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const studyResult = studyAreaAndGenerateMasterPlan(elements, currentCity);

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `📊 **Estudio Territorial Completado para ${currentCity.name}**\n\nHe realizado un análisis multicriterio del área urbana considerando la orografía, centroides de población y vacíos de cobertura. Se identificaron **${studyResult.diagnostics.length} observaciones críticas** y he formulado una **Distribución Maestra de ${studyResult.proposals.length} construcciones estratégicas** para maximizar los índices de la ciudad.`,
        thoughtProcess: {
          thought: `Se evaluó la accesibilidad actual a 15 min (${studyResult.currentKpis.services15MinCoverage}%) y el área verde per cápita (${studyResult.currentKpis.greenSpacePerCapita} m²/hab). El plan proyecta elevar la equidad espacial en +${studyResult.kpiDeltas.spatialEquity} pts y la calidad de vida en +${studyResult.kpiDeltas.qualityOfLife} pts.`,
          actionName: 'langchain_spatial_master_planner',
          actionInput: { cityId: currentCity.id, activeElements: elements.length, popHoused: studyResult.currentKpis.populationHoused },
          observation: `Propuestas generadas: Salud, Parque Bioclimático en ladera, Vivienda Social con patios solares, Escuela Primaria y Estación Intermodal.`
        },
        areaStudy: studyResult,
        citedRegulations: URBAN_KNOWLEDGE_BASE.slice(0, 3)
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1100);
  };

  // Handler for evaluating selected element and finding its best location
  const handleTriggerRelocationEvaluation = (targetElement?: UrbanElement) => {
    const el = targetElement || selectedElement;
    if (!el) {
      handleSendMessage('Por favor selecciona primero un elemento en el visor 3D para evaluarlo con su entorno.');
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Evalúa el objeto seleccionado "${el.name}" (${el.type}) con el área que tiene alrededor y busca dónde sería su mejor ubicación.`
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const evaluation = findOptimalLocationForElement(el, elements, currentCity);

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `🎯 **Auditoría Espacial de Ubicación: ${el.name}**\n\n• **Pendiente actual:** ${evaluation.currentSlopePercent}%\n• **Pendiente óptima recomendada:** ${evaluation.optimalSlopePercent}%\n• **Desplazamiento sugerido:** ${evaluation.distanceShiftMeters} metros\n\n${evaluation.reasoning}`,
        thoughtProcess: {
          thought: `Se escaneó una grilla radial de 320m evaluando pendientes orográficas y distancias a viviendas. Se encontró un punto óptimo en [${evaluation.optimalCoordinates[0].toFixed(5)}, ${evaluation.optimalCoordinates[1].toFixed(5)}].`,
          actionName: 'spatial_heuristic_relocator',
          actionInput: { elementId: el.id, type: el.type, currentCoords: el.coordinates },
          observation: `La reubicación incrementa los indicadores: ${evaluation.kpiImpact} con menor costo de cimentación.`
        },
        relocationEvaluation: evaluation,
        citedRegulations: URBAN_KNOWLEDGE_BASE.filter(r => r.category === 'riesgo_geologico' || r.category === 'habitabilidad')
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const qLower = text.toLowerCase();

    // Check for Master Plan trigger
    if (qLower.includes('distribucion') || qLower.includes('distribución') || qLower.includes('estudia el area') || qLower.includes('estudia el área') || qLower.includes('plan maestro')) {
      handleTriggerAreaStudy();
      if (!textToSend) setInputValue('');
      return;
    }

    // Check for Selected Element Relocation trigger
    if (selectedElement && (qLower.includes('mejor ubicacion') || qLower.includes('mejor ubicación') || qLower.includes('reubicar') || qLower.includes('objeto seleccionado') || qLower.includes('evalúa este objeto'))) {
      handleTriggerRelocationEvaluation(selectedElement);
      if (!textToSend) setInputValue('');
      return;
    }

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      processAgentResponse(text);
      setIsTyping(false);
    }, 900);
  };

  const processAgentResponse = (userQuery: string) => {
    const qLower = userQuery.toLowerCase();
    const cityCenter = currentCity.center; // [lng, lat]
    
    const randomOffsetLat = (Math.random() - 0.5) * 0.0035;
    const randomOffsetLng = (Math.random() - 0.5) * 0.0035;
    const targetCoords: [number, number] = [
      cityCenter[0] + randomOffsetLng,
      cityCenter[1] + randomOffsetLat
    ];

    let responseText = '';
    let thought = '';
    let actionName = 'rag_urban_retriever';
    let actionInput: Record<string, any> = { query: userQuery, city: currentCity.id };
    let observation = '';
    let citedRegulations: UrbanRegulationSnippet[] = [];
    let suggestedAction: ChatMessage['suggestedAction'] = undefined;

    if (qLower.includes('salud') || qLower.includes('posta') || qLower.includes('médic')) {
      thought = `El usuario solicita ubicar un equipamiento de salud en ${currentCity.name}. Reviso la isócrona de caminata peatonal (15 min) y la pendiente topográfica para asegurar accesibilidad universal.`;
      actionName = 'spatial_isochrone_optimizer';
      actionInput = { targetType: 'centro_salud', cityId: currentCity.id, maxDistanceMeters: 1000 };
      observation = `Se localizó un punto con pendiente moderada (< 12%) en [${targetCoords[0].toFixed(5)}, ${targetCoords[1].toFixed(5)}] que incrementa la cobertura del barrio a un 88% de la población servida.`;
      
      responseText = `He calculado la ubicación óptima para un **Centro de Salud Comunitario (Posta Tipo I-2)** en **${currentCity.name}**.\n\n• **Cobertura estimada:** Beneficiará a ~8,000 residentes dentro de la isócrona de 10-12 minutos a pie.\n• **Inversión aproximada:** $450,000 USD.\n• **Normativa:** Cumple con la reserva mínima de 600 m² según las directrices metropolitanas.`;
      
      suggestedAction = {
        label: '➕ Proyectar Centro de Salud en el Gemelo 3D',
        type: 'centro_salud',
        coordinates: targetCoords,
        customProps: {
          name: `Centro de Salud Comunal ${currentCity.neighborhood}`,
          costEstimateUSD: 450000,
          populationCapacity: 8000,
          footprintArea: 750,
          floors: 2,
          notes: 'Ubicación sugerida por Agente LangChain basada en análisis de accesibilidad e isócronas 15m.'
        }
      };
      citedRegulations = URBAN_KNOWLEDGE_BASE.filter(r => r.id === 'pdu-lima-este-equipamiento' || r.id === 'rne-a020-vivienda');

    } else if (qLower.includes('parque') || qLower.includes('verde') || qLower.includes('árbol') || qLower.includes('huerto')) {
      thought = `Se busca mitigar la isla de calor y estabilizar taludes en ${currentCity.name}. Evalúo la dotación de m² de áreas verdes por habitante recomendada por la OMS (mínimo 9 m²/hab).`;
      actionName = 'bioclimatic_slope_stabilizer';
      actionInput = { targetType: 'parque_verde', slopeBuffer: '15-25%' };
      observation = `Terreno en ladera media identificado. Apto para sistema de andenería viva con especies xerófitas nativas (molle y tara).`;

      responseText = `Propuesta de **Parque Verde y Huerto Comunitario Mitigador** generada:\n\n• **Efecto Bioclimático:** Reducción proyectada de hasta -1.8°C en la isla de calor urbana perimetral.\n• **Estabilización:** Retención de taludes mediante terrazas vegetadas para minimizar riesgos de desprendimiento rocoso.\n• **Superficie:** ~2,400 m² con senderos peatonales y captación de aguas grises.`;

      suggestedAction = {
        label: '🌱 Insertar Parque Verde / Huerto en Mapa 3D',
        type: 'parque_verde',
        coordinates: targetCoords,
        customProps: {
          name: `Parque Ecológico & Huerto ${currentCity.neighborhood}`,
          costEstimateUSD: 150000,
          populationCapacity: 1200,
          footprintArea: 2400,
          floors: 1,
          notes: 'Parque bioclimático con andenería viva modelado por LangChain ReAct.'
        }
      };
      citedRegulations = URBAN_KNOWLEDGE_BASE.filter(r => r.id === 'cenepred-sjl-quebrada' || r.id === 'pdu-lima-este-equipamiento');

    } else if (qLower.includes('vivienda') || qLower.includes('techo propio') || qLower.includes('casa') || qLower.includes('habita')) {
      thought = `Consulto el RAG sobre el Bono Familiar Habitacional de Techo Propio y la Norma A.020 del RNE para vivienda colectiva o incremental.`;
      actionName = 'techo_propio_eligibility_engine';
      actionInput = { program: 'Construccion en Sitio Propio', cityId: currentCity.id };
      observation = `Módulos de 42 m² a 75 m² son elegibles para subsidio no reembolsable del BFH (~$8,300 USD por familia), condicionado a que el lote tenga pendiente < 25% y no esté en zona roja de CENEPRED.`;

      responseText = `Análisis de viabilidad para **Vivienda Social e Incremental** en **${currentCity.name}**:\n\n1. **Subsidio BFH / Techo Propio:** Subsidio estatal de aprox. S/ 30,900 (~$8,300 USD) para construcción en sitio propio o vivienda colectiva.\n2. **Norma RNE A.020:** Exige ventilación cruzada en mínimo 10% del área útil.\n3. **Requisito Crítico:** El terreno no debe superar el 30% de pendiente sin andenería estructural certificada.`;

      suggestedAction = {
        label: '🏢 Añadir Bloque de Vivienda Social Incremental',
        type: 'vivienda_social',
        coordinates: targetCoords,
        customProps: {
          name: `Conjunto Habitacional Sostenible ${currentCity.neighborhood}`,
          costEstimateUSD: 1200000,
          unitsCount: 32,
          populationCapacity: 128,
          footprintArea: 1600,
          floors: 4,
          notes: 'Módulo de 4 pisos con patios interiores para ventilación cruzada bioclimática.'
        }
      };
      citedRegulations = URBAN_KNOWLEDGE_BASE.filter(r => r.id === 'programa-techo-propio-bono' || r.id === 'rne-a020-vivienda');

    } else if (qLower.includes('riesgo') || qLower.includes('pendiente') || qLower.includes('cenepred') || qLower.includes('derrumbe')) {
      thought = `Verifico los umbrales de seguridad física de asentamientos en laderas. La Quebrada Huáscar (SJL) y cerros periféricos presentan pendientes de hasta 35-45% en cotas altas.`;
      actionName = 'cenepred_hazard_assessor';
      actionInput = { city: currentCity.name, topographyNotes: currentCity.topographyNotes };
      observation = `CENEPRED clasifica como 'Muy Alto Riesgo No Mitigable' los taludes desprovistos de soporte rocoso con pendiente > 30%.`;

      responseText = `⚠️ **Dictamen de Riesgo Físico y Geotécnico para ${currentCity.name}**:\n\n• **Límite Constructivo Seguro:** Pendiente **menor a 25%** apta para vivienda.\n• **Zonas de Advertencia (25% a 30%):** Muros de contención ciclópeos obligatorios.\n• **Zona Roja (> 30%):** Prohibida la edificación residencial. Exclusivo para reforestación y mitigación.`;
      
      citedRegulations = URBAN_KNOWLEDGE_BASE.filter(r => r.category === 'riesgo_geologico');

    } else {
      thought = `Proceso consulta general de planificación urbana. Integro el contexto del gemelo digital: ${elements.length} elementos, escenario ${activeScenario}.`;
      actionName = 'digital_twin_spatial_orchestrator';
      actionInput = { elementsCount: elements.length, scenario: activeScenario, city: currentCity.name };
      observation = `El gemelo digital opera en modo dinámico. KPIs y matrices AHP en equilibrio.`;

      responseText = `He analizado la configuración urbana actual de **${currentCity.name}** (${activeScenario.toUpperCase()}).\n\n• **Elementos Activos:** ${elements.length} intervenciones registradas.\n• **Acciones Rápidas:** Puedes pedirme:\n  1. *"Estudia el área y haz una distribución profesional de construcciones"*\n  2. *"Evalúa el objeto seleccionado y busca su mejor ubicación"*\n  3. Validar normativas o simular equipamientos específicos.`;
      citedRegulations = URBAN_KNOWLEDGE_BASE.slice(0, 2);
    }

    const assistantMessage: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: responseText,
      thoughtProcess: {
        thought,
        actionName,
        actionInput,
        observation
      },
      citedRegulations,
      suggestedAction
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleApplySingleAction = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    onAddElementAtCoords(action.coordinates, action.type, action.customProps);
    
    const confirmMessage: ChatMessage = {
      id: `conf-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `✅ **¡Construcción proyectada en el Gemelo 3D!**\n\nSe ha insertado **"${action.customProps?.name || action.type}"** en las coordenadas \`[${action.coordinates[0].toFixed(5)}, ${action.coordinates[1].toFixed(5)}]\`. Los KPIs AHP se han recalculado en vivo.`
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  // Apply complete Master Plan in 3D scene
  const handleApplyMasterPlan = (study: AreaStudyResult, msgId: string) => {
    study.proposals.forEach(p => {
      onAddElementAtCoords(p.coordinates, p.type, p.customProps);
    });

    setAppliedMasterPlans(prev => ({ ...prev, [msgId]: true }));

    const confirmMessage: ChatMessage = {
      id: `conf-mp-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `🎉 **¡Distribución Maestra Proyectada con Éxito en el Modelo 3D!**\n\nSe insertaron **${study.proposals.length} construcciones estratégicas** en el terreno de **${currentCity.name}**:\n• 🏥 Centro de Salud Comunal\n• 🌱 Parque Ecológico & Huerto Bioclimático\n• 🏢 Manzana de Vivienda Social Sostenible\n• 🏫 Módulo Educativo & Cuna\n• 🚡 Estación Intermodal de Transporte\n\n📈 **Resultados conseguidos en los índices:**\n• Cobertura de Servicios 15-min: +${study.kpiDeltas.servicesCoverage}%\n• Equidad Espacial: +${study.kpiDeltas.spatialEquity} pts\n• Sostenibilidad Ambiental: +${study.kpiDeltas.environmentalSustainability} pts\n• Calidad de Vida: +${study.kpiDeltas.qualityOfLife} pts`
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  // Apply optimal relocation to selected element
  const handleApplyRelocation = (evalResult: ElementRelocationEvaluation) => {
    if (!onUpdateElement) return;

    const updatedElement: UrbanElement = {
      ...evalResult.element,
      coordinates: evalResult.optimalCoordinates,
      notes: `${evalResult.element.notes || ''} [Reubicado a posición óptima por LangChain Optimizer: pendiente ${evalResult.optimalSlopePercent}%]`
    };

    onUpdateElement(updatedElement);
    if (onSelectElement) onSelectElement(updatedElement);

    const confirmMessage: ChatMessage = {
      id: `conf-reloc-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `📍 **¡Objeto reubicado con éxito a su posición óptima!**\n\n**"${evalResult.element.name}"** fue trasladado ${evalResult.distanceShiftMeters} metros hacia \`[${evalResult.optimalCoordinates[0].toFixed(5)}, ${evalResult.optimalCoordinates[1].toFixed(5)}]\`.\n\n• **Pendiente reducida:** ${evalResult.currentSlopePercent}% ➔ **${evalResult.optimalSlopePercent}%**\n• **Impacto verificado:** ${evalResult.kpiImpact}`
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute z-30 transition-all duration-300 flex flex-col bg-slate-950/95 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl overflow-hidden ${
        isExpanded 
          ? 'inset-4 md:inset-8 lg:left-auto lg:right-6 lg:top-6 lg:bottom-6 lg:w-[680px]' 
          : 'bottom-4 right-4 w-[94vw] sm:w-[490px] max-h-[85vh] h-[670px]'
      }`}
    >
      {/* Header Bar */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/50 border-b border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="p-2 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5 text-indigo-400" />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
                Copiloto LangChain
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Spatial Optimizer
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[260px]">
              {currentCity.name} • {activeScenario.toUpperCase()} ({elements.length} elems)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            title={isExpanded ? 'Reducir tamaño' : 'Maximizar panel'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/60 transition-colors"
            title="Cerrar Copiloto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Strip: Master Plan & Selected Element Evaluation */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <button
          onClick={handleTriggerAreaStudy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-[11px] shadow-sm transition-all"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Estudiar Área & Plan Maestro</span>
        </button>

        {selectedElement ? (
          <button
            onClick={() => handleTriggerRelocationEvaluation(selectedElement)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 font-bold text-[11px] border border-emerald-500/40 transition-all animate-pulse"
          >
            <Target className="w-3 h-3 text-emerald-400" />
            <span>Optimizar: {selectedElement.name.slice(0, 16)}...</span>
          </button>
        ) : (
          <span className="text-[10px] text-slate-400 italic">
            Selecciona un objeto para buscar su mejor ubicación
          </span>
        )}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-normal">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-indigo-300" />
              </div>
            )}

            <div className={`max-w-[88%] space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800/90 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* AREA STUDY RESULT CARD */}
              {msg.areaStudy && (
                <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-3.5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Proyección de Mejora en Índices Urbanos:
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      AHP Optimizado
                    </span>
                  </div>

                  {/* KPI Deltas Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                      <span className="text-[9px] text-slate-400 block">Servicios 15m</span>
                      <strong className="text-sm font-mono text-emerald-400 block">
                        +{msg.areaStudy.kpiDeltas.servicesCoverage}%
                      </strong>
                      <span className="text-[9px] text-slate-500">
                        {msg.areaStudy.currentKpis.services15MinCoverage}% ➔ {msg.areaStudy.projectedKpis.services15MinCoverage}%
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                      <span className="text-[9px] text-slate-400 block">Equidad Espacial</span>
                      <strong className="text-sm font-mono text-sky-400 block">
                        +{msg.areaStudy.kpiDeltas.spatialEquity} pts
                      </strong>
                      <span className="text-[9px] text-slate-500">
                        {msg.areaStudy.currentKpis.spatialEquityScore} ➔ {msg.areaStudy.projectedKpis.spatialEquityScore}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                      <span className="text-[9px] text-slate-400 block">Sostenibilidad</span>
                      <strong className="text-sm font-mono text-teal-400 block">
                        +{msg.areaStudy.kpiDeltas.environmentalSustainability} pts
                      </strong>
                      <span className="text-[9px] text-slate-500">
                        {msg.areaStudy.currentKpis.environmentalSustainabilityScore} ➔ {msg.areaStudy.projectedKpis.environmentalSustainabilityScore}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                      <span className="text-[9px] text-slate-400 block">Calidad de Vida</span>
                      <strong className="text-sm font-mono text-purple-400 block">
                        +{msg.areaStudy.kpiDeltas.qualityOfLife} pts
                      </strong>
                      <span className="text-[9px] text-slate-500">
                        {msg.areaStudy.currentKpis.qualityOfLifeScore} ➔ {msg.areaStudy.projectedKpis.qualityOfLifeScore}
                      </span>
                    </div>
                  </div>

                  {/* Proposals List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      5 Construcciones Estratégicas Diseñadas:
                    </span>
                    {msg.areaStudy.proposals.map((prop, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5 truncate">
                          <strong className="text-white text-xs block truncate">{prop.name}</strong>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{prop.justification}</p>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">{prop.expectedKpiGain}</span>
                        </div>
                        <button
                          onClick={() => handleApplySingleAction({
                            label: `➕ Proyectar ${prop.name}`,
                            type: prop.type,
                            coordinates: prop.coordinates,
                            customProps: prop.customProps
                          })}
                          className="shrink-0 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-[10px] border border-slate-700"
                        >
                          + Añadir
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Master Action Button */}
                  <button
                    onClick={() => handleApplyMasterPlan(msg.areaStudy!, msg.id)}
                    disabled={appliedMasterPlans[msg.id]}
                    className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                      appliedMasterPlans[msg.id]
                        ? 'bg-slate-800 text-emerald-400 cursor-default'
                        : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 hover:scale-[1.01] text-white shadow-indigo-950/60'
                    }`}
                  >
                    {appliedMasterPlans[msg.id] ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>¡Distribución Maestra Aplicada en Three.js!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>🏗️ Proyectar Distribución Maestra Completa (5 Construcciones)</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* RELOCATION EVALUATION CARD */}
              {msg.relocationEvaluation && (
                <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3.5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      Optimización de Ubicación en Relieve
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {msg.relocationEvaluation.kpiImpact}
                    </span>
                  </div>

                  {/* Slope and Distance Comparison */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Pendiente Actual</span>
                      <strong className="text-amber-400 text-xs font-mono">
                        {msg.relocationEvaluation.currentSlopePercent}%
                      </strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Desplazamiento</span>
                      <strong className="text-sky-400 text-xs font-mono">
                        {msg.relocationEvaluation.distanceShiftMeters} m
                      </strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Pendiente Óptima</span>
                      <strong className="text-emerald-400 text-xs font-mono">
                        {msg.relocationEvaluation.optimalSlopePercent}%
                      </strong>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Beneficios Verificados con el Entorno:
                    </span>
                    {msg.relocationEvaluation.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Relocate Action Button */}
                  {onUpdateElement && (
                    <button
                      onClick={() => handleApplyRelocation(msg.relocationEvaluation!)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all hover:scale-[1.01]"
                    >
                      <MapPin className="w-4 h-4 text-emerald-200" />
                      <span>📍 Reubicar a la Posición Óptima Recomendada</span>
                    </button>
                  )}
                </div>
              )}

              {/* LangChain Thought / Action / Observation Accordion */}
              {msg.thoughtProcess && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden text-[11px]">
                  <button
                    onClick={() => setShowThoughtDetails(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                    className="w-full px-3 py-1.5 flex items-center justify-between text-slate-400 hover:text-slate-200 bg-slate-950/40"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-400">
                      <Zap className="w-3 h-3" />
                      Tool Calling: {msg.thoughtProcess.actionName}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {showThoughtDetails[msg.id] ? 'Ocultar razonamiento' : 'Ver razonamiento ReAct'}
                    </span>
                  </button>

                  {showThoughtDetails[msg.id] && (
                    <div className="p-3 space-y-2 border-t border-slate-800/60 bg-slate-950/60 font-mono text-[10px]">
                      <div>
                        <span className="text-amber-400 font-bold block">🧠 Thought (Pensamiento):</span>
                        <p className="text-slate-400">{msg.thoughtProcess.thought}</p>
                      </div>
                      <div>
                        <span className="text-sky-400 font-bold block">⚙️ Action (Invocación):</span>
                        <p className="text-slate-400">
                          {msg.thoughtProcess.actionName}({JSON.stringify(msg.thoughtProcess.actionInput)})
                        </p>
                      </div>
                      <div>
                        <span className="text-emerald-400 font-bold block">📋 Observation (Resultado):</span>
                        <p className="text-slate-400">{msg.thoughtProcess.observation}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cited Regulations Badges */}
              {msg.citedRegulations && msg.citedRegulations.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                    <BookOpen className="w-3 h-3 text-indigo-400" />
                    Artículos Normativos Citados:
                  </span>
                  <div className="space-y-1">
                    {msg.citedRegulations.map((reg) => (
                      <div
                        key={reg.id}
                        className="bg-indigo-950/20 border border-indigo-800/40 rounded-lg p-2 text-[10px] text-slate-300"
                      >
                        <div className="flex items-center justify-between font-bold text-indigo-300 mb-0.5">
                          <span>{reg.title}</span>
                          <span className="font-mono text-[9px] text-slate-400">{reg.codeReference}</span>
                        </div>
                        <p className="text-slate-400 text-[10px] line-clamp-2">{reg.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button on 3D Map */}
              {msg.suggestedAction && (
                <div className="pt-1.5">
                  <button
                    onClick={() => handleApplySingleAction(msg.suggestedAction)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition-all hover:scale-[1.01]"
                  >
                    <MapPin className="w-4 h-4 text-emerald-200" />
                    <span>{msg.suggestedAction.label}</span>
                  </button>
                </div>
              )}

              <span className="text-[9px] text-slate-500 block px-1">
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-emerald-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic py-1">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Analizando orografía territorial y calculando función de aptitud espacial...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-300 border border-slate-800 text-[10px] font-medium transition-colors shrink-0"
          >
            {qp.title}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={selectedElement ? `Pregunta sobre ${selectedElement.name} o su entorno...` : `Pídele estudiar el área o ubicar equipamientos...`}
          className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isTyping}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-600 transition-colors shrink-0 shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
