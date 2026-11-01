import json
import streamlit as st
import streamlit.components.v1 as components
import pydeck as pdk
import pandas as pd
from typing import Dict, Any, List
from core.copilot_engine import UrbanCopilotEngine

@st.dialog("🤖 Asistente LangChain • Planificador Territorial", width="large")
def render_copilot_floating_dialog(
    city: Dict[str, Any],
    scenario_id: str,
    elements: List[Dict[str, Any]],
    kpis: Dict[str, Any],
    copilot_engine: UrbanCopilotEngine,
    theme: str = 'dark'
):
    """
    Floating Modal Window for the LangChain Urban Assistant.
    Enables collision-free spatial placement of urban equipment,
    RAG normative queries, and real-time 3D twin synchronization.
    """
    city_id = city.get('id', 'lima')
    neighborhood = city.get('neighborhood', 'Quebrada Huáscar')
    is_light = (theme == 'light')

    if 'placed_elements' not in st.session_state:
        st.session_state.placed_elements = {}
    current_key = (city_id, scenario_id)
    placed_elements = st.session_state.placed_elements.get(current_key, [])

    # Header Strip with Live Collision Status
    st.markdown(f"""
    <div style="background: {'rgba(241, 245, 249, 0.95)' if is_light else 'rgba(15, 23, 42, 0.9)'}; border: 1px solid {'#cbd5e1' if is_light else 'rgba(51, 65, 85, 0.85)'}; padding: 12px 18px; border-radius: 14px; margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
            <strong style="color: {'#0284c7' if is_light else '#38bdf8'}; font-size: 1.05rem;">📍 {city.get('name')} • {neighborhood}</strong>
            <span style="color: #64748b; font-size: 0.85rem; margin-left: 8px;">(Escenario: <strong>{scenario_id.upper()}</strong>)</span><br>
            <span style="font-size: 0.82rem; color: {'#16a34a' if is_light else '#34d399'}; font-weight: 700;">
                🛡️ Motor Espacial Anti-Oclusiones: Pistas Viales Protegidas (> 20m) • Separación Vecinal (> 25m) • Pendiente < 22%
            </span>
        </div>
        <div style="background: {'#ffffff' if is_light else 'rgba(30, 41, 59, 0.8)'}; border: 1px solid {'#e2e8f0' if is_light else '#475569'}; border-radius: 8px; padding: 4px 12px; font-size: 0.85rem; text-align: right;">
            <span>Objetos en Escena: <strong>{len(elements)}</strong></span><br>
            <span>Añadidos en Sesión: <strong style="color: #10b981;">{len(placed_elements)}</strong></span>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # 1. Quick One-Click Collision-Free Placement Actions
    st.markdown("##### ⚡ Colocar Equipamiento en Ubicación Óptima (Sin Oclusiones):")
    st.caption("Al pulsar un botón, el asistente calcula la ubicación libre de colisiones con pistas y edificaciones, y lo proyecta al instante en 3D:")

    c_b1, c_b2, c_b3, c_b4, c_b5 = st.columns(5)
    action_type = None
    if c_b1.button("🏥 Posta Médica", use_container_width=True, help="Coloca Posta Satelital I-2 a 15 min"):
        action_type = 'centro_salud'
    elif c_b2.button("🌳 Parque Verde", use_container_width=True, help="Coloca Parque Bioclimático con andenes"):
        action_type = 'parque_verde'
    elif c_b3.button("🏘️ Vivienda Social", use_container_width=True, help="Coloca Bloque Residencial Sostenible"):
        action_type = 'vivienda_social'
    elif c_b4.button("🏫 Módulo Escuela", use_container_width=True, help="Coloca Escuela Inicial y Comunal"):
        action_type = 'escuela'
    elif c_b5.button("🚏 Parada Masiva", use_container_width=True, help="Coloca Parada de Transporte Accesible"):
        action_type = 'parada_transporte'

    if action_type:
        placement_res = copilot_engine.place_object_collision_free(action_type, city_id, elements)
        new_el = placement_res['element']
        m = placement_res['metrics']

        if current_key not in st.session_state.placed_elements:
            st.session_state.placed_elements[current_key] = []
        st.session_state.placed_elements[current_key].append(new_el)

        if 'copilot_chat_history' not in st.session_state:
            st.session_state.copilot_chat_history = []

        st.session_state.copilot_chat_history.append({
            'role': 'user',
            'text': f"Coloca {new_el['name']} en un lugar adecuado y sin colisiones."
        })
        st.session_state.copilot_chat_history.append({
            'role': 'assistant',
            'text': (
                f"🎯 **{new_el['name']}** colocado con éxito en el relieve de {neighborhood}.\n\n"
                f"• 📍 **Coordenadas GPS:** `[{m['coords'][0]:.6f}, {m['coords'][1]:.6f}]`\n"
                f"• 🛣️ **Distancia a Calzada Vial:** **{m['dist_road']} m** (Sin invasión de pistas; retiro seguro de {m['min_safe_road_dist']}m superado).\n"
                f"• 🏢 **Distancia a Edificios Vecinos:** **{m['dist_bldg']} m** (Libre de solapamiento con otras manzanas).\n"
                f"• 📐 **Pendiente del Terreno:** **{m['slope']}%** (Cimentación estable y segura en ladera).\n"
                f"• 💰 **Presupuesto Estimado:** ${new_el['costEstimateUSD']:,} USD | Capacidad: {new_el['populationCapacity']:,} hab."
            ),
            'thought_process': {
                'thought': f"Calculando coordenadas en malla orográfica para ubicar {new_el['name']}...",
                'actionName': 'langchain_spatial_placement_tool',
                'actionInput': {'type': action_type, 'road_buffer': m['min_safe_road_dist'], 'actual_road_dist': m['dist_road']},
                'observation': f"Validado en [{m['coords'][0]:.5f}, {m['coords'][1]:.5f}]. Cero solapamiento con pistas ni edificaciones existentes."
            }
        })
        st.toast(f"✅ {new_el['name']} colocado sin oclusión!", icon="📍")
        st.rerun()

    st.markdown("---")

    # 2. Conversational Chat & Thought/Action/Observation
    st.markdown("##### 💬 Diálogo con el Asistente Territorial LangChain:")
    if 'copilot_chat_history' not in st.session_state:
        st.session_state.copilot_chat_history = [
            {
                'role': 'assistant',
                'text': f"¡Hola! Soy tu Copiloto Territorial para **{neighborhood}**. Puedo colocar equipamientos sin oclusiones viales (pistas) y resolver dudas sobre normativas (PLANMET 2040, CENEPRED, RNE)."
            }
        ]

    chat_box = st.container(height=300)
    with chat_box:
        for msg in st.session_state.copilot_chat_history:
            if msg['role'] == 'assistant':
                st.markdown(f"🤖 **Copiloto:** {msg['text']}")
                if msg.get('thought_process'):
                    with st.expander("💭 LangChain ReAct Reasoning (Action & Observation)", expanded=False):
                        tp = msg['thought_process']
                        st.markdown(f"**Thought:** {tp.get('thought')}")
                        st.code(f"Action: {tp.get('actionName')}({tp.get('actionInput')})\nObservation: {tp.get('observation')}", language="bash")
            else:
                st.markdown(f"👤 **Tú:** {msg['text']}")

    # User Input Field
    user_query = st.text_input(
        "Consulta normativa o pide colocar un elemento:",
        placeholder="Ej: Coloca una posta médica cerca a las viviendas o pon un parque bioclimático",
        key="copilot_dialog_input"
    )

    c_send, c_clear = st.columns([3.5, 1.2])
    with c_send:
        if st.button("Enviar al Asistente", type="primary", use_container_width=True):
            if user_query.strip():
                st.session_state.copilot_chat_history.append({'role': 'user', 'text': user_query})
                response = copilot_engine.ask_copilot(user_query, city_id, scenario_id, kpis, elements)

                if response.get('placed_element'):
                    new_el = response['placed_element']
                    if current_key not in st.session_state.placed_elements:
                        st.session_state.placed_elements[current_key] = []
                    st.session_state.placed_elements[current_key].append(new_el)
                    st.toast(f"✅ {new_el['name']} colocado en la escena!", icon="🚀")

                st.session_state.copilot_chat_history.append({
                    'role': 'assistant',
                    'text': response['text'],
                    'thought_process': response.get('thought_process')
                })
                st.rerun()

    with c_clear:
        if placed_elements and st.button("🗑️ Limpiar Todo", use_container_width=True, help="Elimina los objetos añadidos por el asistente"):
            st.session_state.placed_elements[current_key] = []
            st.toast("Se limpiaron los objetos colocados.", icon="🧹")
            st.rerun()

    # 3. Placed Elements Summary Drawer
    if placed_elements:
        with st.expander(f"📦 Objetos Colocados en Esta Sesión ({len(placed_elements)})", expanded=False):
            for idx, p_el in enumerate(placed_elements):
                st.markdown(f"• **{p_el.get('name')}** (`{p_el.get('type')}`) en `[{p_el.get('coordinates')[0]:.5f}, {p_el.get('coordinates')[1]:.5f}]` | Inversión: **${p_el.get('costEstimateUSD', 0):,} USD**")


def render_map_3d_view(
    city: Dict[str, Any],
    scenario_id: str,
    elements: List[Dict[str, Any]],
    kpis: Dict[str, Any],
    copilot_engine: UrbanCopilotEngine,
    theme: str = 'dark'
):
    """
    Renders the 3D Digital Twin and 2D GIS Map faithful to the original system,
    with exact geographic-to-local meter projection, authentic terrain relief,
    conforming asphalt roads with concrete curbs, procedural 3D parks with trees,
    and foundation-leveled volumetric buildings.
    """
    city_id = city.get('id', 'lima')
    city_name = city.get('name', 'Lima')
    neighborhood = city.get('neighborhood', 'Quebrada Huáscar')
    center_coords = city.get('center', [-76.9935, -11.9860])

    # Top Hero Header with Quick Stats
    st.markdown(f"""
    <div class="hero-banner">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                    <span class="badge">Gemelo Digital 3D • Sistema Orográfico</span>
                    <span class="badge badge-purple">{city.get('ghslSettlementClass', 'GHSL L1')}</span>
                </div>
                <h1 style="font-size: 2.1rem; font-weight: 800; margin: 0.2rem 0; color: #fff;">
                    {neighborhood}
                </h1>
                <p style="font-size: 0.95rem; color: #94a3b8; margin: 0;">
                    {city_name} — Visualización espacial tridimensional adaptada a la ladera árida y quebradas naturales.
                </p>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(51, 65, 85, 0.85); padding: 8px 16px; border-radius: 12px; text-align: right;">
                    <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Escenario Activo</span><br>
                    <strong style="color: #38bdf8; font-size: 1.05rem;">{scenario_id.upper()}</strong>
                </div>
                <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(51, 65, 85, 0.85); padding: 8px 16px; border-radius: 12px; text-align: right;">
                    <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Objetos Urbanos</span><br>
                    <strong style="color: #34d399; font-size: 1.05rem;">{len(elements)} en Escena</strong>
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Top Floating Copilot Action Banner
    c_banner_text, c_banner_btn = st.columns([3.2, 1.4])
    with c_banner_text:
        st.markdown(f"""
        <div style="background: {'rgba(241, 245, 249, 0.95)' if theme == 'light' else 'rgba(15, 23, 42, 0.85)'}; border: 1px solid {'#cbd5e1' if theme == 'light' else 'rgba(99, 102, 241, 0.35)'}; border-left: 4px solid #6366f1; border-radius: 12px; padding: 9px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.3rem;">🤖</span>
                <div>
                    <strong style="color: {'#4338ca' if theme == 'light' else '#a5b4fc'}; font-size: 0.95rem;">Asistente LangChain • Planificador Territorial</strong><br>
                    <span style="font-size: 0.8rem; color: {'#64748b' if theme == 'light' else '#94a3b8'};">Colocación inteligente de equipamientos en relieve real sin pisar pistas viales ni sobrelapar edificaciones.</span>
                </div>
            </div>
            <span class="badge badge-purple" style="font-size: 11px;">Anti-Colisiones 100% Activo</span>
        </div>
        """, unsafe_allow_html=True)
    with c_banner_btn:
        if st.button("🤖 Abrir Asistente Flotante", key="btn_open_copilot_top", type="primary", use_container_width=True):
            render_copilot_floating_dialog(city, scenario_id, elements, kpis, copilot_engine, theme)

    # Interactive Toolbar (Atmosphere, Sun, Road & Layer Controls)
    col1, col2, col3, col4 = st.columns([1.5, 1.5, 2, 2])
    with col1:
        time_of_day = st.radio("🌓 Atmósfera", ["Día", "Noche"], horizontal=True)
    with col2:
        solar_azimuth = st.slider("☀️ Azimut Solar (°)", 0, 360, 145, help="Ángulo azimutal de asoleamiento")
    with col3:
        solar_elevation = st.slider("📐 Elevación Solar (°)", 10, 85, 55, help="Elevación del sol sobre el horizonte")
    with col4:
        view_mode = st.radio(
            "🌐 Modo de Visor",
            ["Visor 3D Three.js (Relieve Real)", "Cartografía 2D GIS (Pydeck)"],
            horizontal=True
        )

    # Layer Toggles
    c_l1, c_l2, c_l3, c_l4, c_l5 = st.columns(5)
    with c_l1:
        layer_buildings = st.checkbox("Edificaciones 3D", value=True)
    with c_l2:
        layer_roads = st.checkbox("Pistas & Corredores", value=True)
    with c_l3:
        layer_parks = st.checkbox("Parques & Árboles", value=True)
    with c_l4:
        layer_wireframe = st.checkbox("Malla Orográfica", value=False)
    with c_l5:
        layer_shadows = st.checkbox("Sombras Solares", value=(time_of_day == "Día"))

    # Full-Width Panoramic Canvas Container (3D WebGL / 2D GIS)
    with st.container():
        if view_mode == "Visor 3D Three.js (Relieve Real)":
            # Sanitize all elements for JSON transmission
            elements_data = []
            for idx, el in enumerate(elements):
                coords = el.get('coordinates', center_coords)
                path_pts = el.get('pathPoints', [])
                elements_data.append({
                    "id": el.get('id', f"el-{idx}"),
                    "name": el.get('name', 'Elemento Urbano'),
                    "type": el.get('type', 'vivienda_social'),
                    "coordinates": coords,
                    "pathPoints": path_pts,
                    "roadWidth": el.get('roadWidth', 12),
                    "footprintArea": el.get('footprintArea', 400),
                    "floors": el.get('floors', 2),
                    "solarOrientation": el.get('solarOrientation', 90),
                    "unitsCount": el.get('unitsCount', 0),
                    "populationCapacity": el.get('populationCapacity', 0),
                    "costEstimateUSD": el.get('costEstimateUSD', 0),
                    "status": el.get('status', 'propuesto')
                })

            elements_json = json.dumps(elements_data)

            is_light_mode = (theme == 'light')
            sky_bg_css = '#edf2f7' if is_light_mode else ('#090d16' if time_of_day == 'Día' else '#060913')
            hud_bg = "rgba(255, 255, 255, 0.95)" if is_light_mode else "rgba(15, 23, 42, 0.90)"
            hud_color = "#0f172a" if is_light_mode else "#f8fafc"
            hud_border = "rgba(203, 213, 225, 0.95)" if is_light_mode else "rgba(51, 65, 85, 0.85)"
            c_btn_bg = "#ffffff" if is_light_mode else "rgba(15, 23, 42, 0.9)"
            c_btn_color = "#334155" if is_light_mode else "#cbd5e1"
            c_btn_border = "#cbd5e1" if is_light_mode else "rgba(51, 65, 85, 0.8)"
            road_bar_bg = "rgba(255, 255, 255, 0.95)" if is_light_mode else "rgba(15, 23, 42, 0.92)"
            road_bar_color = "#0f172a" if is_light_mode else "#fff"

            # Three.js HTML embed exactly matching the original distribution, projection & aesthetics
            html_threejs_code = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    html, body {{
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 640px;
                        overflow: hidden;
                        background: {sky_bg_css};
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }}
                    #canvas-container {{
                        position: relative;
                        width: 100%;
                        height: 640px;
                        border-radius: 16px;
                        overflow: hidden;
                        border: 1px solid {hud_border};
                    }}
                    #hud-status {{
                        position: absolute;
                        top: 14px;
                        left: 14px;
                        background: {hud_bg};
                        backdrop-filter: blur(12px);
                        border: 1px solid {hud_border};
                        border-radius: 12px;
                        padding: 10px 14px;
                        color: {hud_color};
                        font-size: 11px;
                        pointer-events: none;
                        z-index: 20;
                        line-height: 1.5;
                        box-shadow: 0 10px 25px rgba(0,0,0,{'0.08' if is_light_mode else '0.4'});
                    }}
                    #cam-bar {{
                        position: absolute;
                        top: 14px;
                        right: 14px;
                        display: flex;
                        gap: 6px;
                        z-index: 20;
                    }}
                    .c-btn {{
                        background: {c_btn_bg};
                        color: {c_btn_color};
                        border: 1px solid {c_btn_border};
                        border-radius: 8px;
                        padding: 6px 11px;
                        font-size: 11px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.2s;
                    }}
                    .c-btn:hover {{
                        background: #10b981;
                        color: #ffffff;
                        border-color: #10b981;
                    }}
                    #road-bar {{
                        position: absolute;
                        bottom: 14px;
                        left: 14px;
                        background: {road_bar_bg};
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(16, 185, 129, 0.6);
                        border-radius: 12px;
                        padding: 8px 14px;
                        color: {road_bar_color};
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        z-index: 20;
                        box-shadow: 0 6px 20px rgba(0,0,0,{'0.08' if is_light_mode else '0.3'});
                    }}
                    .road-btn {{
                        background: #10b981;
                        color: #ffffff;
                        border: none;
                        border-radius: 6px;
                        padding: 6px 12px;
                        font-weight: 800;
                        cursor: pointer;
                        font-size: 11px;
                    }}
                    .road-btn:hover {{ background: #34d399; }}
                    #element-tooltip {{
                        position: absolute;
                        display: none;
                        background: {'rgba(255, 255, 255, 0.98)' if is_light_mode else 'rgba(15, 23, 42, 0.96)'};
                        backdrop-filter: blur(14px);
                        border: 1px solid {'rgba(2, 132, 199, 0.5)' if is_light_mode else 'rgba(56, 189, 248, 0.6)'};
                        border-left: 4px solid #10b981;
                        color: {'#0f172a' if is_light_mode else '#fff'};
                        padding: 10px 14px;
                        border-radius: 10px;
                        font-size: 11px;
                        pointer-events: none;
                        z-index: 40;
                        box-shadow: 0 12px 28px rgba(0,0,0,{'0.12' if is_light_mode else '0.5'});
                        line-height: 1.5;
                        max-width: 240px;
                    }}
                </style>
                <script src="https://unpkg.com/three@0.128.0/build/three.min.js"></script>
                <script src="https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
            </head>
            <body>
                <div id="canvas-container">
                    <div id="hud-status">
                        <strong style="color: #38bdf8; font-size: 12px;">🏙️ {neighborhood}</strong><br>
                        <span>Centro: [{center_coords[0]:.4f}, {center_coords[1]:.4f}]</span><br>
                        <span>Azimut: {solar_azimuth}° • Elevación: {solar_elevation}°</span><br>
                        <span style="color: #34d399;">● {len(elements_data)} Elementos Proyectados en Escena</span>
                    </div>

                    <div id="cam-bar">
                        <button class="c-btn" onclick="setViewMode('persp')">📐 Perspectiva</button>
                        <button class="c-btn" onclick="setViewMode('top')">🦅 Cenital</button>
                        <button class="c-btn" onclick="setViewMode('ground')">🚶 Ras de Ladera</button>
                        <button class="c-btn" onclick="resetCamera()">🔄 Reset</button>
                    </div>

                    <div id="road-bar">
                        <span>🛣️ <strong>Sistema Vial:</strong></span>
                        <button class="road-btn" id="btn-road" onclick="toggleRoadDrafting()">+ Trazar Vía</button>
                        <span id="road-hint" style="color: #94a3b8; font-size: 11px;">Clic sobre el relieve para añadir tramos</span>
                    </div>

                    <div id="element-tooltip"></div>
                </div>

                <script>
                    const container = document.getElementById('canvas-container');
                    const tooltip = document.getElementById('element-tooltip');
                    const elements = {elements_json};
                    const centerCity = [{center_coords[0]}, {center_coords[1]}];
                    const cityId = "{city_id}";

                    // 1. Proyección geográfica exacta a metros centrada en la ciudad (IDÉNTICO AL SISTEMA ANTERIOR)
                    function coordsToLocal(coords) {{
                        const latMetersPerDegree = 111320;
                        const lngMetersPerDegree = 111320 * Math.cos((centerCity[1] * Math.PI) / 180);
                        const x = (coords[0] - centerCity[0]) * lngMetersPerDegree;
                        const z = -(coords[1] - centerCity[1]) * latMetersPerDegree;
                        return {{ x, z }};
                    }}

                    // 2. Modelo de Elevación Orográfico Continuo Exacto
                    function getTerrainElevation(x, z) {{
                        if (cityId === 'lima') {{
                            // Lima (San Juan de Lurigancho - Quebrada Huáscar): Ladera árida con quebradas naturales
                            const mainSlope = (-x * 0.085) + (z * 0.045);
                            const ravines = Math.sin(x * 0.014 + z * 0.009) * 12 + Math.cos(x * 0.009 - z * 0.012) * 8;
                            const terrace = Math.sin(x * 0.028) * 3;
                            return mainSlope + ravines + terrace;
                        }}
                        if (cityId === 'arequipa') {{
                            // Arequipa (Cerro Colorado): Laderas volcánicas y torrenteras
                            const volcanicSlope = (-z * 0.075) - (x * 0.035);
                            const quebrada = Math.sin(x * 0.016) * 11 + Math.cos(z * 0.012) * 7;
                            return volcanicSlope + quebrada;
                        }}
                        if (cityId === 'trujillo') {{
                            // Trujillo (Alto Trujillo): Planicie desértica con dunas costeras suaves
                            return Math.sin(x * 0.008) * 1.5 + Math.cos(z * 0.008) * 1.5;
                        }}
                        return (Math.sin(x * 0.01) * 7) + (Math.cos(z * 0.01) * 7);
                    }}

                    // Scene & Camera
                    const scene = new THREE.Scene();
                    const isLight = {'true' if is_light_mode else 'false'};
                    const isDay = {'true' if time_of_day == 'Día' else 'false'};
                    const skyColor = isLight ? 0xedf2f7 : (isDay ? 0x090d16 : 0x060913);
                    scene.background = new THREE.Color(skyColor);
                    scene.fog = new THREE.FogExp2(skyColor, isLight ? 0.00045 : 0.00075);

                    const width = container.clientWidth || 850;
                    const height = 640;

                    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3500);
                    camera.position.set(240, 240, 320);

                    const renderer = new THREE.WebGLRenderer({{ antialias: true, alpha: true, powerPreference: 'high-performance' }});
                    renderer.setSize(width, height);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                    renderer.shadowMap.enabled = {'true' if layer_shadows else 'false'};
                    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    container.appendChild(renderer.domElement);

                    const controls = new THREE.OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.08;
                    controls.maxPolarAngle = Math.PI / 2.05;
                    controls.minDistance = 40;
                    controls.maxDistance = 1100;
                    controls.target.set(0, 0, 0);

                    // Iluminación idéntica al sistema anterior adaptada al tema
                    const ambientLight = new THREE.AmbientLight(
                        isLight ? 0xffffff : (isDay ? 0xdce7f5 : 0x1a2238),
                        isLight ? 1.05 : (isDay ? 0.85 : 0.35)
                    );
                    scene.add(ambientLight);

                    const sunLight = new THREE.DirectionalLight(0xfff7e6, isDay ? 1.95 : 0.28);
                    sunLight.castShadow = isDay && {'true' if layer_shadows else 'false'};
                    sunLight.shadow.mapSize.width = 1024;
                    sunLight.shadow.mapSize.height = 1024;
                    sunLight.shadow.camera.near = 10;
                    sunLight.shadow.camera.far = 1400;
                    const shadowSize = 450;
                    sunLight.shadow.camera.left = -shadowSize;
                    sunLight.shadow.camera.right = shadowSize;
                    sunLight.shadow.camera.top = shadowSize;
                    sunLight.shadow.camera.bottom = -shadowSize;
                    scene.add(sunLight);

                    // Posicionar Sol
                    const azRad = ({solar_azimuth} * Math.PI) / 180;
                    const elRad = ({solar_elevation} * Math.PI) / 180;
                    const sDist = 400;
                    sunLight.position.set(
                        sDist * Math.cos(elRad) * Math.sin(azRad),
                        sDist * Math.sin(elRad),
                        sDist * Math.cos(elRad) * Math.cos(azRad)
                    );

                    // Fill light secundario para cañadas y laderas sombreadas
                    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
                    fillLight.position.set(-300, 200, -300);
                    scene.add(fillLight);

                    // 3. Plano del Terreno Orográfico 3D (1400m x 1400m, 48x48)
                    const groundGeo = new THREE.PlaneGeometry(1400, 1400, 56, 56);
                    groundGeo.rotateX(-Math.PI / 2);
                    const posAttr = groundGeo.attributes.position;
                    for (let i = 0; i < posAttr.count; i++) {{
                        const vx = posAttr.getX(i);
                        const vz = posAttr.getZ(i);
                        posAttr.setY(i, getTerrainElevation(vx, vz));
                    }}
                    groundGeo.computeVertexNormals();

                    const groundMat = new THREE.MeshStandardMaterial({{
                        color: 0x8a6240, // Marrón desierto árido característico
                        roughness: 0.94,
                        metalness: 0.05
                    }});
                    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
                    groundMesh.receiveShadow = true;
                    scene.add(groundMesh);

                    // Curvas de nivel topográficas (Contour Wireframe)
                    const wireGeo = groundGeo.clone();
                    const wireMat = new THREE.MeshBasicMaterial({{
                        color: 0x543c26,
                        wireframe: true,
                        transparent: true,
                        opacity: {'0.35' if layer_wireframe else '0.18'}
                    }});
                    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
                    wireMesh.position.y = 0.08;
                    scene.add(wireMesh);

                    // 4. Grupo de Objetos Urbanos (Pistas, Parques, Edificios)
                    const objectsGroup = new THREE.Group();
                    scene.add(objectsGroup);
                    const clickableMeshes = [];

                    const ELEMENT_COLORS = {{
                        'vivienda_social': 0x0284c7,
                        'vivienda_incremental': 0xea580c,
                        'parque_verde': 0x16a34a,
                        'centro_salud': 0xef4444,
                        'escuela': 0xf59e0b,
                        'parada_transporte': 0x8b5cf6,
                        'comercio_local': 0xd946ef,
                        'espacio_comunitario': 0x14b8a6,
                        'pista_vial': 0x475569
                    }};

                    elements.forEach(el => {{
                        const {{ x, z }} = coordsToLocal(el.coordinates);
                        const yCenter = getTerrainElevation(x, z);

                        // A. PISTAS Y CORREDORES VIALES CON ASFALTO, SARDINELES Y DEMARCACIÓN
                        if (el.type === 'pista_vial' && {'true' if layer_roads else 'false'}) {{
                            const roadPts = (el.pathPoints && el.pathPoints.length >= 2) ? el.pathPoints : [el.coordinates, [el.coordinates[0] + 0.002, el.coordinates[1]]];
                            const localWaypoints = roadPts.map(pt => coordsToLocal(pt));
                            const roadWidth = Math.max(6, el.roadWidth || 12);
                            const halfW = roadWidth / 2;
                            const curbW = Math.max(0.7, roadWidth * 0.1);

                            const sampled = [];
                            let distAccum = 0;
                            for (let i = 0; i < localWaypoints.length - 1; i++) {{
                                const p1 = localWaypoints[i];
                                const p2 = localWaypoints[i + 1];
                                const segDx = p2.x - p1.x;
                                const segDz = p2.z - p1.z;
                                const segLen = Math.hypot(segDx, segDz);
                                if (segLen < 0.1) continue;

                                const dirX = segDx / segLen;
                                const dirZ = segDz / segLen;
                                const nx = -dirZ;
                                const nz = dirX;

                                const steps = Math.max(2, Math.ceil(segLen / 4.0));
                                for (let s = 0; s <= steps; s++) {{
                                    const t = s / steps;
                                    const px = p1.x + segDx * t;
                                    const pz = p1.z + segDz * t;
                                    const py = getTerrainElevation(px, pz);
                                    sampled.push({{ x: px, z: pz, nx, nz, y: py, dist: distAccum + segLen * t }});
                                }}
                                distAccum += segLen;
                            }}

                            if (sampled.length >= 2) {{
                                const drapeOffset = 0.45;
                                
                                // 1. Calzada Asfáltica
                                const roadGeo = new THREE.BufferGeometry();
                                const roadVerts = [];
                                const roadIndices = [];

                                sampled.forEach(pt => {{
                                    const yBase = pt.y + drapeOffset;
                                    roadVerts.push(pt.x + pt.nx * -halfW, yBase, pt.z + pt.nz * -halfW);
                                    roadVerts.push(pt.x, yBase + 0.03, pt.z);
                                    roadVerts.push(pt.x + pt.nx * halfW, yBase, pt.z + pt.nz * halfW);
                                }});

                                for (let s = 0; s < sampled.length - 1; s++) {{
                                    const r1 = s * 3;
                                    const r2 = (s + 1) * 3;
                                    roadIndices.push(r1, r2, r2 + 1);
                                    roadIndices.push(r1, r2 + 1, r1 + 1);
                                    roadIndices.push(r1 + 1, r2 + 1, r2 + 2);
                                    roadIndices.push(r1 + 1, r2 + 2, r1 + 2);
                                }}

                                roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
                                roadGeo.setIndex(roadIndices);
                                roadGeo.computeVertexNormals();

                                const roadMat = new THREE.MeshStandardMaterial({{
                                    color: 0x475569, // Asfalto gris pizarra
                                    roughness: 0.84,
                                    metalness: 0.06,
                                    side: THREE.DoubleSide
                                }});
                                const roadMesh = new THREE.Mesh(roadGeo, roadMat);
                                roadMesh.receiveShadow = true;
                                roadMesh.userData = el;
                                objectsGroup.add(roadMesh);
                                clickableMeshes.push(roadMesh);

                                // 2. Sardineles de Hormigón y Faldas de Contención
                                const curbGeo = new THREE.BufferGeometry();
                                const curbVerts = [];
                                const curbIndices = [];

                                sampled.forEach(pt => {{
                                    const yBase = pt.y + drapeOffset;
                                    const ySkirt = pt.y - 1.4;
                                    // Izq: falda, tope exterior, sardinel
                                    curbVerts.push(pt.x + pt.nx * (-halfW - curbW), ySkirt, pt.z + pt.nz * (-halfW - curbW));
                                    curbVerts.push(pt.x + pt.nx * (-halfW - curbW), yBase + 0.14, pt.z + pt.nz * (-halfW - curbW));
                                    curbVerts.push(pt.x + pt.nx * -halfW, yBase + 0.08, pt.z + pt.nz * -halfW);
                                    // Der: sardinel, tope exterior, falda
                                    curbVerts.push(pt.x + pt.nx * halfW, yBase + 0.08, pt.z + pt.nz * halfW);
                                    curbVerts.push(pt.x + pt.nx * (halfW + curbW), yBase + 0.14, pt.z + pt.nz * (halfW + curbW));
                                    curbVerts.push(pt.x + pt.nx * (halfW + curbW), ySkirt, pt.z + pt.nz * (halfW + curbW));
                                }});

                                for (let s = 0; s < sampled.length - 1; s++) {{
                                    const c1 = s * 6;
                                    const c2 = (s + 1) * 6;
                                    curbIndices.push(c1, c2, c2 + 1);
                                    curbIndices.push(c1, c2 + 1, c1 + 1);
                                    curbIndices.push(c1 + 1, c2 + 1, c2 + 2);
                                    curbIndices.push(c1 + 1, c2 + 2, c1 + 2);
                                    curbIndices.push(c1 + 3, c2 + 3, c2 + 4);
                                    curbIndices.push(c1 + 3, c2 + 4, c1 + 4);
                                    curbIndices.push(c1 + 4, c2 + 4, c2 + 5);
                                    curbIndices.push(c1 + 4, c2 + 5, c1 + 5);
                                }}

                                curbGeo.setAttribute('position', new THREE.Float32BufferAttribute(curbVerts, 3));
                                curbGeo.setIndex(curbIndices);
                                curbGeo.computeVertexNormals();

                                const curbMat = new THREE.MeshStandardMaterial({{
                                    color: 0x94a3b8, // Hormigón claro
                                    roughness: 0.78,
                                    metalness: 0.12,
                                    side: THREE.DoubleSide
                                }});
                                const curbMesh = new THREE.Mesh(curbGeo, curbMat);
                                curbMesh.receiveShadow = true;
                                objectsGroup.add(curbMesh);

                                // 3. Demarcación Vial Blanca Discontinua Central
                                const linePoints = sampled.map(pt => new THREE.Vector3(pt.x, pt.y + drapeOffset + 0.06, pt.z));
                                const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
                                const lineMat = new THREE.LineDashedMaterial({{
                                    color: 0xf8fafc,
                                    dashSize: 3.5,
                                    gapSize: 2.5,
                                    linewidth: 2
                                }});
                                const centerLine = new THREE.Line(lineGeo, lineMat);
                                centerLine.computeLineDistances();
                                objectsGroup.add(centerLine);
                            }}
                        }}

                        // B. PARQUES Y ÁREAS VERDES BIOCLIMÁTICAS CON ÁRBOLES
                        else if (el.type === 'parque_verde' && {'true' if layer_parks else 'false'}) {{
                            const radius = Math.max(14, Math.sqrt(el.footprintArea / Math.PI));
                            const parkGeo = new THREE.CylinderGeometry(radius, radius * 1.05, 1.2, 28);
                            const parkMat = new THREE.MeshStandardMaterial({{
                                color: 0x16a34a,
                                roughness: 0.85
                            }});
                            const parkMesh = new THREE.Mesh(parkGeo, parkMat);
                            parkMesh.position.set(x, yCenter + 0.6, z);
                            parkMesh.receiveShadow = true;
                            parkMesh.userData = el;
                            objectsGroup.add(parkMesh);
                            clickableMeshes.push(parkMesh);

                            // Procedural Trees
                            const treeCount = Math.max(3, Math.min(8, Math.round(radius / 4.0)));
                            for (let i = 0; i < treeCount; i++) {{
                                const tAngle = (i / treeCount) * Math.PI * 2 + 0.3;
                                const tDist = (0.25 + (i % 3) * 0.22) * radius * 0.85;
                                const tx = x + Math.cos(tAngle) * tDist;
                                const tz = z + Math.sin(tAngle) * tDist;
                                const ty = getTerrainElevation(tx, tz);

                                // Trunk
                                const trunk = new THREE.Mesh(
                                    new THREE.CylinderGeometry(0.35, 0.45, 2.8, 6),
                                    new THREE.MeshStandardMaterial({{ color: 0x3d1a04 }})
                                );
                                trunk.position.set(tx, ty + 1.4, tz);
                                objectsGroup.add(trunk);

                                // Foliage
                                const foliage = new THREE.Mesh(
                                    new THREE.ConeGeometry(2.4, 5.0, 7),
                                    new THREE.MeshStandardMaterial({{ color: (i % 2 === 0) ? 0x047857 : 0x065f46, roughness: 0.7 }})
                                );
                                foliage.position.set(tx, ty + 4.6, tz);
                                foliage.castShadow = true;
                                objectsGroup.add(foliage);
                            }}
                        }}

                        // C. EDIFICACIONES VOLUMÉTRICAS CON ZÓCALO DE CIMENTACIÓN
                        else if ({'true' if layer_buildings else 'false'}) {{
                            const width = Math.max(14, Math.sqrt(el.footprintArea) * 0.85);
                            const depth = Math.max(12, el.footprintArea / width);
                            const height = Math.max(4.0, (el.floors || 2) * 3.2);

                            // 1. Zócalo nivelador de cimentación (ancla el edificio en la ladera sin flotar)
                            const plinthHeight = 4.5;
                            const plinthMesh = new THREE.Mesh(
                                new THREE.BoxGeometry(width * 1.04, plinthHeight, depth * 1.04),
                                new THREE.MeshStandardMaterial({{ color: 0x1e293b, roughness: 0.95 }})
                            );
                            plinthMesh.position.set(x, yCenter - (plinthHeight / 2) + 0.2, z);
                            plinthMesh.receiveShadow = true;
                            objectsGroup.add(plinthMesh);

                            // 2. Cuerpo del Edificio con color normativo
                            const bCol = ELEMENT_COLORS[el.type] || 0x0284c7;
                            const buildingMesh = new THREE.Mesh(
                                new THREE.BoxGeometry(width, height, depth),
                                new THREE.MeshStandardMaterial({{
                                    color: bCol,
                                    roughness: 0.55,
                                    metalness: 0.15
                                }})
                            );
                            buildingMesh.position.set(x, yCenter + (height / 2) + 0.2, z);
                            buildingMesh.castShadow = true;
                            buildingMesh.receiveShadow = true;
                            buildingMesh.userData = el;
                            objectsGroup.add(buildingMesh);
                            clickableMeshes.push(buildingMesh);

                            // 3. Techo / Cubierta Bioclimática
                            const roofMesh = new THREE.Mesh(
                                new THREE.BoxGeometry(width * 1.02, 0.4, depth * 1.02),
                                new THREE.MeshStandardMaterial({{ color: 0x0f172a, roughness: 0.8 }})
                            );
                            roofMesh.position.set(x, yCenter + height + 0.4, z);
                            objectsGroup.add(roofMesh);
                        }}
                    }});

                    // 5. Detección Hover / Clic con Raycaster
                    const raycaster = new THREE.Raycaster();
                    const mouse = new THREE.Vector2();

                    container.addEventListener('mousemove', (e) => {{
                        const rect = renderer.domElement.getBoundingClientRect();
                        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

                        raycaster.setFromCamera(mouse, camera);
                        const hits = raycaster.intersectObjects(clickableMeshes);

                        if (hits.length > 0) {{
                            const d = hits[0].object.userData;
                            tooltip.style.display = 'block';
                            tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
                            tooltip.style.top = (e.clientY - rect.top + 14) + 'px';
                            tooltip.innerHTML = `
                                <strong style="font-size: 12px; color: #38bdf8;">${{d.name}}</strong><br>
                                <span style="text-transform: uppercase; font-size: 10px; color: #94a3b8;">${{d.type.replace('_', ' ')}}</span><br>
                                • Huella: <strong>${{d.footprintArea || 0}} m²</strong> | Pisos: <strong>${{d.floors || 1}}</strong><br>
                                • Capacidad: <strong>${{d.populationCapacity || 0}} hab</strong><br>
                                • Presupuesto: <strong style="color: #34d399;">$${{(d.costEstimateUSD || 0).toLocaleString()}} USD</strong>
                            `;
                        }} else {{
                            tooltip.style.display = 'none';
                        }}
                    }});

                    // 6. Controles de Cámara
                    window.setViewMode = function(mode) {{
                        if (mode === 'top') {{
                            camera.position.set(0, 520, 0.1);
                        }} else if (mode === 'ground') {{
                            camera.position.set(0, 30, 220);
                        }} else {{
                            camera.position.set(240, 240, 320);
                        }}
                        controls.target.set(0, 0, 0);
                        controls.update();
                    }};

                    window.resetCamera = function() {{
                        camera.position.set(240, 240, 320);
                        controls.target.set(0, 0, 0);
                        controls.update();
                    }};

                    // 7. Herramienta de Trazado Vial Interactiva
                    let isDrafting = false;
                    window.toggleRoadDrafting = function() {{
                        isDrafting = !isDrafting;
                        const btn = document.getElementById('btn-road');
                        const hint = document.getElementById('road-hint');
                        if (isDrafting) {{
                            btn.style.background = '#f43f5e';
                            btn.innerText = 'Finalizar Trazado';
                            hint.innerText = 'Haz clic en el relieve del cerro para colocar tramos viales';
                        }} else {{
                            btn.style.background = '#10b981';
                            btn.innerText = '+ Trazar Vía';
                            hint.innerText = 'Vía consolidada y adaptada a la ladera';
                        }}
                    }};

                    container.addEventListener('click', (e) => {{
                        if (!isDrafting) return;
                        const rect = renderer.domElement.getBoundingClientRect();
                        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

                        raycaster.setFromCamera(mouse, camera);
                        const hits = raycaster.intersectObject(groundMesh);
                        if (hits.length > 0) {{
                            const p = hits[0].point;
                            const roadNode = new THREE.Mesh(
                                new THREE.CylinderGeometry(6, 6, 0.5, 16),
                                new THREE.MeshStandardMaterial({{ color: 0x475569, roughness: 0.85 }})
                            );
                            roadNode.position.set(p.x, p.y + 0.3, p.z);
                            objectsGroup.add(roadNode);
                        }}
                    }});

                    // Resize Observer
                    const ro = new ResizeObserver(() => {{
                        const w = container.clientWidth;
                        camera.aspect = w / 640;
                        camera.updateProjectionMatrix();
                        renderer.setSize(w, 640);
                    }});
                    ro.observe(container);

                    // Render Loop
                    function animate() {{
                        requestAnimationFrame(animate);
                        controls.update();
                        renderer.render(scene, camera);
                    }}
                    animate();
                </script>
            </body>
            </html>
            """
            components.html(html_threejs_code, height=660)

        else:
            # 2D GIS Cartography View (Pydeck)
            st.markdown("#### 🗺️ Cartografía 2D GIS: Red Vial, Manzanas e Isócronas")
            
            df_points = []
            for el in elements:
                coords = el.get('coordinates', center_coords)
                el_type = el.get('type', 'vivienda_social')
                
                color_rgb = {
                    'vivienda_social': [2, 132, 199, 220],
                    'vivienda_incremental': [234, 88, 12, 220],
                    'parque_verde': [22, 163, 74, 220],
                    'centro_salud': [239, 68, 68, 230],
                    'escuela': [245, 158, 11, 230],
                    'parada_transporte': [139, 92, 246, 230],
                    'comercio_local': [217, 70, 239, 230],
                    'espacio_comunitario': [20, 184, 166, 230],
                    'pista_vial': [71, 85, 105, 230]
                }.get(el_type, [148, 163, 184, 200])

                df_points.append({
                    'name': el.get('name', 'Elemento Urbano'),
                    'type': el_type.replace('_', ' ').capitalize(),
                    'cost': el.get('costEstimateUSD', 0),
                    'units': el.get('unitsCount', 0),
                    'lon': coords[0],
                    'lat': coords[1],
                    'color': color_rgb,
                    'radius': max(10, int(el.get('footprintArea', 100) * 0.08))
                })

            df_pydeck = pd.DataFrame(df_points)

            scatter_layer = pdk.Layer(
                "ScatterplotLayer",
                data=df_pydeck,
                get_position='[lon, lat]',
                get_color='color',
                get_radius='radius',
                pickable=True,
                opacity=0.85,
                stroked=True,
                filled=True,
                radius_min_pixels=6,
                radius_max_pixels=28,
                line_width_min_pixels=1,
                get_line_color=[255, 255, 255, 200]
            )

            view_state = pdk.ViewState(
                longitude=center_coords[0],
                latitude=center_coords[1],
                zoom=16.3,
                pitch=40,
                bearing=10
            )

            deck = pdk.Deck(
                layers=[scatter_layer],
                initial_view_state=view_state,
                tooltip={"html": "<b>{name}</b><br/>Tipo: {type}<br/>Presupuesto: ${cost} USD"},
                map_style="mapbox://styles/mapbox/dark-v10" if theme == 'dark' else "mapbox://styles/mapbox/light-v10"
            )
            st.pydeck_chart(deck)

        # Bottom KPIs summary row
        st.markdown(f"""
        <div class="kpi-grid">
            <div class="kpi-pill">
                <span class="kpi-val">{kpis.get('services15MinCoverage', 0)}%</span>
                <span class="kpi-label">Cobertura 15 Min</span>
            </div>
            <div class="kpi-pill">
                <span class="kpi-val">{kpis.get('greenSpacePerCapita', 0)}</span>
                <span class="kpi-label">Área Verde m²/hab</span>
            </div>
            <div class="kpi-pill">
                <span class="kpi-val">{kpis.get('solarComfortIndex', 0)}/100</span>
                <span class="kpi-label">Confort Solar</span>
            </div>
            <div class="kpi-pill">
                <span class="kpi-val">${kpis.get('estimatedInvestmentUSD', 0):,}</span>
                <span class="kpi-label">Inversión Estimada</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

    # Fixed Floating Action Button (Modern Floating UX over 3D Map Viewport)
    st.markdown("""
    <style>
    .floating-copilot-trigger-box {
        position: fixed;
        bottom: 26px;
        right: 28px;
        z-index: 999999;
    }
    .floating-copilot-trigger-box button {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%) !important;
        color: #ffffff !important;
        font-weight: 800 !important;
        border: 1px solid rgba(255, 255, 255, 0.5) !important;
        border-radius: 28px !important;
        padding: 12px 22px !important;
        font-size: 13.5px !important;
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.55) !important;
        transition: all 0.25s ease !important;
    }
    .floating-copilot-trigger-box button:hover {
        transform: translateY(-2px) scale(1.04) !important;
        box-shadow: 0 15px 35px rgba(124, 58, 237, 0.7) !important;
    }
    </style>
    """, unsafe_allow_html=True)

    with st.container():
        st.markdown('<div class="floating-copilot-trigger-box">', unsafe_allow_html=True)
        if st.button("🤖 Asistente LangChain • Ventana Flotante", key="btn_floating_fixed_bottom", type="primary"):
            render_copilot_floating_dialog(city, scenario_id, elements, kpis, copilot_engine, theme)
        st.markdown('</div>', unsafe_allow_html=True)
