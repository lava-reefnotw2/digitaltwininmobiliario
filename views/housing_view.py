import streamlit as st
import plotly.graph_objects as go
from typing import Dict, Any, List
from core.explainability import (
    apply_clean_chart_theme,
    explain_housing_finances,
    explain_housing_typologies_table
)

def render_housing_view(city: Dict[str, Any], scenario_id: str, elements: List[Dict[str, Any]], kpis: Dict[str, Any]):
    """
    Simulación de Vivienda Social, Déficit Habitacional y Modelado Incremental.
    """
    neighborhood = city.get('neighborhood', 'Quebrada Huáscar')
    city_name = city.get('name', 'Lima')
    initial_pop = city.get('initialPopulation', 15000)
    un_habitat_index = city.get('unHabitatSlumIndex', 45.0)

    st.markdown(f"""
    <div class="hero-banner">
        <span class="badge badge-purple">Simulación Habitacional • ONU-Hábitat</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">
            Simulador de Vivienda Social e Incremental
        </h1>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">
            Evaluación del déficit cualitativo y cuantitativo para {neighborhood}, cálculo de subsidios y densificación controlada.
        </p>
    </div>
    """, unsafe_allow_html=True)

    # Top KPI cards
    total_units = kpis.get('totalHousingUnits', 0)
    pop_housed = kpis.get('populationHoused', 0)
    density = kpis.get('densityHabHa', 0)
    est_cost = kpis.get('estimatedInvestmentUSD', 0)

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Viviendas Proyectadas", f"{total_units:,} unidades", delta="Módulos Habitables")
    with col2:
        st.metric("Población Beneficiada", f"{pop_housed:,} hab", delta=f"{density} hab/ha")
    with col3:
        st.metric("Inversión Requerida", f"${est_cost:,} USD", delta="Costo Obras")
    with col4:
        st.metric("Índice de Vulnerabilidad", f"{un_habitat_index:.1f}%", delta="UN-Habitat Slum", delta_color="inverse")

    st.markdown("---")

    # Interactive Simulation Sliders
    c_left, c_right = st.columns([1.5, 2])
    with c_left:
        st.markdown("### 🎛️ Parámetros de Simulación")
        density_target = st.slider("Objetivo de Densidad (hab/ha)", 150, 600, density if density > 0 else 320)
        pct_incremental = st.slider("% Vivienda Incremental (Núcleo Progresivo)", 0, 100, 60)
        cost_m2 = st.slider("Costo de Construcción ($/m²)", 200, 750, 380)
        unit_area = st.slider("Área Útil por Vivienda (m²)", 35, 90, 48)
        bfh_subsidy = st.number_input("Subsidio Techo Propio BFH ($/módulo)", value=8300, step=500)

        # Calculated outputs
        calc_total_units = int((density_target * city.get('areaHectares', 50)) / 4.2)
        calc_incremental_units = int(calc_total_units * (pct_incremental / 100.0))
        calc_consolidated_units = calc_total_units - calc_incremental_units
        calc_budget = int(calc_total_units * unit_area * cost_m2)
        calc_subsidies = int(calc_total_units * bfh_subsidy)
        net_community_investment = max(0, calc_budget - calc_subsidies)

    with c_right:
        st.markdown("### 📊 Estructura de Financiamiento y Tipologías")
        # Plotly Bar Chart: Financiación
        fig = go.Figure()
        sub_pct = (calc_subsidies / calc_budget * 100) if calc_budget > 0 else 0
        com_pct = (net_community_investment / calc_budget * 100) if calc_budget > 0 else 0

        fig.add_trace(go.Bar(
            name='Subsidio Estatal (Techo Propio BFH)',
            x=['Inversión Total'],
            y=[calc_subsidies],
            text=[f"${calc_subsidies:,} ({sub_pct:.0f}%)"],
            textposition='auto',
            marker_color='#10b981'
        ))
        fig.add_trace(go.Bar(
            name='Cofinanciamiento / Crédito Comunitario',
            x=['Inversión Total'],
            y=[net_community_investment],
            text=[f"${net_community_investment:,} ({com_pct:.0f}%)"],
            textposition='auto',
            marker_color='#06b6d4'
        ))
        apply_clean_chart_theme(
            fig,
            height=300,
            title="Estructura Presupuestaria de Financiamiento Habitacional",
            yaxis_title="Monto Inversión (USD)"
        )
        fig.update_layout(
            barmode='stack',
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig, use_container_width=True)
        explain_housing_finances(
            float(calc_budget),
            float(calc_subsidies),
            float(net_community_investment),
            calc_total_units,
            calc_incremental_units,
            calc_consolidated_units
        )

        # Summary box
        st.info(f"""
        **Resumen del Modelo Habitacional Proyectado:**
        - **{calc_total_units:,} unidades totales** proyectadas para albergar a ~{int(calc_total_units * 4.2):,} personas.
        - **{calc_incremental_units:,} módulos progresivos** con núcleos sanitarios húmedos iniciales.
        - **{calc_consolidated_units:,} viviendas consolidadas** de 2 a 3 niveles sismorresistentes.
        - Cobertura de subsidio estatal: **{(calc_subsidies / (calc_budget or 1) * 100):.1f}%** de la obra total.
        """)

    # Constructive Typologies Table
    st.markdown("### 🧱 Tipologías Constructivas Bioclimáticas Evaluadas")
    tipologias = [
        {"Tipología": "Núcleo Básico Incremental (Ladera)", "Área Inicial": "42 m²", "Costo Aprox": "$16,500 USD", "Material": "Placas de concreto armado y pircas de piedra", "Confort Térmico": "82/100"},
        {"Tipología": "Vivienda Progresiva Andenería", "Área Inicial": "54 m²", "Costo Aprox": "$22,000 USD", "Material": "Sillar volcánico / adobe estabilizado", "Confort Térmico": "89/100"},
        {"Tipología": "Vivienda Colectiva 3 Pisos", "Área Inicial": "68 m²", "Costo Aprox": "$29,500 USD", "Material": "Mampostería confinada con losas aligeradas", "Confort Térmico": "78/100"}
    ]
    st.dataframe(tipologias, use_container_width=True)
    explain_housing_typologies_table(tipologias)
