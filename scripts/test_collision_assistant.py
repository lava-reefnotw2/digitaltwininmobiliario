import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.data_manager import DataManager
from core.copilot_engine import UrbanCopilotEngine
from core.spatial_planner import find_optimal_collision_free_location

dm = DataManager()
copilot = UrbanCopilotEngine(dm)

print("--- 1. Testing Collision Avoidance across all Pilot Cities ---")
for city_id in ['lima', 'arequipa', 'trujillo']:
    city = dm.get_city(city_id)
    elems = dm.get_elements(city_id, 'base')
    for el_type in ['centro_salud', 'parque_verde', 'vivienda_social', 'escuela', 'parada_transporte']:
        res = find_optimal_collision_free_location(el_type, elems, city)
        m = res['metrics']
        el = res['element']
        road_clear = m['dist_road'] - m['min_safe_road_dist']
        bldg_clear = m['dist_bldg'] - m['min_safe_bldg_dist']
        assert road_clear >= 0, f"Collision with road in {city_id} {el_type}"
        assert bldg_clear >= 0, f"Collision with bldg in {city_id} {el_type}"
        print(f"City: {city_id:8} | Type: {el_type:18} | Road Margin: +{road_clear:4.1f}m | Bldg Margin: +{bldg_clear:4.1f}m | Slope: {m['slope']:4.1f}%")

print("\n--- 2. Testing Natural Language Placement Prompts ---")
test_prompts = [
    ("coloca una posta de salud cerca a las viviendas", "centro_salud"),
    ("agrega un parque bioclimático con andenes", "parque_verde"),
    ("ubica viviendas sociales para familias reasentadas", "vivienda_social"),
    ("construye un módulo educativo inicial", "escuela"),
    ("instala una parada de transporte masivo", "parada_transporte")
]

elems_lima = dm.get_elements('lima', 'base')
for prompt, expected_type in test_prompts:
    resp = copilot.ask_copilot(prompt, 'lima', 'base', {'services15MinCoverage': 60, 'greenSpacePerCapita': 4.2, 'solarComfortIndex': 78}, elems_lima)
    placed = resp.get('placed_element')
    assert placed is not None, f"Failed to place element for prompt: {prompt}"
    assert placed['type'] == expected_type, f"Expected {expected_type}, got {placed['type']}"
    m = resp['metrics']
    print(f"Prompt: '{prompt}' -> Placed: '{placed['name']}' at [{m['coords'][0]:.5f}, {m['coords'][1]:.5f}] | Road dist: {m['dist_road']}m (min {m['min_safe_road_dist']}m)")

print("\n[SUCCESS] ALL SPATIAL COLLISION AND ASSISTANT PLACEMENT TESTS PASSED 100%!")
