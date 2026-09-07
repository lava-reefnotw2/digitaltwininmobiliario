export type UserRole = 'residente' | 'facilitador' | 'administrador';
export type Language = 'es' | 'en' | 'pt';
export type ThemeMode = 'dark' | 'light';

export type PilotCityId = 'lima' | 'arequipa' | 'trujillo';

export interface PilotCity {
  id: PilotCityId;
  name: string;
  neighborhood: string;
  country: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  areaHectares: number;
  initialPopulation: number;
  ghslBuiltDensity: number; // m²/km² or %
  ghslSettlementClass: string; // GHSL Settlement Model (e.g. Dense Urban Centre L1)
  worldPopDensity: number; // hab/km²
  unHabitatSlumIndex: number; // 0-100 vulnerability
  oecdMetropolitanRegion: string; // OECD Metropolitan Database region
  oecdGdpPerCapitaUSD: number;
  perceptionSurveySource: string; // INEI / Encuestas de percepción
  communityTrustScore: number; // Latinobarómetro / Encuesta Nacional (0-10)
  description: string;
  topographyNotes: string;
  defaultCurrency: string;
  currencySymbol: string;
}

export type ScenarioType = 'base' | 'municipal' | 'comunitario' | 'hibrido' | 'custom_1' | 'custom_2' | 'custom_3';

export interface SavedProposalProfile {
  id: 'custom_1' | 'custom_2' | 'custom_3';
  slotNumber: 1 | 2 | 3;
  name: string;
  description: string;
  savedAt: string;
  cityId: PilotCityId;
  cityName: string;
  baseScenarioSource: ScenarioType;
  elements: UrbanElement[];
  isFilled: boolean;
}

export type UrbanElementType = 
  | 'vivienda_social' 
  | 'vivienda_incremental' 
  | 'parque_verde' 
  | 'escuela' 
  | 'centro_salud' 
  | 'parada_transporte' 
  | 'comercio_local'
  | 'espacio_comunitario'
  | 'pista_vial';

export interface UrbanElement {
  id: string;
  scenarioId: ScenarioType;
  type: UrbanElementType;
  name: string;
  coordinates: [number, number]; // [lng, lat] (first point or centroid)
  pathPoints?: [number, number][]; // Multi-point coordinates polyline for roads / pistas
  roadWidth?: number; // Road width in meters (e.g., 8m)
  footprintArea: number; // m² (or road surface area)
  floors: number; // number of floors
  heightMeters: number; // floors * 3m
  unitsCount: number; // for housing: apartments
  populationCapacity: number; // people accommodated / served
  solarOrientation: number; // 0-360 degrees
  ventilationScore: number; // 0-100 score
  costEstimateUSD: number;
  status: 'existente' | 'propuesto' | 'aprobado' | 'en_debate';
  createdBy?: string;
  notes?: string;
}

export interface Scenario {
  id: ScenarioType;
  name: string;
  shortDesc: string;
  author: string;
  updatedAt: string;
  elements: UrbanElement[];
  kpis: ScenarioKPIs;
}

export interface ScenarioKPIs {
  totalHousingUnits: number;
  populationHoused: number;
  densityHabHa: number;
  greenSpacePerCapita: number; // m²/hab (WHO ideal: 9-15)
  services15MinCoverage: number; // % of pop within 15 min walk
  transitAccessibilityScore: number; // 0-100
  solarComfortIndex: number; // 0-100%
  crossVentilationIndex: number; // 0-100%
  heatIslandReductionC: number; // °C cooling
  estimatedInvestmentUSD: number;
  spatialEquityScore: number; // 0-100
  environmentalSustainabilityScore: number; // 0-100
  qualityOfLifeScore: number; // 0-100
}

export interface ForumComment {
  id: string;
  author: string;
  role: UserRole;
  content: string;
  timestamp: string;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: string;
  role: UserRole;
  coordinates: [number, number]; // [lng, lat]
  category: 'vivienda' | 'espacio_publico' | 'movilidad' | 'servicios' | 'seguridad' | 'medio_ambiente';
  sentiment: 'propuesta' | 'preocupacion' | 'oportunidad';
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  comments: ForumComment[];
  timestamp: string;
  relatedScenario?: ScenarioType;
}

export interface BudgetVoteAllocation {
  vivienda: number;
  areas_verdes: number;
  salud_cuidados: number;
  educacion_cultura: number;
  movilidad: number;
  empleo_comercio: number;
}

export interface AHPMatrix {
  criteria: string[];
  matrix: number[][];
  weights: number[];
  consistencyIndex: number;
  consistencyRatio: number;
  isConsistent: boolean;
}

export interface GISLayerState {
  osmBuildings: boolean;
  osmRoads: boolean;
  ghslBuiltGrid: boolean;
  worldPopGrid: boolean;
  unHabitatVulnerability: boolean;
  isochroneWalkBuffers: boolean;
  treeCanopyLayer: boolean;
  volumetric3D: boolean;
  shadowSim: boolean;
  wireframeMode: boolean;
}

export interface ScaffoldingCodeFile {
  path: string;
  name: string;
  category: 'django_models' | 'rest_api' | 'qgis_engine' | 'gis_routing' | 'docker_deploy' | 'spatial_migrations';
  language: 'python' | 'dockerfile' | 'yaml' | 'sql' | 'nginx';
  description: string;
  content: string;
}
