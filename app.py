import os
import streamlit as st

# Page setup (must be the first Streamlit command)
st.set_page_config(
    page_title="Gemelo Digital Comunitario — Vivienda Social y Hábitat Popular",
    page_icon="🏙️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Session State Initialization (Must be before styles and widgets)
if 'selected_city_id' not in st.session_state:
    st.session_state.selected_city_id = 'lima'

if 'active_scenario' not in st.session_state:
    st.session_state.active_scenario = 'hibrido'

if 'user_role' not in st.session_state:
    st.session_state.user_role = 'residente'

if 'theme_mode' not in st.session_state:
    st.session_state.theme_mode = 'dark'

if 'active_nav_tab' not in st.session_state:
    st.session_state.active_nav_tab = 'map'

# Navigation Modules Registry
NAV_MODULES = [
    ("map", "🗺️ Mapa & Relieve 3D", "Cartografía interactiva y relieve orográfico Three.js"),
    ("housing", "🏠 Vivienda Social", "Simulación de déficit habitacional y tipologías constructivas"),
    ("services", "🚶 Ciudad 15m", "Isócronas peatonales y servicios esenciales de proximidad"),
    ("deliberation", "🗳️ Participación", "Presupuesto participativo y asambleas vecinales"),
    ("evaluation", "⚖️ AHP Saaty", "Evaluación multicriterio y ranking comparativo de escenarios"),
    ("ai-engine", "🤖 Motor IA Local", "Entrenamiento local de ML con datasets reales CSV/TXT"),
    ("langflow", "🔀 Langflow Studio", "Agentes autónomos RAG y flujos de deliberación"),
    ("scaffolding", "🏛️ Data Hub SIG", "Exportación GeoJSON/CSV y andamiaje PostGIS")
]
NAV_KEYS = [m[0] for m in NAV_MODULES]
NAV_LABELS = {m[0]: m[1] for m in NAV_MODULES}
NAV_DESCS = {m[0]: m[2] for m in NAV_MODULES}

# Load CSS Styles
CSS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'custom_styles.css')
if os.path.exists(CSS_PATH):
    with open(CSS_PATH, 'r', encoding='utf-8') as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Dynamic Theme Engine (Complete Dark & Light Mode Support)
