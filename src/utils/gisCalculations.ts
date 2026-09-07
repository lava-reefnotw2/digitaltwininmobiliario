import { UrbanElement, ScenarioKPIs, AHPMatrix } from '../types';

export function calculateScenarioKPIs(
  elements: UrbanElement[],
  areaHectares: number,
  baselinePopulation: number
): ScenarioKPIs {
  let totalHousingUnits = 0;
  let populationHoused = 0;
  let totalGreenArea = 0;
  let totalServicesFootprint = 0;
  let totalInvestmentUSD = 0;
  let weightedSolar = 0;
  let weightedVentilation = 0;
  let totalBuiltFootprint = 0;
  let transitCount = 0;
  let healthcareCount = 0;
  let educationCount = 0;
  let communitySpaceCount = 0;

  elements.forEach((el) => {
    totalInvestmentUSD += el.costEstimateUSD;

    if (el.type === 'vivienda_social' || el.type === 'vivienda_incremental') {
      totalHousingUnits += el.unitsCount;
      populationHoused += el.populationCapacity;
      totalBuiltFootprint += el.footprintArea;

      // Solar & ventilation weights
      weightedSolar += el.solarOrientation * el.unitsCount;
      weightedVentilation += el.ventilationScore * el.unitsCount;
    } else if (el.type === 'parque_verde') {
      totalGreenArea += el.footprintArea;
    } else if (el.type === 'centro_salud') {
      healthcareCount++;
      totalServicesFootprint += el.footprintArea;
    } else if (el.type === 'escuela') {
      educationCount++;
      totalServicesFootprint += el.footprintArea;
    } else if (el.type === 'parada_transporte') {
      transitCount++;
    } else if (el.type === 'espacio_comunitario') {
      communitySpaceCount++;
    }
  });

  const totalPop = baselinePopulation + populationHoused;
  const densityHabHa = Math.round(totalPop / (areaHectares || 1));
  const greenSpacePerCapita = totalPop > 0 ? parseFloat((totalGreenArea / (totalPop * 0.4)).toFixed(2)) : 0; // m²/hab

  // Solar comfort index (optimal orientation between 135° and 225° or South/North in hemisphere)
  const avgSolarAngle = totalHousingUnits > 0 ? weightedSolar / totalHousingUnits : 180;
  // Deviation from optimal 180° (South)
  const solarDeviation = Math.abs(avgSolarAngle - 180);
  const solarComfortIndex = Math.max(40, Math.min(98, Math.round(100 - (solarDeviation / 180) * 55)));

  const crossVentilationIndex = totalHousingUnits > 0 
    ? Math.round(weightedVentilation / totalHousingUnits) 
    : 75;

  // 15 min city coverage calculation (% based on mix of education, health, transit, green space)
  const serviceBalance = Math.min(1, (healthcareCount * 0.3 + educationCount * 0.3 + communitySpaceCount * 0.2 + (totalGreenArea > 1000 ? 0.2 : 0.1)));
  const services15MinCoverage = Math.min(96, Math.max(35, Math.round(serviceBalance * 92 + (transitCount > 0 ? 8 : 0))));

  // Transit score
  const transitAccessibilityScore = Math.min(98, Math.max(30, 45 + transitCount * 22));

  // Heat island reduction (°C) based on green space density and tree cover
  const greenRatio = totalGreenArea / (areaHectares * 10000);
  const heatIslandReductionC = parseFloat((Math.min(3.8, greenRatio * 18 + 0.4)).toFixed(1));

  // Spatial equity score
  const spatialEquityScore = Math.min(98, Math.round((services15MinCoverage * 0.4) + (transitAccessibilityScore * 0.3) + Math.min(100, (greenSpacePerCapita / 10) * 100) * 0.3));

  // Environmental sustainability score
  const environmentalSustainabilityScore = Math.min(98, Math.round((solarComfortIndex * 0.3) + (crossVentilationIndex * 0.25) + Math.min(100, (greenSpacePerCapita / 12) * 100) * 0.45));

  // Quality of life score
  const qualityOfLifeScore = Math.min(98, Math.round((spatialEquityScore * 0.35) + (environmentalSustainabilityScore * 0.35) + (communitySpaceCount > 0 ? 18 : 5) + (totalHousingUnits > 0 ? 12 : 0)));

  return {
    totalHousingUnits,
    populationHoused,
    densityHabHa,
    greenSpacePerCapita,
    services15MinCoverage,
    transitAccessibilityScore,
    solarComfortIndex,
    crossVentilationIndex,
    heatIslandReductionC,
    estimatedInvestmentUSD: totalInvestmentUSD,
    spatialEquityScore,
    environmentalSustainabilityScore,
    qualityOfLifeScore
  };
}

// Haversine Distance in meters
export function calculateDistanceMeters(coord1: [number, number], coord2: [number, number]): number {
  const R = 6371e3; // Earth radius in meters
  const lat1 = (coord1[1] * Math.PI) / 180;
  const lat2 = (coord2[1] * Math.PI) / 180;
  const deltaLat = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const deltaLng = ((coord2[0] - coord1[0]) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Walking time in minutes with 4.5 km/h speed + slope penalty
export function calculateWalkingMinutes(meters: number, slopePenaltyFactor: number = 1.15): number {
  const speedMetersPerMinute = 75; // 4.5 km/h = 75 m/min
  return Math.max(1, Math.round((meters / speedMetersPerMinute) * slopePenaltyFactor));
}

// AHP (Analytic Hierarchy Process) Solver
const RANDOM_INDEX_TABLE = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

export function solveAHPMatrix(criteria: string[], matrix: number[][]): AHPMatrix {
  const n = criteria.length;
  if (n === 0 || matrix.length !== n) {
    return {
      criteria,
      matrix,
      weights: [],
      consistencyIndex: 0,
      consistencyRatio: 0,
      isConsistent: true
    };
  }

  // 1. Column sums
  const colSums: number[] = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      colSums[j] += matrix[i][j];
    }
  }

  // 2. Normalized matrix & Row averages (Weights)
  const weights: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let rowSum = 0;
    for (let j = 0; j < n; j++) {
      rowSum += matrix[i][j] / (colSums[j] || 1);
    }
    weights[i] = parseFloat((rowSum / n).toFixed(4));
  }

  // 3. Estimate lambda max
  let lambdaMax = 0;
  for (let j = 0; j < n; j++) {
    lambdaMax += colSums[j] * weights[j];
  }

  // 4. Consistency Index CI and Consistency Ratio CR
  const CI = n > 1 ? (lambdaMax - n) / (n - 1) : 0;
  const RI = n <= 10 ? RANDOM_INDEX_TABLE[n] : 1.5;
  const CR = RI > 0 ? CI / RI : 0;

  return {
    criteria,
    matrix,
    weights,
    consistencyIndex: parseFloat(CI.toFixed(4)),
    consistencyRatio: parseFloat(CR.toFixed(4)),
    isConsistent: CR < 0.10
  };
}
