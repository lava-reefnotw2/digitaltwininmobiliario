# 🏙️ Gemelo Digital Comunitario — Vivienda Social y Hábitat Popular

Plataforma integral de **co-diseño espacial, modelado 3D y simulación participativa** para proyectos de vivienda social, urbanismo táctico y mejoramiento de hábitats populares en América Latina.

---

## ✨ Características Principales

### 🗺️ 1. Gemelo Digital 3D & Cartografía GIS 2D
- **Visualización 3D Interactiva con Three.js:** Terreno orográfico adaptativo modelado para ciudades piloto (Lima - Quebrada Huáscar / San Juan de Lurigancho, Arequipa, Trujillo).
- **Cartografía GIS 2D:** Visualización cartográfica con capas de radiación solar, isócronas de 15 minutos, zonas de riesgo y zonificación comunitaria.
- **Simulación Solar Diurna / Nocturna:** Controles interactivos de ángulo de azimut y elevación solar para estudio de asoleamiento y sombras proyectadas.

### 🛣️ 2. Sistema Vial Interactivo y Pistas Adaptadas al Relieve
- **Trazado Clic a Clic:** Colocación interactiva de vértices y puntos ancla sobre el relieve del terreno; doble clic para guardar la pista.
- **Acabado Asfáltico Realista:** Calzada gris pizarra, sardineles de hormigón claro con faldas de contención que se ajustan al desnivel de los cerros, y demarcación vial central.
- **Edición en Tiempo Real:** Ajuste continuo del ancho de vía (4m a 24m), arrastre tridimensional de puntos ancla con recálculo dinámico de longitud, huella en m² y presupuesto.

### 📊 3. Evaluación Multicriterio AHP y KPIs
- Métricas de sostenibilidad urbana (Confort Bioclimático, Accesibilidad 15m, Sostenibilidad Ambiental, Calidad de Vida, Equidad Espacial).
- Gráficos de radar multicriterio y comparativa de inversión estimada vs. viviendas producidas.
- Comparación de escenarios de co-diseño: Base, Municipal, Comunitario e Híbrido, más perfiles personalizados guardables.

### 🗳️ 4. Participación Ciudadana y Presupuesto
- Módulo de votación comunitaria y priorización de proyectos vecinales.
- Estimador presupuestario de obras civiles, equipamiento comunal y redes viales.

### 🌓 5. Modo Oscuro y Modo Claro
- Alternancia fluida y accesible entre **Modo Oscuro** y **Modo Claro**.
- Persistencia automática de la preferencia en `localStorage`.
- Adaptación dinámica de iluminación diurna, atmósfera Three.js y mapas GIS.

### 🤖 6. Copiloto LangChain Integrado en Mapa & Relieve 3D
- **Asistente Spatial ReAct en Tiempo Real:** Drawer interactivo flotante en el visor 3D que comprende el contexto de la ciudad piloto y el escenario activo.
- **RAG Normativo Inmobiliario:** Consulta en tiempo real de ordenanzas municipales (PLANMET 2040, PDM Arequipa, PLANDET Trujillo), normas sismorresistentes y de habitabilidad (RNE A.020), y mapas de riesgo CENEPRED.
- **Spatial Tool Calling sobre Three.js:** El asistente evalúa pendientes y accesibilidad peatonal a 15 min, proponiendo equipamientos (salud, escuelas, parques bioclimáticos, vivienda incremental) con inserción directa sobre el modelo 3D.

### 🔀 7. Langflow AI Studio & Orquestador Low-Code
- **Lienzo Visual de Flujos:** Interfaz gráfica basada en nodos conectables (Inputs, Vector Stores, Models, Spatial Tools y 3D Outputs).
- **Flujos Preconfigurados:** Viabilidad y riesgo geológico de lote, optimizador de equipamiento comunal e isócronas, y síntesis de deliberación vecinal para matrices AHP.
- **Exportación & Despliegue Backend:** Exportación directa a formato JSON compatible con Langflow 1.0+, scaffolding con código Python (`langchain`) y `docker-compose.langflow.yml` con base de datos vectorial PostgreSQL + pgvector.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 6](https://vitejs.dev/)
- **Estilos & UI:** [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Motor 3D:** [Three.js](https://threejs.org/)
- **Visualización de Datos:** [Recharts](https://recharts.org/)
- **Efectos:** Canvas Confetti, Motion

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- `npm` o `bun`

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/lava-reefnotw2/digitaltwininmobiliario.git
   cd digitaltwininmobiliario
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional):**
   ```bash
   cp .env.example .env.local
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación se iniciará en `http://localhost:3000`.

5. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 📂 Estructura del Proyecto

```
├── src/
│   ├── components/       # Componentes React (Map2D3DView, SidebarNav, ThemeToggle, etc.)
│   ├── data/             # Datos de ciudades piloto y escenarios urbanos iniciales
│   ├── types.ts          # Definiciones de tipos TypeScript
│   ├── App.tsx           # Componente raíz y orquestador de estado global
│   ├── main.tsx          # Entrada de la aplicación React
│   └── index.css         # Estilos globales y tokens de Modo Oscuro / Claro
├── scripts/              # Scripts de utilidades y generación de escenarios
├── index.html            # Plantilla HTML principal
├── package.json          # Dependencias y scripts del proyecto
├── tsconfig.json         # Configuración del compilador TypeScript
└── vite.config.ts        # Configuración de Vite y plugins
```

---

## 📄 Licencia

Este proyecto se distribuye bajo fines de investigación, co-diseño comunitario y desarrollo urbano participativo.