def inject_theme_styles(theme_mode: str):
    is_light = (theme_mode == 'light')
    if is_light:
        st.markdown("""
        <style>
        :root {
            --bg-primary: #f8fafc !important;
            --bg-secondary: #ffffff !important;
            --bg-card: #ffffff !important;
            --border-card: #e2e8f0 !important;
            --text-main: #0f172a !important;
            --text-muted: #475569 !important;
            --text-sub: #64748b !important;
            --glow-emerald: 0 4px 20px rgba(16, 185, 129, 0.15) !important;
        }
        html, body, .stApp {
            background: radial-gradient(circle at 15% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 45%),
                        radial-gradient(circle at 85% 25%, rgba(6, 182, 212, 0.05) 0%, transparent 45%),
                        #f8fafc !important;
            color: #0f172a !important;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #0f172a !important;
        }
        p, span, label, li, td, th {
            color: #1e293b !important;
        }
        .stCaption, [data-testid="stCaptionContainer"], [data-testid="stCaptionContainer"] p {
            color: #64748b !important;
        }
        label[data-testid="stWidgetLabel"], label[data-testid="stWidgetLabel"] p {
            color: #0f172a !important;
            font-weight: 600 !important;
        }
        section[data-testid="stSidebar"] {
            background-color: #ffffff !important;
            border-right: 1px solid #e2e8f0 !important;
        }
        section[data-testid="stSidebar"] * {
            color: #0f172a !important;
        }
        section[data-testid="stSidebar"] .stMarkdown p,
        section[data-testid="stSidebar"] label,
        section[data-testid="stSidebar"] span {
            color: #334155 !important;
        }
        section[data-testid="stSidebar"] .stExpander {
            background: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 12px !important;
        }
        .bento-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05) !important;
            color: #0f172a !important;
        }
        .bento-card:hover {
            border-color: #10b981 !important;
            box-shadow: 0 10px 25px -4px rgba(16, 185, 129, 0.15) !important;
        }
        .bento-header {
            border-bottom: 1px solid #f1f5f9 !important;
        }
        .status-strip {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
            color: #334155 !important;
        }
        .kpi-pill {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
        }
        .kpi-pill:hover {
            background: #f8fafc !important;
            border-color: #10b981 !important;
        }
        .kpi-label {
            color: #64748b !important;
        }
        .hero-banner {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.1) 50%, rgba(99, 102, 241, 0.06) 100%) !important;
            border: 1px solid rgba(16, 185, 129, 0.3) !important;
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06) !important;
        }
        .hero-banner h1, .hero-banner p, .hero-banner span, .hero-banner strong {
            color: #0f172a !important;
        }
        .hero-banner p {
            color: #475569 !important;
        }
        div[data-testid="stMetricValue"] {
            color: #0f172a !important;
        }
        div[data-testid="stMetricLabel"] {
            color: #475569 !important;
        }
        /* Sidebar Navigation Radio Items in Light Mode */
        section[data-testid="stSidebar"] div[data-testid="stRadio"] > div {
            gap: 4px !important;
        }
        section[data-testid="stSidebar"] div[data-testid="stRadio"] label {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 10px !important;
            padding: 8px 12px !important;
            color: #334155 !important;
            font-weight: 600 !important;
            font-size: 0.86rem !important;
            transition: all 0.2s ease !important;
            cursor: pointer !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
        }
        section[data-testid="stSidebar"] div[data-testid="stRadio"] label:hover {
            background: #f1f5f9 !important;
            border-color: #10b981 !important;
            color: #0f172a !important;
            transform: translateX(2px) !important;
        }
        section[data-testid="stSidebar"] div[data-testid="stRadio"] label:has(input:checked) {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%) !important;
            border: 1px solid #10b981 !important;
            color: #047857 !important;
            font-weight: 700 !important;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2) !important;
        }
        div[data-baseweb="select"] > div {
            background: #ffffff !important;
            border-color: #cbd5e1 !important;
            color: #0f172a !important;
        }
        div[data-baseweb="input"] > div {
            background: #ffffff !important;
            border-color: #cbd5e1 !important;
            color: #0f172a !important;
        }
        div[data-testid="stDataFrame"] {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 12px !important;
        }
        </style>
        """, unsafe_allow_html=True)
    else:
        st.markdown("""
        <style>
        :root {
            --bg-primary: #070d18 !important;
            --bg-secondary: #0c1527 !important;
            --bg-card: rgba(15, 23, 42, 0.82) !important;
            --border-card: rgba(51, 65, 85, 0.7) !important;
            --text-main: #f8fafc !important;
            --text-muted: #94a3b8 !important;
            --text-sub: #cbd5e1 !important;
            --glow-emerald: 0 0 25px rgba(16, 185, 129, 0.25) !important;
        }
        html, body, .stApp {
            background: radial-gradient(circle at 15% 10%, rgba(16, 185, 129, 0.08) 0%, transparent 45%),
                        radial-gradient(circle at 85% 25%, rgba(6, 182, 212, 0.08) 0%, transparent 45%),
                        #070d18 !important;
            color: #f8fafc !important;
        }
        
        /* Headers & Headings */
        h1, h2, h3, h4, h5, h6 {
            color: #ffffff !important;
        }

        /* Paragraphs, Spans & General Text */
        p, span, li, td, th {
            color: #f1f5f9 !important;
        }

        /* Markdown Containers */
        div[data-testid="stMarkdownContainer"] p,
        div[data-testid="stMarkdownContainer"] span,
        div[data-testid="stMarkdownContainer"] li,
        div[data-testid="stMarkdownContainer"] td,
        div[data-testid="stMarkdownContainer"] th {
            color: #f1f5f9 !important;
        }
        div[data-testid="stMarkdownContainer"] strong {
            color: #ffffff !important;
        }
        div[data-testid="stMarkdownContainer"] code {
            color: #38bdf8 !important;
            background: rgba(15, 23, 42, 0.9) !important;
            border: 1px solid rgba(56, 189, 248, 0.3) !important;
        }

        /* Streamlit Captions & Secondary Text */
        .stCaption, [data-testid="stCaptionContainer"], [data-testid="stCaptionContainer"] p {
            color: #94a3b8 !important;
        }

        /* Widget Labels (Sliders, Selectboxes, Text Inputs, Checkboxes) */
        label[data-testid="stWidgetLabel"],
        label[data-testid="stWidgetLabel"] p,
        label[data-testid="stWidgetLabel"] span {
            color: #f8fafc !important;
            font-weight: 600 !important;
        }
        div[data-testid="stWidgetLabel"] {
            color: #f8fafc !important;
        }

        /* Sidebar in Dark Mode */
        section[data-testid="stSidebar"] {
            background-color: #0b1120 !important;
            border-right: 1px solid rgba(51, 65, 85, 0.6) !important;
        }
        section[data-testid="stSidebar"] h1,
        section[data-testid="stSidebar"] h2,
        section[data-testid="stSidebar"] h3,
        section[data-testid="stSidebar"] h4,
        section[data-testid="stSidebar"] h5,
        section[data-testid="stSidebar"] h6 {
            color: #ffffff !important;
        }
        section[data-testid="stSidebar"] p,
        section[data-testid="stSidebar"] span {
            color: #cbd5e1 !important;
        }
        section[data-testid="stSidebar"] label,
        section[data-testid="stSidebar"] label p {
            color: #f8fafc !important;
            font-weight: 600 !important;
        }
        section[data-testid="stSidebar"] .stCaption,
        section[data-testid="stSidebar"] [data-testid="stCaptionContainer"] p {
            color: #94a3b8 !important;
        }

        /* Sidebar Navigation Radio Items in Dark Mode */
        section[data-testid="stSidebar"] div[data-testid="stRadio"] > div {
            gap: 4px !important;
        }
        section[data-testid="stSidebar"] div[data-testid="stRadio"] label {
            background: rgba(15, 23, 42, 0.75) !important;
            border: 1px solid rgba(51, 65, 85, 0.6) !important;
            border-radius: 10px !important;
            padding: 8px 12px !important;
            color: #cbd5e1 !important;
            font-weight: 600 !important;
            font-size: 0.86rem !important;
            transition: all 0.2s ease !important;
            cursor: pointer !important;
        }
        section[data-testid="stSidebar"] div[data-testid="stRadio"] label:hover {
            background: rgba(30, 41, 59, 0.9) !important;
            border-color: rgba(16, 185, 129, 0.5) !important;
            color: #ffffff !important;
            transform: translateX(2px) !important;
        }
        section[data-testid="stSidebar"] div[data-testid="stRadio"] label:has(input:checked) {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.18) 100%) !important;
            border: 1px solid #10b981 !important;
            color: #ffffff !important;
            font-weight: 700 !important;
            box-shadow: 0 2px 10px rgba(16, 185, 129, 0.25) !important;
        }

        /* Form Inputs & Selects in Dark Mode */
        div[data-baseweb="select"] > div {
            background: #0f172a !important;
            border-color: rgba(51, 65, 85, 0.8) !important;
            color: #f8fafc !important;
        }
        div[data-baseweb="select"] span {
            color: #f8fafc !important;
        }
        div[data-baseweb="select"] svg {
            fill: #94a3b8 !important;
        }
        div[data-baseweb="popover"], ul[role="listbox"] {
            background: #0f172a !important;
            border: 1px solid rgba(51, 65, 85, 0.85) !important;
        }
        li[role="option"] {
            background: #0f172a !important;
            color: #f8fafc !important;
        }
        li[role="option"]:hover, li[aria-selected="true"] {
            background: #1e293b !important;
            color: #38bdf8 !important;
        }
        div[data-baseweb="input"] > div, input, textarea {
            background: #0f172a !important;
            border-color: rgba(51, 65, 85, 0.8) !important;
            color: #f8fafc !important;
        }
        div[data-baseweb="input"] input {
            color: #f8fafc !important;
        }
        input::placeholder, textarea::placeholder {
            color: #64748b !important;
        }

        /* Sliders in Dark Mode */
        div[data-testid="stSlider"] div[data-testid="stThumbValue"] {
            color: #38bdf8 !important;
        }
        div[data-testid="stSlider"] div[data-testid="stTickBar"] {
            color: #94a3b8 !important;
        }

        /* Checkboxes & Radios */
        div[data-testid="stCheckbox"] label span,
        div[data-testid="stRadio"] label span {
            color: #e2e8f0 !important;
        }

        /* Expanders in Dark Mode */
        div[data-testid="stExpander"] {
            background: rgba(15, 23, 42, 0.75) !important;
            border: 1px solid rgba(51, 65, 85, 0.7) !important;
            border-radius: 12px !important;
        }
        div[data-testid="stExpander"] summary span {
            color: #f8fafc !important;
            font-weight: 600 !important;
        }
        div[data-testid="stExpander"] summary svg {
            fill: #94a3b8 !important;
        }
        div[data-testid="stExpander"] * {
            color: #e2e8f0 !important;
        }

        /* Modals & Dialogs (@st.dialog) in Dark Mode */
        div[role="dialog"], div[data-testid="stDialog"] {
            background-color: #0b1120 !important;
            border: 1px solid rgba(51, 65, 85, 0.85) !important;
            border-radius: 18px !important;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8) !important;
            color: #f8fafc !important;
        }
        div[role="dialog"] p, div[role="dialog"] span {
            color: #e2e8f0 !important;
        }
        div[role="dialog"] h1, div[role="dialog"] h2, div[role="dialog"] h3, div[role="dialog"] h4, div[role="dialog"] h5 {
            color: #ffffff !important;
        }
        div[role="dialog"] label, div[role="dialog"] label p {
            color: #f8fafc !important;
        }
        div[role="dialog"] .stCaption p {
            color: #94a3b8 !important;
        }

        /* Tabs in Dark Mode */
        button[data-baseweb="tab"] {
            color: #94a3b8 !important;
        }
        button[data-baseweb="tab"][aria-selected="true"] {
            color: #38bdf8 !important;
            border-bottom-color: #38bdf8 !important;
        }

        /* Cards & Metrics */
        .bento-card {
            background: rgba(15, 23, 42, 0.82) !important;
            border: 1px solid rgba(51, 65, 85, 0.7) !important;
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.35) !important;
            color: #f8fafc !important;
        }
        .bento-card:hover {
            border-color: rgba(16, 185, 129, 0.5) !important;
            box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.45), var(--glow-emerald) !important;
        }
        .bento-header {
            border-bottom: 1px solid rgba(51, 65, 85, 0.7) !important;
        }
        .status-strip {
            background: rgba(15, 23, 42, 0.65) !important;
            border: 1px solid rgba(51, 65, 85, 0.6) !important;
            color: #cbd5e1 !important;
        }
        .kpi-pill {
            background: rgba(15, 23, 42, 0.75) !important;
            border: 1px solid rgba(51, 65, 85, 0.65) !important;
        }
        .kpi-pill:hover {
            background: rgba(30, 41, 59, 0.95) !important;
            border-color: rgba(16, 185, 129, 0.5) !important;
        }
        .kpi-label {
            color: #94a3b8 !important;
        }
        .hero-banner {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(14, 165, 233, 0.15) 50%, rgba(99, 102, 241, 0.15) 100%) !important;
            border: 1px solid rgba(16, 185, 129, 0.35) !important;
            box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4), var(--glow-emerald) !important;
        }
        .hero-banner h1 {
            color: #ffffff !important;
        }
        .hero-banner p {
            color: #cbd5e1 !important;
        }
        div[data-testid="stMetricValue"] {
            color: #f8fafc !important;
        }
        div[data-testid="stMetricLabel"] {
            color: #94a3b8 !important;
        }
        div[data-testid="stDataFrame"] {
            background: rgba(15, 23, 42, 0.85) !important;
            border: 1px solid rgba(51, 65, 85, 0.7) !important;
            border-radius: 12px !important;
            color: #f8fafc !important;
        }
        </style>
        """, unsafe_allow_html=True)

