import json
import streamlit as st
import pandas as pd
from typing import Dict, Any, List
from core.explainability import explain_spatial_elements_table

def render_scaffolding_view(city: Dict[str, Any], scenario_id: str, elements: List[Dict[str, Any]], kpis: Dict[str, Any]):
    """
    Data Hub, Exportación GeoJSON/CSV y Andamiaje Arquitectónico Full-Stack.
    """
    city_name = city.get('name', 'Lima')

    st.markdown(f"""
    <div class="hero-banner">
        <span class="badge badge-blue">Data Hub & Arquitectura • Interoperabilidad</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">
            Centro de Datos & Andamiaje de Arquitectura
        </h1>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">
            Exportación interoperable para QGIS/ArcGIS (GeoJSON, CSV) y scaffolding de modelos espaciales PostGIS.
        </p>
    </div>
    """, unsafe_allow_html=True)

    tab1, tab2 = st.tabs(["📦 Data Hub & Exportaciones (GIS)", "💻 Andamiaje Arquitectónico (GeoDjango + PostGIS)"])

    with tab1:
        st.markdown("### 📥 Descarga de Capas Espaciales del Escenario Activo")
        st.caption(f"Capas vectoriales para {city_name} en el escenario {scenario_id.upper()}.")

        # Create GeoJSON FeatureCollection
        features = []
        for el in elements:
            coords = el.get('coordinates', [-76.9935, -11.9860])
            features.append({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coords
                },
                "properties": {
                    "id": el.get('id'),
                    "name": el.get('name'),
                    "type": el.get('type'),
                    "footprintArea": el.get('footprintArea'),
                    "costEstimateUSD": el.get('costEstimateUSD'),
                    "unitsCount": el.get('unitsCount', 0),
                    "populationCapacity": el.get('populationCapacity', 0)
                }
            })
        
        geojson_data = {
            "type": "FeatureCollection",
            "name": f"gemelo_digital_{city.get('id')}_{scenario_id}",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": features
        }

        # Create Pandas DataFrame for CSV
        df_elements = pd.DataFrame([{
            'ID': el.get('id'),
            'Nombre': el.get('name'),
            'Tipo': el.get('type'),
            'Area_m2': el.get('footprintArea'),
            'Costo_USD': el.get('costEstimateUSD'),
            'Viviendas': el.get('unitsCount', 0),
            'Capacidad_Hab': el.get('populationCapacity', 0),
            'Longitud': el.get('coordinates', [0,0])[0],
            'Latitud': el.get('coordinates', [0,0])[1]
        } for el in elements])

        c_exp1, c_exp2 = st.columns(2)
        with c_exp1:
            st.download_button(
                label="🗺️ Descargar Capa Vectorial (GeoJSON)",
                data=json.dumps(geojson_data, indent=2),
                file_name=f"{city.get('id')}_{scenario_id}_capa_urbana.geojson",
                mime="application/geo+json",
                use_container_width=True
            )
        with c_exp2:
            st.download_button(
                label="📊 Descargar Tabla de Atributos (CSV)",
                data=df_elements.to_csv(index=False),
                file_name=f"{city.get('id')}_{scenario_id}_elementos.csv",
                mime="text/csv",
                use_container_width=True
            )

        st.markdown("#### Vista Previa de Datos Espaciales:")
        st.dataframe(df_elements, use_container_width=True)
        explain_spatial_elements_table(df_elements)

    with tab2:
        st.markdown("### 🏛️ Código Fuente Backend y Despliegue PostGIS")
        
        scaffold_options = {
            "models.py (GeoDjango + PostGIS)": '''"""
Digital Twin Comunitario - GeoDjango Models with PostGIS SRID 4326
"""
from django.contrib.gis.db import models
from django.contrib.auth.models import User

class Comunidad(models.Model):
    codigo = models.SlugField(unique=True)
    nombre = models.CharField(max_length=200)
    poligono_limite = models.PolygonField(srid=4326)
    punto_centroide = models.PointField(srid=4326)
    superficie_hectareas = models.FloatField()
    poblacion_base = models.PositiveIntegerField()
    densidad_ghsl_construida = models.FloatField()

class ElementoUrbano(models.Model):
    escenario = models.ForeignKey('Escenario', on_delete=models.CASCADE)
    tipo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=200)
    geometria_punto = models.PointField(srid=4326)
    area_huella_m2 = models.FloatField()
    costo_estimado_usd = models.DecimalField(max_digits=12, decimal_places=2)
''',
            "serializers.py (GeoFeatureModelSerializer)": '''"""
Django REST Framework GIS Serializers
"""
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import ElementoUrbano

class ElementoUrbanoGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = ElementoUrbano
        geo_field = "geometria_punto"
        fields = ('id', 'nombre', 'tipo', 'area_huella_m2', 'costo_estimado_usd')
''',
            "docker-compose.yml": '''version: '3.8'

services:
  db:
    image: postgis/postgis:15-3.3
    environment:
      POSTGRES_DB: digitaltwin_db
      POSTGRES_USER: twin_user
      POSTGRES_PASSWORD: secure_spatial_password
    ports:
      - "5432:5432"
    volumes:
      - postgis_data:/var/lib/postgresql/data

volumes:
  postgis_data:
'''
        }

        selected_code = st.selectbox("Selecciona archivo de arquitectura:", list(scaffold_options.keys()))
        st.code(scaffold_options[selected_code], language='python' if 'py' in selected_code else 'yaml')
