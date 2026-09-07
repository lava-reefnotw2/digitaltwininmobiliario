import { PilotCity } from '../types';

export const PILOT_CITIES: PilotCity[] = [
  {
    id: 'lima',
    name: 'Lima (San Juan de Lurigancho - Quebrada Huáscar)',
    neighborhood: 'Quebrada Huáscar / Lomas de Mangomarca',
    country: 'Perú',
    center: [-76.9935, -11.9860],
    zoom: 16.4,
    areaHectares: 52.0,
    initialPopulation: 16800,
    ghslBuiltDensity: 81.2, // %
    ghslSettlementClass: 'GHSL L1 - Asentamiento Humano de Ladera Árida',
    worldPopDensity: 32300, // hab/km²
    unHabitatSlumIndex: 48.5, // medium-high vulnerability
    oecdMetropolitanRegion: 'Área Metropolitana de Lima y Callao (OECD Reg. PE01)',
    oecdGdpPerCapitaUSD: 12400,
    perceptionSurveySource: 'INEI (ENAHO / Censo Nacional) + Lima Cómo Vamos',
    communityTrustScore: 6.7, // 0-10
    description: 'Asentamiento urbano en ladera árida del distrito más poblado del Perú. Cuenta con escaleras barriales solidarias, proyectos de teleférico norte y programas integrales de contención de laderas, pistas y saneamiento.',
    topographyNotes: 'Pendiente media 28-36%. Suelo rocoso árido desértico, retos de estabilización de pircas, escorrentía en garúa, accesibilidad peatonal y pavimentación de corredores viales.',
    defaultCurrency: 'PEN',
    currencySymbol: 'S/.'
  },
  {
    id: 'arequipa',
    name: 'Arequipa (Cerro Colorado - Quebrada Añashuayco)',
    neighborhood: 'Cono Norte (Ciudad Municipal / Sor Ana de los Ángeles)',
    country: 'Perú',
    center: [-71.5840, -16.3260],
    zoom: 16.2,
    areaHectares: 44.0,
    initialPopulation: 12600,
    ghslBuiltDensity: 68.5,
    ghslSettlementClass: 'GHSL L1 - Expansión Urbana Volcánica Andina',
    worldPopDensity: 28600,
    unHabitatSlumIndex: 38.2,
    oecdMetropolitanRegion: 'Área Metropolitana de Arequipa (OECD Reg. PE02)',
    oecdGdpPerCapitaUSD: 14200,
    perceptionSurveySource: 'INEI + Arequipa Te Queremos Limpia y Sostenible',
    communityTrustScore: 7.1, // 0-10
    description: 'Zona de expansión periurbana en laderas volcánicas andinas con construcciones progresivas de sillar y concreto, conectada con el Sistema Integrado de Transportes (SIT).',
    topographyNotes: 'Terreno de ladera volcánica y quebradas secas (torrenteras). Retos de drenaje pluvial, mitigación de huaicos y conexión vial interbarrial.',
    defaultCurrency: 'PEN',
    currencySymbol: 'S/.'
  },
  {
    id: 'trujillo',
    name: 'Trujillo (Alto Trujillo - Sector Las Lomas)',
    neighborhood: 'Alto Trujillo / Barrio 1 - Florencia de Mora',
    country: 'Perú',
    center: [-79.0068, -8.0814],
    zoom: 16.0,
    areaHectares: 58.0,
    initialPopulation: 19500,
    ghslBuiltDensity: 76.0,
    ghslSettlementClass: 'GHSL L1 - Asentamiento Urbano Costero Consolidado',
    worldPopDensity: 33600,
    unHabitatSlumIndex: 45.8,
    oecdMetropolitanRegion: 'Área Metropolitana de Trujillo (OECD Reg. PE03)',
    oecdGdpPerCapitaUSD: 11800,
    perceptionSurveySource: 'INEI + Observatorio Urbano Trujillo',
    communityTrustScore: 6.5, // 0-10
    description: 'Asentamiento consolidado sobre planicie arenosa desértica costera. Retos de pavimentación de vías y pistas, arborización con especies nativas y redes de agua potable y equipamiento público.',
    topographyNotes: 'Terreno de planicie con relieve plano (llanura aluvial costera y terrazas áridas). Retos de estabilización de arena y corredores de transporte.',
    defaultCurrency: 'PEN',
    currencySymbol: 'S/.'
  }
];