# Apply Active Theme Styles
inject_theme_styles(st.session_state.theme_mode)

# Imports from core
from core.data_manager import DataManager
from core.gis_engine import calculate_scenario_kpis
from core.copilot_engine import UrbanCopilotEngine

# Imports from views
from views.map_3d_view import render_map_3d_view
from views.housing_view import render_housing_view
from views.services_15m_view import render_services_15m_view
from views.deliberation_view import render_deliberation_view
from views.evaluation_ahp_view import render_evaluation_ahp_view
from views.ai_engine_view import render_ai_engine_view
from views.langflow_view import render_langflow_view
from views.scaffolding_view import render_scaffolding_view

# Initialize Data Manager
@st.cache_resource
def get_data_manager():
    return DataManager()

dm = get_data_manager()
copilot_engine = UrbanCopilotEngine(dm)

if 'saved_profiles' not in st.session_state:
    st.session_state.saved_profiles = dm.default_saved_profiles

if 'forum_threads' not in st.session_state:
    st.session_state.forum_threads = dm.forum_threads

if 'budget_allocation' not in st.session_state:
    st.session_state.budget_allocation = dm.budget_allocation

# ----------------- SIDEBAR CONTROLS -----------------
with st.sidebar:
    # App Brand Header
    st.markdown("""
    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
            🏙️
        </div>
        <div>
            <h3 style="font-weight: 800; font-size: 1.15rem; margin: 0;">Digital Twin</h3>
            <span style="font-size: 0.75rem; font-weight: 600; opacity: 0.8;">Hábitat Popular • Python & Streamlit</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Pilot City Selector
    city_options = {c['id']: c['name'] for c in dm.pilot_cities}
    selected_city_id = st.selectbox(
        "📍 Ciudad Piloto:",
        options=list(city_options.keys()),
        index=list(city_options.keys()).index(st.session_state.selected_city_id),
        format_func=lambda cid: city_options[cid]
    )
    st.session_state.selected_city_id = selected_city_id
    current_city = dm.get_city(selected_city_id)

    # Scenario Selector
    scenario_dict = {
        'base': '1. Base (Diagnóstico GHSL/OSM)',
        'municipal': '2. Plan Municipal (POT/PEMU)',
        'comunitario': '3. Propuesta Comunitaria (Asambleas)',
        'hibrido': '4. Híbrido (Co-Diseño Óptimo AHP)',
        'custom_1': '💾 Perfil Propuesta 1 (Personalizado)',
        'custom_2': '💾 Perfil Propuesta 2 (Personalizado)',
        'custom_3': '💾 Perfil Propuesta 3 (Personalizado)'
    }
    active_scenario = st.selectbox(
        "🗂️ Escenario Activo:",
        options=list(scenario_dict.keys()),
        index=list(scenario_dict.keys()).index(st.session_state.active_scenario),
        format_func=lambda sid: scenario_dict[sid]
    )
    st.session_state.active_scenario = active_scenario

    # Custom Proposal Save Tool
    with st.expander("💾 Guardar Propuesta en Perfil", expanded=False):
        st.caption("Guarda las modificaciones viales y habitacionales en una de las 3 ranuras.")
        slot_target = st.selectbox("Ranura de Destino:", ["custom_1", "custom_2", "custom_3"], format_func=lambda s: f"Ranura {s[-1]}")
        prop_name = st.text_input("Nombre de la Propuesta:", value=f"Propuesta {current_city.get('name').split()[0]}")
        prop_desc = st.text_area("Descripción:", value="Co-diseño comunitario con equipamientos de salud y pistas adaptadas al relieve.")
        if st.button("Guardar en Perfil", type="primary", use_container_width=True):
            curr_elements = list(elements)
            st.session_state.saved_profiles = dm.save_custom_profile(
                slot_target, prop_name, prop_desc, selected_city_id, curr_elements, st.session_state.saved_profiles
            )
            st.success(f"¡Guardado con éxito en Ranura {slot_target[-1]}!")

    st.markdown("---")

    # Navigation Menu in Sidebar (Restored to lateral panel as requested)
    st.markdown("##### 🧭 Módulos del Gemelo:")
    current_tab_idx = NAV_KEYS.index(st.session_state.active_nav_tab) if st.session_state.active_nav_tab in NAV_KEYS else 0
    selected_tab = st.radio(
        "Módulos:",
        options=NAV_KEYS,
        index=current_tab_idx,
        format_func=lambda k: NAV_LABELS[k],
        label_visibility="collapsed"
    )
    st.session_state.active_nav_tab = selected_tab

    st.markdown("---")

    # User Role & Preferences
    role_dict = {
        'residente': '👤 Residente Comunitario',
        'facilitador': '🛠️ Facilitador de Taller',
        'administrador': '🏛️ Técnico / Municipalidad'
    }
    user_role = st.selectbox(
        "Rol de Usuario:",
        options=list(role_dict.keys()),
        index=list(role_dict.keys()).index(st.session_state.user_role),
        format_func=lambda r: role_dict[r]
    )
    st.session_state.user_role = user_role

    # Theme Toggle in Sidebar
    st.markdown("##### 🎨 Tema Visual:")
    theme_choice = st.radio(
        "Tema:",
        options=["Modo Oscuro", "Modo Claro"],
        index=0 if st.session_state.theme_mode == 'dark' else 1,
        horizontal=True,
        label_visibility="collapsed"
    )
    new_theme = 'dark' if theme_choice == "Modo Oscuro" else 'light'
    if new_theme != st.session_state.theme_mode:
        st.session_state.theme_mode = new_theme
        st.rerun()

    st.caption("Gemelo Digital Comunitario v2.0 • Stack Python & Streamlit")

# ----------------- SCENARIO & KPIS RESOLUTION -----------------
if 'placed_elements' not in st.session_state:
    st.session_state.placed_elements = {}

elements = dm.get_elements(selected_city_id, active_scenario)

if active_scenario.startswith('custom_'):
    saved_prof = next((p for p in st.session_state.saved_profiles if p.get('id') == active_scenario), None)
    if saved_prof and saved_prof.get('isFilled'):
        elements = saved_prof.get('elements', elements)

# Integrate dynamic collision-free elements placed by LangChain Copilot Assistant
current_scenario_key = (selected_city_id, active_scenario)
placed_custom = st.session_state.placed_elements.get(current_scenario_key, [])
if placed_custom:
    elements = list(elements) + list(placed_custom)

kpis = calculate_scenario_kpis(
    elements,
    area_hectares=current_city.get('areaHectares', 50.0),
    baseline_population=current_city.get('initialPopulation', 15000)
)

# ----------------- TOP STATUS STRIP (UX ENHANCEMENT) -----------------
is_light_mode = (st.session_state.theme_mode == 'light')
status_sep = '<span style="color: #cbd5e1; margin: 0 4px;">|</span>' if is_light_mode else '<span style="color: #475569; margin: 0 4px;">|</span>'

st.markdown(f"""
<div class="status-strip">
    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <span style="display: inline-flex; align-items: center; gap: 0.35rem; color: {'#059669' if is_light_mode else '#34d399'}; font-weight: 700;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block; box-shadow: 0 0 8px #10b981;"></span>
            Motor IA Local In-Process
        </span>
        {status_sep}
        <span>📍 <strong>{current_city.get('name')}</strong> ({current_city.get('defaultCurrency', 'PEN')} {current_city.get('currencySymbol', 'S/.')})</span>
        {status_sep}
        <span>Escenario: <strong>{active_scenario.upper()}</strong></span>
        {status_sep}
        <span>👤 Rol: <strong>{user_role.capitalize()}</strong></span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.85rem;">
        <span>Módulo: <strong style="color: {'#0284c7' if is_light_mode else '#38bdf8'};">{NAV_LABELS[selected_tab]}</strong></span>
        {status_sep}
        <span>Calidad de Vida: <strong style="color: {'#059669' if is_light_mode else '#10b981'};">{kpis.get('qualityOfLifeScore', 75)}/100</strong></span>
        <span class="badge badge-blue">AHP Óptimo</span>
    </div>
</div>
""", unsafe_allow_html=True)

# ----------------- MAIN CONTENT ROUTER -----------------
active_tab = selected_tab

if active_tab == 'map':
    render_map_3d_view(
        city=current_city,
        scenario_id=active_scenario,
        elements=elements,
        kpis=kpis,
        copilot_engine=copilot_engine,
        theme=st.session_state.theme_mode
    )

elif active_tab == 'housing':
    render_housing_view(
        city=current_city,
        scenario_id=active_scenario,
        elements=elements,
        kpis=kpis
    )

elif active_tab == 'services':
    render_services_15m_view(
        city=current_city,
        scenario_id=active_scenario,
        elements=elements,
        kpis=kpis
    )

elif active_tab == 'deliberation':
    render_deliberation_view(
        city=current_city,
        scenario_id=active_scenario,
        forum_threads=st.session_state.forum_threads,
        budget_allocation=st.session_state.budget_allocation
    )

elif active_tab == 'evaluation':
    scenarios_data = {}
    for sc_key in ['base', 'municipal', 'comunitario', 'hibrido']:
        sc_elems = dm.get_elements(selected_city_id, sc_key)
        sc_kpis = calculate_scenario_kpis(
            sc_elems,
            area_hectares=current_city.get('areaHectares', 50.0),
            baseline_population=current_city.get('initialPopulation', 15000)
        )
        scenarios_data[sc_key] = {'kpis': sc_kpis}

    render_evaluation_ahp_view(
        scenarios_data=scenarios_data,
        ahp_criteria=dm.ahp_criteria,
        initial_ahp_matrix=dm.ahp_matrix
    )

elif active_tab == 'ai-engine':
    render_ai_engine_view(
        city=current_city,
        scenario_id=active_scenario
    )

elif active_tab == 'langflow':
    render_langflow_view(
        preset_flows=dm.preset_langflow_flows
    )

elif active_tab == 'scaffolding':
    render_scaffolding_view(
        city=current_city,
        scenario_id=active_scenario,
        elements=elements,
        kpis=kpis
    )
