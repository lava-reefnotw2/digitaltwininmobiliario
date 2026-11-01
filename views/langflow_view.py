import json
import streamlit as st
from typing import Dict, Any, List

def render_langflow_view(preset_flows: List[Dict[str, Any]]):
    """
    Langflow AI Studio & Orquestador Low-Code de Agentes Territoriales.
    """
    st.markdown("""
    <div class="hero-banner">
        <span class="badge badge-purple">Langflow 1.0+ • Agentes Espaciales</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">
            Langflow AI Studio & Orquestador Low-Code
        </h1>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">
            Diseño visual y ejecución de flujos de agentes con recuperación semántica (RAG) y llamadas a herramientas espaciales 3D.
        </p>
    </div>
    """, unsafe_allow_html=True)

    flow_names = [f.get('name', 'Flujo') for f in preset_flows]
    selected_name = st.selectbox("Selecciona Flujo Preconfigurado:", flow_names)
    
    current_flow = next((f for f in preset_flows if f.get('name') == selected_name), preset_flows[0] if preset_flows else {})

    st.markdown(f"**Categoría:** `{current_flow.get('category', 'General')}` | **Descripción:** {current_flow.get('description', '')}")

    c_nodes, c_runner = st.columns([1.8, 1.2])

    with c_nodes:
        st.markdown("### 🔀 Nodos del Flujo de Trabajo")
        nodes = current_flow.get('nodes', [])
        for node in nodes:
            node_type = node.get('type', 'model')
            badge_color = {
                'input': 'badge-blue',
                'model': 'badge-purple',
                'vector_store': 'badge',
                'spatial_tool': 'badge-amber',
                'output': 'badge'
            }.get(node_type, 'badge')

            st.markdown(f"""
            <div class="bento-card" style="margin-bottom: 0.75rem; padding: 1rem 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <div>
                        <span class="badge {badge_color}">{node_type.upper()}</span>
                        <strong style="margin-left: 0.5rem; color: #fff; font-size: 1rem;">{node.get('name')}</strong>
                    </div>
                    <span style="font-size: 0.8rem; color: #94a3b8;">ID: {node.get('id')}</span>
                </div>
                <p style="font-size: 0.85rem; color: #cbd5e1; margin: 0 0 0.5rem 0;">
                    {node.get('description', '')}
                </p>
                <div style="display: flex; gap: 0.75rem; font-size: 0.75rem; color: #94a3b8;">
                    <span>📥 Entradas: {len(node.get('inputs', []))}</span>
                    <span>📤 Salidas: {len(node.get('outputs', []))}</span>
                </div>
            </div>
            """, unsafe_allow_html=True)

    with c_runner:
        st.markdown("### ⚡ Simulador de Ejecución")
        st.caption("Prueba la cadena del flujo en Python con parámetros de entrada.")

        in_coord = st.text_input("Parámetro: Coordenadas de Evaluación", value="-76.9935, -11.9860")
        in_slope = st.number_input("Parámetro: Pendiente Local (%)", value=24.5, step=1.0)
        in_use = st.selectbox("Parámetro: Uso Propuesto", ["Vivienda Social Incremental", "Posta Médica I-2", "Parque Bioclimático"])

        if st.button("Ejecutar Flujo de Agente", type="primary", use_container_width=True):
            with st.spinner("Procesando consulta en Vector Store y validando normativas RNE..."):
                import time
                time.sleep(0.4)
                st.success("✅ Flujo ejecutado con éxito.")
                st.markdown(f"""
                <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 14px;">
                    <strong style="color: #34d399;">Dictamen Territorial Generado:</strong><br>
                    <p style="font-size: 0.85rem; color: #e2e8f0; margin: 6px 0 0 0;">
                        • Coordenadas: <code>{in_coord}</code><br>
                        • Pendiente: <strong>{in_slope}%</strong> (Apto con andenería estructural y muros de contención)<br>
                        • Viabilidad: <span style="color: #34d399; font-weight: bold;">VIABLE CONDICIONADO</span><br>
                        • Retiro reglamentario exigido: 3.0m sobre eje vial según PLANMET 2040.
                    </p>
                </div>
                """, unsafe_allow_html=True)

        st.markdown("---")
        st.markdown("### 💾 Exportar Flujo")
        json_flow = json.dumps(current_flow, indent=2)
        st.download_button(
            label="Descargar JSON Langflow 1.0+",
            data=json_flow,
            file_name=f"{current_flow.get('id', 'flow')}.json",
            mime="application/json",
            use_container_width=True
        )
