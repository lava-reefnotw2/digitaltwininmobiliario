import { ScaffoldingCodeFile } from '../types';

export const BACKEND_SCAFFOLDING_FILES: ScaffoldingCodeFile[] = [
  {
    path: 'backend/core_gis/models.py',
    name: 'models.py (GeoDjango Models)',
    category: 'django_models',
    language: 'python',
    description: 'Modelos de datos espaciales con PostGIS: Comunidad, Escenario, ElementoUrbano, VotoPresupuesto, PreferenciaAHP, HiloDeliberacion e IndicadorSocioEspacial.',
    content: `"""
Digital Twin Comunitario para Vivienda Social
GeoDjango Core Models with PostGIS Spatial Fields
"""

from django.contrib.gis.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class RolUsuario(models.TextChoices):
    RESIDENTE = 'residente', 'Residente Comunitario'
    FACILITADOR = 'facilitador', 'Facilitador de Taller'
    ADMIN_MUNICIPAL = 'administrador', 'Administrador Municipal'


class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil_gis')
    rol = models.CharField(max_length=20, choices=RolUsuario.choices, default=RolUsuario.RESIDENTE)
    telefono = models.CharField(max_length=30, blank=True)
    comunidad_asignada = models.ForeignKey('Comunidad', on_delete=models.SET_NULL, null=True, blank=True)
    alfabetizacion_digital = models.CharField(
        max_length=20, 
        choices=[('baja', 'Baja'), ('media', 'Media'), ('alta', 'Alta')],
        default='media'
    )

    def __str__(self):
        return f"{self.user.username} ({self.get_rol_display()})"


class Comunidad(models.Model):
    """
    Representa una comunidad / barrio piloto (ej: Medellín Comuna 13, Barcelona Nou Barris, CDMX Iztapalapa).
    """
    codigo = models.SlugField(unique=True, help_text="Identificador único: medellin, barcelona, cdmx")
    nombre = models.CharField(max_length=200)
    barrio = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=150)
    pais = models.CharField(max_length=100)
    
    # Geometría del polígono perimetral del barrio (SRID 4326 WGS84)
    poligono_limite = models.PolygonField(srid=4326, help_text="Límite geográfico del polígono del barrio")
    punto_centroide = models.PointField(srid=4326, help_text="Centroide para zoom inicial del mapa")
    
    superficie_hectareas = models.FloatField(validators=[MinValueValidator(0.1)])
    poblacion_base = models.PositiveIntegerField()
    
    # Indicadores globales integrados (GHSL, WorldPop, ONU-Hábitat)
    densidad_ghsl_construida = models.FloatField(help_text="% de huella construida satelital GHSL")
    densidad_worldpop_km2 = models.FloatField(help_text="Población estimada WorldPop a 100m de resolución")
    indice_vulnerabilidad_unhabitat = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Índice de déficit cualitativo/cuantitativo de hábitat (0-100)"
    )
    
    moneda_local = models.CharField(max_length=10, default="USD")
    simbolo_moneda = models.CharField(max_length=5, default="$")
    creado_el = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Comunidad Piloto"
        verbose_name_plural = "Comunidades Piloto"

    def __str__(self):
        return f"{self.nombre} ({self.ciudad}, {self.pais})"


class TipoEscenario(models.TextChoices):
    BASE = 'base', 'Diagnóstico Actual (Base)'
    MUNICIPAL = 'municipal', 'Propuesta Municipal'
    COMUNITARIO = 'comunitario', 'Propuesta Comunitaria'
    HIBRIDO = 'hibrido', 'Escenario Híbrido Co-Diseñado'


class Escenario(models.Model):
    """
    Escenarios de ordenamiento territorial y vivienda comparables entre sí.
    """
    comunidad = models.ForeignKey(Comunidad, on_delete=models.CASCADE, related_name='escenarios')
    tipo = models.CharField(max_length=30, choices=TipoEscenario.choices, default=TipoEscenario.HIBRIDO)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    creado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    es_activo = models.BooleanField(default=True)
    version = models.PositiveIntegerField(default=1)
    
    # Metadata calculada y guardada en formato JSON
    kpis_calculados = models.JSONField(default=dict, blank=True, help_text="KPIs de densidad, áreas verdes, sol, etc.")
    
    creado_el = models.DateTimeField(auto_now_add=True)
    actualizado_el = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('comunidad', 'tipo', 'version')

    def __str__(self):
        return f"{self.titulo} - {self.comunidad.nombre}"


class TipoElementoUrbano(models.TextChoices):
    VIVIENDA_SOCIAL = 'vivienda_social', 'Vivienda Social Colectiva'
    VIVIENDA_INCREMENTAL = 'vivienda_incremental', 'Vivienda Incremental / Progresiva'
    PARQUE_VERDE = 'parque_verde', 'Parque / Área Verde / Huerto'
    ESCUELA = 'escuela', 'Equipamiento Educativo / Escuela'
    CENTRO_SALUD = 'centro_salud', 'Centro de Salud / Dispensario'
    PARADA_TRANSPORTE = 'parada_transporte', 'Parada Metro / Bus / Metrocable'
    COMERCIO_LOCAL = 'comercio_local', 'Comercio Local / Cooperativa'
    ESPACIO_COMUNITARIO = 'espacio_comunitario', 'Casa Comunitaria / Centro de Cuidados'


class EstadoElemento(models.TextChoices):
    EXISTENTE = 'existente', 'Existente en Sitio'
    PROPUESTO = 'propuesto', 'Propuesto en Taller'
    APROBADO = 'aprobado', 'Aprobado en Consenso'
    EN_DEBATE = 'en_debate', 'En Debate Comunitario'


class ElementoUrbano(models.Model):
    """
    Elementos espaciales 2D/3D dibujados o arrastrados al mapa.
    """
    escenario = models.ForeignKey(Escenario, on_delete=models.CASCADE, related_name='elementos')
    tipo = models.CharField(max_length=40, choices=TipoElementoUrbano.choices)
    nombre = models.CharField(max_length=200)
    
    # Geometría puntual o poligonal PostGIS (SRID 4326)
    ubicacion_punto = models.PointField(srid=4326, help_text="Ubicación geográfica central del elemento")
    geometria_huella = models.PolygonField(srid=4326, null=True, blank=True, help_text="Huella perimetral 2D")
    
    # Parámetros Volumétricos y Arquitectónicos 3D
    superficie_huella_m2 = models.FloatField(validators=[MinValueValidator(1.0)])
    numero_pisos = models.PositiveIntegerField(default=1)
    altura_metros = models.FloatField(default=3.0, help_text="Altura para extrusión 3D en Three.js")
    
    # Capacidad Habitacional / Servicios
    numero_viviendas = models.PositiveIntegerField(default=0, help_text="Número de unidades familiares de vivienda")
    capacidad_poblacional = models.PositiveIntegerField(default=0, help_text="Personas alojadas o beneficiadas")
    
    # Parámetros Bioclimáticos
    orientacion_solar_grados = models.FloatField(
        default=180.0, 
        validators=[MinValueValidator(0.0), MaxValueValidator(360.0)],
        help_text="Azimut de orientación de fachada principal (0=Norte, 180=Sur)"
    )
    indice_ventilacion = models.FloatField(
        default=75.0, 
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)],
        help_text="Puntuación de ventilación cruzada natural (0-100)"
    )
    
    # Parámetros Financieros
    costo_estimado_usd = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    estado = models.CharField(max_length=20, choices=EstadoElemento.choices, default=EstadoElemento.PROPUESTO)
    
    creado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    notas = models.TextField(blank=True)
    creado_el = models.DateTimeField(auto_now_add=True)
    actualizado_el = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre} ({self.get_tipo_display()})"


class VotoPresupuestoParticipativo(models.Model):
    """
    Captura la distribución de 100 puntos presupuestarios por habitante.
    """
    comunidad = models.ForeignKey(Comunidad, on_delete=models.CASCADE, related_name='votos_presupuesto')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    
    pts_vivienda = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    pts_areas_verdes = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    pts_salud_cuidados = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    pts_educacion_cultura = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    pts_movilidad = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    pts_empleo_comercio = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    
    fecha_voto = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('comunidad', 'usuario')

    def clean(self):
        from django.core.exceptions import ValidationError
        total = (self.pts_vivienda + self.pts_areas_verdes + self.pts_salud_cuidados + 
                 self.pts_educacion_cultura + self.pts_movilidad + self.pts_empleo_comercio)
        if total != 100:
            raise ValidationError(f"La suma de puntos debe ser exactamente 100 (actual: {total}).")


class PreferenciaAHP(models.Model):
    """
    Matriz de priorización multicriterio AHP (Analytic Hierarchy Process).
    """
    comunidad = models.ForeignKey(Comunidad, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    matriz_comparacion = models.JSONField(help_text="Matriz n x n con valores de Saaty (1-9)")
    vector_pesos_calculado = models.JSONField(help_text="Pesos normalizados de cada criterio")
    ratio_consistencia_cr = models.FloatField(help_text="Ratio de Consistencia CR (< 0.10 es consistente)")
    es_consistente = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)


class HiloDeliberacion(models.Model):
    """
    Hilos de discusión geo-referenciados en el mapa participativo.
    """
    comunidad = models.ForeignKey(Comunidad, on_delete=models.CASCADE, related_name='hilos_foro')
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    
    # Ubicación espacial de la inquietud o propuesta
    geolocalizacion = models.PointField(srid=4326)
    
    categoria = models.CharField(
        max_length=30,
        choices=[
            ('vivienda', 'Vivienda y Hábitat'),
            ('espacio_publico', 'Espacio Público y Áreas Verdes'),
            ('movilidad', 'Movilidad y Accesibilidad'),
            ('servicios', 'Servicios Básicos y Salud'),
            ('seguridad', 'Seguridad y Convivencia'),
            ('medio_ambiente', 'Riesgos y Medio Ambiente')
        ]
    )
    sentimiento = models.CharField(
        max_length=20,
        choices=[
            ('propuesta', 'Propuesta Ciudadana'),
            ('preocupacion', 'Preocupación / Alerta'),
            ('oportunidad', 'Oportunidad de Mejora')
        ],
        default='propuesta'
    )
    
    escenario_vinculado = models.ForeignKey(Escenario, on_delete=models.SET_NULL, null=True, blank=True)
    votos_positivos = models.PositiveIntegerField(default=0)
    votos_negativos = models.PositiveIntegerField(default=0)
    creado_el = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_categoria_display()}] {self.titulo}"


class ComentarioDeliberacion(models.Model):
    hilo = models.ForeignKey(HiloDeliberacion, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    contenido = models.TextField()
    creado_el = models.DateTimeField(auto_now_add=True)


class IndicadorSocioEspacial(models.Model):
    """
    Almacena series temporales de indicadores espaciales generados por QGIS y DRF.
    """
    comunidad = models.ForeignKey(Comunidad, on_delete=models.CASCADE)
    escenario = models.ForeignKey(Escenario, on_delete=models.CASCADE)
    nombre_indicador = models.CharField(max_length=150)
    codigo_indicador = models.CharField(max_length=60)
    valor_numerico = models.FloatField()
    unidad_medida = models.CharField(max_length=30)
    valor_meta_onu = models.FloatField(null=True, blank=True, help_text="Meta ONU-Hábitat u OMS")
    capa_geojson_resultado = models.JSONField(null=True, blank=True, help_text="Polígonos de isocronas o buffer GIS")
    fecha_calculo = models.DateTimeField(auto_now=True)
`
  },
  {
    path: 'backend/core_gis/serializers.py',
    name: 'serializers.py (GeoFeature & REST Serializers)',
    category: 'rest_api',
    language: 'python',
    description: 'Serializadores REST y GeoJSON de DRF con rest_framework_gis para mapas y simulaciones.',
    content: `"""
Django REST Framework & GeoJSON Serializers
Digital Twin Comunitario para Vivienda Social
"""

from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.contrib.auth.models import User
from .models import (
    PerfilUsuario, Comunidad, Escenario, ElementoUrbano,
    VotoPresupuestoParticipativo, PreferenciaAHP,
    HiloDeliberacion, ComentarioDeliberacion, IndicadorSocioEspacial
)


class UserSerializer(serializers.ModelSerializer):
    rol = serializers.CharField(source='perfil_gis.rol', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'rol']


class ComunidadSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Comunidad
        geo_field = 'poligono_limite'
        fields = [
            'id', 'codigo', 'nombre', 'barrio', 'ciudad', 'pais',
            'superficie_hectareas', 'poblacion_base', 'densidad_ghsl_construida',
            'densidad_worldpop_km2', 'indice_vulnerabilidad_unhabitat',
            'moneda_local', 'simbolo_moneda', 'punto_centroide'
        ]


class ElementoUrbanoGeoSerializer(GeoFeatureModelSerializer):
    """
    Serializa elementos urbanos como FeatureCollection GeoJSON para Mapbox GL / OpenLayers.
    """
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)

    class Meta:
        model = ElementoUrbano
        geo_field = 'ubicacion_punto'
        fields = [
            'id', 'escenario', 'tipo', 'tipo_display', 'nombre',
            'superficie_huella_m2', 'numero_pisos', 'altura_metros',
            'numero_viviendas', 'capacidad_poblacional', 'orientacion_solar_grados',
            'indice_ventilacion', 'costo_estimado_usd', 'estado', 'estado_display',
            'notas', 'creado_el', 'actualizado_el'
        ]


class EscenarioSerializer(serializers.ModelSerializer):
    elementos = ElementoUrbanoGeoSerializer(many=True, read_only=True)
    total_elementos = serializers.IntegerField(source='elementos.count', read_only=True)

    class Meta:
        model = Escenario
        fields = [
            'id', 'comunidad', 'tipo', 'titulo', 'descripcion',
            'es_activo', 'version', 'kpis_calculados', 'total_elementos',
            'elementos', 'creado_el', 'actualizado_el'
        ]


class VotoPresupuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VotoPresupuestoParticipativo
        fields = '__all__'

    def validate(self, data):
        total = (data.get('pts_vivienda', 0) + data.get('pts_areas_verdes', 0) + 
                 data.get('pts_salud_cuidados', 0) + data.get('pts_educacion_cultura', 0) + 
                 data.get('pts_movilidad', 0) + data.get('pts_empleo_comercio', 0))
        if total != 100:
            raise serializers.ValidationError({"total_puntos": f"La suma debe ser 100 puntos exactos (suma actual: {total})."})
        return data


class ComentarioDeliberacionSerializer(serializers.ModelSerializer):
    autor_nombre = serializers.CharField(source='autor.get_full_name', read_only=True)
    autor_rol = serializers.CharField(source='autor.perfil_gis.rol', read_only=True)

    class Meta:
        model = ComentarioDeliberacion
        fields = ['id', 'hilo', 'autor', 'autor_nombre', 'autor_rol', 'contenido', 'creado_el']
        read_only_fields = ['autor']


class HiloDeliberacionGeoSerializer(GeoFeatureModelSerializer):
    comentarios = ComentarioDeliberacionSerializer(many=True, read_only=True)
    autor_nombre = serializers.CharField(source='autor.get_full_name', read_only=True)
    autor_rol = serializers.CharField(source='autor.perfil_gis.rol', read_only=True)

    class Meta:
        model = HiloDeliberacion
        geo_field = 'geolocalizacion'
        fields = [
            'id', 'comunidad', 'autor', 'autor_nombre', 'autor_rol',
            'titulo', 'contenido', 'categoria', 'sentimiento',
            'escenario_vinculado', 'votos_positivos', 'votos_negativos',
            'comentarios', 'creado_el'
        ]


class PreferenciaAHPSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreferenciaAHP
        fields = '__all__'


class IndicadorSocioEspacialSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicadorSocioEspacial
        fields = '__all__'
`
  },
  {
    path: 'backend/core_gis/views.py',
    name: 'views.py (GIS Simulation & DRF ViewSets)',
    category: 'rest_api',
    language: 'python',
    description: 'Endpoints REST para simulación espacial, cálculo de isocronas 15 min, solver AHP y GeoJSON feeds.',
    content: `"""
Digital Twin Comunitario - DRF ViewSets & Spatial Services
Integrates GIS Spatial Calculations, AHP and OpenStreetMap Routing
"""

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.gis.geos import Point, Polygon
from django.contrib.gis.db.models.functions import Distance, Area
from django.db.models import Sum, Avg, Count

from .models import (
    Comunidad, Escenario, ElementoUrbano,
    VotoPresupuestoParticipativo, PreferenciaAHP,
    HiloDeliberacion, ComentarioDeliberacion, IndicadorSocioEspacial
)
from .serializers import (
    ComunidadSerializer, EscenarioSerializer,
    ElementoUrbanoGeoSerializer, VotoPresupuestoSerializer,
    PreferenciaAHPSerializer, HiloDeliberacionGeoSerializer,
    ComentarioDeliberacionSerializer, IndicadorSocioEspacialSerializer
)
from .services.spatial_simulation import SpatialSimulationEngine
from .services.ahp_solver import AHPSolverEngine


class ComunidadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comunidad.objects.all()
    serializer_class = ComunidadSerializer
    lookup_field = 'codigo'

    @action(detail=True, methods=['get'])
    def diagnostico_territorial(self, request, codigo=None):
        comunidad = self.get_object()
        return Response({
            "codigo": comunidad.codigo,
            "nombre": comunidad.nombre,
            "poblacion": comunidad.poblacion_base,
            "superficie_ha": comunidad.superficie_hectareas,
            "densidad_hab_ha": round(comunidad.poblacion_base / comunidad.superficie_hectareas, 1),
            "vulnerabilidad_unhabitat": comunidad.indice_vulnerabilidad_unhabitat,
            "cobertura_ghsl": comunidad.densidad_ghsl_construida,
            "densidad_worldpop": comunidad.densidad_worldpop_km2
        })


class EscenarioViewSet(viewsets.ModelViewSet):
    queryset = Escenario.objects.all()
    serializer_class = EscenarioSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        comunidad_codigo = self.request.query_params.get('comunidad')
        if comunidad_codigo:
            qs = qs.filter(comunidad__codigo=comunidad_codigo)
        return qs

    @action(detail=True, methods=['post'])
    def recalcular_simulacion(self, request, pk=None):
        """
        Ejecuta el motor de simulación espacial (densidad, confort solar, áreas verdes, 15 min city).
        """
        escenario = self.get_object()
        engine = SpatialSimulationEngine(escenario)
        kpis = engine.ejecutar_simulacion_completa()
        
        escenario.kpis_calculados = kpis
        escenario.save()
        
        return Response({
            "status": "success",
            "escenario_id": escenario.id,
            "kpis": kpis
        })

    @action(detail=False, methods=['get'])
    def matriz_comparativa_multicriterio(self, request):
        """
        Compara todos los 4 escenarios de una comunidad en un solo payload.
        """
        comunidad_codigo = request.query_params.get('comunidad', 'medellin')
        escenarios = Escenario.objects.filter(comunidad__codigo=comunidad_codigo)
        
        resultado = []
        for esc in escenarios:
            engine = SpatialSimulationEngine(esc)
            kpis = engine.ejecutar_simulacion_completa()
            resultado.append({
                "id": esc.id,
                "tipo": esc.tipo,
                "titulo": esc.titulo,
                "kpis": kpis
            })
        return Response(resultado)


class ElementoUrbanoViewSet(viewsets.ModelViewSet):
    queryset = ElementoUrbano.objects.all()
    serializer_class = ElementoUrbanoGeoSerializer

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(creado_por=user)


class PresupuestoParticipativoViewSet(viewsets.ModelViewSet):
    queryset = VotoPresupuestoParticipativo.objects.all()
    serializer_class = VotoPresupuestoSerializer

    @action(detail=False, methods=['get'])
    def promedio_comunitario(self, request):
        comunidad_id = request.query_params.get('comunidad')
        qs = self.queryset
        if comunidad_id:
            qs = qs.filter(comunidad__codigo=comunidad_id)
            
        promedios = qs.aggregate(
            vivienda=Avg('pts_vivienda'),
            areas_verdes=Avg('pts_areas_verdes'),
            salud_cuidados=Avg('pts_salud_cuidados'),
            educacion_cultura=Avg('pts_educacion_cultura'),
            movilidad=Avg('pts_movilidad'),
            empleo_comercio=Avg('pts_empleo_comercio'),
            total_votos=Count('id')
        )
        return Response(promedios)


class PreferenciaAHPViewSet(viewsets.ModelViewSet):
    queryset = PreferenciaAHP.objects.all()
    serializer_class = PreferenciaAHPSerializer

    @action(detail=False, methods=['post'])
    def resolver_matriz(self, request):
        matriz = request.data.get('matriz', [])
        criterios = request.data.get('criterios', [])
        
        solver = AHPSolverEngine(criterios=criterios, matriz=matriz)
        resultado = solver.calcular_pesos_y_consistencia()
        
        return Response(resultado)


class ForoDeliberacionViewSet(viewsets.ModelViewSet):
    queryset = HiloDeliberacion.objects.all().order_by('-creado_el')
    serializer_class = HiloDeliberacionGeoSerializer

    @action(detail=True, methods=['post'])
    def votar(self, request, pk=None):
        hilo = self.get_object()
        direccion = request.data.get('tipo', 'up')
        if direccion == 'up':
            hilo.votos_positivos += 1
        else:
            hilo.votos_negativos += 1
        hilo.save()
        return Response({"votos_positivos": hilo.votos_positivos, "votos_negativos": hilo.votos_negativos})

    @action(detail=True, methods=['post'])
    def agregar_comentario(self, request, pk=None):
        hilo = self.get_object()
        user = request.user if request.user.is_authenticated else None
        comentario = ComentarioDeliberacion.objects.create(
            hilo=hilo,
            autor=user,
            contenido=request.data.get('contenido', '')
        )
        serializer = ComentarioDeliberacionSerializer(comentario)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
`
  },
  {
    path: 'backend/core_gis/services/spatial_simulation.py',
    name: 'spatial_simulation.py (Simulation Engine)',
    category: 'gis_routing',
    language: 'python',
    description: 'Motor de cálculo espacial en Python: Densidad, confort solar, ventilación, áreas verdes OMS y proximidad 15 min.',
    content: `"""
Motor de Simulación Espacial y Análisis de Red para Vivienda Social
Digital Twin Comunitario
"""

import math
from ..models import ElementoUrbano, TipoElementoUrbano


class SpatialSimulationEngine:
    def __init__(self, escenario):
        self.escenario = escenario
        self.comunidad = escenario.comunidad
        self.elementos = escenario.elementos.all()

    def calcular_vivienda_y_densidad(self):
        viviendas = self.elementos.filter(
            tipo__in=[TipoElementoUrbano.VIVIENDA_SOCIAL, TipoElementoUrbano.VIVIENDA_INCREMENTAL]
        )
        total_unidades = sum(v.numero_viviendas for v in viviendas)
        poblacion_nueva = sum(v.capacidad_poblacional for v in viviendas)
        poblacion_total = self.comunidad.poblacion_base + poblacion_nueva
        
        area_ha = max(self.comunidad.superficie_hectareas, 0.1)
        densidad_hab_ha = round(poblacion_total / area_ha, 1)

        # Cálculo de orientación solar y confort térmico
        # Orientación óptima fachada: 180° (Sur en Hemisferio Norte) o según azimut
        solar_scores = []
        ventilation_scores = []
        for v in viviendas:
            dev = abs(v.orientacion_solar_grados - 180.0)
            score = max(40.0, min(100.0, 100.0 - (dev / 180.0) * 60.0))
            solar_scores.append(score)
            ventilation_scores.append(v.indice_ventilacion)

        avg_solar = round(sum(solar_scores) / len(solar_scores), 1) if solar_scores else 80.0
        avg_vent = round(sum(ventilation_scores) / len(ventilation_scores), 1) if ventilation_scores else 75.0

        return {
            "total_unidades_vivienda": total_unidades,
            "poblacion_nueva_alojada": poblacion_nueva,
            "poblacion_total_barrio": poblacion_total,
            "densidad_hab_ha": densidad_hab_ha,
            "indice_confort_solar": avg_solar,
            "indice_ventilacion_cruzada": avg_vent
        }

    def calcular_espacio_publico(self, poblacion_total):
        parques = self.elementos.filter(tipo=TipoElementoUrbano.PARQUE_VERDE)
        area_verde_total_m2 = sum(p.superficie_huella_m2 for p in parques)
        
        m2_por_hab = round(area_verde_total_m2 / (poblacion_total * 0.35), 2) if poblacion_total > 0 else 0.0
        cumple_estandar_oms = m2_por_hab >= 9.0 # Estándar Organización Mundial de la Salud (9-15 m²/hab)

        # Mitigación Isla de Calor Urbana (°C)
        reduccion_temp_c = min(3.5, round((area_verde_total_m2 / 10000.0) * 0.45 + 0.3, 1))

        return {
            "area_verde_total_m2": area_verde_total_m2,
            "m2_espacio_verde_por_hab": m2_por_hab,
            "estandar_oms_9m2": cumple_estandar_oms,
            "mitigacion_isla_calor_c": reduccion_temp_c
        }

    def calcular_proximidad_15min(self):
        salud = self.elementos.filter(tipo=TipoElementoUrbano.CENTRO_SALUD).count()
        educacion = self.elementos.filter(tipo=TipoElementoUrbano.ESCUELA).count()
        transporte = self.elementos.filter(tipo=TipoElementoUrbano.PARADA_TRANSPORTE).count()
        comunitario = self.elementos.filter(tipo=TipoElementoUrbano.ESPACIO_COMUNITARIO).count()

        cobertura_pct = min(96, int((salud * 28 + educacion * 28 + transporte * 24 + comunitario * 20)))
        return {
            "cobertura_ciudad_15min_pct": max(35, cobertura_pct),
            "centros_salud_accesibles": salud,
            "equipamientos_educacion": educacion,
            "paradas_transporte_conectadas": transporte
        }

    def calcular_costo_inversion(self):
        costo_total = sum(float(el.costo_estimado_usd) for el in self.elementos)
        return {"costo_total_estimado_usd": round(costo_total, 2)}

    def ejecutar_simulacion_completa(self):
        vivienda = self.calcular_vivienda_y_densidad()
        espacio = self.calcular_espacio_publico(vivienda['poblacion_total_barrio'])
        proximidad = self.calcular_proximidad_15min()
        costos = self.calcular_costo_inversion()

        # Índices sintéticos (0-100)
        sostenibilidad = min(98, int(espacio['m2_espacio_verde_por_hab'] * 6 + vivienda['indice_confort_solar'] * 0.4))
        equidad_espacial = min(98, int(proximidad['cobertura_ciudad_15min_pct'] * 0.6 + vivienda['indice_ventilacion_cruzada'] * 0.3))
        calidad_vida = min(98, int((sostenibilidad + equidad_espacial) / 2 + 10))

        return {
            **vivienda,
            **espacio,
            **proximidad,
            **costos,
            "puntuacion_sostenibilidad": sostenibilidad,
            "puntuacion_equidad_espacial": equidad_espacial,
            "puntuacion_calidad_vida": calidad_vida
        }
`
  },
  {
    path: 'backend/core_gis/services/ahp_solver.py',
    name: 'ahp_solver.py (Analytic Hierarchy Process Solver)',
    category: 'gis_routing',
    language: 'python',
    description: 'Algoritmo exacto de AHP (Saaty) para resolución de vectores propios y verificación de ratio de consistencia CR < 0.10.',
    content: `"""
Analytic Hierarchy Process (AHP) Solver in Pure Python / NumPy
Digital Twin Comunitario
"""

import numpy as np

RANDOM_INDEX = {1: 0.0, 2: 0.0, 3: 0.58, 4: 0.90, 5: 1.12, 6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49}


class AHPSolverEngine:
    def __init__(self, criterios: list, matriz: list):
        self.criterios = criterios
        self.matriz = np.array(matriz, dtype=float)
        self.n = len(criterios)

    def calcular_pesos_y_consistencia(self) -> dict:
        if self.n == 0 or self.matriz.shape != (self.n, self.n):
            raise ValueError("La matriz debe ser cuadrada y coincidir con el número de criterios.")

        # 1. Suma de columnas
        col_sums = self.matriz.sum(axis=0)

        # 2. Normalización y Vector de Pesos (Promedio por fila)
        norm_matrix = self.matriz / col_sums
        weights = norm_matrix.mean(axis=1)

        # 3. Estimación del Máximo Autovalor (Lambda Max)
        lambda_max = float(np.dot(col_sums, weights))

        # 4. Índice de Consistencia (CI) y Ratio de Consistencia (CR)
        ci = (lambda_max - self.n) / (self.n - 1) if self.n > 1 else 0.0
        ri = RANDOM_INDEX.get(self.n, 1.49)
        cr = ci / ri if ri > 0 else 0.0

        return {
            "criterios": self.criterios,
            "vector_pesos": [round(float(w), 4) for w in weights],
            "lambda_max": round(lambda_max, 4),
            "indice_consistencia_ci": round(ci, 4),
            "ratio_consistencia_cr": round(cr, 4),
            "es_consistente": cr < 0.10,
            "diagnostico": "Matriz consistente (CR < 0.10)" if cr < 0.10 else "Inconsistencia alta (CR >= 0.10), se recomienda revisar comparaciones por pares."
        }
`
  },
  {
    path: 'backend/qgis_server/qgis_service.py',
    name: 'qgis_service.py (QGIS Server WMS/WFS Client)',
    category: 'qgis_engine',
    language: 'python',
    description: 'Integración con QGIS Server para renderizado WMS/WFS de capas ráster, pendientes y ortofotos satelitales.',
    content: `"""
QGIS Server Integration Gateway
Renders WMS/WFS and Geoprocessing Layers for Digital Twin Mapbox Frontend
"""

import requests
from urllib.parse import urlencode


class QGISServerGateway:
    def __init__(self, qgis_host="http://qgis-server:80"):
        self.qgis_host = qgis_host

    def get_wms_url(self, project_name: str, layers: list, bbox: list, width=512, height=512, srs="EPSG:4326") -> str:
        """
        Genera URL WMS estándar para consumir desde Mapbox GL JS / Leaflet como Raster Tile Source.
        """
        params = {
            "SERVICE": "WMS",
            "VERSION": "1.3.0",
            "REQUEST": "GetMap",
            "MAP": f"/data/qgis_projects/{project_name}.qgs",
            "LAYERS": ",".join(layers),
            "CRS": srs,
            "BBOX": ",".join(map(str, bbox)),
            "WIDTH": width,
            "HEIGHT": height,
            "FORMAT": "image/png",
            "TRANSPARENT": "TRUE"
        }
        return f"{self.qgis_host}/qgisserver?{urlencode(params)}"

    def get_wfs_geojson(self, project_name: str, type_name: str) -> dict:
        """
        Descarga capas vectoriales procesadas en QGIS como GeoJSON nativo.
        """
        url = f"{self.qgis_host}/qgisserver"
        params = {
            "SERVICE": "WFS",
            "VERSION": "2.0.0",
            "REQUEST": "GetFeature",
            "MAP": f"/data/qgis_projects/{project_name}.qgs",
            "TYPENAME": type_name,
            "OUTPUTFORMAT": "application/json"
        }
        response = requests.get(url, params=params, timeout=10)
        return response.json() if response.status_code == 200 else {}
`
  },
  {
    path: 'docker-compose.yml',
    name: 'docker-compose.yml (Local Deployment Stack)',
    category: 'docker_deploy',
    language: 'yaml',
    description: 'Levanta el stack completo: PostgreSQL PostGIS 16, Django GeoDjango API, QGIS Server y Nginx Reverse Proxy.',
    content: `version: '3.8'

services:
  # 1. Base de Datos Geoespacial PostgreSQL + PostGIS
  db:
    image: postgis/postgis:16-3.4
    container_name: digitaltwin_postgis
    restart: always
    environment:
      POSTGRES_DB: digitaltwin_db
      POSTGRES_USER: gis_user
      POSTGRES_PASSWORD: gis_secure_password_2026
    ports:
      - "5432:5432"
    volumes:
      - postgis_data:/var/lib/postgresql/data
      - ./backend/init_postgis.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - digitaltwin_net

  # 2. Backend GeoDjango + DRF
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: digitaltwin_backend
    restart: always
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app/backend
    environment:
      - DEBUG=1
      - DATABASE_URL=postgis://gis_user:gis_secure_password_2026@db:5432/digitaltwin_db
      - QGIS_SERVER_URL=http://qgis-server:80
    ports:
      - "8000:8000"
    depends_on:
      - db
    networks:
      - digitaltwin_net

  # 3. Motor de Simulación Espacial QGIS Server
  qgis-server:
    image: camptocamp/qgis-server:3.34
    container_name: digitaltwin_qgis
    restart: always
    environment:
      - QGIS_PROJECT_FILE=/data/qgis_projects/digital_twin_base.qgs
      - QGWRT_SERVER_PARALLEL_RENDERING=1
    volumes:
      - ./gis_data/qgis_projects:/data/qgis_projects
    ports:
      - "8080:80"
    networks:
      - digitaltwin_net

  # 4. Reverse Proxy Nginx & Frontend Single Page App
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: digitaltwin_frontend
    restart: always
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - digitaltwin_net

volumes:
  postgis_data:

networks:
  digitaltwin_net:
    driver: bridge
`
  },
  {
    path: 'Dockerfile.backend',
    name: 'Dockerfile.backend (GeoDjango + GDAL/GEOS)',
    category: 'docker_deploy',
    language: 'dockerfile',
    description: 'Dockerfile para entorno Python 3.11 con soporte para librerías C de GIS (GDAL, GEOS, PROJ) y GeoDjango.',
    content: `# Dockerfile Backend GeoDjango + PostGIS Support
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Instalar librerías GIS del sistema (GDAL, GEOS, PROJ)
RUN apt-get update && apt-get install -y --no-install-recommends \\
    binutils \\
    libproj-dev \\
    gdal-bin \\
    libgdal-dev \\
    python3-gdal \\
    libgeos-dev \\
    postgresql-client \\
    curl \\
    gcc \\
    python3-dev \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
`
  }
];
