const fs = require('fs');
const path = require('path');

const PILOT_CITIES = {
  lima: [-76.9935, -11.9860],
  arequipa: [-71.5840, -16.3260],
  trujillo: [-79.0068, -8.0814]
};

const SCENARIOS = ['base', 'municipal', 'comunitario', 'hibrido', 'custom_1', 'custom_2', 'custom_3'];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRoadNetwork(cityId, center, scenario, numRoads, spread) {
  const elements = [];
  for (let i = 0; i < numRoads; i++) {
    const startX = center[0] + randomRange(-spread, spread);
    const startY = center[1] + randomRange(-spread, spread);
    const points = [[startX, startY]];
    let currX = startX;
    let currY = startY;
    
    const numSegments = Math.floor(randomRange(2, 6));
    for (let j = 0; j < numSegments; j++) {
      currX += randomRange(-spread/3, spread/3);
      currY += randomRange(-spread/3, spread/3);
      points.push([currX, currY]);
    }
    
    elements.push({
      id: `${cityId}-${scenario}-road-${i}`,
      scenarioId: scenario,
      type: 'pista_vial',
      name: `Vía / Pista ${i + 1}`,
      coordinates: [startX, startY],
      pathPoints: points,
      roadWidth: Math.random() > 0.5 ? 8 : 12,
      footprintArea: 1000 * numSegments,
      floors: 1,
      heightMeters: 0.15,
      unitsCount: 0,
      populationCapacity: 2000,
      solarOrientation: 0,
      ventilationScore: 90,
      costEstimateUSD: 100000 * numSegments,
      status: scenario === 'base' ? 'existente' : 'propuesto'
    });
  }
  return elements;
}

function generateBuildings(cityId, center, scenario, type, count, spread, baseData) {
  const elements = [];
  for (let i = 0; i < count; i++) {
    const cx = center[0] + randomRange(-spread, spread);
    const cy = center[1] + randomRange(-spread, spread);
    
    elements.push({
      id: `${cityId}-${scenario}-${type}-${i}`,
      scenarioId: scenario,
      type,
      name: `${type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} ${i + 1}`,
      coordinates: [cx, cy],
      ...baseData,
      status: scenario === 'base' ? 'existente' : (Math.random() > 0.3 ? 'propuesto' : 'existente')
    });
  }
  return elements;
}

const cityElements = {};

for (const [cityId, center] of Object.entries(PILOT_CITIES)) {
  cityElements[cityId] = {};
  
  for (const sc of SCENARIOS) {
    let elems = [];
    const spread = 0.0035;
    
    // Base amount of items
    let numRoads = 3;
    let numHousing = 12;
    let numParks = 1;
    let numHealth = 0;
    let numSchool = 1;
    let numCommerce = 2;
    let numTransport = 1;
    
    if (sc === 'municipal') {
      numRoads += 2; numHousing += 10; numParks += 2; numHealth += 1; numTransport += 1;
    } else if (sc === 'comunitario') {
      numRoads += 1; numHousing += 15; numParks += 4; numCommerce += 3; numSchool += 1;
    } else if (sc === 'hibrido') {
      numRoads += 3; numHousing += 18; numParks += 5; numHealth += 2; numSchool += 2; numCommerce += 4; numTransport += 2;
    } else if (sc.startsWith('custom')) {
      numRoads = 0; numHousing = 0; numParks = 0; numHealth = 0; numSchool = 0; numCommerce = 0; numTransport = 0; // customs start empty
    }
    
    elems = elems.concat(generateRoadNetwork(cityId, center, sc, numRoads, spread));
    
    elems = elems.concat(generateBuildings(cityId, center, sc, 'vivienda_incremental', numHousing, spread, {
      footprintArea: 400, floors: 2, heightMeters: 6, unitsCount: 1, populationCapacity: 5, solarOrientation: Math.floor(randomRange(0, 360)), ventilationScore: 65, costEstimateUSD: 15000
    }));
    
    if (sc !== 'base') {
      elems = elems.concat(generateBuildings(cityId, center, sc, 'vivienda_social', Math.floor(numHousing / 4), spread, {
        footprintArea: 1200, floors: 5, heightMeters: 15, unitsCount: 20, populationCapacity: 80, solarOrientation: Math.floor(randomRange(0, 360)), ventilationScore: 85, costEstimateUSD: 800000
      }));
    }
    
    elems = elems.concat(generateBuildings(cityId, center, sc, 'parque_verde', numParks, spread, {
      footprintArea: 3500, floors: 1, heightMeters: 0, unitsCount: 0, populationCapacity: 800, solarOrientation: 180, ventilationScore: 100, costEstimateUSD: 45000
    }));
    
    elems = elems.concat(generateBuildings(cityId, center, sc, 'centro_salud', numHealth, spread, {
      footprintArea: 2000, floors: 3, heightMeters: 10, unitsCount: 0, populationCapacity: 1500, solarOrientation: 90, ventilationScore: 85, costEstimateUSD: 2500000
    }));
    
    elems = elems.concat(generateBuildings(cityId, center, sc, 'escuela', numSchool, spread, {
      footprintArea: 2500, floors: 3, heightMeters: 11, unitsCount: 0, populationCapacity: 600, solarOrientation: 180, ventilationScore: 88, costEstimateUSD: 1800000
    }));
    
    elems = elems.concat(generateBuildings(cityId, center, sc, 'comercio_local', numCommerce, spread, {
      footprintArea: 500, floors: 2, heightMeters: 7, unitsCount: 0, populationCapacity: 150, solarOrientation: Math.floor(randomRange(0, 360)), ventilationScore: 70, costEstimateUSD: 150000
    }));
    
    elems = elems.concat(generateBuildings(cityId, center, sc, 'parada_transporte', numTransport, spread, {
      footprintArea: 300, floors: 1, heightMeters: 4, unitsCount: 0, populationCapacity: 3000, solarOrientation: 0, ventilationScore: 100, costEstimateUSD: 50000
    }));
    
    cityElements[cityId][sc] = elems;
  }
}

