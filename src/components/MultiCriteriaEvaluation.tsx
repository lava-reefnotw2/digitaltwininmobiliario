import React, { useMemo } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  Sparkles, 
  Download, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  FileSpreadsheet,
  Award,
  ArrowRight
} from 'lucide-react';
import { Scenario, PilotCity, ScenarioType } from '../types';

interface MultiCriteriaEvaluationProps {
  scenarios: Record<ScenarioType, Scenario>;
  currentCity: PilotCity;
  activeScenario: ScenarioType;
  onSelectScenario: (sc: ScenarioType) => void;
  onExportReport: (format: 'geojson' | 'csv' | 'json') => void;
}

export const MultiCriteriaEvaluation: React.FC<MultiCriteriaEvaluationProps> = ({
  scenarios,
  currentCity,
  activeScenario,
  onSelectScenario,
  onExportReport
}) => {

  const customScenarios = (['custom_1', 'custom_2', 'custom_3'] as ScenarioType[]).filter(
    c => scenarios[c] && scenarios[c].name !== `Perfil ${c}` && scenarios[c].name !== `Propuesta Personalizada ${c.split('_')[1]}` && scenarios[c].elements.length > 0
  );

  const displayedScenarios = ['base', 'municipal', 'comunitario', 'hibrido', ...customScenarios] as ScenarioType[];

  const colors: Record<string, string> = {
    'base': '#94a3b8',
    'municipal': '#38bdf8',
    'comunitario': '#f59e0b',
    'hibrido': '#10b981',
    'custom_1': '#818cf8',
    'custom_2': '#c084fc',
    'custom_3': '#f472b6'
  };

  const getLabel = (sc: ScenarioType) => {
    switch (sc) {
      case 'base': return '1. Base';
      case 'municipal': return '2. Municipal';
      case 'comunitario': return '3. Comunitaria';
      case 'hibrido': return '4. Híbrido';
      default: return scenarios[sc].name || sc;
    }
  };

  const radarData = [
    { subject: 'Sostenibilidad Ambiental', fullMark: 100 },
    { subject: 'Equidad Espacial', fullMark: 100 },
    { subject: 'Accesibilidad 15m', fullMark: 100 },
    { subject: 'Calidad de Vida', fullMark: 100 },
    { subject: 'Confort Bioclimático', fullMark: 100 }
  ].map(item => {
    const dataRow: any = { ...item };
    displayedScenarios.forEach(sc => {
      const label = getLabel(sc);
      if (item.subject === 'Sostenibilidad Ambiental') dataRow[label] = scenarios[sc].kpis.environmentalSustainabilityScore;
      if (item.subject === 'Equidad Espacial') dataRow[label] = scenarios[sc].kpis.spatialEquityScore;
      if (item.subject === 'Accesibilidad 15m') dataRow[label] = scenarios[sc].kpis.services15MinCoverage;
      if (item.subject === 'Calidad de Vida') dataRow[label] = scenarios[sc].kpis.qualityOfLifeScore;
      if (item.subject === 'Confort Bioclimático') dataRow[label] = scenarios[sc].kpis.solarComfortIndex;
    });
    return dataRow;
  });

  const barCostData = displayedScenarios.map(sc => ({
    name: getLabel(sc),
    costo: Math.round(scenarios[sc].kpis.estimatedInvestmentUSD / 1000),
    viviendas: scenarios[sc].kpis.totalHousingUnits
  }));

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner">
              <BarChart3 className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Evaluación Multicriterio y Selección AHP
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  AHP / ELECTRE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Comparativa de escenarios incluyendo las propuestas personalizadas guardadas.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => onExportReport('json')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-bold transition-all text-xs"
            >
              <Download className="w-4 h-4 text-sky-400" />
              Exportar Informe JSON
            </button>
            <button 
              onClick={() => onExportReport('csv')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all text-xs shadow-lg shadow-emerald-950/40"
            >
              <FileSpreadsheet className="w-4 h-4" />
              CSV Data
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Radar className="w-4 h-4 text-emerald-400" />
            Radar Multicriterio de Sostenibilidad
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Comparación de dimensiones espaciales y bioclimáticas (0 - 100).
          </p>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                {displayedScenarios.map((sc) => (
                  <Radar 
                    key={sc}
                    name={getLabel(sc)} 
                    dataKey={getLabel(sc)} 
                    stroke={colors[sc]} 
                    fill={colors[sc]} 
                    fillOpacity={sc === 'hibrido' || sc.startsWith('custom') ? 0.4 : 0.1} 
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            Inversión Estimada vs Viviendas Producidas
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Relación de costo-beneficio social: miles de USD invertidos frente a familias beneficiadas.
          </p>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barCostData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="costo" name="Inversión ($k USD)" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="viviendas" name="Viviendas Nuevas" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Matriz Tabular Comparativa de Indicadores Clave
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-400">
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px]">Indicador Urbano / KPI</th>
                {displayedScenarios.map(sc => (
                  <th key={sc} className="py-3.5 px-3 font-bold uppercase tracking-wider text-[10px]" style={{ color: colors[sc] }}>
                    {getLabel(sc)}
                  </th>
                ))}
                <th className="py-3.5 px-3 font-bold uppercase tracking-wider text-[10px] text-slate-300">Meta / OMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold">Viviendas Nuevas (Familias)</td>
                {displayedScenarios.map(sc => (
                  <td key={sc} className="py-3 px-3 font-mono" style={{ color: colors[sc] }}>{scenarios[sc].kpis.totalHousingUnits}</td>
                ))}
                <td className="py-3 px-3 text-slate-400 font-medium">Reducción déficit</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold">Área Verde por Habitante (m²/hab)</td>
                {displayedScenarios.map(sc => (
                  <td key={sc} className="py-3 px-3 font-mono" style={{ color: colors[sc] }}>{scenarios[sc].kpis.greenSpacePerCapita} m²</td>
                ))}
                <td className="py-3 px-3 text-emerald-400 font-bold">≥ 9.0 m² (OMS)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold">Cobertura Servicios 15 Minutos (%)</td>
                {displayedScenarios.map(sc => (
                  <td key={sc} className="py-3 px-3 font-mono" style={{ color: colors[sc] }}>{scenarios[sc].kpis.services15MinCoverage}%</td>
                ))}
                <td className="py-3 px-3 text-emerald-400 font-bold">&gt; 85%</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold">Mitigación Isla de Calor (°C)</td>
                {displayedScenarios.map(sc => (
                  <td key={sc} className="py-3 px-3 font-mono" style={{ color: colors[sc] }}>-{scenarios[sc].kpis.heatIslandReductionC}°C</td>
                ))}
                <td className="py-3 px-3 text-slate-400 font-medium">Enfriamiento pasivo</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold">Inversión Estimada Total (USD)</td>
                {displayedScenarios.map(sc => (
                  <td key={sc} className="py-3 px-3 font-mono" style={{ color: colors[sc] }}>${scenarios[sc].kpis.estimatedInvestmentUSD.toLocaleString()}</td>
                ))}
                <td className="py-3 px-3 text-slate-400 font-medium">Presupuesto municipal</td>
              </tr>
              <tr className="hover:bg-slate-800/30 bg-emerald-950/20 font-bold">
                <td className="py-3.5 px-4 text-emerald-300">Puntuación Integral de Calidad de Vida (0-100)</td>
                {displayedScenarios.map(sc => (
                  <td key={sc} className="py-3.5 px-3 font-mono font-extrabold" style={{ color: colors[sc] }}>{scenarios[sc].kpis.qualityOfLifeScore}</td>
                ))}
                <td className="py-3.5 px-3 text-emerald-400 font-bold">Óptimo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
