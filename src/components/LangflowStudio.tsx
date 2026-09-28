import React, { useState, useMemo } from 'react';
import { 
  Workflow, 
  Play, 
  Plus, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  Sparkles, 
  Code2, 
  FolderTree, 
  Zap, 
  CheckCircle2, 
  Settings2, 
  FileCode, 
  Server, 
  ExternalLink,
  Info,
  Maximize2,
  Box,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  PRESET_LANGFLOW_FLOWS, 
  LangflowPresetFlow, 
  LangflowNodeDefinition, 
  LangflowConnection 
} from '../data/urbanKnowledgeBase';
import { PilotCity, ScenarioType, Language } from '../types';

interface LangflowStudioProps {
  currentCity: PilotCity;
  activeScenario: ScenarioType;
  language: Language;
}

export const LangflowStudio: React.FC<LangflowStudioProps> = ({
  currentCity,
  activeScenario,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'tools' | 'deployment'>('canvas');
  const [selectedFlowId, setSelectedFlowId] = useState<string>(PRESET_LANGFLOW_FLOWS[0].id);
  const [selectedNode, setSelectedNode] = useState<LangflowNodeDefinition | null>(null);
  const [isRunningFlow, setIsRunningFlow] = useState(false);
  const [activeExecutionStep, setActiveExecutionStep] = useState<number>(-1);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Active Flow Object
  const currentFlow: LangflowPresetFlow = useMemo(() => {
    return PRESET_LANGFLOW_FLOWS.find(f => f.id === selectedFlowId) || PRESET_LANGFLOW_FLOWS[0];
  }, [selectedFlowId]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentFlow, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentFlow.id}-langflow-export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRunFlow = () => {
    if (isRunningFlow) return;
    setIsRunningFlow(true);
    setActiveExecutionStep(0);
    setExecutionLogs([
      `[00:00.12] 🚀 Inicializando pipeline: "${currentFlow.name}" en ciudad piloto ${currentCity.name}...`,
      `[00:00.45] 📡 Extrayendo metadatos del gemelo digital (Centro: [${currentCity.center.join(', ')}], Escenario: ${activeScenario.toUpperCase()})...`
    ]);

    const steps = currentFlow.nodes.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setActiveExecutionStep(step);

      if (step < steps) {
        const currentNode = currentFlow.nodes[step];
        setExecutionLogs(prev => [
          ...prev,
          `[00:0${step * 2}.10] ⚡ Nodo [${currentNode.name}] activado. Procesando parámetros...`,
          `[00:0${step * 2}.85] ✔ Inferencia completada en ${currentNode.category}. Salida transmitida.`
        ]);
      } else {
        clearInterval(interval);
        setIsRunningFlow(false);
        setExecutionLogs(prev => [
          ...prev,
          `[00:09.30] 🏁 Flujo completado exitosamente. Se sincronizó el dictamen con el motor Three.js y el evaluador AHP.`
        ]);
      }
    }, 1200);
  };

  const getNodeColorClass = (category: string) => {
    switch (category) {
      case 'Inputs':
        return 'border-amber-500/50 bg-amber-950/20 text-amber-300';
      case 'Vector Stores':
        return 'border-purple-500/50 bg-purple-950/20 text-purple-300';
      case 'Models':
        return 'border-sky-500/50 bg-sky-950/20 text-sky-300';
      case 'Spatial Tools':
        return 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300';
      case 'Outputs':
        return 'border-rose-500/50 bg-rose-950/20 text-rose-300';
      default:
        return 'border-slate-700 bg-slate-900/60 text-slate-300';
    }
  };

  // Python Agent Scaffolding Code
  const pythonAgentCode = `# urban_spatial_agent.py
# Agente Urbanístico Autónomo basado en LangChain & Langflow para Gemelo Digital
import os
from typing import List, Dict, Any
from langchain_core.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate

# 1. Definición de Herramientas Espaciales (Spatial Tools)
@tool
def calculate_slope_and_hazard(lat: float, lng: float) -> Dict[str, Any]:
    """Calcula la pendiente orográfica (%) y evalúa la susceptibilidad a derrumbe según CENEPRED."""
    # Simulación de consulta a capa DEM / PostGIS Raster
    is_safe = True
    estimated_slope = 14.5  # porcentaje
    hazard_level = "Bajo" if estimated_slope < 20 else "Alto"
    return {
        "latitude": lat,
        "longitude": lng,
        "slope_percent": estimated_slope,
        "hazard_level": hazard_level,
        "max_recommended_floors": 4 if estimated_slope < 20 else 2
    }

@tool
def query_zoning_regulations(city: str, query: str) -> str:
    """Consulta la base vectorial RAG de ordenanzas municipales y el RNE (Norma A.020)."""
    return f"Normativa para {city}: Área mínima de vivienda social 42m², retiro municipal 3.0m, densidad máxima 450 hab/ha."

@tool
def trigger_threejs_element(element_type: str, lat: float, lng: float, cost_usd: float) -> str:
    """Envía un webhook WebSocket al visor Three.js para proyectar el nuevo elemento 3D."""
    return f"Elemento '{element_type}' proyectado exitosamente en Three.js [lat: {lat}, lng: {lng}]."

# 2. Configuración del Agente LangChain
tools = [calculate_slope_and_hazard, query_zoning_regulations, trigger_threejs_element]
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.1)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Eres un arquitecto y planificador urbano experto en hábitats populares y gemelos digitales."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 3. Invocación de Ejemplo
if __name__ == "__main__":
    result = agent_executor.invoke({
        "input": "Analiza el lote en Lima Quebrada Huáscar (lat: -11.975, lng: -76.995) y propón un centro de salud si el riesgo es bajo."
    })
    print(result["output"])
`;

  // Docker Compose Scaffolding Code
  const dockerComposeCode = `version: '3.8'

services:
  # Langflow Visual Canvas UI & Backend
  langflow:
    image: langflowai/langflow:latest
    container_name: urban_twin_langflow
    ports:
      - "7860:7860"
    environment:
      - LANGFLOW_DATABASE_URL=postgresql://langflow:password@postgres:5432/langflow
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - postgres
    volumes:
      - langflow_cache:/root/.cache/langflow
    restart: unless-stopped

  # Base de Datos Vectorial para RAG Normativo
  postgres:
    image: pgvector/pgvector:pg16
    container_name: urban_twin_pgvector
    environment:
      POSTGRES_USER: langflow
      POSTGRES_PASSWORD: password
      POSTGRES_DB: langflow
    ports:
      - "5433:5432"
    volumes:
      - pgvector_data:/var/lib/postgresql/data

volumes:
  langflow_cache:
  pgvector_data:
`;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30 shadow-inner">
              <Workflow className="w-7 h-7 text-indigo-400" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Langflow Studio & Orquestador de Agentes
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Visual Canvas
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  LangChain ReAct
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Diseño visual de flujos cognitivos, herramientas espaciales para el gemelo 3D y RAG de normativas urbanas
              </p>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'canvas'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Lienzo Visual</span>
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'tools'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Herramientas Espaciales</span>
            </button>
            <button
              onClick={() => setActiveTab('deployment')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'deployment'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Backend & Docker</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: VISUAL CANVAS */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">Flujo Activo:</span>
              <select
                value={selectedFlowId}
                onChange={(e) => {
                  setSelectedFlowId(e.target.value);
                  setSelectedNode(null);
                  setActiveExecutionStep(-1);
                  setExecutionLogs([]);
                }}
                className="bg-slate-950 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              >
                {PRESET_LANGFLOW_FLOWS.map((flow) => (
                  <option key={flow.id} value={flow.id}>
                    {flow.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
                ({currentFlow.nodes.length} nodos, {currentFlow.connections.length} conexiones)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunFlow}
                disabled={isRunningFlow}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all"
              >
                <Play className={`w-3.5 h-3.5 ${isRunningFlow ? 'animate-spin' : ''}`} />
                <span>{isRunningFlow ? 'Ejecutando Flujo...' : 'Probar Flujo'}</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Exportar a JSON compatible con Langflow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>
            </div>
          </div>

          {/* Interactive Flow Canvas Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 bg-slate-950/90 border border-slate-800/90 rounded-3xl p-6 min-h-[580px] relative overflow-x-auto shadow-2xl">
              {/* Dot Grid Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Status Header inside Canvas */}
              <div className="relative z-10 flex items-center justify-between mb-8 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-300">
                    Lienzo de Ejecución: {currentFlow.name}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Ciudad: <strong className="text-white">{currentCity.name}</strong> • Escenario: <strong className="text-indigo-400">{activeScenario.toUpperCase()}</strong>
                </div>
              </div>

              {/* Nodes Flex Layout */}
              <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 py-6">
                {currentFlow.nodes.map((node, idx) => {
                  const isCurrentActive = activeExecutionStep === idx;
                  const isPastActive = activeExecutionStep > idx;
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <React.Fragment key={node.id}>
                      <div
                        onClick={() => setSelectedNode(node)}
                        className={`w-full sm:w-60 p-4 rounded-2xl border transition-all cursor-pointer shadow-lg backdrop-blur-md relative ${
                          getNodeColorClass(node.category)
                        } ${
                          isSelected
                            ? 'ring-2 ring-indigo-400 scale-[1.03] shadow-indigo-950/80'
                            : 'hover:scale-[1.01]'
                        } ${
                          isCurrentActive
                            ? 'ring-2 ring-emerald-400 animate-pulse bg-emerald-950/40'
                            : ''
                        }`}
                      >
                        {/* Node Category & Status */}
                        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-black/40">
                            {node.category}
                          </span>
                          {isPastActive && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-xs font-extrabold text-white tracking-tight mb-1">
                          {node.name}
                        </h4>
                        <p className="text-[10px] text-slate-300/80 line-clamp-2 mb-3">
                          {node.description}
                        </p>

                        {/* IO Ports preview */}
                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-white/10">
                          <span>In: {node.inputs.length}</span>
                          <span>Out: {node.outputs.length}</span>
                        </div>
                      </div>

                      {/* Connection Arrow between sequential nodes */}
                      {idx < currentFlow.nodes.length - 1 && (
                        <div className="hidden lg:flex flex-col items-center justify-center shrink-0">
                          <div className={`w-8 h-0.5 transition-all ${
                            isPastActive ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-slate-700'
                          }`} />
                          <ArrowRight className={`w-4 h-4 -ml-1 ${
                            isPastActive ? 'text-emerald-400' : 'text-slate-600'
                          }`} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Execution Console Logs Strip */}
              <div className="relative z-10 mt-10 bg-slate-950/90 rounded-2xl border border-slate-800 p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    Consola de Inferencia en Tiempo Real
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {executionLogs.length} eventos registrados
                  </span>
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1 text-[11px] text-slate-300">
                  {executionLogs.length === 0 ? (
                    <span className="text-slate-500 italic">
                      Haz clic en "Probar Flujo" para simular la ejecución de los agentes e inspectores espaciales...
                    </span>
                  ) : (
                    executionLogs.map((log, lIdx) => (
                      <div key={lIdx} className="leading-tight">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Selected Node Inspector */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
                  <Settings2 className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-extrabold text-white">
                    Inspector de Nodo
                  </h3>
                </div>

                {selectedNode ? (
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nombre:</span>
                      <strong className="text-white text-sm">{selectedNode.name}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Categoría:</span>
                      <span className="font-mono text-indigo-300">{selectedNode.category}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Descripción:</span>
                      <p className="text-slate-300 text-xs leading-relaxed">{selectedNode.description}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">Parámetros Clave:</span>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                        {Object.entries(selectedNode.parameters).map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <span className="text-slate-400">{k}:</span>
                            <span className="text-emerald-400 font-bold">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                    <Info className="w-8 h-8 text-slate-600 mx-auto" />
                    <p>Haz clic en cualquier nodo del lienzo para inspeccionar sus parámetros y entradas/salidas.</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleRunFlow}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  Ejecutar Pipeline Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPATIAL TOOLS CATALOG */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Compass className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Spatial Tool
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">calculate_slope_and_hazard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evalúa la pendiente orográfica (%) y cruza las coordenadas con el mapa de susceptibilidad física de CENEPRED para evitar construcción en zonas rojas.
            </p>
            <div className="bg-slate-950 p-2.5 rounded-xl font-mono text-[10px] text-slate-300">
              Input: [lat: float, lng: float] ➔ Output: [slope_percent, hazard_level]
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                <Database className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                RAG Tool
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">query_zoning_regulations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recupera fragmentos semánticos del Reglamento Nacional de Edificaciones (Norma A.020) y los planes metropolitanos (PLANMET 2040, PDM Arequipa).
            </p>
            <div className="bg-slate-950 p-2.5 rounded-xl font-mono text-[10px] text-slate-300">
              Input: [city: str, query: str] ➔ Output: Document[] con artículos
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30">
                <Box className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                3D Trigger
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">trigger_threejs_element</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inserta en tiempo real la geometría 3D correspondiente (módulo de vivienda, centro de salud o andén) en la escena Three.js del gemelo digital.
            </p>
            <div className="bg-slate-950 p-2.5 rounded-xl font-mono text-[10px] text-slate-300">
              Input: [type, coords, cost] ➔ Output: Three.js Mesh State Update
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PYTHON & DOCKER DEPLOYMENT */}
      {activeTab === 'deployment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Python LangChain Code */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-3xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">urban_spatial_agent.py (LangChain)</h3>
              </div>
              <button
                onClick={() => handleCopy(pythonAgentCode, 'python')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-300 flex items-center gap-1 border border-slate-700 transition-colors"
              >
                {copiedCode === 'python' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'python' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-96">
              {pythonAgentCode}
            </pre>
          </div>

          {/* Docker Compose Scaffolding */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-3xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">docker-compose.langflow.yml</h3>
              </div>
              <button
                onClick={() => handleCopy(dockerComposeCode, 'docker')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 flex items-center gap-1 border border-slate-700 transition-colors"
              >
                {copiedCode === 'docker' ? <Check className="w-3.5 h-3.5 text-indigo-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'docker' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-96">
              {dockerComposeCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
