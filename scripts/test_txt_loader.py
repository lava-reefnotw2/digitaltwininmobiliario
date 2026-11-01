import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
import pandas as pd
import io

# Test comma delimited TXT
txt_comma = """manzana_id,densidad_hab_ha,pendiente_pct,valor_m2
MZ-01,340,15.2,140
MZ-02,410,24.8,95
MZ-03,280,8.5,190
"""
df_comma = pd.read_csv(io.StringIO(txt_comma), sep=None, engine='python')
assert len(df_comma) == 3
assert list(df_comma.columns) == ['manzana_id', 'densidad_hab_ha', 'pendiente_pct', 'valor_m2']

# Test tab delimited TXT
txt_tab = """manzana_id\tdensidad_hab_ha\tpendiente_pct\tvalor_m2
MZ-01\t340\t15.2\t140
MZ-02\t410\t24.8\t95
MZ-03\t280\t8.5\t190
"""
df_tab = pd.read_csv(io.StringIO(txt_tab), sep=None, engine='python')
assert len(df_tab) == 3
assert list(df_tab.columns) == ['manzana_id', 'densidad_hab_ha', 'pendiente_pct', 'valor_m2']

# Test semicolon delimited TXT
txt_semi = """manzana_id;densidad_hab_ha;pendiente_pct;valor_m2
MZ-01;340;15.2;140
MZ-02;410;24.8;95
MZ-03;280;8.5;190
"""
df_semi = pd.read_csv(io.StringIO(txt_semi), sep=None, engine='python')
assert len(df_semi) == 3
assert list(df_semi.columns) == ['manzana_id', 'densidad_hab_ha', 'pendiente_pct', 'valor_m2']

print("✅ TXT reading with auto-delimiters verified successfully!")
