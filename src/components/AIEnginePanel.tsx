import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderOpen, 
  BarChart2, 
  BrainCircuit, 
  CheckSquare, 
  Settings2, 
  LineChart, 
  BellRing,
  Upload,
  Database,
  Play,
  Cpu,
  AlertTriangle,
  Info
} from 'lucide-react';
import { PilotCity, Scenario, Language } from '../types';

interface AIEnginePanelProps {
  city: PilotCity;
  scenario: Scenario;
  language: Language;
}

type AITab = 
  | 'carga' 
  | 'analisis' 
  | 'entrenamiento' 
  | 'validacion' 
  | 'parametros' 
  | 'estadisticas' 
  | 'alertas';

export const AIEnginePanel: React.FC<AIEnginePanelProps> = ({ city, scenario, language }) => {
  const [activeAITab, setActiveAITab] = useState<AITab>('carga');
  
  // Model Parameters
  const [selectedModel, setSelectedModel] = useState<string>('random_forest');
  const [nEstimators, setNEstimators] = useState<number>(200);
  const [maxDepth, setMaxDepth] = useState<number>(15);
  const [learningRate, setLearningRate] = useState<number>(0.05);
  
  // Training State
  const [isTraining, setIsTraining] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLoss, setTrainingLoss] = useState(0.0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  
  // Model Metrics
  const [metrics, setMetrics] = useState<{
    folds: {fold: number, r2: number, rmse: number, mae: number}[],
    featureImportance: {name: string, val: number}[]
  }>({ folds: [], featureImportance: [] });

  const trainingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (trainingIntervalRef.current) clearInterval(trainingIntervalRef.current);
    };
  }, []);

  const handleTrainModel = () => {
    setIsTraining(true);
    setIsTrained(false);
    setTrainingProgress(0);
    setCurrentEpoch(0);
    setTrainingLoss(0.85);

    const maxEpochs = selectedModel === 'random_forest' ? nEstimators : 100;
    const stepSize = Math.max(1, Math.floor(maxEpochs / 50));
    
    let epoch = 0;
    
    trainingIntervalRef.current = setInterval(() => {
      epoch += stepSize;
      
      if (epoch >= maxEpochs) {
        epoch = maxEpochs;
        if (trainingIntervalRef.current) clearInterval(trainingIntervalRef.current);
        
        setIsTraining(false);
        setIsTrained(true);
        generateMetrics();
      }
      
      setCurrentEpoch(epoch);
      setTrainingProgress(Math.floor((epoch / maxEpochs) * 100));
      setTrainingLoss(0.85 * Math.exp(-epoch / (maxEpochs * 0.2)) + (Math.random() * 0.02));
      
    }, 50); // fast simulation
  };

  const generateMetrics = () => {
    // Base R2 depends on model choice
    let baseR2 = 0;
    if (selectedModel === 'random_forest') baseR2 = 0.84;
    if (selectedModel === 'xgboost') baseR2 = 0.88;
    if (selectedModel === 'gnn') baseR2 = 0.91;
    
    // Hyperparameters affect final metrics slightly
    baseR2 += (maxDepth / 100) * 0.02;
    baseR2 += (learningRate - 0.05) * 0.1;
    baseR2 = Math.min(0.99, Math.max(0.6, baseR2));

    const folds = Array.from({length: 5}).map((_, i) => ({
      fold: i+1,
      r2: baseR2 + (Math.random() * 0.03 - 0.015),
      rmse: 1500 - (baseR2 * 1200) + Math.random() * 80,
      mae: 900 - (baseR2 * 700) + Math.random() * 50
    }));

    let featureImportance = [];
    if (selectedModel === 'gnn') {
      featureImportance = [
        { name: 'Topología de Red Vial', val: 88 },
        { name: 'Distancia a Servicios Centrales', val: 75 },
        { name: 'Densidad Habitacional', val: 62 },
        { name: 'Índice de Slum UN-Habitat', val: 50 },
        { name: 'Radiación Solar', val: 35 },
      ];
    } else if (selectedModel === 'xgboost') {
      featureImportance = [
        { name: 'Proximidad a Vías Principales', val: 82 },
        { name: 'Valor Comercial Estimado (USD)', val: 78 },
        { name: 'Densidad Base', val: 70 },
        { name: 'Área Verde per Cápita', val: 45 },
        { name: 'Años de Construcción', val: 30 },
      ];
    } else {
      featureImportance = [
        { name: 'Densidad Habitacional Base', val: 85 },
        { name: 'Distancia a Vías Principales', val: 72 },
        { name: 'Proximidad a Servicios de Salud', val: 68 },
        { name: 'Índice de Vulnerabilidad UN-Habitat', val: 55 },
        { name: 'Área Verde per Cápita', val: 40 },
      ];
    }
    
    // Add some random noise and sort
    featureImportance = featureImportance.map(f => ({
      name: f.name,
      val: Math.min(99, Math.max(10, f.val + (Math.random() * 10 - 5)))
    })).sort((a,b) => b.val - a.val);

    setMetrics({ folds, featureImportance });
  };

  const tabs: { id: AITab; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'carga', label: 'Carga y Lectura de Datos', icon: FolderOpen, color: 'text-amber-400' },
    { id: 'analisis', label: 'Análisis Exploratorio', icon: BarChart2, color: 'text-blue-400' },
    { id: 'entrenamiento', label: 'Entrenamiento de Modelos', icon: BrainCircuit, color: 'text-emerald-400' },
    { id: 'validacion', label: 'Validación Cruzada', icon: CheckSquare, color: 'text-green-500' },
    { id: 'parametros', label: 'Ajuste de Hiperparámetros', icon: Settings2, color: 'text-rose-400' },
    { id: 'estadisticas', label: 'Pruebas Estadísticas', icon: LineChart, color: 'text-indigo-400' },
    { id: 'alertas', label: 'Modelo de Alerta Temprana', icon: BellRing, color: 'text-red-500' }
  ];

  // Correlation Matrix Generator
  const correlationVariables = ['Densidad', 'Precio m²', 'Área Verde', 'Accesibilidad', 'Vulnerabilidad'];
  const correlationData = [
    [1.0, 0.8, -0.6, 0.7, -0.4],
    [0.8, 1.0, 0.4, 0.8, -0.7],
    [-0.6, 0.4, 1.0, 0.2, -0.3],
    [0.7, 0.8, 0.2, 1.0, -0.5],
    [-0.4, -0.7, -0.3, -0.5, 1.0]
  ];

  const getHeatmapColor = (val: number) => {
    // scale from -1 to 1 to red -> neutral -> emerald
    if (val === 1.0) return 'bg-slate-700 text-white font-bold';
    if (val > 0.6) return 'bg-emerald-600/80 text-white font-bold';
    if (val > 0.3) return 'bg-emerald-500/50 text-white';
    if (val > 0) return 'bg-emerald-400/20 text-slate-300';
    if (val > -0.3) return 'bg-rose-400/20 text-slate-300';
    if (val > -0.6) return 'bg-rose-500/50 text-white';
    return 'bg-rose-600/80 text-white font-bold';
  };

  // Generate Alerts based on KPIs
  const generateAlerts = () => {
    const alerts = [];
    const kpis = scenario.kpis;
    
    if (kpis.estimatedInvestmentUSD > 3000000 && kpis.spatialEquityScore < 50) {
      alerts.push({
        type: 'Riesgo Alto de Desplazamiento',
        desc: `La fuerte inyección de capital estimada en $${(kpis.estimatedInvestmentUSD/1000000).toFixed(1)}M sin equidad suficiente (score: ${kpis.spatialEquityScore.toFixed(0)}) acelerará la gentrificación, desplazando a la población vulnerable local.`,
        level: 'high'
      });
    }

    if (kpis.densityHabHa > 150 && kpis.greenSpacePerCapita < 8) {
      alerts.push({
        type: 'Déficit de Resiliencia Climática',
        desc: `Alta densidad (${kpis.densityHabHa.toFixed(0)} hab/ha) combinada con insuficiencia de áreas verdes (${kpis.greenSpacePerCapita.toFixed(1)} m²/hab) exacerbará el efecto Isla de Calor Urbano.`,
        level: 'medium'
      });
    }
    
    if (kpis.services15MinCoverage < 60 && kpis.populationHoused > 1000) {
      alerts.push({
        type: 'Segregación Espacial',
        desc: `Más del 40% de la nueva población (${kpis.populationHoused} hab) quedará fuera del radio de caminata de 15 minutos de servicios esenciales.`,
        level: 'high'
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        type: 'Escenario Balanceado',
        desc: 'El modelo no detecta anomalías severas en los parámetros actuales. El desarrollo proyectado es armónico con la topología de la ciudad.',
        level: 'low'
      });
    }

    return alerts;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">Motor de Inteligencia Artificial</h2>
          <p className="text-sm text-slate-400">Modelos de Machine Learning para Simulación y Predicción Inmobiliaria</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-1 space-y-1 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAITab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAITab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className={`relative flex items-center justify-center ${isActive ? '' : 'opacity-70'}`}>
                  {isActive && (
                    <span className="absolute -left-2 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  )}
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                </div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 min-h-[500px]">
          
          {activeAITab === 'carga' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Datasets Disponibles</h3>
              <p className="text-sm text-slate-400">Seleccione los conjuntos de datos a utilizar para el entrenamiento del modelo de simulación de vivienda para {city.name}.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">GHSL - Global Human Settlement</h4>
                        <p className="text-xs text-slate-500">Densidad construida (m²/km²)</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Cargado</span>
                  </div>
                </div>
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="w-8 h-8 text-sky-400 group-hover:text-sky-300" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">UN-Habitat Slum Index</h4>
                        <p className="text-xs text-slate-500">Índice de vulnerabilidad espacial</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Cargado</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="w-8 h-8 text-amber-400 group-hover:text-amber-300" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">Catastro Municipal & OSM</h4>
                        <p className="text-xs text-slate-500">Polígonos de edificaciones y vías</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Cargado</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-dashed border-slate-700 rounded-xl bg-slate-950/50 flex flex-col items-center justify-center text-center space-y-2 hover:bg-slate-900/50 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Cargar nuevo dataset (CSV, GeoJSON)</span>
              </div>
            </div>
          )}

          {activeAITab === 'analisis' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Análisis Exploratorio Espacial (Heatmap de Correlación)</h3>
              <p className="text-sm text-slate-400">Visualización de correlaciones de Pearson entre variables urbanas de {city.name}.</p>
              
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 overflow-x-auto">
                <div className="min-w-[400px]">
                  {/* Heatmap Grid */}
                  <div className="grid grid-cols-6 gap-1 text-xs">
                    {/* Top Labels */}
                    <div className="col-span-1"></div>
                    {correlationVariables.map((v, idx) => (
                      <div key={idx} className="col-span-1 text-center font-bold text-slate-400 truncate px-1" title={v}>{v}</div>
                    ))}
                    
                    {/* Rows */}
                    {correlationData.map((row, rIdx) => (
                      <React.Fragment key={rIdx}>
                        <div className="col-span-1 flex items-center justify-end pr-2 font-bold text-slate-400 text-right truncate" title={correlationVariables[rIdx]}>
                          {correlationVariables[rIdx]}
                        </div>
                        {row.map((val, cIdx) => (
                          <div key={`${rIdx}-${cIdx}`} className={`col-span-1 aspect-square rounded-md flex items-center justify-center border border-slate-800/50 transition-colors hover:brightness-125 ${getHeatmapColor(val)}`}>
                            {val.toFixed(1)}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>-1.0 (Correlación Inversa Fuerte)</span>
                    <span>0.0 (Sin Correlación)</span>
                    <span>1.0 (Correlación Directa Fuerte)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeAITab === 'entrenamiento' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Entrenamiento de Modelos Recomendados</h3>
              <p className="text-sm text-slate-400">Seleccione el algoritmo predictivo para la simulación de precios de vivienda y densidad poblacional.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className={`relative p-4 rounded-xl border cursor-pointer transition-all ${selectedModel === 'random_forest' ? 'bg-indigo-900/30 border-indigo-500 shadow-md shadow-indigo-900/20' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                  <input type="radio" name="model" value="random_forest" className="sr-only" checked={selectedModel === 'random_forest'} onChange={() => {setSelectedModel('random_forest'); setIsTrained(false);}} />
                  <h4 className="text-sm font-bold text-indigo-300 mb-1">Random Forest Regressor</h4>
                  <p className="text-xs text-slate-500">Recomendado para robustez ante outliers espaciales y relaciones no lineales.</p>
                  {selectedModel === 'random_forest' && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500"></span>}
                </label>

                <label className={`relative p-4 rounded-xl border cursor-pointer transition-all ${selectedModel === 'xgboost' ? 'bg-indigo-900/30 border-indigo-500 shadow-md shadow-indigo-900/20' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                  <input type="radio" name="model" value="xgboost" className="sr-only" checked={selectedModel === 'xgboost'} onChange={() => {setSelectedModel('xgboost'); setIsTrained(false);}} />
                  <h4 className="text-sm font-bold text-indigo-300 mb-1">Gradient Boosting (XGBoost)</h4>
                  <p className="text-xs text-slate-500">Alta precisión predictiva, ideal para capturar micro-tendencias de valorización.</p>
                  {selectedModel === 'xgboost' && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500"></span>}
                </label>

                <label className={`relative p-4 rounded-xl border cursor-pointer transition-all ${selectedModel === 'gnn' ? 'bg-indigo-900/30 border-indigo-500 shadow-md shadow-indigo-900/20' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                  <input type="radio" name="model" value="gnn" className="sr-only" checked={selectedModel === 'gnn'} onChange={() => {setSelectedModel('gnn'); setIsTrained(false);}} />
                  <h4 className="text-sm font-bold text-indigo-300 mb-1">Spatial Graph Neural Net</h4>
                  <p className="text-xs text-slate-500">Avanzado: Modela explícitamente la topología de la red vial y proximidad.</p>
                  {selectedModel === 'gnn' && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500"></span>}
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleTrainModel}
                  disabled={isTraining}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                    isTraining 
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                  }`}
                >
                  {isTraining ? <Cpu className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {isTraining ? 'Entrenando modelo...' : isTrained ? 'Re-entrenar Modelo' : 'Iniciar Entrenamiento'}
                </button>
              </div>

              {(isTraining || isTrained) && (
                <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">
                      {isTrained ? 'Entrenamiento Completado' : `Epoch ${currentEpoch}/${selectedModel === 'random_forest' ? nEstimators : 100}`}
                    </span>
                    <span className={isTrained ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      Loss: {trainingLoss.toFixed(4)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-100 ease-linear ${isTrained ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`} 
                      style={{ width: `${trainingProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeAITab === 'validacion' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Validación Cruzada Espacial</h3>
              
              {!isTrained ? (
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 text-center text-slate-400 flex flex-col items-center">
                  <Info className="w-8 h-8 mb-3 text-slate-600" />
                  <p>Por favor, inicie el entrenamiento del modelo en la pestaña correspondiente para visualizar los resultados de la validación cruzada.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-400">Resultados de Spatial K-Fold Cross Validation (K=5) generados en tiempo real tras el entrenamiento.</p>
                  <div className="overflow-hidden rounded-xl border border-slate-800">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead className="bg-slate-950/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-3">Fold</th>
                          <th className="px-4 py-3">R² Score</th>
                          <th className="px-4 py-3">RMSE (USD)</th>
                          <th className="px-4 py-3">MAE (USD)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {metrics.folds.map(f => (
                          <tr key={f.fold} className="hover:bg-slate-800/20">
                            <td className="px-4 py-2 font-mono text-slate-400">Fold {f.fold}</td>
                            <td className="px-4 py-2 text-emerald-400 font-mono font-bold">{f.r2.toFixed(4)}</td>
                            <td className="px-4 py-2 font-mono">{f.rmse.toFixed(2)}</td>
                            <td className="px-4 py-2 font-mono">{f.mae.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {activeAITab === 'parametros' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Ajuste de Hiperparámetros (Grid Search)</h3>
              <p className="text-sm text-slate-400">Optimización del modelo {selectedModel} seleccionado. Ajuste antes de entrenar.</p>
              
              <div className="space-y-6 max-w-lg bg-slate-950 p-6 rounded-xl border border-slate-800">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>N_Estimators (Árboles)</span>
                    <span className="text-emerald-400 font-mono text-sm">{nEstimators}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" max="500" step="10" 
                    value={nEstimators}
                    onChange={(e) => {setNEstimators(Number(e.target.value)); setIsTrained(false);}}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
                  />
                  <p className="text-[10px] text-slate-500">Cantidad de árboles/estimadores para Random Forest/XGBoost.</p>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Max_Depth (Profundidad Máxima)</span>
                    <span className="text-emerald-400 font-mono text-sm">{maxDepth}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" max="30" step="1" 
                    value={maxDepth}
                    onChange={(e) => {setMaxDepth(Number(e.target.value)); setIsTrained(false);}}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
                  />
                  <p className="text-[10px] text-slate-500">Evita el sobreajuste (overfitting) limitando la profundidad de la red/árbol.</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Learning Rate (Tasa de Aprendizaje)</span>
                    <span className="text-emerald-400 font-mono text-sm">{learningRate.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.01" max="0.3" step="0.01" 
                    value={learningRate}
                    onChange={(e) => {setLearningRate(Number(e.target.value)); setIsTrained(false);}}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
                  />
                  <p className="text-[10px] text-slate-500">Factor de corrección de error en GNN / XGBoost.</p>
                </div>
              </div>
            </div>
          )}

          {activeAITab === 'estadisticas' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Pruebas Estadísticas & Feature Importance</h3>
              
              {!isTrained ? (
                 <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 text-center text-slate-400 flex flex-col items-center">
                   <Info className="w-8 h-8 mb-3 text-slate-600" />
                   <p>Por favor, inicie el entrenamiento del modelo para calcular la importancia de las variables para {selectedModel}.</p>
                 </div>
              ) : (
                <>
                  <p className="text-sm text-slate-400">Importancia relativa de las variables urbanas detectada por la IA tras el entrenamiento.</p>
                  <div className="space-y-4 mt-6">
                    {metrics.featureImportance.map((ft, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <span className="text-xs text-slate-300 w-52 truncate">{ft.name}</span>
                        <div className="flex-1 bg-slate-950 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-indigo-500 h-full rounded-full group-hover:bg-indigo-400 transition-colors" 
                            style={{ width: `${ft.val}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-indigo-400 w-12 text-right">{ft.val.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeAITab === 'alertas' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Modelo de Alerta Temprana</h3>
              <p className="text-sm text-slate-400">El motor evalúa en tiempo real los KPIs del escenario <strong className="text-white">{scenario.name}</strong> para detectar externalidades urbanas negativas.</p>
              
              <div className="space-y-4">
                {generateAlerts().map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-xl flex items-start gap-4 border ${
                    alert.level === 'high' ? 'bg-rose-950/30 border-rose-900' :
                    alert.level === 'medium' ? 'bg-amber-950/30 border-amber-900' :
                    'bg-emerald-950/30 border-emerald-900'
                  }`}>
                    {alert.level === 'high' ? <BellRing className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" /> : 
                     alert.level === 'medium' ? <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" /> :
                     <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />}
                    
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold ${
                        alert.level === 'high' ? 'text-rose-400' :
                        alert.level === 'medium' ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>{alert.type}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {alert.desc}
                      </p>
                      {alert.level !== 'low' && (
                        <button className={`mt-3 px-3 py-1.5 border rounded text-xs font-bold transition-colors ${
                          alert.level === 'high' 
                            ? 'bg-rose-600/20 text-rose-300 border-rose-500/30 hover:bg-rose-600/40' 
                            : alert.level === 'medium' ? 'bg-amber-600/20 text-amber-300 border-amber-500/30 hover:bg-amber-600/40' : 'hidden'
                        }`}>
                          Generar Medidas de Mitigación
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

