import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import pandas as pd
from core.ai_ml_models import LOCAL_AI_ENGINE, load_official_real_dataset

def main():
    print("1. Loading Real Urban Dataset for Peru...")
    df = load_official_real_dataset()
    print(f"Loaded dataset: {len(df)} rows, {len(df.columns)} columns.")
    print(f"Columns: {list(df.columns)}")
    assert len(df) > 0

    print("\n2. Training AI Engine with Real Dataset (Regression on 'valor_suelo_usd_m2')...")
    features = [
        'area_lote_m2',
        'densidad_hab_ha',
        'distancia_via_principal_m',
        'distancia_salud_m',
        'pendiente_terreno_pct',
        'indice_vulnerabilidad_cenepred'
    ]
    target = 'valor_suelo_usd_m2'

    metrics = LOCAL_AI_ENGINE.train_on_custom_dataset(
        df=df,
        features=features,
        target_col=target,
        model_type='random_forest',
        n_estimators=60,
        max_depth=8,
        use_kfold=True
    )

    print(f"Regression Trained: R2 = {metrics['avg_r2']}, RMSE = {metrics['avg_rmse']}, MAE = {metrics['avg_mae']}")
    print(f"Top Features: {[f['name'] for f in metrics['feature_importance'][:3]]}")
    assert metrics['avg_r2'] is not None

    print("\n3. Testing In-Process Prediction with real feature inputs...")
    sample_block = {
        'area_lote_m2': 150.0,
        'densidad_hab_ha': 320.0,
        'distancia_via_principal_m': 100.0,
        'distancia_salud_m': 400.0,
        'pendiente_terreno_pct': 14.0,
        'indice_vulnerabilidad_cenepred': 38.0
    }
    pred = LOCAL_AI_ENGINE.predict_in_process(sample_block)
    print(f"Prediction: Estimated {target} = ${pred['predicted_value_usd_m2']}/m2, Risk = {pred['risk_level']}")
    assert pred['predicted_value_usd_m2'] > 0

    print("\n4. Testing Real Dataset Training with XGBoost (if available)...")
    try:
        xgb_metrics = LOCAL_AI_ENGINE.train_on_custom_dataset(
            df=df,
            features=features,
            target_col=target,
            model_type='xgboost',
            n_estimators=40,
            max_depth=6,
            use_kfold=False
        )
        print(f"XGBoost Trained: R2 = {xgb_metrics['avg_r2']}, RMSE = {xgb_metrics['avg_rmse']}")
    except Exception as e:
        print(f"XGBoost note: {e}")

    print("\n✅ REAL DATASET AI TRAINING TEST COMPLETED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
