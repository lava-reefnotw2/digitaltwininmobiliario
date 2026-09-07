import React, { useState } from 'react';
import { 
  Database, 
  Globe2, 
  Layers, 
  Download, 
  FileJson, 
  FileSpreadsheet, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Server,
  UploadCloud,
  Share2
} from 'lucide-react';
import { PilotCity, Scenario, UrbanElement, Language } from '../types';

interface AdminAndDataHubProps {
  currentCity: PilotCity;
  scenarios: Record<string, Scenario>;
  onExportReport: (format: 'geojson' | 'csv' | 'json') => void;
  language: Language;
}

export const AdminAndDataHub: React.FC<AdminAndDataHubProps> = ({
  currentCity,
  scenarios,
  onExportReport,
  language
}) => {
  const [activeDataSource, setActiveDataSource] = useState<'osm' | 'ghsl' | 'worldpop' | 'unhabitat'>('ghsl');

  const dataSources = [
    {
      id: 'osm',
      name: 'OpenStreetMap (OSM Planet Vector)',
      provider: 'OSM Foundation',
      badge: 'Red Vial y Equipamientos',
      status: 'API Overpass Conectada',
      coverage: 'Global',
      description: 'Geometrías de red de calles, pasos peatonales, centros de salud, escuelas, mercados y paradas de transporte público.',
      valueCity: 'Red vial completa, aceras y 100% de equipamientos georreferenciados'
    },
    {
      id: 'ghsl-built',
      name: 'GHSL - Built-up Grid (GHS-BUILT-S/H)',
      provider: 'JRC European Commission',
      badge: 'Densidad y Altura',
      status: 'Activo / Sincronizado',
      coverage: 'Global (1975-2030)',
      description: 'Capa global de superficie construida, densidad neta y volumetría satelital de edificaciones a 10m y 100m de resolución.',
      valueCity: `${currentCity.ghslBuiltDensity}% de superficie sellada construida`
    },
    {
      id: 'ghsl-model',
      name: 'Global Human Settlement Layer - Settlement Model (GHS-SMOD)',
      provider: 'JRC European Commission',
      badge: 'Clasificación Urbano/Rural',
      status: 'Activo / Sincronizado',
      coverage: 'Global',
      description: 'Tipificación jerárquica del grado de urbanización: centro urbano denso, clúster urbano y áreas periurbanas de ladera.',
      valueCity: currentCity.ghslSettlementClass
    },
    {
      id: 'worldpop',
      name: 'WorldPop High-Resolution Population Density',
      provider: 'University of Southampton',
      badge: 'Demografía Espacial 100m',
      status: 'Activo / Sincronizado',
      coverage: 'Global por país',
      description: 'Estimación espacializada de densidad demográfica, pirámide de edad y distribución poblacional por hectárea.',
      valueCity: `${currentCity.worldPopDensity.toLocaleString()} hab/km² estimados`
    },
    {
      id: 'oecd',
      name: 'OECD Metropolitan Database',
      provider: 'OECD',
      badge: 'Indicadores Metropolitanos',
      status: 'Activo / Conectado',
      coverage: 'Países OECD y socios',
      description: 'Estadísticas socioeconómicas normalizadas a nivel funcional urbano (FUA), PIB per cápita y empleo metropolitano.',
      valueCity: `${currentCity.oecdMetropolitanRegion} (PIB per cápita ~$${currentCity.oecdGdpPerCapitaUSD.toLocaleString()} USD)`
    },
    {
      id: 'unhabitat',
      name: 'UN-Habitat Urban Data Platform',
      provider: 'UN-Habitat',
      badge: 'Vivienda y Slums',
      status: 'Activo / Sincronizado',
      coverage: 'Global',
      description: 'Índice de déficit habitacional cualitativo, hacinamiento, seguridad de tenencia del suelo y acceso a servicios básicos (ODS 11).',
      valueCity: `Índice de déficit y vulnerabilidad: ${currentCity.unHabitatSlumIndex}/100`
    },
    {
      id: 'ess',
      name: 'European Social Survey (ESS) / Latinobarómetro',
      provider: 'ESS ERIC / Latinobarómetro',
      badge: 'Cohesión y Confianza',
      status: 'Activo / Rondas 2002-2022',
      coverage: 'Europa y Latinoamérica',
      description: 'Actitudes ciudadanas hacia la vivienda colectiva, confianza institucional, cohesión comunitaria y capital social barrial.',
      valueCity: `Índice de Confianza Comunitaria: ${currentCity.communityTrustScore}/10`
    },
    {
      id: 'perception-surveys',
      name: 'Encuesta de Percepción Ciudadana (DANE, INEGI, Idescat)',
      provider: 'Institutos Nacionales de Estadística',
      badge: 'Percepción Local',
      status: 'Microdatos Sincronizados',
      coverage: 'Nacional y Municipal',
      description: 'Satisfacción vecinal con servicios públicos de proximidad, percepción de seguridad en el espacio público y prioridades de co-diseño.',
      valueCity: `Fuente: ${currentCity.perceptionSurveySource}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Bento Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-inner">
              <Database className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Panel de Administración y Hub de Datos Globales
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Data Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Gestión de datasets satelitales globales (OpenStreetMap, GHSL, WorldPop, OECD, UN-Habitat, ESS, Encuestas Nacionales) y Centro de Exportación
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-export-geojson"
              onClick={() => onExportReport('geojson')}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar GeoJSON Completo</span>
            </button>
            <button
              id="admin-export-csv"
              onClick={() => onExportReport('csv')}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>CSV Métricas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Sources Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataSources.map((ds) => (
          <div
            key={ds.id}
            className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800/90 text-emerald-300 border border-slate-700">
                    {ds.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {ds.provider}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> {ds.status}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-white">{ds.name}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">{ds.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Dato para {currentCity.neighborhood}:</span>
              <strong className="text-emerald-300 font-mono font-bold text-right">{ds.valueCity}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Pilot City Configuration & Metadata Bento Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-slate-400" />
          Parámetros de Calibración de la Ciudad Piloto ({currentCity.name})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-inner">
            <span className="text-slate-400 text-xs font-semibold block mb-1">Superficie Polígono</span>
            <span className="text-xl font-extrabold font-mono text-white">{currentCity.areaHectares} ha</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-inner">
            <span className="text-slate-400 text-xs font-semibold block mb-1">Población Censal Base</span>
            <span className="text-xl font-extrabold font-mono text-emerald-400">
              {currentCity.initialPopulation.toLocaleString()} hab
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-inner">
            <span className="text-slate-400 text-xs font-semibold block mb-1">Déficit Hábitat ONU</span>
            <span className="text-xl font-extrabold font-mono text-amber-400">
              {currentCity.unHabitatSlumIndex}/100
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-inner">
            <span className="text-slate-400 text-xs font-semibold block mb-1">Moneda Local</span>
            <span className="text-xl font-extrabold font-mono text-sky-400">
              {currentCity.defaultCurrency} ({currentCity.currencySymbol})
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-400 font-medium shadow-inner">
          <strong className="text-slate-200 font-bold">Condiciones Topográficas y Retos GIS:</strong> {currentCity.topographyNotes}
        </div>
      </div>
    </div>
  );
};
