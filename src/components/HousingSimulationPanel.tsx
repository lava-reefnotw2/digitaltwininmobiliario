import React from 'react';
import { 
  Building2, 
  Sun, 
  Wind, 
  Users, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Compass,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { Scenario, PilotCity, UrbanElement } from '../types';

interface HousingSimulationPanelProps {
  scenario: Scenario;
  city: PilotCity;
  elements: UrbanElement[];
}

export const HousingSimulationPanel: React.FC<HousingSimulationPanelProps> = ({
  scenario,
  city,
  elements
}) => {
  const kpis = scenario.kpis;
  const housingElements = elements.filter(
    (e) => e.type === 'vivienda_social' || e.type === 'vivienda_incremental'
  );

  const socialUnits = housingElements
    .filter((e) => e.type === 'vivienda_social')
    .reduce((acc, curr) => acc + curr.unitsCount, 0);

  const incrementalUnits = housingElements
    .filter((e) => e.type === 'vivienda_incremental')
    .reduce((acc, curr) => acc + curr.unitsCount, 0);

  const totalUnits = socialUnits + incrementalUnits;
  const fosPercentage = Math.min(
    65,
    Math.round(
      (housingElements.reduce((acc, curr) => acc + curr.footprintArea, 0) /
        (city.areaHectares * 10000)) *
        100
    )
  );

  return (
    <div className="space-y-6">
      {/* Top Header Bento Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-inner">
              <Building2 className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Módulo de Simulación de Vivienda y Densidad
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                  Bioclimático
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Cálculo espacial bioclimático, confort solar, ventilación cruzada y capacidad habitacional en tiempo real
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-right shadow-inner">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-widest">Escenario Activo</span>
              <span className="text-sm font-extrabold text-emerald-300 capitalize">{scenario.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Housing Units */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-1 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Viviendas Nuevas</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{totalUnits}</span>
            <span className="text-xs text-slate-400 font-medium">familias</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-medium">
            <span>Colectiva: <strong className="text-sky-300">{socialUnits}</strong></span>
            <span>Incremental: <strong className="text-sky-300">{incrementalUnits}</strong></span>
          </div>
        </div>

        {/* Total Population Housed */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-1 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Población Alojada</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">
              {kpis.populationHoused.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-medium">habitantes</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-medium">
            Población total barrio: <strong className="text-slate-200">{(city.initialPopulation + kpis.populationHoused).toLocaleString()}</strong> hab
          </div>
        </div>

        {/* Density Hab/Ha */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-1 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Densidad Neta</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{kpis.densityHabHa}</span>
            <span className="text-xs text-slate-400 font-medium">hab / hectárea</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between font-medium">
            <span>FOS Ocupación: <strong className="text-slate-200">{fosPercentage}%</strong></span>
            <span className="text-emerald-400 font-bold">Óptimo</span>
          </div>
        </div>

        {/* Solar Comfort Index */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-1 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Índice Confort Solar</span>
            <Sun className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-yellow-300 font-mono">{kpis.solarComfortIndex}%</span>
            <span className="text-xs text-emerald-400 font-bold">Eficiente</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between font-medium">
            <span>Ventilación cruzada:</span>
            <strong className="text-emerald-300">{kpis.crossVentilationIndex}%</strong>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Breakdown: Solar & Wind Corridors + Typologies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bioclimatic Simulation Analysis */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            Análisis Bioclimático y Confort Térmico Pasivo
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Evaluación basada en la orientación azimutal de las fachadas, heliofanía útil en invierno y corredores de ventilación natural para evitar acumulación de humedad y calor.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Captación Solar Directa Fachada Principal</span>
                <span className="font-mono text-amber-400 font-bold">{kpis.solarComfortIndex}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${kpis.solarComfortIndex}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Potencial de Ventilación Cruzada Natural</span>
                <span className="font-mono text-emerald-400 font-bold">{kpis.crossVentilationIndex}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${kpis.crossVentilationIndex}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-300">Relación Espacio Abierto / Huella Construida (FOS)</span>
                <span className="font-mono text-sky-400 font-bold">{100 - fosPercentage}% libre</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${100 - fosPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-xs space-y-2 mt-4 shadow-inner">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Recomendación para Taller Participativo
            </span>
            <p className="text-slate-400 leading-relaxed font-medium">
              En laderas con pendiente pronunciada (ej. Comuna 13 o San Miguel Teotongo), escalonar los bloques habitacionales en terrazas de 3 a 4 niveles reduce en un 60% las sombras arrojadas sobre las viviendas bajas y conserva la vista panorámica comunitaria.
            </p>
          </div>
        </div>

        {/* Housing Typologies Distribution */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            Distribución de Tipologías Habitacionales
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Comparación de modelos de tenencia y construcción progresiva co-diseñados con la asamblea de vecinos.
          </p>

          <div className="space-y-3 pt-2">
            {/* Social Collective Housing Card */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between shadow-inner">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-sky-300">Vivienda Social Colectiva (Multi-familiar)</h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Edificación en altura de 4 a 6 niveles con áreas comunes en azotea y locales comerciales en planta baja.
                </p>
              </div>
              <div className="text-right pl-4">
                <span className="text-xl font-mono font-extrabold text-white">{socialUnits}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">unidades</span>
              </div>
            </div>

            {/* Incremental Housing Card */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between shadow-inner">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-emerald-300">Vivienda Incremental y Progresiva</h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Estructura base sismorresistente con núcleo húmedo (baño/cocina) expandible por autoconstrucción asistida.
                </p>
              </div>
              <div className="text-right pl-4">
                <span className="text-xl font-mono font-extrabold text-white">{incrementalUnits}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">unidades</span>
              </div>
            </div>

            {/* Total Estimated Cost Bento Banner */}
            <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-teal-950/40 rounded-2xl border border-emerald-500/30 flex items-center justify-between shadow-md">
              <div>
                <span className="text-xs font-bold text-emerald-300">Inversión Estimada en Vivienda:</span>
                <p className="text-[11px] text-slate-400 font-medium">Cálculo paramétrico de costos directos de obra civil</p>
              </div>
              <span className="text-xl font-mono font-extrabold text-emerald-400">
                ${(housingElements.reduce((a, c) => a + c.costEstimateUSD, 0)).toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
