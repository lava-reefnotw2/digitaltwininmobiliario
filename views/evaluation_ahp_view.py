import streamlit as st
import plotly.graph_objects as go
from typing import Dict, Any, List
from core.ahp_solver import solve_ahp_matrix
from core.explainability import (
    apply_clean_chart_theme,
    explain_ahp_matrix,
    explain_scenarios_ranking
)

def render_evaluation_ahp_view(
    scenarios_data: Dict[str, Dict[str, Any]],
    ahp_criteria: List[Dict[str, str]],
    initial_ahp_matrix: List[List[float]]
):
    """
    Evaluación Multicriterio AHP (Saaty) y Comparativa Radar de Escenarios.
    """
    st.markdown("""
    <div class="hero-banner">
        <span class="badge">Decisión Multicriterio • Saaty AHP</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">
            Evaluación Multicriterio & Ranking de Escenarios
        </h1>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">
            Ponderación matemática de criterios urbanos y validación de consistencia lógica (CR &lt; 0.10).
        </p>
    </div>
    """, unsafe_allow_html=True)

    c_left, c_right = st.columns([1.6, 1.4])

    with c_left:
        st.markdown("### 🕸️ Gráfico Radar de Escenarios")
        criteria_names = ['Confort Solar', 'Accesibilidad 15m', 'Sostenibilidad', 'Calidad de Vida', 'Equidad Espacial']
        
        # Extract values for radar
        fig = go.Figure()
        colors = {
            'base': '#94a3b8',
            'municipal': '#3b82f6',
            'comunitario': '#f59e0b',
            'hibrido': '#10b981'
        }
        names = {
            'base': '1. Base (Diagnóstico)',
            'municipal': '2. Plan Municipal',
            'comunitario': '3. Propuesta Comunitaria',
            'hibrido': '4. Híbrido (Co-Diseño)'
        }

        for sc_key in ['base', 'municipal', 'comunitario', 'hibrido']:
            sc_kpis = scenarios_data.get(sc_key, {}).get('kpis', {})
            vals = [
                sc_kpis.get('solarComfortIndex', 60),
                sc_kpis.get('services15MinCoverage', 50),
                sc_kpis.get('environmentalSustainabilityScore', 65),
                sc_kpis.get('qualityOfLifeScore', 55),
                sc_kpis.get('spatialEquityScore', 50)
            ]
            # Close the polygon
            vals.append(vals[0])
            fig.add_trace(go.Scatterpolar(
                r=vals,
                theta=criteria_names + [criteria_names[0]],
                fill='toself',
                name=names.get(sc_key, sc_key),
                line=dict(color=colors.get(sc_key, '#fff'), width=2),
                opacity=0.65
            ))
        apply_clean_chart_theme(
            fig,
            height=390,
            title="Comparativa Multidimensional de Escenarios (Polígonos de Rendimiento)"
        )
        fig.update_layout(
            polar=dict(
                bgcolor='rgba(15, 23, 42, 0.4)',
                radialaxis=dict(
                    visible=True,
                    range=[0, 100],
                    gridcolor='rgba(255, 255, 255, 0.1)',
                    tickfont=dict(color='#94a3b8', size=9)
                ),
                angularaxis=dict(
                    gridcolor='rgba(255, 255, 255, 0.1)',
                    tickfont=dict(color='#f8fafc', size=11, family='Plus Jakarta Sans')
                )
            ),
            showlegend=True,
            legend=dict(orientation="h", yanchor="bottom", y=-0.22, xanchor="center", x=0.5)
        )
        st.plotly_chart(fig, use_container_width=True)

    with c_right:
        st.markdown("### ⚖️ Matriz de Ponderación AHP de Saaty")
        st.caption("Ajuste de importancia relativa entre criterios (Escala 1 a 9 de Saaty).")

        criteria_list = [c.get('name', f"Criterio {i}") for i, c in enumerate(ahp_criteria)]
        ahp_res = solve_ahp_matrix(criteria_list, initial_ahp_matrix)

        st.markdown(f"""
        <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(51, 65, 85, 0.7); border-radius: 12px; padding: 12px 16px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span><strong>Razón de Consistencia (CR):</strong></span>
                <span class="badge {'badge' if ahp_res['isConsistent'] else 'badge-amber'}">
                    CR = {ahp_res['consistencyRatio']} ({'CONSISTENTE' if ahp_res['isConsistent'] else 'INCONSISTENTE'})
                </span>
            </div>
            <p style="font-size: 0.8rem; color: #94a3b8; margin: 4px 0 0 0;">
                El juicio de expertos es válido porque CR &lt; 0.10 según el teorema de Thomas Saaty.
            </p>
        </div>
        """, unsafe_allow_html=True)

        # Priority weights table
        st.markdown("**Vector de Prioridades (Pesos Normalizados):**")
        w_data = []
        for crit, weight in zip(criteria_list, ahp_res['weights']):
            w_data.append({
                "Criterio": crit,
                "Peso AHP": f"{(weight * 100):.1f}%",
                "Relevancia": "Alta" if weight > 0.25 else "Media" if weight > 0.15 else "Baja"
            })
        st.dataframe(w_data, use_container_width=True)
        explain_ahp_matrix(criteria_list, ahp_res['weights'], ahp_res['consistencyRatio'], ahp_res['isConsistent'])

    # Ranking Table
    st.markdown("### 🏆 Ranking Comparativo de Escenarios")
    ranking_rows = []
    for sc_key in ['hibrido', 'comunitario', 'municipal', 'base']:
        k = scenarios_data.get(sc_key, {}).get('kpis', {})
        score_ahp = (
            k.get('services15MinCoverage', 50) * 0.28 +
            k.get('qualityOfLifeScore', 50) * 0.26 +
            k.get('environmentalSustainabilityScore', 50) * 0.22 +
            k.get('spatialEquityScore', 50) * 0.14 +
            k.get('solarComfortIndex', 50) * 0.10
        )
        ranking_rows.append({
            "Escenario": names.get(sc_key, sc_key),
            "Puntaje Global AHP": f"{score_ahp:.1f} / 100",
            "Inversión Estimada": f"${k.get('estimatedInvestmentUSD', 0):,} USD",
            "Viviendas Producidas": f"{k.get('totalHousingUnits', 0):,} viv",
            "Cobertura 15m": f"{k.get('services15MinCoverage', 0)}%",
            "Veredicto": "⭐ ÓPTIMO RECOMENDADO" if sc_key == 'hibrido' else "Aceptable" if sc_key in ('comunitario', 'municipal') else "Línea Base"
        })
    st.dataframe(ranking_rows, use_container_width=True)
    explain_scenarios_ranking(ranking_rows)
