import { PilotCityId, UrbanElementType } from '../types';

export interface UrbanRegulationSnippet {
  id: string;
  cityId: PilotCityId | 'all';
  category: 'zonificacion' | 'riesgo_geologico' | 'movilidad' | 'habitabilidad' | 'financiamiento';
  title: string;
  codeReference: string;
  summary: string;
  requirements: string[];
  maxSlopePermittedPercent: number;
}

export const URBAN_KNOWLEDGE_BASE: UrbanRegulationSnippet[] = [
  {
    id: 'rne-a020-vivienda',
    cityId: 'all',
    category: 'habitabilidad',
    title: 'Norma Técnica A.020: Vivienda Colectiva e Incremental',
    codeReference: 'RNE - D.S. N° 011-2006-VIVIENDA / Actualización 2021',
    summary: 'Establece los estándares mínimos de habitabilidad, iluminación cenital y ventilación cruzada obligatoria en módulos de vivienda social.',
    requirements: [
      'Área mínima techada de vivienda unifamiliar básica: 42 m² (ampliable a 75 m² en vivienda incremental)',
      'Altura libre mínima de piso a techo: 2.30 m en climas templados/costeros; 2.50 m en valles interandinos',
      'Ventilación cruzada: vanos de ventilación deben representar mínimo el 10% del área útil del ambiente',
      'Densidad neta máxima recomendada en hábitats populares con consolidación: 450 a 650 hab/ha'
    ],
    maxSlopePermittedPercent: 25
  },
  {
    id: 'cenepred-sjl-quebrada',
    cityId: 'lima',
    category: 'riesgo_geologico',
    title: 'Evaluación de Riesgo por Movimientos en Masa - Quebrada Huáscar (SJL)',
    codeReference: 'CENEPRED / INDECI Informe Técnico N° 044-2022',
    summary: 'Delimitación de áreas de muy alto riesgo no mitigable por flujos de detritos y desprendimiento de rocas en laderas escarpadas de San Juan de Lurigancho.',
    requirements: [
      'Pendientes mayores a 30%: Prohibida la construcción de viviendas sin obras mayores de andenería estructural y muros de contención ciclópeos',
      'Franja de amortiguamiento de 15 metros en el lecho central de la torrentera seca',
      'Prioridad de asignación para reforestación con especies xerófitas (molle costeño, tara) para contención de taludes',
      'Vías de acceso vehicular no deben superar el 12% de pendiente longitudinal continua'
    ],
    maxSlopePermittedPercent: 30
  },
  {
    id: 'pdu-lima-este-equipamiento',
    cityId: 'lima',
    category: 'zonificacion',
    title: 'Plan de Desarrollo Metropolitano de Lima (PLANMET 2040) - Subsector Este',
    codeReference: 'Ordenanza Metropolitana N° 2288-MML',
    summary: 'Directrices de equipamiento social y áreas verdes públicas para Lima Este.',
    requirements: [
      'Dotación mínima de áreas verdes: 9.0 m² por habitante según meta OMS / MINAM',
      'Radio de servicio de posta de salud tipo I-2: 800 a 1,200 metros (10 a 15 minutos de caminata a pie)',
      'Módulo educativo inicial/primaria: 1 aula por cada 120 habitantes en edad escolar',
      'Retiro municipal frontal mínimo de 3.00 m en vías colectoras'
    ],
    maxSlopePermittedPercent: 20
  },
  {
    id: 'pdm-arequipa-torrenteras',
    cityId: 'arequipa',
    category: 'riesgo_geologico',
    title: 'Plan de Desarrollo Metropolitano de Arequipa - Mitigación en Torrenteras',
    codeReference: 'PDM Arequipa / IMPLA 2022-2035',
    summary: 'Restricciones de edificación en fajas marginales de torrenteras volcánicas y laderas del Misti/Chachani.',
    requirements: [
      'Respeto de faja marginal de 25m a cada lado del eje de cauce de torrentera',
      'Diseño sismorresistente con factor de zona Z4 (0.45g) según Norma E.030',
      'Construcción de terrazas de piedra y gaviones en desniveles mayores al 18%'
    ],
    maxSlopePermittedPercent: 22
  },
  {
    id: 'pdu-trujillo-salaberry',
    cityId: 'trujillo',
    category: 'zonificacion',
    title: 'Plan Urbano de Trujillo - Zonas de Amortiguamiento y Drenaje Pluvial',
    codeReference: 'PLANDET - Municipalidad Provincial de Trujillo',
    summary: 'Estrategias de densificación controlada y drenaje en sectores vulnerables a inundaciones del Fenómeno El Niño.',
    requirements: [
      'Obligatoriedad de techos con pendientes mínimas del 5% para evacuación pluvial',
      'Preservación de corredores biológicos hacia la campiña de Moche',
      'Isócronas peatonales máximas de 12 minutos a puntos de transporte masivo en avenidas metropolitanas'
    ],
    maxSlopePermittedPercent: 15
  },
  {
    id: 'programa-techo-propio-bono',
    cityId: 'all',
    category: 'financiamiento',
    title: 'Bono Familiar Habitacional (BFH) - Techo Propio / Sitio Propio',
    codeReference: 'Fondo MIVIVIENDA / Ministerio de Vivienda del Perú',
    summary: 'Subsidio directo no reembolsable del Estado para familias en situación de pobreza y vulnerabilidad urbana.',
    requirements: [
      'Modalidad Construcción en Sitio Propio: Subsidio de aprox. S/ 30,900 (~$8,300 USD) para módulo de 35 a 45 m²',
      'Requisito: Título de propiedad o constancia de posesión municipal reconocida',
      'Terreno debe estar fuera de zonas de riesgo geológico muy alto no mitigable',
      'El proyecto debe contemplar conexiones intradomiciliarias de agua potable y saneamiento'
    ],
    maxSlopePermittedPercent: 25
  }
];

