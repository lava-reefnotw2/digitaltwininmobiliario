import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from core.data_manager import DataManager
from core.gis_engine import calculate_scenario_kpis
from core.ahp_solver import solve_ahp_matrix
from core.ai_ml_models import LOCAL_AI_ENGINE
from core.copilot_engine import UrbanCopilotEngine

def main():
    print("1. Testing DataManager...")
    dm = DataManager()
    print(f"Loaded {len(dm.pilot_cities)} pilot cities.")
    assert len(dm.pilot_cities) >= 3

    print("2. Testing GIS Engine...")
    city = dm.get_city('lima')
    elements = dm.get_elements('lima', 'hibrido')
    kpis = calculate_scenario_kpis(elements, city['areaHectares'], city['initialPopulation'])
    print(f"KPIs for Lima Hibrido: 15m Coverage = {kpis['services15MinCoverage']}%, Units = {kpis['totalHousingUnits']}")
    assert kpis['services15MinCoverage'] > 0

    print("3. Testing AHP Solver...")
    criteria = [c['name'] for c in dm.ahp_criteria]
    ahp_res = solve_ahp_matrix(criteria, dm.ahp_matrix)
    print(f"AHP Consistency Ratio: {ahp_res['consistencyRatio']}, Consistent: {ahp_res['isConsistent']}")
    assert len(ahp_res['weights']) == len(criteria)

    print("4. Testing AI Engine (IN-PROCESS, NO FASTAPI)...")
    train_res = LOCAL_AI_ENGINE.train_model(city_id='lima', model_type='random_forest', n_estimators=50, max_depth=10)
    print(f"Trained Random Forest: R2 = {train_res['avg_r2']}, RMSE = {train_res['avg_rmse']}")
    assert train_res['avg_r2'] > 0.5

    # Direct in-process prediction
    sample_lot = {
        'densidad_habitacional': 320,
        'distancia_vias_principales_m': 200,
        'proximidad_salud_m': 600,
        'proximidad_educacion_m': 450,
        'pendiente_terreno_pct': 18.5,
        'indice_vulnerabilidad_unhabitat': 42.0,
        'area_verde_per_capita': 2.8,
        'radiacion_solar_kwh': 4.9
    }
    pred = LOCAL_AI_ENGINE.predict_in_process(sample_lot)
    print(f"Direct In-Process Prediction: Value = ${pred['predicted_value_usd_m2']}/m2, Viability = {pred['viability_score']}, Risk = {pred['risk_level']}")
    assert pred['predicted_value_usd_m2'] > 0

    print("5. Testing Urban Copilot RAG...")
    copilot = UrbanCopilotEngine(dm)
    ans = copilot.ask_copilot("salud y pendientes maximas", 'lima', 'hibrido', kpis)
    print(f"Copilot Response snippet: {ans['text'][:120]}...")
    assert len(ans['text']) > 50

    print("6. Testing Statistical Testing & Models Benchmark Module...")
    from core.statistical_testing import list_trained_models, evaluate_model_statistics, get_all_models_benchmark
    models = list_trained_models()
    print(f"Discovered {len(models)} trained models in storage.")
    assert len(models) >= 1
    sample_stat = evaluate_model_statistics(models[0])
    print(f"Evaluated Model: {sample_stat['model_name']} | R2: {sample_stat['r2']} | RMSE: {sample_stat['rmse']} | Normality: {sample_stat['test_normality']['status']}")
    assert 'r2' in sample_stat and 'test_normality' in sample_stat
    bench = get_all_models_benchmark()
    assert not bench.empty
    print(f"Cross-Model Benchmark contains {len(bench)} models.")

    print("\n✅ ALL TESTS PASSED SUCCESSFULLY! STACK MIGRATION & STATISTICAL TESTING ARE 100% OPERATIONAL.")

if __name__ == '__main__':
    main()