// Generate the output string
const output = `import { ScenarioType, UrbanElement, ForumThread, BudgetVoteAllocation, PilotCityId } from '../types';

export const INITIAL_CITY_ELEMENTS: Record<PilotCityId, Record<string, UrbanElement[]>> = ${JSON.stringify(cityElements, null, 2)};

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'th-1',
    author: 'Junta Vecinal Lomas',
    role: 'comunidad',
    title: 'Ubicación del nuevo Parque y Huerto Urbano',
    content: 'Proponemos ubicar el gran parque en la zona norte donde el suelo es más estable. Además, ayuda a contener los deslizamientos y mejora la temperatura local.',
    timestamp: 'Hace 2 horas',
    votes: 42,
    comments: 12
  },
  {
    id: 'th-2',
    author: 'Urbanista Muni',
    role: 'municipalidad',
    title: 'Viabilidad de Vías Principales',
    content: 'Técnicamente necesitamos concentrar la inversión vial en el eje troncal para garantizar acceso al transporte masivo.',
    timestamp: 'Hace 5 horas',
    votes: 28,
    comments: 8
  },
  {
    id: 'th-3',
    author: 'Colectivo Ambiental',
    role: 'experto',
    title: 'Materialidad y Confort Térmico',
    content: 'Es clave usar arquitectura vernácula (sillar / tierra compactada) en lugar de tanto concreto para evitar la isla de calor.',
    timestamp: 'Ayer',
    votes: 35,
    comments: 5
  }
];

export const INITIAL_BUDGET_ALLOCATION: BudgetVoteAllocation = {
  vivienda_social: 30,
  espacio_publico: 25,
  infraestructura_vial: 20,
  equipamiento_servicios: 25
};

export const INITIAL_SCENARIOS_META: Record<ScenarioType, { name: string; shortDesc: string; author: string }> = {
  base: {
    name: '1. Base (Actual)',
    shortDesc: 'Situación original extraída de satélite GHSL y OSM.',
    author: 'AI Studio Data Hub'
  },
  municipal: {
    name: '2. Municipal',
    shortDesc: 'Enfoque técnico top-down priorizando densidad vial y vivienda.',
    author: 'Sec. Planificación'
  },
  comunitario: {
    name: '3. Comunitaria',
    shortDesc: 'Enfoque vecinal priorizando ecología, huertos y centros sociales.',
    author: 'Junta de Vecinos'
  },
  hibrido: {
    name: '4. Híbrido (Co-Diseño)',
    shortDesc: 'Resolución AHP óptima equilibrando rentabilidad y equidad espacial.',
    author: 'Algoritmo AHP/ELECTRE'
  },
  custom_1: {
    name: 'Perfil Propuesta 1',
    shortDesc: 'Propuesta personalizada de co-diseño.',
    author: 'Usuario'
  },
  custom_2: {
    name: 'Perfil Propuesta 2',
    shortDesc: 'Propuesta personalizada de co-diseño.',
    author: 'Usuario'
  },
  custom_3: {
    name: 'Perfil Propuesta 3',
    shortDesc: 'Propuesta personalizada de co-diseño.',
    author: 'Usuario'
  }
};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'initialScenarios.ts'), output);
console.log('Successfully generated initialScenarios.ts');
