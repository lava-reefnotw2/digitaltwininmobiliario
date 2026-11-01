import math
from typing import List, Dict, Any, Tuple

def calculate_distance_meters(coord1: Tuple[float, float], coord2: Tuple[float, float]) -> int:
    """Haversine Distance in meters between [lng, lat] coords."""
    R = 6371000.0  # Earth radius in meters
    lat1 = math.radians(coord1[1])
    lat2 = math.radians(coord2[1])
    delta_lat = math.radians(coord2[1] - coord1[1])
    delta_lng = math.radians(coord2[0] - coord1[0])

    a = (math.sin(delta_lat / 2.0) ** 2 +
         math.cos(lat1) * math.cos(lat2) * (math.sin(delta_lng / 2.0) ** 2))
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(max(0.0, 1.0 - a)))
    return int(round(R * c))

def calculate_walking_minutes(meters: float, slope_penalty_factor: float = 1.15) -> int:
    """Walking time in minutes at 4.5 km/h (75 m/min) plus slope penalty."""
    speed_meters_per_minute = 75.0
    return max(1, int(round((meters / speed_meters_per_minute) * slope_penalty_factor)))

def calculate_scenario_kpis(elements: List[Dict[str, Any]], area_hectares: float, baseline_population: int) -> Dict[str, Any]:
    """
    Computes all sustainability, housing and urban KPIs for a given set of elements.
    Ported directly from TypeScript gisCalculations.ts.
    """
    total_housing_units = 0
    population_housed = 0
    total_green_area = 0.0
    total_services_footprint = 0.0
    total_investment_usd = 0.0
    weighted_solar = 0.0
    weighted_ventilation = 0.0
    total_built_footprint = 0.0
    transit_count = 0
    healthcare_count = 0
    education_count = 0
    community_space_count = 0

    for el in elements:
        cost = float(el.get('costEstimateUSD', 0))
        total_investment_usd += cost
        el_type = el.get('type', '')
        footprint = float(el.get('footprintArea', 0))
        units = int(el.get('unitsCount', 0))
        capacity = int(el.get('populationCapacity', 0))
        solar = float(el.get('solarOrientation', 180))
        ventilation = float(el.get('ventilationScore', 75))

        if el_type in ('vivienda_social', 'vivienda_incremental'):
            total_housing_units += units
            population_housed += capacity
            total_built_footprint += footprint
            weighted_solar += solar * units
            weighted_ventilation += ventilation * units
        elif el_type == 'parque_verde':
            total_green_area += footprint
        elif el_type == 'centro_salud':
            healthcare_count += 1
            total_services_footprint += footprint
        elif el_type == 'escuela':
            education_count += 1
            total_services_footprint += footprint
        elif el_type == 'parada_transporte':
            transit_count += 1
        elif el_type == 'espacio_comunitario':
            community_space_count += 1

    total_pop = baseline_population + population_housed
    safe_area = max(0.1, float(area_hectares or 1.0))
    density_hab_ha = int(round(total_pop / safe_area))

    # Green space per capita (m²/hab)
    green_space_per_capita = round(total_green_area / (total_pop * 0.4), 2) if total_pop > 0 else 0.0

    # Solar comfort index (optimal orientation between 135° and 225° / South)
    avg_solar_angle = (weighted_solar / total_housing_units) if total_housing_units > 0 else 180.0
    solar_deviation = abs(avg_solar_angle - 180.0)
    solar_comfort_index = max(40, min(98, int(round(100.0 - (solar_deviation / 180.0) * 55.0))))

    # Ventilation index
    cross_ventilation_index = (int(round(weighted_ventilation / total_housing_units))
                              if total_housing_units > 0 else 75)

    # 15 min city coverage calculation (% based on mix of education, health, transit, green space)
    service_balance = min(1.0, (healthcare_count * 0.3 + education_count * 0.3 +
                               community_space_count * 0.2 + (0.2 if total_green_area > 1000 else 0.1)))
    services_15min_coverage = min(96, max(35, int(round(service_balance * 92.0 + (8 if transit_count > 0 else 0)))))

    # Transit accessibility score
    transit_accessibility_score = min(98, max(30, int(45 + transit_count * 22)))

    # Heat island reduction (°C)
    green_ratio = total_green_area / (safe_area * 10000.0)
    heat_island_reduction_c = round(min(3.8, green_ratio * 18.0 + 0.4), 1)

    # Spatial equity score
    spatial_equity_score = min(98, int(round(
        (services_15min_coverage * 0.4) +
        (transit_accessibility_score * 0.3) +
        min(100.0, (green_space_per_capita / 10.0) * 100.0) * 0.3
    )))

    # Environmental sustainability score
    environmental_sustainability_score = min(98, int(round(
        (solar_comfort_index * 0.3) +
        (cross_ventilation_index * 0.25) +
        min(100.0, (green_space_per_capita / 12.0) * 100.0) * 0.45
    )))

    # Quality of life score
    community_bonus = 18 if community_space_count > 0 else 5
    housing_bonus = 12 if total_housing_units > 0 else 0
    quality_of_life_score = min(98, int(round(
        (spatial_equity_score * 0.35) +
        (environmental_sustainability_score * 0.35) +
        community_bonus + housing_bonus
    )))

    return {
        "totalHousingUnits": total_housing_units,
        "populationHoused": population_housed,
        "densityHabHa": density_hab_ha,
        "greenSpacePerCapita": green_space_per_capita,
        "services15MinCoverage": services_15min_coverage,
        "transitAccessibilityScore": transit_accessibility_score,
        "solarComfortIndex": solar_comfort_index,
        "crossVentilationIndex": cross_ventilation_index,
        "heatIslandReductionC": heat_island_reduction_c,
        "estimatedInvestmentUSD": int(round(total_investment_usd)),
        "spatialEquityScore": spatial_equity_score,
        "environmentalSustainabilityScore": environmental_sustainability_score,
        "qualityOfLifeScore": quality_of_life_score
    }
