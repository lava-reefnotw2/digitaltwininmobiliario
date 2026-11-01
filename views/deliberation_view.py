import streamlit as st
import plotly.graph_objects as go
from typing import Dict, Any, List
from core.explainability import apply_clean_chart_theme, explain_citizen_votes

def render_deliberation_view(city: Dict[str, Any], scenario_id: str, forum_threads: List[Dict[str, Any]], budget_allocation: Dict[str, int]):
    """
    Participación Ciudadana: Votación de Presupuesto y Foros de Deliberación Vecinal.
    """
    neighborhood = city.get('neighborhood', 'Quebrada Huáscar')

    st.markdown(f"""
    <div class="hero-banner">
        <span class="badge badge-amber">Democracia Participativa • Presupuesto</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">
            Participación Ciudadana & Asambleas Vecinales
        </h1>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">
            Deliberación comunitaria y asignación de fondos del presupuesto participativo para {neighborhood}.
        </p>
    </div>
    """, unsafe_allow_html=True)

    tab1, tab2 = st.tabs(["💰 Presupuesto Participativo", "💬 Foros de Deliberación Vecinal"])

    with tab1:
        c_left, c_right = st.columns([1.3, 1.7])
        with c_left:
            st.markdown("### 🗳️ Asignación de Partidas (%)")
            st.caption("Distribuye el 100% de los fondos comunales entre las prioridades del barrio.")

            v_vivienda = st.slider("🏠 Vivienda Social & Mejoramiento", 0, 100, budget_allocation.get("vivienda_social", 30))
            v_espacio = st.slider("🌳 Parques & Mitigación Ambiental", 0, 100, budget_allocation.get("espacio_publico", 25))
            v_vial = st.slider("🛣️ Vías, Pistas & Muros de Contención", 0, 100, budget_allocation.get("infraestructura_vial", 20))
            v_equip = st.slider("🏥 Salud & Equipamiento Social", 0, 100, budget_allocation.get("equipamiento_servicios", 25))

            total_pct = v_vivienda + v_espacio + v_vial + v_equip
            if total_pct == 100:
                st.success("✅ Suma total: 100% distribuido correctamente.")
            else:
                st.warning(f"⚠️ Suma actual: {total_pct}% (Ajusta los sliders para alcanzar exactamente 100%).")

            if st.button("Guardar Mi Voto Comunitario", type="primary"):
                st.session_state.budget_allocation = {
                    "vivienda_social": v_vivienda,
                    "espacio_publico": v_espacio,
                    "infraestructura_vial": v_vial,
                    "equipamiento_servicios": v_equip
                }
                st.balloons()
                st.success("¡Tu voto ha sido registrado en el conteo participativo!")

        with c_right:
            st.markdown("### 📊 Conteo de Asignación Presupuestaria")
            labels = ['Vivienda Social', 'Espacios Públicos', 'Infraestructura Vial', 'Salud y Servicios']
            values = [v_vivienda, v_espacio, v_vial, v_equip]
            colors = ['#38bdf8', '#10b981', '#64748b', '#f43f5e']
            fig = go.Figure(data=[go.Pie(
                labels=labels,
                values=values,
                hole=.48,
                textinfo='label+percent',
                textposition='auto',
                marker=dict(colors=colors, line=dict(color='#0f172a', width=2))
            )])
            apply_clean_chart_theme(
                fig,
                height=340,
                title="Distribución Porcentual del Presupuesto Participativo"
            )
            fig.update_layout(
                legend=dict(orientation="h", yanchor="bottom", y=-0.2, xanchor="center", x=0.5)
            )
            st.plotly_chart(fig, use_container_width=True)
            explain_citizen_votes(labels, values)

    with tab2:
        st.markdown("### 🗣️ Hilos de Discusión en Asamblea")
        
        # New comment form
        with st.expander("✍️ Crear Nueva Propuesta o Tema de Debate", expanded=False):
            author_input = st.text_input("Tu Nombre / Organización:", value="Vecino(a) Comunitario(a)")
            title_input = st.text_input("Título de la Propuesta:")
            content_input = st.text_area("Descripción de la propuesta o necesidad barrial:")
            if st.button("Publicar en la Asamblea", type="primary"):
                if title_input.strip() and content_input.strip():
                    new_thread = {
                        'id': f"th-{len(forum_threads) + 1}",
                        'author': author_input,
                        'role': 'comunidad',
                        'title': title_input,
                        'content': content_input,
                        'timestamp': 'Recién publicado',
                        'votes': 1,
                        'comments': 0
                    }
                    forum_threads.insert(0, new_thread)
                    st.success("¡Propuesta publicada con éxito!")
                    st.rerun()

        # Display threads
        for thread in forum_threads:
            st.markdown(f"""
            <div class="bento-card">
                <div class="bento-header">
                    <div>
                        <span class="badge badge-amber">{thread.get('role', 'comunidad').upper()}</span>
                        <strong style="margin-left: 0.5rem; font-size: 1.05rem; color: #fff;">{thread.get('title')}</strong>
                    </div>
                    <span style="font-size: 0.8rem; color: #94a3b8;">{thread.get('timestamp')}</span>
                </div>
                <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.75rem;">
                    {thread.get('content')}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #94a3b8;">
                    <span>Por: <strong>{thread.get('author')}</strong></span>
                    <span>👍 {thread.get('votes', 0)} Votos a favor • 💬 {thread.get('comments', 0)} Respuestas</span>
                </div>
            </div>
            """, unsafe_allow_html=True)
