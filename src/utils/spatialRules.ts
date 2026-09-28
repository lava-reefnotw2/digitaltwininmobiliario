import { UrbanElementType, UrbanElement } from '../types';

export interface TerrainContext {
  /** Retorna la elevación en metros para una coordenada dada (X, Y) */
  getElevation: (x: number, y: number) => number;
  /** Retorna la pendiente en porcentaje (0 a 100+) para una coordenada dada */
  getSlope: (x: number, y: number) => number;
}

export interface PlacementValidationResult {
  isValid: boolean;
  reason: string | null;
  suggestedZ: number;
  suggestedRotation: number;
}

/**
 * Motor de Reglas Espaciales (Spatial Placement Rules)
 * Basado en principios de diseño urbano y topografía.
 */
export function validatePlacement(
  type: UrbanElementType,
  x: number,
  y: number,
  terrain: TerrainContext,
  existingElements: UrbanElement[]
): PlacementValidationResult {
  // 1. REGLAS DE TOPOGRAFÍA Y ANCLAJE (Z-Axis & Slope)
  const z = terrain.getElevation(x, y);
  const slope = terrain.getSlope(x, y);

  // Validación de pendientes
  if (type === 'pista_corredor') {
    if (slope > 12) return invalid(z, `Pendiente demasiado pronunciada (${slope.toFixed(1)}%) para una vía. Máximo 12%.`);
  } else if (['vivienda_social', 'escuela', 'centro_salud'].includes(type)) {
    if (slope >= 5) return invalid(z, `Terreno irregular (${slope.toFixed(1)}%). Este equipamiento requiere terreno plano (< 5%).`);
  } else if (type === 'vivienda_incremental') {
    // Permitido en pendientes
  }

  // 2. REGLAS DE ADYACENCIA Y CONECTIVIDAD VIAL
  const roads = existingElements.filter(e => e.type === 'pista_corredor');
  let closestRoadDistance = Infinity;
  let closestRoad: UrbanElement | null = null;

  roads.forEach(road => {
    const dist = Math.hypot(road.coordinates.x - x, road.coordinates.y - y);
    if (dist < closestRoadDistance) {
      closestRoadDistance = dist;
      closestRoad = road;
    }
  });

  const requiresRoad = ['vivienda_social', 'vivienda_incremental', 'escuela', 'centro_salud', 'casa_comunitaria', 'cooperativa_taller'].includes(type);
  if (requiresRoad && closestRoadDistance > 5) {
    return invalid(z, `Muy lejos de una vía (${closestRoadDistance.toFixed(1)}m). Debe estar a menos de 5m.`);
  }

  // Orientación de Fachada (Yaw) hacia la pista más cercana
  let suggestedRotation = 0;
  if (requiresRoad && closestRoad) {
    suggestedRotation = Math.atan2(closestRoad.coordinates.y - y, closestRoad.coordinates.x - x) * (180 / Math.PI);
  }

  // 3. REGLAS DE ZONIFICACIÓN Y AGRUPACIÓN
  if (type === 'escuela' || type === 'centro_salud') {
    const stations = existingElements.filter(e => e.type === 'estacion_transporte');
    const hasStationNearby = stations.some(st => Math.hypot(st.coordinates.x - x, st.coordinates.y - y) <= 50);
    if (!hasStationNearby) {
      return invalid(z, `Un núcleo de servicio debe tener una Estación de Transporte a menos de 50m.`);
    }
  }

  if (type === 'casa_comunitaria' || type === 'cooperativa_taller') {
    const parks = existingElements.filter(e => e.type === 'parque_huerto');
    const isNearPark = parks.some(p => Math.hypot(p.coordinates.x - x, p.coordinates.y - y) <= 20);
    // Para simplificar, asumimos que si está cerca a un parque es válido (frente al parque).
    if (!isNearPark) {
      return invalid(z, `Nodo comunitario debe estar frente a un Parque o Huerto (<20m).`);
    }
  }

  return {
    isValid: true,
    reason: null,
    suggestedZ: z, // Snap to terrain
    suggestedRotation
  };
}

function invalid(z: number, reason: string): PlacementValidationResult {
  return { isValid: false, reason, suggestedZ: z, suggestedRotation: 0 };
}

/**
 * Simula la evaluación de una intersección en T o Cruz (Network Check)
 */
export function checkRoadConnectivity(roadToPlace: {x: number, y: number}, existingRoads: UrbanElement[]): boolean {
  if (existingRoads.length === 0) return true; // Primer segmento
  const maxConnectionDist = 15; // metros de tolerancia para conectar nodos
  const isConnected = existingRoads.some(r => Math.hypot(r.coordinates.x - roadToPlace.x, r.coordinates.y - roadToPlace.y) <= maxConnectionDist);
  return isConnected;
}
