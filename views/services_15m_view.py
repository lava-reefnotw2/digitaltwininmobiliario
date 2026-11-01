import streamlit as st
import plotly.graph_objects as go
from typing import Dict, Any, List
from core.explainability import apply_clean_chart_theme, explain_15min_services

def render_services_15m_view(city: Dict[str, Any], scenario_id: str, elements: List[Dict[str, Any]], kpis: Dict[str, Any]):
    """
    Servicios & Accesibilidad Peatonal a 15 Minutos con cálculo de isócronas.
    """
    neighborhood = city.get('neighborhood', 'Quebrada Huáscar')

    st.markdown(f"""
    <div class="hero-banner">
        <span class="badge badge-blue">Urbanismo de Proximidad • 15 Minutos</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">
            Accesibilidad Peatonal & Servicios Esenciales
        </h1>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">
            Diagnóstico de proximidad a pie para {neighborhood} considerando pendientes orográficas de ladera.
        </p>
    </div>
    """, unsafe_allow_html=True)

    # Count existing services
    counts = {
        'salud': sum(1 for e in elements if e.get('type') == 'centro_salud'),
        'educacion': sum(1 for e in elements if e.get('type') == 'escuela'),
        'parque': sum(1 for e in elements if e.get('type') == 'parque_verde'),
        'transporte': sum(1 for e in elements if e.get('type') == 'parada_transporte'),
        'comunitario': sum(1 for e in elements if e.get('type') == 'espacio_comunitario'),
    }

    # Coverage metrics
    coverage_15m = kpis.get('services15MinCoverage', 45)
    transit_score = kpis.get('transitAccessibilityScore', 50)
    green_capita = kpis.get('greenSpacePerCapita', 1.2)

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Cobertura Global 15m", f"{coverage_15m}%", delta="Acceso Peatonal")
    with col2:
        st.metric("Puntos de Salud", f"{counts['salud']} módulos", delta="Postas I-2")
    with col3:
        st.metric("Escuelas & Colegios", f"{counts['educacion']} centros", delta="Aulas Primaria")
    with col4:
        st.metric("Conectividad Transporte", f"{transit_score}/100", delta="Paraderos SIT")

    st.markdown("---")

    c1, c2 = st.columns(2)
    with c1:
        st.markdown("### ⏱️ Cobertura por Isócrona Peatonal")
        categories = ['Salud (Posta)', 'Educación', 'Áreas Verdes', 'Transporte', 'Comercio']
        walk_5min = [min(100, counts['salud'] * 35), min(100, counts['educacion'] * 40), min(100, counts['parque'] * 30), min(100, counts['transporte'] * 45), 75]
        walk_15min = [min(100, counts['salud'] * 70 + 20), min(100, counts['educacion'] * 65 + 25), min(100, counts['parque'] * 60 + 30), min(100, counts['transporte'] * 75 + 20), 92]
        fig = go.Figure()
        fig.add_trace(go.Bar(
            name='A menos de 5 min (< 350m)',
            x=categories,
            y=walk_5min,
            text=[f"{v:.0f}%" for v in walk_5min],
            textposition='auto',
            marker_color='#10b981'
        ))
        fig.add_trace(go.Bar(
            name='A menos de 15 min (< 1,000m)',
            x=categories,
            y=walk_15min,
            text=[f"{v:.0f}%" for v in walk_15min],
            textposition='auto',
            marker_color='#06b6d4'
        ))
        apply_clean_chart_theme(
            fig,
            height=340,
            title="Cobertura Peatonal por Categoría de Servicio (%)",
            xaxis_title="Equipamiento Urbano",
            yaxis_title="% Población con Acceso"
        )
        fig.update_layout(
            barmode='group',
            yaxis=dict(range=[0, 105]),
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig, use_container_width=True)
        explain_15min_services(counts, green_capita, walk_5min, walk_15min, categories)

    with c2:
        st.markdown("### 🎯 Brechas Críticas y Acciones Recomendadas")
        
        # Recommendations list
        if counts['salud'] < 2:
            st.error("🚨 **Déficit Severo de Salud:** Menos de 2 postas médicas en el barrio. Tiempo de traslado de emergencia supera los 25 minutos.")
        else:
            st.success("✅ **Red Sanitaria:** Cobertura adecuada para atención primaria.")

        if counts['parque'] < 3:
            st.warning(f"⚠️ **Déficit de Parques:** Actualmente hay {green_capita} m²/hab. Meta OMS: 9.0 m²/hab.")
        else:
            st.success("✅ **Espacios Verdes:** Buen equilibrio bioclimático.")

        if counts['transporte'] < 2:
            st.warning("⚠️ **Transporte:** Se requiere habilitar paraderos articulados a la red troncal.")
        else:
            st.success("✅ **Transporte:** Paraderos conectados a escaleras y corredores viales.")

        st.info("""
        **Fórmula de Caminabilidad con Penalización de Pendiente:**
        `T_caminata = (Distancia / 75 m/min) * (1 + (Pendiente% / 100) * 1.5)`
        En laderas con pendientes del 30%, cada 100 metros horizontales demandan 1.45 veces más energía y tiempo.
        """)
