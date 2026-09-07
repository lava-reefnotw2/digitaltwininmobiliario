import React from 'react';
import { 
  Footprints, 
  HeartPulse, 
  GraduationCap, 
  ShoppingBag, 
  Bus, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Clock,
  Navigation
} from 'lucide-react';
import { Scenario, PilotCity, UrbanElement } from '../types';

interface ServicesProximityPanelProps {
  scenario: Scenario;
  city: PilotCity;
  elements: UrbanElement[];
}

export const ServicesProximityPanel: React.FC<ServicesProximityPanelProps> = ({
  scenario,
  city,
  elements
}) => {
  const kpis = scenario.kpis;

  const healthFacilities = elements.filter((e) => e.type === 'centro_salud');
  const schools = elements.filter((e) => e.type === 'escuela');
  const markets = elements.filter((e) => e.type === 'comercio_local');
  const transitStops = elements.filter((e) => e.type === 'parada_transporte');
  const communitySpaces = elements.filter((e) => e.type === 'espacio_comunitario');

  const servicesList = [
    {
      category: 'Salud y Cuidados',
      icon: HeartPulse,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/30',
      count: healthFacilities.length,
      avgWalkTime: healthFacilities.length > 0 ? '5 - 8 min' : '> 25 min',
      coveragePct: healthFacilities.length > 0 ? 88 : 32,
      description: 'Dispensario médico de atención primaria, farmacia comunitaria y centro de cuidados barrial.'
    },
    {
      category: 'Educación y Cultura',
      icon: GraduationCap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      count: schools.length,
      avgWalkTime: schools.length > 0 ? '6 - 10 min' : '> 20 min',
      coveragePct: schools.length > 0 ? 92 : 45,
      description: 'Colegios de primaria y secundaria, guardería infantil comunitaria y biblioteca popular.'
    },
    {
      category: 'Comercio Local y Abastecimiento',
      icon: ShoppingBag,
      color: 'text-fuchsia-400',
      bgColor: 'bg-fuchsia-500/10 border-fuchsia-500/30',
      count: markets.length,
      avgWalkTime: markets.length > 0 ? '4 - 7 min' : '15 min',
      coveragePct: markets.length > 0 ? 90 : 50,
      description: 'Mercados de proximidad, cooperativas de alimentos frescos y talleres de empleo local.'
    },
    {
      category: 'Transporte Público Masivo',
      icon: Bus,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10 border-violet-500/30',
      count: transitStops.length,
      avgWalkTime: transitStops.length > 0 ? '4 - 8 min' : '18 min',
      coveragePct: transitStops.length > 0 ? 94 : 40,
      description: 'Estaciones de Metro / Metrocable / Cablebús y paradas de rutas alimentadoras integradas.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Bento Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner">
              <Footprints className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Módulo de Servicios y Accesibilidad de Proximidad (Ciudad de 15 Minutos)
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Isochrone GIS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Análisis de red peatonal y tiempos de caminata a equipamientos esenciales calculados sobre OpenStreetMap
              </p>
            </div>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-right shadow-inner">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-widest">Cobertura Integral 15 Min</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {kpis.services15MinCoverage}%
            </span>
          </div>
        </div>
      </div>

      {/* Services Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicesList.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-2.5 rounded-2xl border ${srv.bgColor}`}>
                      <Icon className={`w-5 h-5 ${srv.color}`} />
                    </span>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">{srv.category}</h3>
                      <span className="text-[11px] text-slate-400 font-medium">{srv.count} equipamientos activos</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-extrabold text-emerald-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {srv.avgWalkTime}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-medium">{srv.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-400">Población con acceso &lt; 10 min a pie:</span>
                  <span className="font-mono font-extrabold text-slate-200">{srv.coveragePct}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${srv.coveragePct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spatial Equity & Topographic Network Analysis */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Navigation className="w-4 h-4 text-sky-400" />
          Análisis de Isocronas de Red Peatonal y Equidad Espacial
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          En barrios de ladera, la distancia euclidiana en línea recta subestima el esfuerzo real. Nuestro algoritmo penaliza el tiempo de caminata según la pendiente topográfica ({city.topographyNotes}).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center shadow-inner space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Índice de Equidad Espacial</span>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono block">{kpis.spatialEquityScore}/100</span>
            <span className="text-[10px] text-slate-400 font-medium block">Distribución homogénea</span>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center shadow-inner space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Población &lt; 500m Servicios</span>
            <span className="text-3xl font-extrabold text-sky-400 font-mono block">
              {Math.round((kpis.services15MinCoverage * 0.88))}%
            </span>
            <span className="text-[10px] text-slate-400 font-medium block">Caminata de bajo impacto</span>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center shadow-inner space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Espacios Comunitarios</span>
            <span className="text-3xl font-extrabold text-amber-400 font-mono block">{communitySpaces.length}</span>
            <span className="text-[10px] text-slate-400 font-medium block">Casas de memoria / cuidados</span>
          </div>
        </div>
      </div>
    </div>
  );
};
