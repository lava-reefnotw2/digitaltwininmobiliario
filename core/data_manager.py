import json
import os
from typing import Dict, List, Any, Optional

DATA_JSON_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data_json')

def load_json(filename: str, default: Any = None) -> Any:
    filepath = os.path.join(DATA_JSON_DIR, filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading {filename}: {e}")
    return default if default is not None else {}

class DataManager:
    """Manages all urban scenarios, pilot cities, and citizen participation data."""
    def __init__(self):
        self.pilot_cities: List[Dict[str, Any]] = load_json('pilot_cities.json', [])
        self.city_elements: Dict[str, Dict[str, List[Dict[str, Any]]]] = load_json('city_elements.json', {})
        self.scenarios_meta: Dict[str, Dict[str, str]] = load_json('scenarios_meta.json', {})
        self.forum_threads: List[Dict[str, Any]] = load_json('forum_threads.json', [])
        self.budget_allocation: Dict[str, int] = load_json('budget_allocation.json', {
            "vivienda_social": 30,
            "espacio_publico": 25,
            "infraestructura_vial": 20,
            "equipamiento_servicios": 25
        })
        self.urban_knowledge_base: List[Dict[str, Any]] = load_json('urban_knowledge_base.json', [])
        self.preset_langflow_flows: List[Dict[str, Any]] = load_json('preset_langflow_flows.json', [])
        self.ahp_criteria: List[Dict[str, str]] = load_json('ahp_criteria.json', [])
        self.ahp_matrix: List[List[float]] = load_json('ahp_matrix.json', [])

        # Default custom proposal profiles (up to 3 slots)
        self.default_saved_profiles = [
            {
                "id": "custom_1",
                "slotNumber": 1,
                "name": "Propuesta Personalizada 1",
                "description": "Perfil 1 de co-diseño con cambios en equipamiento, pistas y vivienda.",
                "savedAt": "Pendiente de guardar",
                "cityId": "lima",
                "cityName": "Lima",
                "baseScenarioSource": "base",
                "elements": [],
                "isFilled": False
            },
            {
                "id": "custom_2",
                "slotNumber": 2,
                "name": "Propuesta Personalizada 2",
                "description": "Perfil 2 de co-diseño con cambios en equipamiento, pistas y vivienda.",
                "savedAt": "Pendiente de guardar",
                "cityId": "lima",
                "cityName": "Lima",
                "baseScenarioSource": "base",
                "elements": [],
                "isFilled": False
            },
            {
                "id": "custom_3",
                "slotNumber": 3,
                "name": "Propuesta Personalizada 3",
                "description": "Perfil 3 de co-diseño con cambios en equipamiento, pistas y vivienda.",
                "savedAt": "Pendiente de guardar",
                "cityId": "lima",
                "cityName": "Lima",
                "baseScenarioSource": "base",
                "elements": [],
                "isFilled": False
            }
        ]

    def get_city(self, city_id: str) -> Optional[Dict[str, Any]]:
        for c in self.pilot_cities:
            if c.get('id') == city_id:
                return c
        return self.pilot_cities[0] if self.pilot_cities else None

    def get_elements(self, city_id: str, scenario_id: str) -> List[Dict[str, Any]]:
        city_dict = self.city_elements.get(city_id, {})
        return city_dict.get(scenario_id, [])

    def save_custom_profile(self, slot_id: str, name: str, description: str, city_id: str, elements: List[Dict[str, Any]], saved_profiles: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        import datetime
        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        city = self.get_city(city_id)
        city_name = city.get('name', city_id) if city else city_id

        updated = []
        for p in saved_profiles:
            if p.get('id') == slot_id:
                updated.append({
                    **p,
                    "name": name,
                    "description": description,
                    "savedAt": now_str,
                    "cityId": city_id,
                    "cityName": city_name,
                    "elements": list(elements),
                    "isFilled": True
                })
            else:
                updated.append(p)
        return updated
