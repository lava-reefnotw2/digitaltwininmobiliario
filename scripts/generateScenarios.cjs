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

function getBaseDataForType(type) {
  switch (type) {
    case 'vivienda_incremental':
      return { footprintArea: 400, floors: 2, heightMeters: 6, unitsCount: 1, populationCapacity: 5, solarOrientation: 90, ventilationScore: 65, costEstimateUSD: 15000 };
    case 'vivienda_social':
      return { footprintArea: 1200, floors: 5, heightMeters: 15, unitsCount: 20, populationCapacity: 80, solarOrientation: 180, ventilationScore: 85, costEstimateUSD: 800000 };
    case 'parque_verde':
      return { footprintArea: 3500, floors: 1, heightMeters: 0, unitsCount: 0, populationCapacity: 800, solarOrientation: 180, ventilationScore: 100, costEstimateUSD: 45000 };
    case 'centro_salud':
      return { footprintArea: 2000, floors: 3, heightMeters: 10, unitsCount: 0, populationCapacity: 1500, solarOrientation: 90, ventilationScore: 85, costEstimateUSD: 2500000 };
    case 'escuela':
      return { footprintArea: 2500, floors: 3, heightMeters: 11, unitsCount: 0, populationCapacity: 600, solarOrientation: 180, ventilationScore: 88, costEstimateUSD: 1800000 };
    case 'comercio_local':
      return { footprintArea: 500, floors: 2, heightMeters: 7, unitsCount: 0, populationCapacity: 150, solarOrientation: 0, ventilationScore: 70, costEstimateUSD: 150000 };
    case 'parada_transporte':
      return { footprintArea: 300, floors: 1, heightMeters: 4, unitsCount: 0, populationCapacity: 3000, solarOrientation: 0, ventilationScore: 100, costEstimateUSD: 50000 };
    default:
      return { footprintArea: 400, floors: 1, heightMeters: 3, unitsCount: 0, populationCapacity: 0, solarOrientation: 0, ventilationScore: 50, costEstimateUSD: 10000 };
  }
}

function generateCityLayout(cityId, center, scenario, counts, spread) {
  const elems = [];
  
  // 1. Grid Definition
  const GRID_SIZE = 12; // 12x12 grid
  const cellSizeX = (spread * 2) / GRID_SIZE;
  const cellSizeY = (spread * 2) / GRID_SIZE;
  
  // Define road indices
  const roadRows = [2, 6, 10]; // horizontal roads
  const roadCols = [2, 6, 10]; // vertical roads
  
  // Generate horizontal roads
  for (let i = 0; i < roadRows.length; i++) {
    const r = roadRows[i];
    const y = center[1] - spread + r * cellSizeY + cellSizeY/2;
    const startX = center[0] - spread;
    const endX = center[0] + spread;
    
    elems.push({
      id: `${cityId}-${scenario}-road-h-${i}`,
      scenarioId: scenario,
      type: 'pista_vial',
      name: `Avenida Horizontal ${i + 1}`,
      coordinates: [center[0], y],
      pathPoints: [[startX, y], [endX, y]],
      roadWidth: 12,
      footprintArea: 4000,
      floors: 1,
      heightMeters: 0.15,
      unitsCount: 0,
      populationCapacity: 2000,
      solarOrientation: 0,
      ventilationScore: 90,
      costEstimateUSD: 300000,
      status: scenario === 'base' ? 'existente' : 'propuesto'
    });
  }
  
  // Generate vertical roads
  for (let i = 0; i < roadCols.length; i++) {
    const c = roadCols[i];
    const x = center[0] - spread + c * cellSizeX + cellSizeX/2;
    const startY = center[1] - spread;
    const endY = center[1] + spread;
    
    elems.push({
      id: `${cityId}-${scenario}-road-v-${i}`,
      scenarioId: scenario,
      type: 'pista_vial',
      name: `Avenida Vertical ${i + 1}`,
      coordinates: [x, center[1]],
      pathPoints: [[x, startY], [x, endY]],
      roadWidth: 12,
      footprintArea: 4000,
      floors: 1,
      heightMeters: 0.15,
      unitsCount: 0,
      populationCapacity: 2000,
      solarOrientation: 90, // rotate road visual representation
      ventilationScore: 90,
      costEstimateUSD: 300000,
      status: scenario === 'base' ? 'existente' : 'propuesto'
    });
  }
  
  // Collect available cells for buildings
  const availableCells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!roadRows.includes(r) && !roadCols.includes(c)) {
        availableCells.push({r, c});
      }
    }
  }
  
  // Shuffle available cells consistently
  availableCells.sort(() => Math.random() - 0.5);
  
  // Place buildings based on counts
  let cellIndex = 0;
  
  for (const [type, count] of Object.entries(counts)) {
    for (let i = 0; i < count; i++) {
      if (cellIndex >= availableCells.length) break; // grid full
      const cell = availableCells[cellIndex++];
      const cx = center[0] - spread + cell.c * cellSizeX + cellSizeX/2;
      const cy = center[1] - spread + cell.r * cellSizeY + cellSizeY/2;
      
      const baseData = getBaseDataForType(type);
      
      // Determine rotation based on nearest road
      // Find nearest road column or row to face it
      let distToH = Math.min(...roadRows.map(rr => Math.abs(rr - cell.r)));
      let distToV = Math.min(...roadCols.map(rc => Math.abs(rc - cell.c)));
      let orientation = distToH < distToV ? 0 : 90; // Face horizontal or vertical road

      elems.push({
        id: `${cityId}-${scenario}-${type}-${i}`,
        scenarioId: scenario,
        type,
        name: `${type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} ${i + 1}`,
        coordinates: [cx, cy],
        ...baseData,
        solarOrientation: orientation,
        status: scenario === 'base' ? 'existente' : (Math.random() > 0.3 ? 'propuesto' : 'existente')
      });
    }
  }
  
  return elems;
}

const cityElements = {};

for (const [cityId, center] of Object.entries(PILOT_CITIES)) {
  cityElements[cityId] = {};
  
  for (const sc of SCENARIOS) {
    const spread = 0.0035;
    
    // Base amount of items
    let counts = {
      vivienda_incremental: 12,
      vivienda_social: sc !== 'base' ? 3 : 0,
      parque_verde: 1,
      centro_salud: 0,
      escuela: 1,
      comercio_local: 2,
      parada_transporte: 1
    };
    
    if (sc === 'municipal') {
      counts.vivienda_incremental += 10;
      counts.vivienda_social += 2;
      counts.parque_verde += 2;
      counts.centro_salud += 1;
      counts.parada_transporte += 1;
    } else if (sc === 'comunitario') {
      counts.vivienda_incremental += 15;
      counts.vivienda_social += 3;
      counts.parque_verde += 4;
      counts.comercio_local += 3;
      counts.escuela += 1;
    } else if (sc === 'hibrido') {
      counts.vivienda_incremental += 18;
      counts.vivienda_social += 4;
      counts.parque_verde += 5;
      counts.centro_salud += 2;
      counts.escuela += 2;
      counts.comercio_local += 4;
      counts.parada_transporte += 2;
    } else if (sc.startsWith('custom')) {
      counts = {}; // custom scenarios start empty
    }
    
    cityElements[cityId][sc] = sc.startsWith('custom') ? [] : generateCityLayout(cityId, center, sc, counts, spread);
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

// Fix the path to correctly point to the src folder
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'initialScenarios.ts'), output);
console.log('Successfully generated initialScenarios.ts');