export interface LangflowNodeDefinition {
  id: string;
  name: string;
  type: 'input' | 'prompt' | 'model' | 'vector_store' | 'spatial_tool' | 'output';
  category: string;
  description: string;
  inputs: { id: string; name: string; type: string }[];
  outputs: { id: string; name: string; type: string }[];
  position: { x: number; y: number };
  parameters: Record<string, any>;
}

export interface LangflowConnection {
  id: string;
  sourceNodeId: string;
  sourceHandle: string;
  targetNodeId: string;
  targetHandle: string;
}

export interface LangflowPresetFlow {
  id: string;
  name: string;
  category: string;
  description: string;
  nodes: LangflowNodeDefinition[];
  connections: LangflowConnection[];
}

export const PRESET_LANGFLOW_FLOWS: LangflowPresetFlow[] = [
  {
    id: 'flow-viabilidad-lote',
    name: '1. Dictamen de Viabilidad de Terreno & RAG Normativo',
    category: 'Zonificación y Riesgo',
    description: 'Recibe coordenadas y pendiente del terreno orográfico, consulta la base vectorial RAG de CENEPRED y el RNE, y emite un dictamen con restricciones de altura y retiros.',
    nodes: [
      {
        id: 'node-input-coords',
        name: 'Coordenadas del Terreno (GIS)',
        type: 'input',
        category: 'Inputs',
        description: 'Punto seleccionado por el usuario en Three.js / mapa 2D [lat, lng, cota_z].',
        inputs: [],
        outputs: [{ id: 'out-coords', name: 'GeoPoint Data', type: 'JSON' }],
        position: { x: 50, y: 120 },
        parameters: { defaultSource: 'Three.js Click Inspector', coordinateSystem: 'EPSG:4326' }
      },
      {
        id: 'node-tool-slope',
        name: 'Spatial Slope & Hazard Inspector',
        type: 'spatial_tool',
        category: 'Spatial Tools',
        description: 'Calcula la pendiente real (%) y el índice de susceptibilidad a derrumbe.',
        inputs: [{ id: 'in-coords', name: 'Coordinates', type: 'JSON' }],
        outputs: [{ id: 'out-slope-data', name: 'Slope & Risk Profile', type: 'JSON' }],
        position: { x: 340, y: 70 },
        parameters: { maxThreshold: '30%', algorithm: 'Horn Topographic Slope' }
      },
      {
        id: 'node-rag-pot',
        name: 'Vector Store (RNE / POT 2040 / CENEPRED)',
        type: 'vector_store',
        category: 'Vector Stores',
        description: 'Base vectorial con normativas de zonificación y subsidios Techo Propio.',
        inputs: [{ id: 'in-query', name: 'Query Context', type: 'Text' }],
        outputs: [{ id: 'out-chunks', name: 'Retrieved Articles', type: 'Document[]' }],
        position: { x: 340, y: 260 },
        parameters: { similarityMetric: 'cosine', topK: 4, embeddingModel: 'text-embedding-004' }
      },
      {
        id: 'node-llm-agent',
        name: 'Agente Urbanístico LangChain (ReAct)',
        type: 'model',
        category: 'Models',
        description: 'Sintetiza la cota física con los artículos normativos y emite la recomendación de densidad.',
        inputs: [
          { id: 'in-slope', name: 'Slope Profile', type: 'JSON' },
          { id: 'in-normativa', name: 'Retrieved Chunks', type: 'Document[]' }
        ],
        outputs: [{ id: 'out-decision', name: 'Technical Assessment', type: 'AgentOutput' }],
        position: { x: 680, y: 150 },
        parameters: { temperature: 0.2, maxTokens: 1024, model: 'gemini-2.5-flash' }
      },
      {
        id: 'node-output-3d',
        name: 'Callback 3D & Reporte Técnico',
        type: 'output',
        category: 'Outputs',
        description: 'Proyecta polígono seguro en Three.js y genera dictamen para la asamblea vecinal.',
        inputs: [{ id: 'in-decision', name: 'Assessment', type: 'AgentOutput' }],
        outputs: [],
        position: { x: 990, y: 150 },
        parameters: { visualCue: 'Highlight Green/Red Mesh', exportFormat: 'JSON + PDF' }
      }
    ],
    connections: [
      { id: 'c1', sourceNodeId: 'node-input-coords', sourceHandle: 'out-coords', targetNodeId: 'node-tool-slope', targetHandle: 'in-coords' },
      { id: 'c2', sourceNodeId: 'node-input-coords', sourceHandle: 'out-coords', targetNodeId: 'node-rag-pot', targetHandle: 'in-query' },
      { id: 'c3', sourceNodeId: 'node-tool-slope', sourceHandle: 'out-slope-data', targetNodeId: 'node-llm-agent', targetHandle: 'in-slope' },
      { id: 'c4', sourceNodeId: 'node-rag-pot', sourceHandle: 'out-chunks', targetNodeId: 'node-llm-agent', targetHandle: 'in-normativa' },
      { id: 'c5', sourceNodeId: 'node-llm-agent', sourceHandle: 'out-decision', targetNodeId: 'node-output-3d', targetHandle: 'in-decision' }
    ]
  },
  {
    id: 'flow-optimizador-isocronas',
    name: '2. Optimizador de Equipamiento Comunal & Isócronas 15 min',
    category: 'Movilidad y Accesibilidad',
    description: 'Encuentra la ubicación óptima para un equipamiento (salud, educación, parque) maximizando el % de familias que acceden en menos de 15 minutos a pie sin sobrepasar el presupuesto.',
    nodes: [
      {
        id: 'node-input-need',
        name: 'Demanda Comunitaria (Equipamiento)',
        type: 'input',
        category: 'Inputs',
        description: 'Tipo de equipamiento requerido (ej: Posta de Salud, Escuela Primaria) y presupuesto tope.',
        inputs: [],
        outputs: [{ id: 'out-need', name: 'Equipment Spec', type: 'JSON' }],
        position: { x: 50, y: 140 },
        parameters: { targetType: 'centro_salud', budgetLimitUSD: 180000 }
      },
      {
        id: 'node-tool-isochrone',
        name: 'GIS 15-min Isochrone Calculator',
        type: 'spatial_tool',
        category: 'Spatial Tools',
        description: 'Simula el radio de caminata real sobre la red de pistas y escaleras en ladera.',
        inputs: [{ id: 'in-need', name: 'Need Data', type: 'JSON' }],
        outputs: [{ id: 'out-coverage', name: 'Population Coverage', type: 'Metrics' }],
        position: { x: 340, y: 80 },
        parameters: { walkingSpeedKmH: 4.0, slopePenaltyFactor: 1.8 }
      },
      {
        id: 'node-tool-budget',
        name: 'Civil Works Cost Estimator',
        type: 'spatial_tool',
        category: 'Spatial Tools',
        description: 'Calcula cimentación en ladera, muros de contención y costo por m².',
        inputs: [{ id: 'in-need-cost', name: 'Need Data', type: 'JSON' }],
        outputs: [{ id: 'out-budget', name: 'Cost Breakdown', type: 'JSON' }],
        position: { x: 340, y: 270 },
        parameters: { earthworksMargin: 1.25, currency: 'USD' }
      },
      {
        id: 'node-llm-optimizer',
        name: 'Agente Optimizador Multiobjetivo',
        type: 'model',
        category: 'Models',
        description: 'Equilibra cobertura poblacional máxima vs costo de obra de contención.',
        inputs: [
          { id: 'in-cov', name: 'Coverage Data', type: 'Metrics' },
          { id: 'in-bud', name: 'Cost Breakdown', type: 'JSON' }
        ],
        outputs: [{ id: 'out-optimum', name: 'Optimal Coordinate & Specs', type: 'JSON' }],
        position: { x: 680, y: 160 },
        parameters: { optimizer: 'Pareto Front Heuristic', goal: 'Max Pop / Min Cost' }
      },
      {
        id: 'node-output-add',
        name: 'Acción Directa en Gemelo 3D',
        type: 'output',
        category: 'Outputs',
        description: 'Inserta el nuevo elemento 3D en la escena y actualiza la isócrona en tiempo real.',
        inputs: [{ id: 'in-opt', name: 'Optimal Element', type: 'JSON' }],
        outputs: [],
        position: { x: 990, y: 160 },
        parameters: { action: 'onAddElementAtCoords', updateRadarAHP: true }
      }
    ],
    connections: [
      { id: 'c21', sourceNodeId: 'node-input-need', sourceHandle: 'out-need', targetNodeId: 'node-tool-isochrone', targetHandle: 'in-need' },
      { id: 'c22', sourceNodeId: 'node-input-need', sourceHandle: 'out-need', targetNodeId: 'node-tool-budget', targetHandle: 'in-need-cost' },
      { id: 'c23', sourceNodeId: 'node-tool-isochrone', sourceHandle: 'out-coverage', targetNodeId: 'node-llm-optimizer', targetHandle: 'in-cov' },
      { id: 'c24', sourceNodeId: 'node-tool-budget', sourceHandle: 'out-budget', targetNodeId: 'node-llm-optimizer', targetHandle: 'in-bud' },
      { id: 'c25', sourceNodeId: 'node-llm-optimizer', sourceHandle: 'out-optimum', targetNodeId: 'node-output-add', targetHandle: 'in-opt' }
    ]
  },
  {
    id: 'flow-sintesis-asamblea',
    name: '3. Minería de Sentimiento de Asambleas & Matriz AHP',
    category: 'Participación Ciudadana',
    description: 'Procesa comentarios y quejas vecinales, clasifica prioridades por sector y sugiere la ponderación de criterios para el algoritmo de decisión multicriterio Saaty.',
    nodes: [
      {
        id: 'node-input-forum',
        name: 'Hilos del Foro Comunitario & Votos',
        type: 'input',
        category: 'Inputs',
        description: 'Extracción de comentarios de vecinos, quejas de transporte y votos presupuestarios.',
        inputs: [],
        outputs: [{ id: 'out-threads', name: 'Raw Forum Data', type: 'Comment[]' }],
        position: { x: 50, y: 130 },
        parameters: { minUpvotes: 1, filterCategory: 'all' }
      },
      {
        id: 'node-nlp-sentiment',
        name: 'LangChain Sentiment & Topic Extractor',
        type: 'model',
        category: 'Models',
        description: 'Clasifica quejas en: accesibilidad vial, déficit de agua, áreas verdes o vivienda.',
        inputs: [{ id: 'in-threads', name: 'Forum Data', type: 'Comment[]' }],
        outputs: [{ id: 'out-topics', name: 'Categorized Demands', type: 'JSON' }],
        position: { x: 360, y: 130 },
        parameters: { language: 'es', promptTemplate: 'Community Consensus Summarizer' }
      },
      {
        id: 'node-ahp-mapper',
        name: 'Saaty AHP Weight Synthesizer',
        type: 'spatial_tool',
        category: 'Spatial Tools',
        description: 'Convierte el volumen de demandas vecinales en pesos relativos de la matriz AHP.',
        inputs: [{ id: 'in-topics', name: 'Demands', type: 'JSON' }],
        outputs: [{ id: 'out-weights', name: 'Normalized Weights Vector', type: 'Vector' }],
        position: { x: 670, y: 130 },
        parameters: { consistencyThreshold: 0.1, criteriaCount: 5 }
      },
      {
        id: 'node-output-scenario',
        name: 'Dictamen de Consenso Comunitario',
        type: 'output',
        category: 'Outputs',
        description: 'Actualiza los radares de equidad espacial y redacta el informe para el municipio.',
        inputs: [{ id: 'in-weights', name: 'Weights Vector', type: 'Vector' }],
        outputs: [],
        position: { x: 980, y: 130 },
        parameters: { publishToForum: true, targetScenario: 'comunitario' }
      }
    ],
    connections: [
      { id: 'c31', sourceNodeId: 'node-input-forum', sourceHandle: 'out-threads', targetNodeId: 'node-nlp-sentiment', targetHandle: 'in-threads' },
      { id: 'c32', sourceNodeId: 'node-nlp-sentiment', sourceHandle: 'out-topics', targetNodeId: 'node-ahp-mapper', targetHandle: 'in-topics' },
      { id: 'c33', sourceNodeId: 'node-ahp-mapper', sourceHandle: 'out-weights', targetNodeId: 'node-output-scenario', targetHandle: 'in-weights' }
    ]
  }
];
