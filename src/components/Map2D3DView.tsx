import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Layers, 
  Sun, 
  Moon,
  Compass, 
  RotateCw, 
  RotateCcw,
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Box, 
  MapPin, 
  Plus, 
  Trash2, 
  Sliders, 
  Flame, 
  Maximize2,
  TreePine,
  Sparkles,
  Info,
  Move,
  Save,
  Route,
  Check,
  Undo2
} from 'lucide-react';
import { PilotCity, UrbanElement, ScenarioType, GISLayerState, UrbanElementType, Language, ThemeMode } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { UrbanCopilotChat } from './UrbanCopilotChat';

interface Map2D3DViewProps {
  currentCity: PilotCity;
  activeScenario: ScenarioType;
  elements: UrbanElement[];
  selectedElement: UrbanElement | null;
  onSelectElement: (element: UrbanElement | null) => void;
  onUpdateElement: (element: UrbanElement) => void;
  onDeleteElement: (id: string) => void;
  onAddElementAtCoords: (coords: [number, number], type?: UrbanElementType, customProps?: Partial<UrbanElement>) => void;
  language: Language;
  layerState: GISLayerState;
  onToggleLayer: (key: keyof GISLayerState) => void;
  onOpenSaveProposal?: () => void;
  activeProfileName?: string;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const Map2D3DView: React.FC<Map2D3DViewProps> = ({
  currentCity,
  activeScenario,
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElementAtCoords,
  language,
  layerState,
  onToggleLayer,
  onOpenSaveProposal,
  activeProfileName,
  theme = 'dark',
  onToggleTheme
}) => {
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'split'>('3d');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [solarAzimuth, setSolarAzimuth] = useState<number>(145); // degrees
  const [solarElevation, setSolarElevation] = useState<number>(55); // degrees
  const [isPlacingMode, setIsPlacingMode] = useState<boolean>(false);
  const [selectedPlacementType, setSelectedPlacementType] = useState<UrbanElementType>('vivienda_social');
  const [isRelocatingSelected, setIsRelocatingSelected] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isDraggingSelectedElement, setIsDraggingSelectedElement] = useState<boolean>(false);
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [, setZoom2DRev] = useState<number>(0);
  const [showCtrlMessage, setShowCtrlMessage] = useState<boolean>(false);
  const ctrlMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Multi-point Road / Track drafting & waypoint editing state
  const [roadPoints, setRoadPoints] = useState<[number, number][]>([]);
  const [roadHoverCoords, setRoadHoverCoords] = useState<[number, number] | null>(null);
  const [draftingRoadWidth, setDraftingRoadWidth] = useState<number>(8);
  const [selectedRoadWaypointIdx, setSelectedRoadWaypointIdx] = useState<number | null>(null);
  const [isExtendingRoad, setIsExtendingRoad] = useState<boolean>(false);
  const lastRoadClickTimeRef = useRef<number>(0);
  const activeDraggedWaypointIdxRef = useRef<number | null>(null);
  const roadWaypointMeshesRef = useRef<THREE.Mesh[]>([]);

  // Canvas container & refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const map2DCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const map2DScaleRef = useRef<number>(38000); // 2D GIS zoom level

  // Three.js scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const draftingGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Cached Raycasting objects to prevent garbage collection hiccups during mouse movement
  const sharedRaycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const sharedMouseVecRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const lastHoverCheckTimeRef = useRef<number>(0);
  const hoveredElementIdRef = useRef<string | null>(null);
  const clickableObjectsRef = useRef<THREE.Object3D[]>([]);

  // Smooth Inertial Camera Motion (Damping / Physics Lerp)
  const isDraggingRef = useRef<boolean>(false);
  const isPanningRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera Target (Look-at point) Target & Current for smooth glide
  const targetPanRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const currentPanRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const map2DPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Spherical Coordinates (Radius, Theta, Phi) Target & Current for silky rotation & zoom
  const targetSphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 450,
    theta: Math.PI / 4,
    phi: Math.PI / 3
  });
  const currentSphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 450,
    theta: Math.PI / 4,
    phi: Math.PI / 3
  });

  // Touch gesture state for mobile/tablets
  const touchStateRef = useRef<{
    initialDist: number;
    initialRadius: number;
    lastTouchPos: { x: number; y: number };
    touchCount: number;
  }>({
    initialDist: 0,
    initialRadius: 450,
    lastTouchPos: { x: 0, y: 0 },
    touchCount: 0
  });

  // Color map for element types
  const ELEMENT_COLORS: Record<UrbanElementType, { hex: number; tailwind: string; label: string }> = {
    vivienda_social: { hex: 0x0284c7, tailwind: 'bg-sky-600', label: 'Vivienda Social' },
    vivienda_incremental: { hex: 0xea580c, tailwind: 'bg-orange-600', label: 'Vivienda Incremental' },
    parque_verde: { hex: 0x10b981, tailwind: 'bg-emerald-500', label: 'Parque / Huerto' },
    centro_salud: { hex: 0xef4444, tailwind: 'bg-red-500', label: 'Centro de Salud' },
    escuela: { hex: 0xf59e0b, tailwind: 'bg-amber-500', label: 'Escuela / Edu' },
    parada_transporte: { hex: 0x8b5cf6, tailwind: 'bg-violet-500', label: 'Transporte' },
    comercio_local: { hex: 0xd946ef, tailwind: 'bg-fuchsia-500', label: 'Comercio / Taller' },
    espacio_comunitario: { hex: 0x14b8a6, tailwind: 'bg-teal-500', label: 'Espacio Comunitario' },
    pista_vial: { hex: 0x475569, tailwind: 'bg-slate-600', label: 'Pistas / Vías' }
  };

  // Polyline length calculation utility (in meters)
  const calculatePolylineLengthMeters = (points: [number, number][]): number => {
    if (points.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const latM = (p2[1] - p1[1]) * 111320;
      const lngM = (p2[0] - p1[0]) * 111320 * Math.cos((((p1[1] + p2[1]) / 2) * Math.PI) / 180);
      total += Math.hypot(latM, lngM);
    }
    return total;
  };

  // Continuous mathematical terrain elevation model per pilot city
  const getTerrainElevation = (x: number, z: number, cityId: string): number => {
    if (cityId === 'lima') {
      // Lima (San Juan de Lurigancho - Quebrada Huáscar): Arid desert hillside slope with natural ravines
      const mainSlope = (-x * 0.085) + (z * 0.045);
      const ravines = Math.sin(x * 0.014 + z * 0.009) * 12 + Math.cos(x * 0.009 - z * 0.012) * 8;
      const terrace = Math.sin(x * 0.028) * 3;
      return mainSlope + ravines + terrace;
    }
    if (cityId === 'arequipa') {
      // Arequipa (Cerro Colorado - Quebrada Añashuayco): Volcanic hillside foothills and torrenteras
      const volcanicSlope = (-z * 0.075) - (x * 0.035);
      const quebrada = Math.sin(x * 0.016) * 11 + Math.cos(z * 0.012) * 7;
      return volcanicSlope + quebrada;
    }
    if (cityId === 'trujillo') {
      // Trujillo (Alto Trujillo): Terreno de planicie con relieve plano y dunas costeras suaves
      return Math.sin(x * 0.008) * 1.5 + Math.cos(z * 0.008) * 1.5;
    }
    return (Math.sin(x * 0.01) * 7) + (Math.cos(z * 0.01) * 7);
  };

  // Convert geo-coordinates to local Three.js coordinate system (meters relative to center)
  const coordsToLocal = (coords: [number, number]): { x: number; z: number } => {
    const latMetersPerDegree = 111320;
    const lngMetersPerDegree = 111320 * Math.cos((currentCity.center[1] * Math.PI) / 180);
    const x = (coords[0] - currentCity.center[0]) * lngMetersPerDegree;
    const z = -(coords[1] - currentCity.center[1]) * latMetersPerDegree;
    return { x, z };
  };

  const groundMeshRef = useRef<THREE.Mesh | null>(null);

  // Three.js Initialization & Fluid 60+ FPS Damping Render Loop
  useEffect(() => {
    if (!threeCanvasRef.current) return;
    const canvas = threeCanvasRef.current;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = canvas.parentElement?.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);
    scene.fog = new THREE.FogExp2(0x090d16, 0.00075);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3500);
    cameraRef.current = camera;

    // Direct initialization of camera position
    const initTarget = currentPanRef.current;
    const initSph = currentSphericalRef.current;
    camera.position.set(
      initTarget.x + initSph.radius * Math.sin(initSph.phi) * Math.sin(initSph.theta),
      initTarget.y + initSph.radius * Math.cos(initSph.phi),
      initTarget.z + initSph.radius * Math.sin(initSph.phi) * Math.cos(initSph.theta)
    );
    camera.lookAt(initTarget.x, initTarget.y, initTarget.z);

    // Optimized High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    // Clamp pixelRatio to 1.25 to maximize framerate and eliminate fill-rate lag on 4K/Retina displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false; // Freeze shadow calculations during camera motion
    renderer.shadowMap.needsUpdate = true; // Initial shadow pass
    rendererRef.current = renderer;

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xdce7f5, 0.85);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Directional Sun Light with Optimized Shadows (1024x1024)
    const sunLight = new THREE.DirectionalLight(0xfff7e6, 1.95);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 1400;
    const shadowSize = 450;
    sunLight.shadow.camera.left = -shadowSize;
    sunLight.shadow.camera.right = shadowSize;
    sunLight.shadow.camera.top = shadowSize;
    sunLight.shadow.camera.bottom = -shadowSize;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Secondary fill light for terrain valleys
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    fillLight.position.set(-300, 200, -300);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    // Optimized 3D Relief Ground Plane (48x48 segments for high performance & silky curves)
    const groundGeo = new THREE.PlaneGeometry(1400, 1400, 48, 48);
    groundGeo.rotateX(-Math.PI / 2);

    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const elevation = getTerrainElevation(vx, vz, currentCity.id);
      posAttr.setY(i, elevation);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x8a6240, // Brown desert terrain tone
      roughness: 0.94,
      metalness: 0.05,
      flatShading: false
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    scene.add(ground);
    groundMeshRef.current = ground;

    // Topographic Contour Wireframe Overlay hugging the relief
    const wireGeo = groundGeo.clone();
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x543c26, // Warm earthy contour lines
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.position.y = 0.05;
    scene.add(wireMesh);

    // Persistent Objects Group (Buildings, Roads, Parks)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);
    objectsGroupRef.current = objectsGroup;

    // Dedicated Lightweight Drafting Preview Group (Isolated from persistent mesh rebuilds)
    const draftingGroup = new THREE.Group();
    scene.add(draftingGroup);
    draftingGroupRef.current = draftingGroup;

    // Ultra-Smooth Inertial Render Loop (60+ FPS with continuous momentum damping)
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Dynamic damping factor: snappy during direct drag, silky deceleration after release
      const lerpFactor = isDraggingRef.current || isPanningRef.current ? 0.25 : 0.12;

      // Interpolate spherical camera coordinates
      const tSph = targetSphericalRef.current;
      const cSph = currentSphericalRef.current;
      cSph.radius += (tSph.radius - cSph.radius) * lerpFactor;
      cSph.theta += (tSph.theta - cSph.theta) * lerpFactor;
      cSph.phi += (tSph.phi - cSph.phi) * lerpFactor;

      // Interpolate target pan / look-at position
      const tPan = targetPanRef.current;
      const cPan = currentPanRef.current;
      cPan.x += (tPan.x - cPan.x) * lerpFactor;
      cPan.y += (tPan.y - cPan.y) * lerpFactor;
      cPan.z += (tPan.z - cPan.z) * lerpFactor;

      if (cameraRef.current) {
        const x = cPan.x + cSph.radius * Math.sin(cSph.phi) * Math.sin(cSph.theta);
        const y = cPan.y + cSph.radius * Math.cos(cSph.phi);
        const z = cPan.z + cSph.radius * Math.sin(cSph.phi) * Math.cos(cSph.theta);

        cameraRef.current.position.set(x, y, z);
        cameraRef.current.lookAt(cPan.x, cPan.y, cPan.z);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Native Non-Passive Wheel Event Listener with Smooth Target Zoom
    const handleNativeWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        targetSphericalRef.current.radius = Math.max(
          80,
          Math.min(1000, targetSphericalRef.current.radius + e.deltaY * 0.45)
        );
        setShowCtrlMessage(false);
      } else {
        setShowCtrlMessage(true);
        if (ctrlMessageTimeoutRef.current) {
          clearTimeout(ctrlMessageTimeoutRef.current);
        }
        ctrlMessageTimeoutRef.current = setTimeout(() => {
          setShowCtrlMessage(false);
        }, 1500);
      }
    };

    canvas.addEventListener('wheel', handleNativeWheel, { passive: false });

    // Reset camera position & target smoothly when city changes
    targetPanRef.current = { x: 0, y: 0, z: 0 };
    currentPanRef.current = { x: 0, y: 0, z: 0 };
    map2DPanRef.current = { x: 0, y: 0 };
    targetSphericalRef.current = {
      radius: 450,
      theta: Math.PI / 4,
      phi: Math.PI / 3
    };
    currentSphericalRef.current = {
      radius: 450,
      theta: Math.PI / 4,
      phi: Math.PI / 3
    };

    // Resize handler
    const handleResize = () => {
      if (!canvas.parentElement || !cameraRef.current || !rendererRef.current) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('wheel', handleNativeWheel);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, [currentCity]);

  // Update Sun Position, Lighting Atmosphere & Day/Night Mode
  useEffect(() => {
    if (!sceneRef.current || !sunLightRef.current || !ambientLightRef.current || !fillLightRef.current) return;

    if (timeOfDay === 'day') {
      // Day Mode Atmosphere
      const skyColor = theme === 'light' ? 0xdce7f5 : 0x111c2e;
      sceneRef.current.background = new THREE.Color(skyColor);
      sceneRef.current.fog = new THREE.FogExp2(skyColor, theme === 'light' ? 0.0005 : 0.00065);

      ambientLightRef.current.color.setHex(theme === 'light' ? 0xffffff : 0xdce7f5);
      ambientLightRef.current.intensity = theme === 'light' ? 1.05 : 0.85;

      fillLightRef.current.color.setHex(0x38bdf8);
      fillLightRef.current.intensity = theme === 'light' ? 0.55 : 0.45;

      const distance = 400;
      const azRad = (solarAzimuth * Math.PI) / 180;
      const elRad = (solarElevation * Math.PI) / 180;

      const x = distance * Math.cos(elRad) * Math.sin(azRad);
      const y = distance * Math.sin(elRad);
      const z = distance * Math.cos(elRad) * Math.cos(azRad);

      sunLightRef.current.color.setHex(0xfff7e6);
      sunLightRef.current.intensity = theme === 'light' ? 2.15 : 1.95;
      sunLightRef.current.position.set(x, y, z);
      sunLightRef.current.castShadow = layerState.shadowSim;
    } else {
      // Night Mode Atmosphere
      sceneRef.current.background = new THREE.Color(0x060913);
      sceneRef.current.fog = new THREE.FogExp2(0x060913, 0.0009);

      ambientLightRef.current.color.setHex(0x1a2238);
      ambientLightRef.current.intensity = 0.35;

      fillLightRef.current.color.setHex(0x0f172a);
      fillLightRef.current.intensity = 0.15;

      sunLightRef.current.color.setHex(0x406085); // Gentle cool moonlight
      sunLightRef.current.intensity = 0.28;
      sunLightRef.current.position.set(200, 350, 200);
      sunLightRef.current.castShadow = false; // Disable sun shadows at night
    }

    if (rendererRef.current && rendererRef.current.shadowMap.enabled) {
      rendererRef.current.shadowMap.needsUpdate = true;
    }
  }, [timeOfDay, solarAzimuth, solarElevation, layerState.shadowSim, theme]);

  // Re-populate 3D Buildings & Urban Elements
  useEffect(() => {
    if (!objectsGroupRef.current || !sceneRef.current) return;
    const group = objectsGroupRef.current;
    clickableObjectsRef.current = [];
    roadWaypointMeshesRef.current = [];

    // Clear previous elements
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }

    // Add elements
    elements.forEach((el) => {
      const { x, z } = coordsToLocal(el.coordinates);
      const isSelected = selectedElement?.id === el.id;
      const elColor = ELEMENT_COLORS[el.type]?.hex || 0x3b82f6;
      const angle = ((el.solarOrientation - 180) * Math.PI) / 180;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Sample terrain elevation at the element center
      const yCenter = getTerrainElevation(x, z, currentCity.id);

      if (el.type === 'parque_verde') {
        // Green park zone: High-performance conforming terrain-draped mesh
        const radius = Math.max(10, Math.sqrt(el.footprintArea / Math.PI));
        const rings = 5;
        const segments = 24;

        const parkGeo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const uvs: number[] = [];

        // Center vertex
        const centerElev = yCenter;
        const drapeOffset = 0.45; // slight elevation above ground to prevent z-fighting
        vertices.push(0, drapeOffset, 0);
        uvs.push(0.5, 0.5);

        // Multi-ring concentric vertices conforming to 3D relief
        for (let r = 1; r <= rings; r++) {
          const ringRadius = (r / rings) * radius;
          for (let s = 0; s < segments; s++) {
            const theta = (s / segments) * Math.PI * 2;
            const lx = Math.cos(theta) * ringRadius;
            const lz = Math.sin(theta) * ringRadius;
            const worldX = x + lx;
            const worldZ = z + lz;
            const vertexTerrainY = getTerrainElevation(worldX, worldZ, currentCity.id);
            const localY = vertexTerrainY - centerElev + drapeOffset;

            vertices.push(lx, localY, lz);
            uvs.push(0.5 + (lx / (radius * 2)), 0.5 + (lz / (radius * 2)));
          }
        }

        // Indices: Center fan (Ring 0 to Ring 1)
        for (let s = 0; s < segments; s++) {
          const nextS = (s + 1) % segments;
          indices.push(0, 1 + s, 1 + nextS);
        }

        // Indices: Rings (r to r+1)
        for (let r = 1; r < rings; r++) {
          const innerStart = 1 + (r - 1) * segments;
          const outerStart = 1 + r * segments;
          for (let s = 0; s < segments; s++) {
            const nextS = (s + 1) % segments;
            const i0 = innerStart + s;
            const i1 = innerStart + nextS;
            const o0 = outerStart + s;
            const o1 = outerStart + nextS;

            indices.push(i0, o0, o1);
            indices.push(i0, o1, i1);
          }
        }

        parkGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        parkGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        parkGeo.setIndex(indices);
        parkGeo.computeVertexNormals();

        // Lush green lawn surface covering the entire park area footprint
        const parkMat = new THREE.MeshStandardMaterial({
          color: isSelected ? 0x22c55e : 0x16a34a,
          roughness: 0.85,
          metalness: 0.04,
          polygonOffset: true,
          polygonOffsetFactor: -1.5,
          polygonOffsetUnits: -3.0,
          emissive: isSelected ? 0x15803d : (timeOfDay === 'night' ? 0x064e3b : 0x052e16),
          emissiveIntensity: isSelected ? 0.65 : (timeOfDay === 'night' ? 0.45 : 0.25)
        });

        const parkMesh = new THREE.Mesh(parkGeo, parkMat);
        parkMesh.position.set(x, centerElev, z);
        parkMesh.receiveShadow = true;
        parkMesh.userData = { elementId: el.id };
        group.add(parkMesh);
        clickableObjectsRef.current.push(parkMesh);

        // Inner lush green garden / botanical center lawn (Verde interior)
        const innerParkGeo = new THREE.CircleGeometry(radius * 0.52, 32);
        innerParkGeo.rotateX(-Math.PI / 2);
        const innerParkMat = new THREE.MeshStandardMaterial({
          color: isSelected ? 0x4ade80 : 0x22c55e,
          roughness: 0.8,
          metalness: 0.02,
          emissive: isSelected ? 0x16a34a : (timeOfDay === 'night' ? 0x064e3b : 0x15803d),
          emissiveIntensity: 0.35
        });
        const innerParkMesh = new THREE.Mesh(innerParkGeo, innerParkMat);
        innerParkMesh.position.set(x, centerElev + drapeOffset + 0.12, z);
        innerParkMesh.receiveShadow = true;
        innerParkMesh.userData = { elementId: el.id };
        group.add(innerParkMesh);

        // Central botanical planter / green focal point in 3D
        const centerHubGeo = new THREE.CylinderGeometry(radius * 0.18, radius * 0.22, 0.4, 24);
        const centerHubMat = new THREE.MeshStandardMaterial({
          color: 0x14532d,
          roughness: 0.7,
          metalness: 0.1
        });
        const centerHubMesh = new THREE.Mesh(centerHubGeo, centerHubMat);
        centerHubMesh.position.set(x, centerElev + drapeOffset + 0.25, z);
        centerHubMesh.userData = { elementId: el.id };
        group.add(centerHubMesh);

        // Outer Retaining Skirt / Perimeter Curb in forest green / turf to anchor outer perimeter into sloping terrain
        const skirtGeo = new THREE.BufferGeometry();
        const skirtVerts: number[] = [];
        const skirtIndices: number[] = [];
        const borderLoopPoints: THREE.Vector3[] = [];

        for (let s = 0; s < segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          const lx = Math.cos(theta) * radius;
          const lz = Math.sin(theta) * radius;
          const worldX = x + lx;
          const worldZ = z + lz;
          const vertexTerrainY = getTerrainElevation(worldX, worldZ, currentCity.id);
          const topY = vertexTerrainY - centerElev + drapeOffset + 0.15;
          const bottomY = vertexTerrainY - centerElev - 1.4; // Extends into ground

          skirtVerts.push(lx, topY, lz); // 2*s
          skirtVerts.push(lx, bottomY, lz); // 2*s + 1
          borderLoopPoints.push(new THREE.Vector3(lx, topY + 0.1, lz));
        }

        for (let s = 0; s < segments; s++) {
          const nextS = (s + 1) % segments;
          const top1 = 2 * s;
          const bot1 = 2 * s + 1;
          const top2 = 2 * nextS;
          const bot2 = 2 * nextS + 1;

          skirtIndices.push(top1, bot1, top2);
          skirtIndices.push(top2, bot1, bot2);
        }

        skirtGeo.setAttribute('position', new THREE.Float32BufferAttribute(skirtVerts, 3));
        skirtGeo.setIndex(skirtIndices);
        skirtGeo.computeVertexNormals();

        // Forest green turf skirt material (painted green area foundation)
        const skirtMat = new THREE.MeshStandardMaterial({
          color: isSelected ? 0x16a34a : 0x14532d,
          roughness: 0.8,
          metalness: 0.08,
          emissive: isSelected ? 0x15803d : 0x064e3b,
          emissiveIntensity: 0.35
        });
        const skirtMesh = new THREE.Mesh(skirtGeo, skirtMat);
        skirtMesh.position.set(x, centerElev, z);
        skirtMesh.receiveShadow = true;
        skirtMesh.userData = { elementId: el.id };
        group.add(skirtMesh);

        // Highlight lime/emerald boundary line on the rim
        const borderLineGeo = new THREE.BufferGeometry().setFromPoints([
          ...borderLoopPoints,
          borderLoopPoints[0]
        ]);
        const borderLineMat = new THREE.LineBasicMaterial({
          color: isSelected ? 0x86efac : 0x4ade80,
          linewidth: 3
        });
        const borderLine = new THREE.Line(borderLineGeo, borderLineMat);
        borderLine.position.set(x, centerElev, z);
        borderLine.userData = { elementId: el.id };
        group.add(borderLine);

        // Add lightweight 3D procedural trees anchored on individual terrain coordinates
        const treeCount = Math.max(3, Math.min(8, Math.round(radius / 4.2)));
        for (let i = 0; i < treeCount; i++) {
          const tAngle = (i / treeCount) * Math.PI * 2 + (i % 3) * 0.45;
          const tDist = (0.2 + (i % 4) * 0.18) * radius * 0.85;
          const tx = x + Math.cos(tAngle) * tDist;
          const tz = z + Math.sin(tAngle) * tDist;
          const treeTerrainY = getTerrainElevation(tx, tz, currentCity.id);

          const trunkGeo = new THREE.CylinderGeometry(0.35, 0.5, 2.5, 5);
          const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d1a04 });
          const trunk = new THREE.Mesh(trunkGeo, trunkMat);
          trunk.position.set(tx, treeTerrainY + 1.25, tz);
          trunk.userData = { elementId: el.id };
          group.add(trunk);

          const foliageGeo = new THREE.ConeGeometry(2.2, 4.8, 6);
          const foliageMat = new THREE.MeshStandardMaterial({ 
            color: (i % 2 === 0) ? 0x047857 : 0x065f46, 
            roughness: 0.7 
          });
          const foliage = new THREE.Mesh(foliageGeo, foliageMat);
          foliage.position.set(tx, treeTerrainY + 4.2, tz);
          foliage.userData = { elementId: el.id };
          group.add(foliage);
        }
      } else if (el.type === 'pista_vial') {
        // High-fidelity Conforming 3D Urban Road (Calzada de Asfalto Gris con Sardineles de Hormigón y Puntos Ancla)
        const roadPts = (el.pathPoints && el.pathPoints.length >= 2)
          ? el.pathPoints
          : [el.coordinates, [el.coordinates[0] + 0.001, el.coordinates[1] + 0.0005]];
        const roadWidth = Math.max(4, Math.min(24, el.roadWidth || 8));
        const halfW = roadWidth / 2;
        const curbW = Math.max(0.65, Math.min(1.4, roadWidth * 0.1)); // Acera / sardinel lateral

        // Convert geo-coordinates to local XZ points
        const localWaypoints = roadPts.map(pt => coordsToLocal(pt));

        interface SampledPoint {
          x: number;
          z: number;
          nx: number;
          nz: number;
          y: number;
          dist: number;
        }

        const sampled: SampledPoint[] = [];
        let runningDist = 0;

        for (let i = 0; i < localWaypoints.length - 1; i++) {
          const p1 = localWaypoints[i];
          const p2 = localWaypoints[i + 1];
          const segDx = p2.x - p1.x;
          const segDz = p2.z - p1.z;
          const segLen = Math.hypot(segDx, segDz);
          if (segLen < 0.1) continue;

          // Unit direction & normal vector (perpendicular in horizontal XZ plane)
          const dirX = segDx / segLen;
          const dirZ = segDz / segLen;
          const nx = -dirZ;
          const nz = dirX;

          const steps = Math.max(2, Math.ceil(segLen / 2.8)); // High precision sampling for perfect terrain relief hugging
          const numSteps = (i === localWaypoints.length - 2) ? steps : steps - 1;

          for (let s = 0; s <= numSteps; s++) {
            const t = s / steps;
            const px = p1.x + segDx * t;
            const pz = p1.z + segDz * t;
            const py = getTerrainElevation(px, pz, currentCity.id);
            sampled.push({
              x: px,
              z: pz,
              nx,
              nz,
              y: py,
              dist: runningDist + segLen * t
            });
          }
          runningDist += segLen;
        }

        if (sampled.length >= 2) {
          const drapeOffset = 0.52; // Elevation to guarantee zero clipping into hillside polygons

          // -------------------------------------------------------------
          // 1. CALZADA ASFÁLTICA GRIS CARACTERÍSTICA (Main Asphalt Road)
          // -------------------------------------------------------------
          const roadGeo = new THREE.BufferGeometry();
          const roadVerts: number[] = [];
          const roadUVs: number[] = [];
          const roadIndices: number[] = [];

          sampled.forEach((pt) => {
            const yBase = pt.y + drapeOffset;

            // 0: Borde izquierdo de calzada
            roadVerts.push(pt.x + pt.nx * -halfW, yBase, pt.z + pt.nz * -halfW);
            roadUVs.push(0, pt.dist * 0.1);

            // 1: Corona central de calzada (ligera pendiente de drenaje +0.03m)
            roadVerts.push(pt.x, yBase + 0.03, pt.z);
            roadUVs.push(0.5, pt.dist * 0.1);

            // 2: Borde derecho de calzada
            roadVerts.push(pt.x + pt.nx * halfW, yBase, pt.z + pt.nz * halfW);
            roadUVs.push(1.0, pt.dist * 0.1);
          });

          // Quads para la calzada (2 tiras de quads: izquierda y derecha)
          for (let s = 0; s < sampled.length - 1; s++) {
            const r1 = s * 3;
            const r2 = (s + 1) * 3;

            // Tira izquierda (0 a 1)
            roadIndices.push(r1, r2, r2 + 1);
            roadIndices.push(r1, r2 + 1, r1 + 1);

            // Tira derecha (1 a 2)
            roadIndices.push(r1 + 1, r2 + 1, r2 + 2);
            roadIndices.push(r1 + 1, r2 + 2, r1 + 2);
          }

          roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
          roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUVs, 2));
          roadGeo.setIndex(roadIndices);
          roadGeo.computeVertexNormals();

          // Auténtico asfalto gris neutro urbano
          const roadMat = new THREE.MeshStandardMaterial({
            color: isSelected ? 0x5a677d : 0x475569, // Gris asfalto pizarra característico
            roughness: 0.84,
            metalness: 0.06,
            polygonOffset: true,
            polygonOffsetFactor: -3.0,
            polygonOffsetUnits: -5.0,
            side: THREE.DoubleSide
          });

          const roadMesh = new THREE.Mesh(roadGeo, roadMat);
          roadMesh.receiveShadow = true;
          roadMesh.userData = { elementId: el.id };
          group.add(roadMesh);
          clickableObjectsRef.current.push(roadMesh);

          // -------------------------------------------------------------
          // 2. SARDINELES DE HORMIGÓN CLARO Y FALDAS DE CONTENCIÓN (Curbs & Skirts)
          // -------------------------------------------------------------
          const curbGeo = new THREE.BufferGeometry();
          const curbVerts: number[] = [];
          const curbIndices: number[] = [];

          sampled.forEach((pt) => {
            const yBase = pt.y + drapeOffset;
            const ySkirt = pt.y - 1.2; // Extiende profundamente hacia la ladera para sellar cortes de cerro

            // Izquierda:
            // 0: Falda inferior
            curbVerts.push(pt.x + pt.nx * (-halfW - curbW), ySkirt, pt.z + pt.nz * (-halfW - curbW));
            // 1: Borde exterior acera
            curbVerts.push(pt.x + pt.nx * (-halfW - curbW), yBase + 0.12, pt.z + pt.nz * (-halfW - curbW));
            // 2: Borde interior sardinel
            curbVerts.push(pt.x + pt.nx * -halfW, yBase + 0.08, pt.z + pt.nz * -halfW);

            // Derecha:
            // 3: Borde interior sardinel
            curbVerts.push(pt.x + pt.nx * halfW, yBase + 0.08, pt.z + pt.nz * halfW);
            // 4: Borde exterior acera
            curbVerts.push(pt.x + pt.nx * (halfW + curbW), yBase + 0.12, pt.z + pt.nz * (halfW + curbW));
            // 5: Falda inferior
            curbVerts.push(pt.x + pt.nx * (halfW + curbW), ySkirt, pt.z + pt.nz * (halfW + curbW));
          });

          for (let s = 0; s < sampled.length - 1; s++) {
            const c1 = s * 6;
            const c2 = (s + 1) * 6;

            // Falda izquierda (0 -> 1)
            curbIndices.push(c1, c2, c2 + 1);
            curbIndices.push(c1, c2 + 1, c1 + 1);

            // Acera izquierda (1 -> 2)
            curbIndices.push(c1 + 1, c2 + 1, c2 + 2);
            curbIndices.push(c1 + 1, c2 + 2, c1 + 2);

            // Acera derecha (3 -> 4)
            curbIndices.push(c1 + 3, c2 + 3, c2 + 4);
            curbIndices.push(c1 + 3, c2 + 4, c1 + 4);

            // Falda derecha (4 -> 5)
            curbIndices.push(c1 + 4, c2 + 4, c2 + 5);
            curbIndices.push(c1 + 4, c2 + 5, c1 + 5);
          }

          curbGeo.setAttribute('position', new THREE.Float32BufferAttribute(curbVerts, 3));
          curbGeo.setIndex(curbIndices);
          curbGeo.computeVertexNormals();

          const curbMat = new THREE.MeshStandardMaterial({
            color: isSelected ? 0xa5b4fc : 0x94a3b8, // Hormigón gris claro / sardinel
            roughness: 0.78,
            metalness: 0.12,
            polygonOffset: true,
            polygonOffsetFactor: -2.0,
            polygonOffsetUnits: -3.0,
            side: THREE.DoubleSide
          });

          const curbMesh = new THREE.Mesh(curbGeo, curbMat);
          curbMesh.receiveShadow = true;
          curbMesh.userData = { elementId: el.id };
          group.add(curbMesh);

          // -------------------------------------------------------------
          // 3. DEMARCACIÓN VIAL CENTRAL (Pintura Blanca Suave)
          // -------------------------------------------------------------
          const centerLinePts = sampled.map(pt => new THREE.Vector3(pt.x, pt.y + drapeOffset + 0.05, pt.z));
          const centerLineGeo = new THREE.BufferGeometry().setFromPoints(centerLinePts);
          const centerLineMat = new THREE.LineDashedMaterial({
            color: isSelected ? 0x38bdf8 : 0xf8fafc, // Pintura vial blanca sutil
            dashSize: 3.5,
            gapSize: 2.2,
            linewidth: 2
          });
          const centerLine = new THREE.Line(centerLineGeo, centerLineMat);
          centerLine.computeLineDistances();
          centerLine.userData = { elementId: el.id };
          group.add(centerLine);

          // -------------------------------------------------------------
          // 4. MODO SELECCIÓN: CONTORNO CELESTE Y PUNTOS ANCLA INTERACTIVOS
          // -------------------------------------------------------------
          if (isSelected) {
            // Contorno perimetral celeste resplandeciente
            const leftBoundary = sampled.map(pt => new THREE.Vector3(pt.x + pt.nx * (-halfW - curbW), pt.y + drapeOffset + 0.18, pt.z + pt.nz * (-halfW - curbW)));
            const rightBoundary = sampled.map(pt => new THREE.Vector3(pt.x + pt.nx * (halfW + curbW), pt.y + drapeOffset + 0.18, pt.z + pt.nz * (halfW + curbW)));
            const boundaryPts = [...leftBoundary, ...rightBoundary.reverse(), leftBoundary[0]];
            const boundaryGeo = new THREE.BufferGeometry().setFromPoints(boundaryPts);
            const boundaryMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 });
            const boundaryLine = new THREE.Line(boundaryGeo, boundaryMat);
            group.add(boundaryLine);

            // Esferas y postes de Puntos Ancla Interactivos en cada vértice de la vía
            roadPts.forEach((wpt, wIdx) => {
              const { x: wx, z: wz } = coordsToLocal(wpt);
              const wy = getTerrainElevation(wx, wz, currentCity.id) + drapeOffset;
              const isWpActive = selectedRoadWaypointIdx === wIdx;

              // Esfera interactiva de control (arrastrable)
              const wpGeo = new THREE.SphereGeometry(isWpActive ? 2.4 : 1.9, 16, 16);
              const wpMat = new THREE.MeshStandardMaterial({
                color: isWpActive ? 0xf59e0b : 0x38bdf8,
                emissive: isWpActive ? 0xd97706 : 0x0284c7,
                emissiveIntensity: 0.95,
                roughness: 0.3
              });
              const wpMesh = new THREE.Mesh(wpGeo, wpMat);
              wpMesh.position.set(wx, wy + 2.6, wz);
              wpMesh.userData = { isRoadWaypoint: true, waypointIndex: wIdx, elementId: el.id };
              group.add(wpMesh);
              roadWaypointMeshesRef.current.push(wpMesh);

              // Poste vertical blanco
              const stemGeo = new THREE.CylinderGeometry(0.22, 0.22, 3.2, 8);
              const stemMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
              const stemMesh = new THREE.Mesh(stemGeo, stemMat);
              stemMesh.position.set(wx, wy + 1.2, wz);
              group.add(stemMesh);

              // Anillo de suelo
              const ringGeo = new THREE.RingGeometry(2.4, 3.2, 24);
              ringGeo.rotateX(-Math.PI / 2);
              const ringMat = new THREE.MeshBasicMaterial({
                color: isWpActive ? 0xfbbf24 : 0x38bdf8,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.85
              });
              const ringMesh = new THREE.Mesh(ringGeo, ringMat);
              ringMesh.position.set(wx, wy + 0.15, wz);
              group.add(ringMesh);
            });
          }
        }
      } else {
        // Volumetric 3D Building Extrusion with Uniform Ground Floor & Terrain Foundation
        const FLOOR_HEIGHT = 3.2; // Standard uniform floor height (m) across all structures
        const width = Math.max(14, Math.sqrt(el.footprintArea) * 0.85);
        const depth = Math.max(12, el.footprintArea / width);
        const totalBuildingHeight = Math.max(FLOOR_HEIGHT, el.floors * FLOOR_HEIGHT);

        const hw = width / 2;
        const hd = depth / 2;

        // Sample 4 corner elevations + center to accommodate slopes/relief without submerging or floating
        const y1 = getTerrainElevation(x - hw * cosA - hd * sinA, z - hw * sinA + hd * cosA, currentCity.id);
        const y2 = getTerrainElevation(x + hw * cosA - hd * sinA, z + hw * sinA + hd * cosA, currentCity.id);
        const y3 = getTerrainElevation(x - hw * cosA + hd * sinA, z - hw * sinA - hd * cosA, currentCity.id);
        const y4 = getTerrainElevation(x + hw * cosA + hd * sinA, z + hw * sinA - hd * cosA, currentCity.id);

        const minY = Math.min(yCenter, y1, y2, y3, y4);
        const maxY = Math.max(yCenter, y1, y2, y3, y4);

        // 1. Supporting Foundation Base Platform (Zócalo Nivelador de Cimentación)
        // Provides a solid, uniform horizontal supporting plane regardless of hillside slope
        const baseTopY = maxY + 0.2; // Top surface of the supporting foundation
        const plinthBottomY = minY - 2.5; // Extends deep into sloping ground to avoid gaps
        const plinthHeight = baseTopY - plinthBottomY;

        const plinthGeo = new THREE.BoxGeometry(width * 1.04, plinthHeight, depth * 1.04);
        const plinthMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.95,
          metalness: 0.1
        });
        const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
        plinthMesh.position.set(x, baseTopY - plinthHeight / 2, z);
        plinthMesh.rotation.y = angle;
        plinthMesh.receiveShadow = true;
        plinthMesh.castShadow = layerState.shadowSim;
        plinthMesh.userData = { elementId: el.id };
        group.add(plinthMesh);
        clickableObjectsRef.current.push(plinthMesh);

        // Foundation coping trim / leveling slab at baseTopY
        const foundationTrimGeo = new THREE.BoxGeometry(width * 1.06, 0.3, depth * 1.06);
        const foundationTrimMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          roughness: 0.85
        });
        const foundationTrim = new THREE.Mesh(foundationTrimGeo, foundationTrimMat);
        foundationTrim.position.set(x, baseTopY - 0.15, z);
        foundationTrim.rotation.y = angle;
        foundationTrim.receiveShadow = true;
        foundationTrim.userData = { elementId: el.id };
        group.add(foundationTrim);

        // Helper to add a rotated child relative to building center (selective shadows for maximum FPS)
        const addBuildingPart = (
          mesh: THREE.Mesh,
          relX: number,
          relY: number,
          relZ: number,
          relRotY = 0,
          canCastShadow = false
        ) => {
          const rx = relX * cosA - relZ * sinA;
          const rz = relX * sinA + relZ * cosA;
          mesh.position.set(x + rx, baseTopY + relY, z + rz);
          mesh.rotation.y = angle + relRotY;
          mesh.castShadow = canCastShadow && layerState.shadowSim;
          mesh.receiveShadow = true;
          mesh.userData = { elementId: el.id };
          group.add(mesh);
          return mesh;
        };

        // Switch through the distinct architectural styles for each element type
        switch (el.type) {
          // ==========================================
          // 1. VIVIENDA SOCIAL (Apartment Block)
          // ==========================================
          case 'vivienda_social': {
            const bodyColor = isSelected ? 0x38bdf8 : 0x0284c7;
            const buildingGeo = new THREE.BoxGeometry(width, totalBuildingHeight, depth);
            const buildingMat = new THREE.MeshStandardMaterial({
              color: bodyColor,
              roughness: 0.4,
              metalness: 0.15,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const mainMesh = new THREE.Mesh(buildingGeo, buildingMat);
            addBuildingPart(mainMesh, 0, totalBuildingHeight / 2, 0, 0, true);

            if (!layerState.wireframeMode) {
              // Slabs per floor
              for (let f = 1; f < el.floors; f++) {
                const slabGeo = new THREE.BoxGeometry(width * 1.02, 0.22, depth * 1.02);
                const slabMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
                const slab = new THREE.Mesh(slabGeo, slabMat);
                addBuildingPart(slab, 0, f * FLOOR_HEIGHT, 0);
              }

              // Cantilevered balconies on front & rear facades (floors 2+)
              for (let f = 1; f < el.floors; f++) {
                const balconyY = f * FLOOR_HEIGHT + 0.4;
                const balconyWidth = Math.min(width * 0.28, 4.5);
                const balconyDepth = 1.6;
                [-width * 0.25, width * 0.25].forEach((balcX) => {
                  // Front balcony
                  const balcGeo = new THREE.BoxGeometry(balconyWidth, 0.25, balconyDepth);
                  const balcMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
                  const balcMesh = new THREE.Mesh(balcGeo, balcMat);
                  addBuildingPart(balcMesh, balcX, balconyY, hd + balconyDepth / 2 - 0.1);

                  const railGeo = new THREE.BoxGeometry(balconyWidth, 0.9, 0.1);
                  const railMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
                  const railMesh = new THREE.Mesh(railGeo, railMat);
                  addBuildingPart(railMesh, balcX, balconyY + 0.5, hd + balconyDepth - 0.05);

                  // Rear balcony
                  const balcRear = new THREE.Mesh(balcGeo, balcMat);
                  addBuildingPart(balcRear, balcX, balconyY, -hd - balconyDepth / 2 + 0.1);

                  const railRear = new THREE.Mesh(railGeo, railMat);
                  addBuildingPart(railRear, balcX, balconyY + 0.5, -hd - balconyDepth + 0.05);
                });
              }

              // Rooftop: Solar PV panel array
              const solarGeo = new THREE.BoxGeometry(Math.min(width * 0.6, 9), 0.15, Math.min(depth * 0.4, 5));
              const solarMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.2, metalness: 0.85 });
              const solarMesh = new THREE.Mesh(solarGeo, solarMat);
              solarMesh.rotation.x = -Math.PI / 10;
              addBuildingPart(solarMesh, -width * 0.15, totalBuildingHeight + 0.6, 0);

              // Rooftop: Twin white water reserve tanks (Tinacos)
              for (let t = 0; t < 2; t++) {
                const tankGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.6, 12);
                const tankMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.6 });
                const tankMesh = new THREE.Mesh(tankGeo, tankMat);
                addBuildingPart(tankMesh, width * 0.25 + t * 2.2, totalBuildingHeight + 0.8, -depth * 0.15);
              }

              // Rooftop Elevator Core Penthouse
              const liftGeo = new THREE.BoxGeometry(3.5, 2.2, 3.5);
              const liftMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
              const liftMesh = new THREE.Mesh(liftGeo, liftMat);
              addBuildingPart(liftMesh, 0, totalBuildingHeight + 1.1, -depth * 0.1);

              // Ground entrance canopy
              const canopyGeo = new THREE.BoxGeometry(Math.min(width * 0.35, 5), 0.25, 2.5);
              const canopyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.5 });
              const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
              addBuildingPart(canopyMesh, 0, 2.8, hd + 1.2);
            }

            // Roof slab
            const roofGeo = new THREE.BoxGeometry(width * 1.02, 0.35, depth * 1.02);
            const roofMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.9 });
            const roofMesh = new THREE.Mesh(roofGeo, roofMat);
            addBuildingPart(roofMesh, 0, totalBuildingHeight + 0.18, 0);
            break;
          }

          // ==========================================
          // 2. VIVIENDA INCREMENTAL (Aravena / Elemental Style)
          // ==========================================
          case 'vivienda_incremental': {
            const bodyColor = isSelected ? 0x38bdf8 : 0xc2410c; // Terracotta fired brick
            const halfWidth = width / 2;

            // Left half: Consolidated solid brick structure
            const solidGeo = new THREE.BoxGeometry(halfWidth, totalBuildingHeight, depth);
            const solidMat = new THREE.MeshStandardMaterial({
              color: bodyColor,
              roughness: 0.85,
              metalness: 0.05,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const solidMesh = new THREE.Mesh(solidGeo, solidMat);
            addBuildingPart(solidMesh, -halfWidth / 2, totalBuildingHeight / 2, 0, 0, true);

            if (!layerState.wireframeMode) {
              // Pitched corrugated sheet roof over the solid brick half
              const pitchGeo = new THREE.ConeGeometry(halfWidth * 0.8, 1.8, 4);
              const pitchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5, metalness: 0.6 });
              const pitchMesh = new THREE.Mesh(pitchGeo, pitchMat);
              pitchMesh.rotation.y = Math.PI / 4;
              addBuildingPart(pitchMesh, -halfWidth / 2, totalBuildingHeight + 0.9, 0);

              // Right half: Open structural expansion framework (timber / steel grid ready for progressive expansion)
              const frameMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 }); // Timber beams
              const colGeo = new THREE.BoxGeometry(0.35, totalBuildingHeight, 0.35);

              // 4 Corner structural timber columns on the incremental half
              [0.1, halfWidth - 0.2].forEach((cx) => {
                [-hd + 0.2, hd - 0.2].forEach((cz) => {
                  const colMesh = new THREE.Mesh(colGeo, frameMat);
                  addBuildingPart(colMesh, cx, totalBuildingHeight / 2, cz);
                });
              });

              // Horizontal beams and upper pergola deck
              for (let f = 1; f <= el.floors; f++) {
                const beamGeoX = new THREE.BoxGeometry(halfWidth, 0.25, 0.35);
                const bFront = new THREE.Mesh(beamGeoX, frameMat);
                addBuildingPart(bFront, halfWidth / 2, f * FLOOR_HEIGHT, hd - 0.2);
                const bRear = new THREE.Mesh(beamGeoX, frameMat);
                addBuildingPart(bRear, halfWidth / 2, f * FLOOR_HEIGHT, -hd + 0.2);

                // Open timber deck rafters on floor 2
                if (f === 1) {
                  const deckGeo = new THREE.BoxGeometry(halfWidth * 0.95, 0.15, depth * 0.95);
                  const deckMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.9 });
                  const deckMesh = new THREE.Mesh(deckGeo, deckMat);
                  addBuildingPart(deckMesh, halfWidth / 2, f * FLOOR_HEIGHT - 0.08, 0);

                  // Green planter boxes with vegetation on the terrace railing
                  const planterGeo = new THREE.BoxGeometry(halfWidth * 0.7, 0.45, 0.5);
                  const planterMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
                  const planterMesh = new THREE.Mesh(planterGeo, planterMat);
                  addBuildingPart(planterMesh, halfWidth / 2, f * FLOOR_HEIGHT + 0.4, hd - 0.1);
                }
              }

              // Exterior metal/wood staircase on front facade
              const stairGeo = new THREE.BoxGeometry(1.2, totalBuildingHeight * 0.55, 0.4);
              const stairMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.7 });
              const stairMesh = new THREE.Mesh(stairGeo, stairMat);
              stairMesh.rotation.z = -Math.PI / 7;
              addBuildingPart(stairMesh, 0.2, totalBuildingHeight * 0.3, hd + 0.3);
            }
            break;
          }

          // ==========================================
          // 3. ESCUELA / CENTRO EDUCATIVO
          // ==========================================
          case 'escuela': {
            const bodyColor = isSelected ? 0x38bdf8 : 0xf59e0b; // Academic amber
            const schoolHeight = Math.max(FLOOR_HEIGHT * 2, totalBuildingHeight);

            // L-Shaped Main Educational Wing
            const wingW = width * 0.65;
            const wingD = depth;
            const mainGeo = new THREE.BoxGeometry(wingW, schoolHeight, wingD);
            const schoolMat = new THREE.MeshStandardMaterial({
              color: bodyColor,
              roughness: 0.45,
              metalness: 0.1,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const mainWing = new THREE.Mesh(mainGeo, schoolMat);
            addBuildingPart(mainWing, -width / 2 + wingW / 2, schoolHeight / 2, 0, 0, true);

            // Perpendicular wing (Library / Auditorium Wing)
            const perpW = width * 0.35;
            const perpD = depth * 0.5;
            const perpGeo = new THREE.BoxGeometry(perpW, schoolHeight * 0.85, perpD);
            const perpWing = new THREE.Mesh(perpGeo, schoolMat);
            addBuildingPart(perpWing, width / 2 - perpW / 2, (schoolHeight * 0.85) / 2, -depth / 2 + perpD / 2);

            if (!layerState.wireframeMode) {
              // Central Square Clock Tower (elevated 5m above roof)
              const towerW = 3.6;
              const towerH = schoolHeight + 5.5;
              const towerGeo = new THREE.BoxGeometry(towerW, towerH, towerW);
              const towerMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
              const towerMesh = new THREE.Mesh(towerGeo, towerMat);
              addBuildingPart(towerMesh, -width * 0.1, towerH / 2, -depth * 0.1);

              // 4 Clock faces on tower
              for (let side = 0; side < 4; side++) {
                const clockGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.1, 16);
                const clockMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
                const clockMesh = new THREE.Mesh(clockGeo, clockMat);
                clockMesh.rotation.x = Math.PI / 2;
                clockMesh.rotation.z = (side * Math.PI) / 2;
                const cDist = towerW / 2 + 0.06;
                const cx = side === 1 ? cDist : side === 3 ? -cDist : 0;
                const cz = side === 0 ? cDist : side === 2 ? -cDist : 0;
                addBuildingPart(clockMesh, -width * 0.1 + cx, towerH - 1.2, -depth * 0.1 + cz);
              }

              // Flagpole & Academy banner flag
              const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.5, 8);
              const poleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 });
              const poleMesh = new THREE.Mesh(poleGeo, poleMat);
              addBuildingPart(poleMesh, -width * 0.1, towerH + 1.75, -depth * 0.1);

              const flagGeo = new THREE.BoxGeometry(1.6, 0.9, 0.05);
              const flagMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
              const flagMesh = new THREE.Mesh(flagGeo, flagMat);
              addBuildingPart(flagMesh, -width * 0.1 + 0.8, towerH + 2.8, -depth * 0.1);

              // Schoolyard Multi-sports court in the inner corner
              const courtW = width * 0.45;
              const courtD = depth * 0.55;
              const courtGeo = new THREE.BoxGeometry(courtW, 0.08, courtD);
              const courtMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.8 }); // Blue sports court
              const courtMesh = new THREE.Mesh(courtGeo, courtMat);
              addBuildingPart(courtMesh, width / 2 - courtW / 2, 0.05, depth / 2 - courtD / 2);

              // Basketball hoop backboards
              const hoopPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.0, 8);
              const hoopPoleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 });
              const hoopPole = new THREE.Mesh(hoopPoleGeo, hoopPoleMat);
              addBuildingPart(hoopPole, width / 2 - courtW / 2, 1.5, depth / 2 - 0.3);

              const backboardGeo = new THREE.BoxGeometry(1.2, 0.8, 0.1);
              const backboardMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
              const backboard = new THREE.Mesh(backboardGeo, backboardMat);
              addBuildingPart(backboard, width / 2 - courtW / 2, 2.7, depth / 2 - 0.3);
            }
            break;
          }

          // ==========================================
          // 4. CENTRO DE SALUD / HOSPITAL
          // ==========================================
          case 'centro_salud': {
            const bodyColor = isSelected ? 0x38bdf8 : 0xf8fafc; // Clinical white
            const hospHeight = Math.max(FLOOR_HEIGHT * 2, totalBuildingHeight);

            // Main Clinical White Block
            const hospGeo = new THREE.BoxGeometry(width, hospHeight, depth);
            const hospMat = new THREE.MeshStandardMaterial({
              color: bodyColor,
              roughness: 0.3,
              metalness: 0.1,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const hospMesh = new THREE.Mesh(hospGeo, hospMat);
            addBuildingPart(hospMesh, 0, hospHeight / 2, 0, 0, true);

            if (!layerState.wireframeMode) {
              // Crimson Medical Horizontal Accent Stripe
              const stripeGeo = new THREE.BoxGeometry(width * 1.01, 0.8, depth * 1.01);
              const stripeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
              const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
              addBuildingPart(stripeMesh, 0, hospHeight * 0.65, 0);

              // 3D Dimensional Red Medical Cross (+) on Front Facade
              const crossMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2 });
              const crossVGeo = new THREE.BoxGeometry(0.8, 2.6, 0.3);
              const crossV = new THREE.Mesh(crossVGeo, crossMat);
              addBuildingPart(crossV, 0, hospHeight * 0.65, hd + 0.15);

              const crossHGeo = new THREE.BoxGeometry(2.6, 0.8, 0.3);
              const crossH = new THREE.Mesh(crossHGeo, crossMat);
              addBuildingPart(crossH, 0, hospHeight * 0.65, hd + 0.15);

              // Rooftop Emergency Helipad (Helipuerto con señal H)
              const heliRadius = Math.min(width, depth) * 0.38;
              const heliGeo = new THREE.CylinderGeometry(heliRadius, heliRadius, 0.25, 24);
              const heliMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
              const heliMesh = new THREE.Mesh(heliGeo, heliMat);
              addBuildingPart(heliMesh, 0, hospHeight + 0.15, 0);

              // Helipad Yellow Perimeter Ring
              const ringGeo = new THREE.RingGeometry(heliRadius * 0.85, heliRadius * 0.95, 24);
              const ringMat = new THREE.MeshBasicMaterial({ color: 0xeab308, side: THREE.DoubleSide });
              const ringMesh = new THREE.Mesh(ringGeo, ringMat);
              ringMesh.rotation.x = -Math.PI / 2;
              addBuildingPart(ringMesh, 0, hospHeight + 0.29, 0);

              // Ambulance Emergency Intake Bay Canopy (Bahía de Urgencias)
              const ambBayW = Math.min(width * 0.45, 6);
              const ambBayD = 3.5;
              const ambCanopyGeo = new THREE.BoxGeometry(ambBayW, 0.3, ambBayD);
              const ambCanopyMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
              const ambCanopy = new THREE.Mesh(ambCanopyGeo, ambCanopyMat);
              addBuildingPart(ambCanopy, -width * 0.25, 3.2, hd + ambBayD / 2);

              // Pulsating Blue Emergency Beacon Light
              const beaconGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 12);
              const beaconMat = new THREE.MeshStandardMaterial({
                color: 0x0284c7,
                emissive: 0x38bdf8,
                emissiveIntensity: 0.9
              });
              const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
              addBuildingPart(beaconMesh, -width * 0.25, 3.7, hd + ambBayD / 2);

              // Rooftop HVAC units
              const hvacGeo = new THREE.BoxGeometry(2.4, 1.4, 2.4);
              const hvacMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
              const hvacMesh = new THREE.Mesh(hvacGeo, hvacMat);
              addBuildingPart(hvacMesh, width * 0.3, hospHeight + 0.7, -depth * 0.25);
            }
            break;
          }

          // ==========================================
          // 5. PARADA DE TRANSPORTE / ESTACIÓN INTERMODAL
          // ==========================================
          case 'parada_transporte': {
            const bodyColor = isSelected ? 0x38bdf8 : 0x8b5cf6; // Transit violet
            const stationHeight = Math.max(FLOOR_HEIGHT * 1.5, totalBuildingHeight * 0.7);

            // Elevated Platform Deck
            const platGeo = new THREE.BoxGeometry(width, 0.9, depth);
            const platMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
            const platMesh = new THREE.Mesh(platGeo, platMat);
            addBuildingPart(platMesh, 0, 0.45, 0);

            // Bright Yellow Tactile Safety Warning Strip along platform edge
            const stripGeo = new THREE.BoxGeometry(width, 0.05, 0.6);
            const stripMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
            const stripFront = new THREE.Mesh(stripGeo, stripMat);
            addBuildingPart(stripFront, 0, 0.93, hd - 0.4);
            const stripRear = new THREE.Mesh(stripGeo, stripMat);
            addBuildingPart(stripRear, 0, 0.93, -hd + 0.4);

            if (!layerState.wireframeMode) {
              // Signature Arched Vaulted Canopy (Bóveda traslúcida de cristal / policarbonato)
              const archRadius = width * 0.52;
              const archGeo = new THREE.CylinderGeometry(archRadius, archRadius, depth * 0.95, 24, 1, false, 0, Math.PI);
              const archMat = new THREE.MeshStandardMaterial({
                color: bodyColor,
                roughness: 0.2,
                metalness: 0.3,
                transparent: true,
                opacity: 0.75,
                side: THREE.DoubleSide
              });
              const archMesh = new THREE.Mesh(archGeo, archMat);
              archMesh.rotation.z = Math.PI / 2;
              archMesh.rotation.y = Math.PI / 2;
              addBuildingPart(archMesh, 0, stationHeight + 1.2, 0);

              // Heavy-duty Steel Truss V-Pillars supporting the canopy
              const pillarMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
              [-width * 0.38, width * 0.38].forEach((px) => {
                [-hd * 0.6, hd * 0.6].forEach((pz) => {
                  const pGeo = new THREE.CylinderGeometry(0.2, 0.2, stationHeight + 1.2, 8);
                  const pMesh = new THREE.Mesh(pGeo, pillarMat);
                  addBuildingPart(pMesh, px, (stationHeight + 1.2) / 2, pz);
                });
              });

              // Tall Transit Totem / Signage Pylon with glowing LED header
              const totemGeo = new THREE.BoxGeometry(0.8, 6.5, 0.8);
              const totemMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
              const totemMesh = new THREE.Mesh(totemGeo, totemMat);
              addBuildingPart(totemMesh, width * 0.48, 3.25, hd + 0.8);

              const beaconSignGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
              const beaconSignMat = new THREE.MeshStandardMaterial({
                color: 0x8b5cf6,
                emissive: 0x8b5cf6,
                emissiveIntensity: 0.8
              });
              const beaconSign = new THREE.Mesh(beaconSignGeo, beaconSignMat);
              addBuildingPart(beaconSign, width * 0.48, 6.2, hd + 0.8);

              // Turnstile / Ticket Gates Entry Box
              const gateGeo = new THREE.BoxGeometry(Math.min(width * 0.4, 4.5), 2.2, 1.8);
              const gateMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
              const gateMesh = new THREE.Mesh(gateGeo, gateMat);
              addBuildingPart(gateMesh, 0, 1.1, 0);
            }
            break;
          }

          // ==========================================
          // 6. COMERCIO LOCAL / MERCADO / TALLERES
          // ==========================================
          case 'comercio_local': {
            const bodyColor = isSelected ? 0x38bdf8 : 0xd946ef; // Commercial magenta
            const storeHeight = Math.max(FLOOR_HEIGHT, totalBuildingHeight);

            // Main Market & Commercial Hall
            const storeGeo = new THREE.BoxGeometry(width, storeHeight, depth);
            const storeMat = new THREE.MeshStandardMaterial({
              color: bodyColor,
              roughness: 0.4,
              metalness: 0.1,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const storeMesh = new THREE.Mesh(storeGeo, storeMat);
            addBuildingPart(storeMesh, 0, storeHeight / 2, 0, 0, true);

            if (!layerState.wireframeMode) {
              // Striped Merchant Awnings (Toldos a Rayas) projecting over the front sidewalk
              const numAwnings = Math.max(2, Math.floor(width / 4));
              const awnWidth = (width * 0.9) / numAwnings;
              const awnDepth = 2.2;
              const awningMat1 = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 }); // Red stripe
              const awningMat2 = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }); // White stripe

              for (let a = 0; a < numAwnings; a++) {
                const ax = -width * 0.45 + (a + 0.5) * awnWidth;
                const awnGeo = new THREE.BoxGeometry(awnWidth * 0.95, 0.15, awnDepth);
                const aMesh = new THREE.Mesh(awnGeo, a % 2 === 0 ? awningMat1 : awningMat2);
                aMesh.rotation.x = Math.PI / 10;
                addBuildingPart(aMesh, ax, 3.1, hd + awnDepth / 2 - 0.2);
              }

              // Outdoor Market Stalls & Wooden Produce Crates along sidewalk
              [-width * 0.3, 0, width * 0.3].forEach((sx) => {
                const stallGeo = new THREE.BoxGeometry(1.6, 0.85, 1.2);
                const stallMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 }); // Wood table
                const stallMesh = new THREE.Mesh(stallGeo, stallMat);
                addBuildingPart(stallMesh, sx, 0.45, hd + 1.8);

                // Crates with fresh goods (green & orange produce)
                const crateGeo = new THREE.BoxGeometry(0.6, 0.35, 0.5);
                const crateMat = new THREE.MeshStandardMaterial({ color: sx > 0 ? 0x16a34a : 0xf59e0b });
                const crateMesh = new THREE.Mesh(crateGeo, crateMat);
                addBuildingPart(crateMesh, sx, 1.0, hd + 1.8);
              });

              // Rooftop Neon Commercial Billboard / Marquee Banner
              const signW = Math.min(width * 0.75, 10);
              const signH = 2.2;
              const signGeo = new THREE.BoxGeometry(signW, signH, 0.3);
              const signMat = new THREE.MeshStandardMaterial({
                color: 0xf43f5e,
                emissive: 0xd946ef,
                emissiveIntensity: 0.6
              });
              const signMesh = new THREE.Mesh(signGeo, signMat);
              addBuildingPart(signMesh, 0, storeHeight + signH / 2 + 0.8, 0);

              // Billboard steel frame supports
              const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
              [-signW * 0.38, signW * 0.38].forEach((fx) => {
                const legGeo = new THREE.BoxGeometry(0.2, 1.6, 0.2);
                const legMesh = new THREE.Mesh(legGeo, frameMat);
                addBuildingPart(legMesh, fx, storeHeight + 0.8, 0);
              });
            }

            // Roof parapet
            const roofGeo = new THREE.BoxGeometry(width * 1.02, 0.3, depth * 1.02);
            const roofMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.9 });
            const roofMesh = new THREE.Mesh(roofGeo, roofMat);
            addBuildingPart(roofMesh, 0, storeHeight + 0.15, 0);
            break;
          }

          // ==========================================
          // 7. ESPACIO COMUNITARIO / CASA DE CULTURA / ÁGORA
          // ==========================================
          case 'espacio_comunitario': {
            const bodyColor = isSelected ? 0x38bdf8 : 0x14b8a6; // Civic teal
            const agoraHeight = Math.max(FLOOR_HEIGHT * 1.6, totalBuildingHeight);

            // Civic Pavilion Core Block
            const pavGeo = new THREE.BoxGeometry(width * 0.7, agoraHeight, depth * 0.7);
            const pavMat = new THREE.MeshStandardMaterial({
              color: bodyColor,
              roughness: 0.35,
              metalness: 0.15,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const pavMesh = new THREE.Mesh(pavGeo, pavMat);
            addBuildingPart(pavMesh, -width * 0.15, agoraHeight / 2, 0, 0, true);

            if (!layerState.wireframeMode) {
              // Iconic Swooping Wave / Timber Canopy Roof
              const roofWingGeo = new THREE.BoxGeometry(width * 1.15, 0.45, depth * 1.15);
              const roofWingMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.4, metalness: 0.3 });
              const roofWing = new THREE.Mesh(roofWingGeo, roofWingMat);
              roofWing.rotation.z = Math.PI / 18; // Angled swooping civic roof
              addBuildingPart(roofWing, 0, agoraHeight + 0.6, 0);

              // Laminated Timber Pillar Colonnade supporting the wave roof
              const pillarMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
              [-width * 0.45, width * 0.45].forEach((px) => {
                [-hd * 0.8, hd * 0.8].forEach((pz) => {
                  const pGeo = new THREE.CylinderGeometry(0.25, 0.25, agoraHeight + 0.6, 8);
                  const pMesh = new THREE.Mesh(pGeo, pillarMat);
                  addBuildingPart(pMesh, px, (agoraHeight + 0.6) / 2, pz);
                });
              });

              // Semi-circular Stepped Tiered Amphitheater (Ágora / Gradas comunitarias)
              const tiers = 3;
              for (let t = 0; t < tiers; t++) {
                const tierRadius = (width * 0.35) * ((tiers - t) / tiers);
                const stepGeo = new THREE.CylinderGeometry(tierRadius, tierRadius + 0.8, 0.4, 16, 1, false, 0, Math.PI);
                const stepMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
                const stepMesh = new THREE.Mesh(stepGeo, stepMat);
                stepMesh.rotation.y = Math.PI / 2;
                addBuildingPart(stepMesh, width * 0.32, t * 0.4 + 0.2, 0);
              }

              // Central Agora Gathering Stage / Monument Platform
              const stageGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.3, 16);
              const stageMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.6 });
              const stageMesh = new THREE.Mesh(stageGeo, stageMat);
              addBuildingPart(stageMesh, width * 0.32, 0.15, 0);

              // Central symbolic civic tree / sculptural centerpiece
              const treeTrunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 2.5, 8);
              const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5a2d0c });
              const treeTrunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
              addBuildingPart(treeTrunk, width * 0.32, 1.4, 0);

              const treeFoliageGeo = new THREE.SphereGeometry(1.6, 12, 12);
              const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.7 });
              const treeFoliage = new THREE.Mesh(treeFoliageGeo, treeFoliageMat);
              addBuildingPart(treeFoliage, width * 0.32, 3.2, 0);
            }
            break;
          }

          // Fallback generic volumetric building
          default: {
            const buildingGeo = new THREE.BoxGeometry(width, totalBuildingHeight, depth);
            const buildingMat = new THREE.MeshStandardMaterial({
              color: isSelected ? 0x38bdf8 : elColor,
              roughness: 0.35,
              metalness: 0.2,
              wireframe: layerState.wireframeMode,
              emissive: isSelected ? 0x0c4a6e : 0x000000
            });
            const buildingMesh = new THREE.Mesh(buildingGeo, buildingMat);
            addBuildingPart(buildingMesh, 0, totalBuildingHeight / 2, 0, 0, true);
            break;
          }
        }

        // Selection Pin & Vertical Light Beacon
        if (isSelected) {
          const pinGeo = new THREE.SphereGeometry(2.5, 16, 16);
          const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
          const pinMesh = new THREE.Mesh(pinGeo, pinMat);
          pinMesh.position.set(x, baseTopY + totalBuildingHeight + 6.5, z);
          group.add(pinMesh);

          const stemGeo = new THREE.CylinderGeometry(0.25, 0.25, 5, 8);
          const stemMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
          const stemMesh = new THREE.Mesh(stemGeo, stemMat);
          stemMesh.position.set(x, baseTopY + totalBuildingHeight + 3.2, z);
          group.add(stemMesh);
        }
      }
    });

    if (rendererRef.current && rendererRef.current.shadowMap.enabled) {
      rendererRef.current.shadowMap.needsUpdate = true;
    }
  }, [elements, selectedElement, layerState, currentCity, timeOfDay, selectedRoadWaypointIdx]);

  // Dedicated Ultra-Fast Drafting Overlay (Re-renders only preview lines and waypoints without rebuilding whole city)
  useEffect(() => {
    if (!draftingGroupRef.current) return;
    const draftGroup = draftingGroupRef.current;

    // Clear old drafting markers
    while (draftGroup.children.length > 0) {
      const obj = draftGroup.children[0];
      draftGroup.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    }

    if (!isPlacingMode || selectedPlacementType !== 'pista_vial' || roadPoints.length === 0) {
      return;
    }

    const activePts = [...roadPoints];
    if (roadHoverCoords) {
      activePts.push(roadHoverCoords);
    }

    // Waypoint sphere pins
    roadPoints.forEach((pt, idx) => {
      const { x, z } = coordsToLocal(pt);
      const y = getTerrainElevation(x, z, currentCity.id);
      const nodeGeo = new THREE.SphereGeometry(1.8, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0x10b981 : 0x38bdf8,
        emissive: idx === 0 ? 0x059669 : 0x0284c7,
        emissiveIntensity: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y + 1.8, z);
      draftGroup.add(nodeMesh);

      // Marker stem
      const stemGeo = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.set(x, y + 1.5, z);
      draftGroup.add(stemMesh);
    });

    // Active polyline in 3D
    if (activePts.length >= 2) {
      const line3DPts: THREE.Vector3[] = [];
      for (let i = 0; i < activePts.length - 1; i++) {
        const p1 = coordsToLocal(activePts[i]);
        const p2 = coordsToLocal(activePts[i + 1]);
        const segDist = Math.hypot(p2.x - p1.x, p2.z - p1.z);
        const steps = Math.max(2, Math.ceil(segDist / 4));
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const px = p1.x + (p2.x - p1.x) * t;
          const pz = p1.z + (p2.z - p1.z) * t;
          const py = getTerrainElevation(px, pz, currentCity.id) + 0.4;
          line3DPts.push(new THREE.Vector3(px, py, pz));
        }
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(line3DPts);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      draftGroup.add(lineMesh);
    }
  }, [isPlacingMode, selectedPlacementType, roadPoints, roadHoverCoords, currentCity]);

  // Helper to convert screen coordinates to real GIS geo-coordinates on 3D terrain (Zero Allocation)
  const getRaycastGeoCoords = (clientX: number, clientY: number): [number, number] | null => {
    if (!threeCanvasRef.current || !cameraRef.current || !groundMeshRef.current) return null;
    const rect = threeCanvasRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    sharedMouseVecRef.current.set(x, y);
    sharedRaycasterRef.current.setFromCamera(sharedMouseVecRef.current, cameraRef.current);
    const intersects = sharedRaycasterRef.current.intersectObject(groundMeshRef.current, false);

    if (intersects.length > 0) {
      const targetPoint = intersects[0].point;
      const latMetersPerDegree = 111320;
      const lngMetersPerDegree = 111320 * Math.cos((currentCity.center[1] * Math.PI) / 180);
      const lng = currentCity.center[0] + targetPoint.x / lngMetersPerDegree;
      const lat = currentCity.center[1] - targetPoint.z / latMetersPerDegree;
      return [lng, lat];
    }
    return null;
  };

  // Check if a building/element is under the mouse cursor (Ultra-Fast Non-Recursive Check)
  const getElementUnderCursor = (clientX: number, clientY: number): UrbanElement | null => {
    if (!threeCanvasRef.current || !cameraRef.current) return null;
    const targets = clickableObjectsRef.current.length > 0
      ? clickableObjectsRef.current
      : (objectsGroupRef.current ? objectsGroupRef.current.children : []);
    if (targets.length === 0) return null;

    const rect = threeCanvasRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    sharedMouseVecRef.current.set(x, y);
    sharedRaycasterRef.current.setFromCamera(sharedMouseVecRef.current, cameraRef.current);
    const intersects = sharedRaycasterRef.current.intersectObjects(targets, false);

    if (intersects.length > 0) {
      const elId = intersects[0].object.userData?.elementId;
      if (elId) {
        return elements.find((el) => el.id === elId) || null;
      }
    }
    return null;
  };

  // Mouse Orbit, Panning & Element Dragging Handlers
  const isMouseDownRef = useRef<boolean>(false);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedSignificantlyRef = useRef<boolean>(false);
  const activeDraggedElementRef = useRef<UrbanElement | null>(null);

  // Road drawing action handlers
  const handleFinishRoad = (pointsToUse?: [number, number][]) => {
    const pts = pointsToUse || roadPoints;
    if (pts.length < 2) return;
    const lengthM = calculatePolylineLengthMeters(pts);
    const roundedLength = Math.max(10, Math.round(lengthM));
    const roadWidth = draftingRoadWidth || 8;
    const area = Math.round(roundedLength * roadWidth);
    const cost = Math.round(roundedLength * (roadWidth * 15));

    onAddElementAtCoords(pts[0], 'pista_vial', {
      name: `Pista Asfaltada ${roadWidth}m (${roundedLength}m)`,
      pathPoints: pts,
      roadWidth,
      footprintArea: area,
      costEstimateUSD: cost,
      floors: 1,
      heightMeters: 0.15,
      unitsCount: 0,
      populationCapacity: 6000,
      solarOrientation: 180,
      ventilationScore: 92,
      status: 'propuesto'
    });

    setRoadPoints([]);
    setRoadHoverCoords(null);
    setIsPlacingMode(false);
    setIsExtendingRoad(false);
  };

  const handleUndoLastRoadPoint = () => {
    setRoadPoints(prev => prev.slice(0, prev.length - 1));
  };

  const handleCancelRoadDrawing = () => {
    setRoadPoints([]);
    setRoadHoverCoords(null);
    setIsPlacingMode(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isMouseDownRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedSignificantlyRef.current = false;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    // Right-Click (Button 2) -> Start Panning / Moving the Map
    if (e.button === 2) {
      isPanningRef.current = true;
      isDraggingRef.current = false;
      activeDraggedElementRef.current = null;
      return;
    }

    // Left-Click (Button 0)
    if (e.button === 0) {
      // 1. Check if user clicked directly on a road waypoint of the selected road
      if (selectedElement?.type === 'pista_vial' && roadWaypointMeshesRef.current.length > 0 && threeCanvasRef.current && cameraRef.current) {
        const rect = threeCanvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        sharedMouseVecRef.current.set(x, y);
        sharedRaycasterRef.current.setFromCamera(sharedMouseVecRef.current, cameraRef.current);
        const hits = sharedRaycasterRef.current.intersectObjects(roadWaypointMeshesRef.current, false);
        if (hits.length > 0) {
          const wpIdx = hits[0].object.userData.waypointIndex;
          if (typeof wpIdx === 'number') {
            activeDraggedWaypointIdxRef.current = wpIdx;
            setSelectedRoadWaypointIdx(wpIdx);
            isDraggingRef.current = false;
            isPanningRef.current = false;
            activeDraggedElementRef.current = null;
            return;
          }
        }
      }

      // 2. If in extending road mode for selected road
      if (isExtendingRoad && selectedElement?.type === 'pista_vial') {
        return; // Handled in handleMouseUp for coordinate acquisition
      }

      // 3. If in relocation mode for the selected element
      if (isRelocatingSelected && selectedElement) {
        const newCoords = getRaycastGeoCoords(e.clientX, e.clientY);
        if (newCoords) {
          onUpdateElement({
            ...selectedElement,
            coordinates: newCoords
          });
          setIsRelocatingSelected(false);
        }
        return;
      }

      // 4. If placing a new element (single point elements handled on click/up, road handled with multi-points)
      if (isPlacingMode) {
        if (selectedPlacementType === 'pista_vial') {
          // Handled in handleMouseUp for clean coordinate acquisition
          return;
        } else {
          handleCanvasClickToPlace(e);
          return;
        }
      }

      // Check if user clicked down on an existing element to drag it
      const clickedEl = getElementUnderCursor(e.clientX, e.clientY);
      if (clickedEl) {
        activeDraggedElementRef.current = clickedEl;
        if (selectedElement?.id !== clickedEl.id) {
          onSelectElement(clickedEl);
          setSelectedRoadWaypointIdx(null);
        }
      } else {
        activeDraggedElementRef.current = null;
        isDraggingRef.current = true; // Left-click: Rotate / Orbit
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const dx = Math.abs(e.clientX - dragStartPosRef.current.x);
    const dy = Math.abs(e.clientY - dragStartPosRef.current.y);
    if (dx > 3 || dy > 3) {
      hasMovedSignificantlyRef.current = true;
    }

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    // 1. Right-Click Drag -> PAN / MOVE MAP SMOOTHLY
    if (isPanningRef.current) {
      const { theta, radius } = targetSphericalRef.current;
      const panSpeed = (radius / 650) * 0.75;

      const rightX = Math.cos(theta);
      const rightZ = -Math.sin(theta);
      const forwardX = -Math.sin(theta);
      const forwardZ = -Math.cos(theta);

      targetPanRef.current.x -= (rightX * deltaX - forwardX * deltaY) * panSpeed;
      targetPanRef.current.z -= (rightZ * deltaX - forwardZ * deltaY) * panSpeed;

      const targetElev = getTerrainElevation(targetPanRef.current.x, targetPanRef.current.z, currentCity.id);
      targetPanRef.current.y = targetElev;
      return;
    }

    // 1.5. Waypoint Dragging across 3D terrain for selected road
    if (isMouseDownRef.current && activeDraggedWaypointIdxRef.current !== null && selectedElement?.type === 'pista_vial') {
      const coords = getRaycastGeoCoords(e.clientX, e.clientY);
      if (coords && selectedElement.pathPoints) {
        const updatedPts = [...selectedElement.pathPoints];
        updatedPts[activeDraggedWaypointIdxRef.current] = coords;
        const lenM = calculatePolylineLengthMeters(updatedPts);
        const rw = selectedElement.roadWidth || 8;
        onUpdateElement({
          ...selectedElement,
          coordinates: updatedPts[0],
          pathPoints: updatedPts,
          footprintArea: Math.round(lenM * rw),
          costEstimateUSD: Math.round(lenM * (rw * 15))
        });
      }
      return;
    }

    // 2. Element Dragging across 3D terrain (Left click held on building)
    if (isMouseDownRef.current && activeDraggedElementRef.current && hasMovedSignificantlyRef.current) {
      if (!isDraggingSelectedElement) {
        setIsDraggingSelectedElement(true);
      }
      const coords = getRaycastGeoCoords(e.clientX, e.clientY);
      if (coords && activeDraggedElementRef.current) {
        onUpdateElement({
          ...activeDraggedElementRef.current,
          coordinates: coords
        });
      }
      return;
    }

    // 3. Left-Click Drag -> SMOOTH ORBIT / ROTATE CAMERA
    if (isDraggingRef.current) {
      targetSphericalRef.current.theta -= deltaX * 0.0055;
      targetSphericalRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2.05, targetSphericalRef.current.phi - deltaY * 0.0055)
      );
      return;
    }

    // 4. Ultra-Fast Throttled Hover Detection (Zero overhead during drag/pan)
    if (!isMouseDownRef.current && !isDraggingRef.current && !isPanningRef.current) {
      const now = performance.now();
      if (now - lastHoverCheckTimeRef.current > 60) {
        lastHoverCheckTimeRef.current = now;
        const hoverEl = getElementUnderCursor(e.clientX, e.clientY);
        const nextHoverId = hoverEl ? hoverEl.id : null;
        if (hoveredElementIdRef.current !== nextHoverId) {
          hoveredElementIdRef.current = nextHoverId;
          setHoveredElementId(nextHoverId);
        }

        if ((isPlacingMode && selectedPlacementType === 'pista_vial') || isExtendingRoad) {
          const coords = getRaycastGeoCoords(e.clientX, e.clientY);
          if (coords) {
            setRoadHoverCoords(coords);
          }
        }
      }
    }
  };

  // Touch Handlers for Touchscreens & Mobile Devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      isMouseDownRef.current = true;
      isDraggingRef.current = true;
      isPanningRef.current = false;
      dragStartPosRef.current = { x: t.clientX, y: t.clientY };
      previousMousePositionRef.current = { x: t.clientX, y: t.clientY };
      hasMovedSignificantlyRef.current = false;
      touchStateRef.current.touchCount = 1;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      isPanningRef.current = true;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      touchStateRef.current.initialDist = dist;
      touchStateRef.current.initialRadius = targetSphericalRef.current.radius;
      touchStateRef.current.lastTouchPos = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2
      };
      touchStateRef.current.touchCount = 2;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const t = e.touches[0];
      const deltaX = t.clientX - previousMousePositionRef.current.x;
      const deltaY = t.clientY - previousMousePositionRef.current.y;
      previousMousePositionRef.current = { x: t.clientX, y: t.clientY };

      targetSphericalRef.current.theta -= deltaX * 0.007;
      targetSphericalRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2.05, targetSphericalRef.current.phi - deltaY * 0.007)
      );
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const center = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2
      };

      // Pinch to Zoom
      if (touchStateRef.current.initialDist > 0) {
        const factor = touchStateRef.current.initialDist / Math.max(10, currentDist);
        targetSphericalRef.current.radius = Math.max(
          80,
          Math.min(1000, touchStateRef.current.initialRadius * factor)
        );
      }

      // Two-Finger Pan
      const deltaX = center.x - touchStateRef.current.lastTouchPos.x;
      const deltaY = center.y - touchStateRef.current.lastTouchPos.y;
      touchStateRef.current.lastTouchPos = center;

      const { theta, radius } = targetSphericalRef.current;
      const panSpeed = (radius / 650) * 0.8;
      const rightX = Math.cos(theta);
      const rightZ = -Math.sin(theta);
      const forwardX = -Math.sin(theta);
      forwardX;
      const forwardZ = -Math.cos(theta);

      targetPanRef.current.x -= (rightX * deltaX - forwardX * deltaY) * panSpeed;
      targetPanRef.current.z -= (rightZ * deltaX - forwardZ * deltaY) * panSpeed;
    }
  };

  const handleTouchEnd = () => {
    isMouseDownRef.current = false;
    isDraggingRef.current = false;
    isPanningRef.current = false;
    touchStateRef.current.touchCount = 0;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const wasDraggingElement = isDraggingSelectedElement;
    const wasPanning = isPanningRef.current;
    const wasDraggingWaypoint = activeDraggedWaypointIdxRef.current !== null;
    activeDraggedWaypointIdxRef.current = null;
    isMouseDownRef.current = false;
    isDraggingRef.current = false;
    isPanningRef.current = false;
    setIsDraggingSelectedElement(false);
    activeDraggedElementRef.current = null;

    if (wasDraggingWaypoint) {
      if (rendererRef.current && rendererRef.current.shadowMap.enabled) {
        rendererRef.current.shadowMap.needsUpdate = true;
      }
      return;
    }

    // Clean left-click interaction
    if (e.button === 0 && !hasMovedSignificantlyRef.current && !wasDraggingElement && !wasPanning) {
      // 1. Extending Road Mode for Selected Road
      if (isExtendingRoad && selectedElement?.type === 'pista_vial') {
        const coords = getRaycastGeoCoords(e.clientX, e.clientY);
        if (coords) {
          const now = Date.now();
          const timeSinceLast = now - lastRoadClickTimeRef.current;
          lastRoadClickTimeRef.current = now;

          // Double click finishes extending
          if (e.detail === 2 || timeSinceLast < 400) {
            setIsExtendingRoad(false);
            return;
          }

          const existingPts = selectedElement.pathPoints || [selectedElement.coordinates];
          const updatedPts: [number, number][] = [...existingPts, coords];
          const lenM = calculatePolylineLengthMeters(updatedPts);
          const rw = selectedElement.roadWidth || 8;
          onUpdateElement({
            ...selectedElement,
            pathPoints: updatedPts,
            footprintArea: Math.round(lenM * rw),
            costEstimateUSD: Math.round(lenM * (rw * 15))
          });
          setSelectedRoadWaypointIdx(updatedPts.length - 1);
          return;
        }
      }

      // 2. Relocation mode
      if (isRelocatingSelected && selectedElement) {
        const coords = getRaycastGeoCoords(e.clientX, e.clientY);
        if (coords) {
          onUpdateElement({
            ...selectedElement,
            coordinates: coords
          });
          setIsRelocatingSelected(false);
        }
        return;
      }

      // 3. Placing Mode
      if (isPlacingMode) {
        const coords = getRaycastGeoCoords(e.clientX, e.clientY);
        if (coords) {
          if (selectedPlacementType === 'pista_vial') {
            const now = Date.now();
            const timeSinceLast = now - lastRoadClickTimeRef.current;
            lastRoadClickTimeRef.current = now;

            // Double-click to close and finalize track
            if ((e.detail === 2 || timeSinceLast < 400) && roadPoints.length >= 1) {
              const finalPts = [...roadPoints, coords];
              if (finalPts.length >= 2) {
                handleFinishRoad(finalPts);
                return;
              }
            }

            // Append new waypoint
            setRoadPoints(prev => [...prev, coords]);
            return;
          } else {
            onAddElementAtCoords(coords, selectedPlacementType);
            setIsPlacingMode(false);
            return;
          }
        }
        return;
      }

      const clickedEl = getElementUnderCursor(e.clientX, e.clientY);
      onSelectElement(clickedEl);
      if (!clickedEl || clickedEl.type !== 'pista_vial') {
        setSelectedRoadWaypointIdx(null);
      }
    }

    if (rendererRef.current && rendererRef.current.shadowMap.enabled && (hasMovedSignificantlyRef.current || wasDraggingElement || wasPanning)) {
      rendererRef.current.shadowMap.needsUpdate = true;
    }
  };

  // 2D Canvas Mouse Handlers for Pan, Selection, and Waypoint Dragging
  const handleMouseDown2D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isMouseDownRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedSignificantlyRef.current = false;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    if (e.button === 2) {
      isPanningRef.current = true;
      return;
    }

    // Left click: check if clicked on anchor point of selected road in 2D
    if (e.button === 0 && selectedElement?.type === 'pista_vial' && selectedElement.pathPoints && map2DCanvasRef.current) {
      const rect = map2DCanvasRef.current.getBoundingClientRect();
      const scale = map2DScaleRef.current;
      const cx = rect.width / 2 + map2DPanRef.current.x;
      const cy = rect.height / 2 + map2DPanRef.current.y;
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (let i = 0; i < selectedElement.pathPoints.length; i++) {
        const p = selectedElement.pathPoints[i];
        const px = cx + (p[0] - currentCity.center[0]) * scale;
        const py = cy - (p[1] - currentCity.center[1]) * scale;
        if (Math.hypot(clickX - px, clickY - py) < 16) {
          activeDraggedWaypointIdxRef.current = i;
          setSelectedRoadWaypointIdx(i);
          isPanningRef.current = false;
          return;
        }
      }
    }
  };

  const handleMouseMove2D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const dx = Math.abs(e.clientX - dragStartPosRef.current.x);
    const dy = Math.abs(e.clientY - dragStartPosRef.current.y);
    if (dx > 3 || dy > 3) {
      hasMovedSignificantlyRef.current = true;
    }

    if (isPanningRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;
      map2DPanRef.current.x += deltaX;
      map2DPanRef.current.y += deltaY;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      setZoom2DRev((prev) => prev + 1);
      return;
    }

    // Drag waypoint across 2D map
    if (isMouseDownRef.current && activeDraggedWaypointIdxRef.current !== null && selectedElement?.type === 'pista_vial' && selectedElement.pathPoints && map2DCanvasRef.current) {
      const rect = map2DCanvasRef.current.getBoundingClientRect();
      const scale = map2DScaleRef.current;
      const cx = rect.width / 2 + map2DPanRef.current.x;
      const cy = rect.height / 2 + map2DPanRef.current.y;
      const x = e.clientX - rect.left - cx;
      const y = -(e.clientY - rect.top - cy);
      const lng = currentCity.center[0] + x / scale;
      const lat = currentCity.center[1] + y / scale;

      const updatedPts = [...selectedElement.pathPoints];
      updatedPts[activeDraggedWaypointIdxRef.current] = [lng, lat];
      const lenM = calculatePolylineLengthMeters(updatedPts);
      const rw = selectedElement.roadWidth || 8;
      onUpdateElement({
        ...selectedElement,
        coordinates: updatedPts[0],
        pathPoints: updatedPts,
        footprintArea: Math.round(lenM * rw),
        costEstimateUSD: Math.round(lenM * (rw * 15))
      });
      return;
    }

    if (((isPlacingMode && selectedPlacementType === 'pista_vial') || isExtendingRoad) && map2DCanvasRef.current) {
      const rect = map2DCanvasRef.current.getBoundingClientRect();
      const scale = map2DScaleRef.current;
      const cx = rect.width / 2 + map2DPanRef.current.x;
      const cy = rect.height / 2 + map2DPanRef.current.y;
      const x = e.clientX - rect.left - cx;
      const y = -(e.clientY - rect.top - cy);
      const lng = currentCity.center[0] + x / scale;
      const lat = currentCity.center[1] + y / scale;
      setRoadHoverCoords([lng, lat]);
    }
  };

  const handleMouseUp2D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const wasPanning = isPanningRef.current;
    const wasDraggingWaypoint = activeDraggedWaypointIdxRef.current !== null;
    activeDraggedWaypointIdxRef.current = null;
    isMouseDownRef.current = false;
    isPanningRef.current = false;

    if (wasDraggingWaypoint) return;

    // Left-click interaction (selection / placement / road extension)
    if (e.button === 0 && !hasMovedSignificantlyRef.current && !wasPanning) {
      const rect = e.currentTarget.getBoundingClientRect();
      const scale = map2DScaleRef.current;
      const cx = rect.width / 2 + map2DPanRef.current.x;
      const cy = rect.height / 2 + map2DPanRef.current.y;
      const x = e.clientX - rect.left - cx;
      const y = -(e.clientY - rect.top - cy);
      const lng = currentCity.center[0] + x / scale;
      const lat = currentCity.center[1] + y / scale;

      // Extend road in 2D
      if (isExtendingRoad && selectedElement?.type === 'pista_vial') {
        const now = Date.now();
        const timeSinceLast = now - lastRoadClickTimeRef.current;
        lastRoadClickTimeRef.current = now;
        if (e.detail === 2 || timeSinceLast < 400) {
          setIsExtendingRoad(false);
          return;
        }
        const existingPts = selectedElement.pathPoints || [selectedElement.coordinates];
        const updatedPts: [number, number][] = [...existingPts, [lng, lat]];
        const lenM = calculatePolylineLengthMeters(updatedPts);
        const rw = selectedElement.roadWidth || 8;
        onUpdateElement({
          ...selectedElement,
          pathPoints: updatedPts,
          footprintArea: Math.round(lenM * rw),
          costEstimateUSD: Math.round(lenM * (rw * 15))
        });
        setSelectedRoadWaypointIdx(updatedPts.length - 1);
        return;
      }

      if (isRelocatingSelected && selectedElement) {
        onUpdateElement({
          ...selectedElement,
          coordinates: [lng, lat]
        });
        setIsRelocatingSelected(false);
        return;
      }

      if (isPlacingMode) {
        if (selectedPlacementType === 'pista_vial') {
          const now = Date.now();
          const timeSinceLast = now - lastRoadClickTimeRef.current;
          lastRoadClickTimeRef.current = now;

          // Double-click to close and create track
          if ((e.detail === 2 || timeSinceLast < 400) && roadPoints.length >= 1) {
            const finalPts = [...roadPoints, [lng, lat]];
            if (finalPts.length >= 2) {
              handleFinishRoad(finalPts);
              return;
            }
          }

          // Append waypoint
          setRoadPoints(prev => [...prev, [lng, lat]]);
          return;
        } else {
          onAddElementAtCoords([lng, lat], selectedPlacementType);
          setIsPlacingMode(false);
          return;
        }
      }

      // Click to select nearest 2D element
      let closestEl: UrbanElement | null = null;
      let minDist = 36;
      elements.forEach((el) => {
        const px = cx + (el.coordinates[0] - currentCity.center[0]) * scale;
        const py = cy - (el.coordinates[1] - currentCity.center[1]) * scale;
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const dist = Math.hypot(clickX - px, clickY - py);
        if (dist < minDist) {
          minDist = dist;
          closestEl = el;
        }
      });
      onSelectElement(closestEl);
      if (!closestEl || closestEl.type !== 'pista_vial') {
        setSelectedRoadWaypointIdx(null);
      }
    }
  };

  // Recenter map back to default with silky glide
  const handleRecenter = () => {
    targetPanRef.current = { x: 0, y: 0, z: 0 };
    map2DPanRef.current = { x: 0, y: 0 };
    targetSphericalRef.current = {
      radius: 450,
      theta: Math.PI / 4,
      phi: Math.PI / 3
    };
    map2DScaleRef.current = 38000;
    setZoom2DRev((prev) => prev + 1);
  };

  // Smooth Camera Quick Presets for instant navigation
  const handleZoomIn = () => {
    targetSphericalRef.current.radius = Math.max(80, targetSphericalRef.current.radius * 0.75);
    map2DScaleRef.current = Math.min(120000, map2DScaleRef.current * 1.3);
    setZoom2DRev(p => p + 1);
  };

  const handleZoomOut = () => {
    targetSphericalRef.current.radius = Math.min(1000, targetSphericalRef.current.radius * 1.35);
    map2DScaleRef.current = Math.max(10000, map2DScaleRef.current * 0.75);
    setZoom2DRev(p => p + 1);
  };

  const handleSetOverheadView = () => {
    targetSphericalRef.current.phi = 0.15; // Near-perpendicular top-down angle
    targetSphericalRef.current.theta = 0;
  };

  const handleSetIsometricView = () => {
    targetSphericalRef.current.phi = Math.PI / 3;
    targetSphericalRef.current.theta = Math.PI / 4;
    targetSphericalRef.current.radius = 450;
  };

  // Place element at clicked spot on 3D terrain surface
  const handleCanvasClickToPlace = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getRaycastGeoCoords(e.clientX, e.clientY);
    if (coords) {
      onAddElementAtCoords(coords, selectedPlacementType);
      setIsPlacingMode(false);
    }
  };

  // 2D Canvas Map Drawing
  useEffect(() => {
    if (viewMode === '3d' || !map2DCanvasRef.current) return;
    const canvas = map2DCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 800;
    const height = canvas.parentElement?.clientHeight || 600;
    canvas.width = width;
    canvas.height = height;

    // Background base map (Warm Desert Terrain in Light vs Dark Soil in Dark)
    ctx.fillStyle = theme === 'light' 
      ? (timeOfDay === 'day' ? '#eae2d6' : '#2b231c')
      : (timeOfDay === 'day' ? '#2c1e13' : '#140d07');
    ctx.fillRect(0, 0, width, height);

    // Center of 2D map with pan offset
    const cx = width / 2 + map2DPanRef.current.x;
    const cy = height / 2 + map2DPanRef.current.y;
    const scale = map2DScaleRef.current; // pixels per degree

    // Draw GIS Grid
    ctx.strokeStyle = theme === 'light'
      ? (timeOfDay === 'day' ? 'rgba(120, 100, 80, 0.18)' : 'rgba(140, 120, 100, 0.14)')
      : (timeOfDay === 'day' ? 'rgba(140, 98, 64, 0.28)' : 'rgba(90, 60, 38, 0.22)');
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    if (layerState.isochroneWalkBuffers) {
      elements.forEach((el) => {
        if (el.type === 'centro_salud' || el.type === 'escuela' || el.type === 'parada_transporte') {
          const px = cx + (el.coordinates[0] - currentCity.center[0]) * scale;
          const py = cy - (el.coordinates[1] - currentCity.center[1]) * scale;

          // 5 min walk (350m buffer)
          ctx.beginPath();
          ctx.arc(px, py, 60 * (scale / 38000), 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.stroke();

          // 15 min walk (1000m buffer)
          ctx.beginPath();
          ctx.arc(px, py, 140 * (scale / 38000), 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.stroke();
        }
      });
    }

    // Draw elements with distinct 2D iconography and color coding
    elements.forEach((el) => {
      const px = cx + (el.coordinates[0] - currentCity.center[0]) * scale;
      const py = cy - (el.coordinates[1] - currentCity.center[1]) * scale;
      const isSelected = selectedElement?.id === el.id;
      const elColorHex = '#' + (ELEMENT_COLORS[el.type]?.hex || 0x0ea5e9).toString(16).padStart(6, '0');

      if (el.type === 'pista_vial') {
        const pts = (el.pathPoints && el.pathPoints.length >= 2)
          ? el.pathPoints
          : [el.coordinates, [el.coordinates[0] + 0.001, el.coordinates[1] + 0.0005]];
        const roadW = Math.max(6, (el.roadWidth || 8) * (scale / 38000));

        if (pts.length >= 2) {
          const screenPts = pts.map(p => ({
            x: cx + (p[0] - currentCity.center[0]) * scale,
            y: cy - (p[1] - currentCity.center[1]) * scale
          }));

          // Outer Concrete Curbs (Sardineles de Hormigón Claro)
          ctx.beginPath();
          screenPts.forEach((sp, i) => {
            if (i === 0) ctx.moveTo(sp.x, sp.y);
            else ctx.lineTo(sp.x, sp.y);
          });
          ctx.strokeStyle = isSelected ? '#38bdf8' : '#94a3b8';
          ctx.lineWidth = roadW + (isSelected ? 5 : 2.5);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          // Authentic Gray Asphalt Roadway (Calzada de Asfalto Gris Pizarra)
          ctx.beginPath();
          screenPts.forEach((sp, i) => {
            if (i === 0) ctx.moveTo(sp.x, sp.y);
            else ctx.lineTo(sp.x, sp.y);
          });
          ctx.strokeStyle = isSelected ? '#5a677d' : '#475569';
          ctx.lineWidth = roadW;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          // Subtle White Dashed Centerline (Demarcación Central Blanca)
          ctx.save();
          ctx.beginPath();
          screenPts.forEach((sp, i) => {
            if (i === 0) ctx.moveTo(sp.x, sp.y);
            else ctx.lineTo(sp.x, sp.y);
          });
          ctx.strokeStyle = isSelected ? '#38bdf8' : 'rgba(248, 250, 252, 0.85)';
          ctx.lineWidth = Math.max(1.2, roadW * 0.12);
          ctx.setLineDash([7, 5]);
          ctx.stroke();
          ctx.restore();

          // Waypoints & Anchor Points (Highlighted when selected for editing)
          screenPts.forEach((sp, i) => {
            const isWpActive = isSelected && selectedRoadWaypointIdx === i;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, isWpActive ? 8 : (isSelected ? 6 : Math.max(2.5, roadW * 0.2)), 0, Math.PI * 2);
            ctx.fillStyle = isWpActive ? '#f59e0b' : (isSelected ? '#38bdf8' : '#64748b');
            ctx.fill();
            ctx.strokeStyle = isWpActive ? '#ffffff' : (isSelected ? '#0284c7' : '#ffffff');
            ctx.lineWidth = isWpActive ? 2.5 : (isSelected ? 1.8 : 1);
            ctx.stroke();

            // When road is selected, draw vertex number badge inside/over the anchor point
            if (isSelected) {
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 8px Plus Jakarta Sans, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(String(i + 1), sp.x, sp.y);
            }
          });
        }
      } else if (el.type === 'parque_verde') {
        const radius = Math.max(14, Math.sqrt(el.footprintArea) * 0.45 * (scale / 38000));
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        // Paint park area footprint green
        ctx.fillStyle = isSelected ? 'rgba(34, 197, 94, 0.88)' : 'rgba(22, 163, 74, 0.78)';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#86efac' : '#15803d';
        ctx.lineWidth = isSelected ? 3.5 : 2.5;
        ctx.stroke();

        // Inner decorative botanical garden in 2D (Verde interior)
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#4ade80' : '#22c55e';
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Central botanical tree point in 2D
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#14532d';
        ctx.fill();
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        const size = Math.max(16, Math.sqrt(el.footprintArea) * 0.55 * (scale / 38000));
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(((el.solarOrientation - 180) * Math.PI) / 180);

        ctx.fillStyle = isSelected ? '#38bdf8' : elColorHex;
        ctx.fillRect(-size / 2, -size / 2, size, size);

        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255,255,255,0.4)';
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.strokeRect(-size / 2, -size / 2, size, size);

        // Visual icon overlay per type in 2D
        if (el.type === 'centro_salud') {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(-2, -size * 0.35, 4, size * 0.7);
          ctx.fillRect(-size * 0.35, -2, size * 0.7, 4);
        } else if (el.type === 'vivienda_incremental') {
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(0, size / 2);
          ctx.moveTo(size / 4, -size / 2);
          ctx.lineTo(size / 4, size / 2);
          ctx.stroke();
        } else if (el.type === 'parada_transporte') {
          ctx.fillStyle = '#facc15';
          ctx.fillRect(-size / 2, size * 0.25, size, size * 0.2);
        } else if (el.type === 'comercio_local') {
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(-size / 2, size * 0.25, size, size * 0.2);
        } else if (el.type === 'espacio_comunitario') {
          ctx.strokeStyle = 'rgba(255,255,255,0.8)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.3, 0, Math.PI);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Element Label with type badge indicator
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(el.name.substring(0, 18), px, py + 22);
    });

    // Render dynamic active in-progress road drafting in 2D
    if (isPlacingMode && selectedPlacementType === 'pista_vial' && roadPoints.length > 0) {
      const activePts = [...roadPoints];
      if (roadHoverCoords) {
        activePts.push(roadHoverCoords);
      }

      const screenPts = activePts.map(p => ({
        x: cx + (p[0] - currentCity.center[0]) * scale,
        y: cy - (p[1] - currentCity.center[1]) * scale
      }));

      // Active drafting line
      ctx.save();
      ctx.beginPath();
      screenPts.forEach((sp, i) => {
        if (i === 0) ctx.moveTo(sp.x, sp.y);
        else ctx.lineTo(sp.x, sp.y);
      });
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Rubberband dashed line to cursor
      if (roadHoverCoords && screenPts.length >= 2) {
        ctx.beginPath();
        const prev = screenPts[screenPts.length - 2];
        const last = screenPts[screenPts.length - 1];
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(last.x, last.y);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
      }
      ctx.restore();

      // Waypoint numbered markers in 2D
      roadPoints.forEach((p, idx) => {
        const sx = cx + (p[0] - currentCity.center[0]) * scale;
        const sy = cy - (p[1] - currentCity.center[1]) * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, 9, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#10b981' : '#0284c7';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(idx + 1), sx, sy);
      });
    }

    // Native non-passive zoom on 2D canvas
    const handleNative2DWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
        map2DScaleRef.current = Math.max(15000, Math.min(120000, map2DScaleRef.current * zoomFactor));
        setZoom2DRev(prev => prev + 1);
        setShowCtrlMessage(false);
      } else {
        setShowCtrlMessage(true);
        if (ctrlMessageTimeoutRef.current) {
          clearTimeout(ctrlMessageTimeoutRef.current);
        }
        ctrlMessageTimeoutRef.current = setTimeout(() => {
          setShowCtrlMessage(false);
        }, 1500);
      }
    };

    canvas.addEventListener('wheel', handleNative2DWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', handleNative2DWheel);
    };
  }, [viewMode, elements, selectedElement, layerState, currentCity, timeOfDay, isPlacingMode, selectedPlacementType, roadPoints, roadHoverCoords, selectedRoadWaypointIdx, isExtendingRoad, theme]);

  return (
    <div className="relative w-full h-[620px] bg-slate-950/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl flex flex-col">
      {/* Scroll to Zoom Overlay Message */}
      <div 
        className={`absolute inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${showCtrlMessage ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="bg-slate-900/90 text-slate-100 px-6 py-3 rounded-2xl border border-slate-700 shadow-2xl flex items-center gap-3">
          <span className="text-xl font-bold bg-slate-800 px-3 py-1 rounded-xl shadow-inner border border-slate-700">Ctrl</span>
          <span className="text-sm font-semibold">{language === 'es' ? '+ Scroll para acercar/alejar el mapa' : ' + Scroll to zoom the map'}</span>
        </div>
      </div>

      {/* Top Map Toolbar: View Mode + Sun Angle + Layer Toggles + Add Element */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: View Mode Switches, Recenter & Day/Night Toggle */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
            <button
              id="view-mode-3d-btn"
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === '3d'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Volumetría</span>
            </button>
            <button
              id="view-mode-2d-btn"
              onClick={() => setViewMode('2d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === '2d'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>2D GIS</span>
            </button>
            <button
              id="recenter-map-btn"
              onClick={handleRecenter}
              title="Centrar mapa y restablecer vista"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-all border-l border-slate-800 pl-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Centrar</span>
            </button>
          </div>

          {/* Day / Night Mode Switch */}
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
            <button
              id="day-mode-btn"
              onClick={() => setTimeOfDay('day')}
              title="Modo Día: activa asoleamiento interactivo y sombras dinámicas"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeOfDay === 'day'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Día</span>
            </button>
            <button
              id="night-mode-btn"
              onClick={() => setTimeOfDay('night')}
              title="Modo Noche: ambiente nocturno con iluminación urbana"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeOfDay === 'night'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Noche</span>
            </button>
          </div>

          {/* Global Light / Dark Mode Toggle on Map */}
          {onToggleTheme && (
            <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
              <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} variant="compact" />
            </div>
          )}
        </div>

        {/* Center: Solar Path & Daylight Simulation (Active in Day Mode) */}
        <div className={`flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-800 pointer-events-auto text-xs shadow-xl transition-all ${
          timeOfDay === 'day' ? 'opacity-100' : 'opacity-85 border-indigo-900/40'
        }`}>
          {timeOfDay === 'day' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
              <span className="text-slate-300 font-bold hidden sm:inline">Sol / Sombras:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Azimut</span>
                <input
                  id="solar-azimuth-slider"
                  type="range"
                  min="0"
                  max="360"
                  value={solarAzimuth}
                  onChange={(e) => setSolarAzimuth(Number(e.target.value))}
                  className="w-16 sm:w-20 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  title="Ángulo azimutal de incidencia solar (0-360°)"
                />
                <span className="text-[11px] font-mono text-amber-300 w-8">{solarAzimuth}°</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Elevación</span>
                <input
                  id="solar-elevation-slider"
                  type="range"
                  min="10"
                  max="85"
                  value={solarElevation}
                  onChange={(e) => setSolarElevation(Number(e.target.value))}
                  className="w-14 sm:w-16 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  title="Ángulo de altitud solar sobre el horizonte (10-85°)"
                />
                <span className="text-[11px] font-mono text-amber-300 w-7">{solarElevation}°</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-indigo-300 font-medium text-[11px]">
                Modo Noche activo
              </span>
              <button
                id="activate-day-mode-btn"
                onClick={() => setTimeOfDay('day')}
                className="text-[10px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg font-bold transition-all flex items-center gap-1"
                title="Activar Modo Día para regular la trayectoria del sol y sombras"
              >
                <Sun className="w-3 h-3" />
                <span>Activar Sol</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Quick Action to Place Elements & Save Proposal */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {onOpenSaveProposal && (
            <button
              id="save-proposal-map-btn"
              onClick={onOpenSaveProposal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xl border border-indigo-400/30 transition-all hover:scale-105 active:scale-95"
              title="Guardar propuesta de cambios en un perfil (1 a 3)"
            >
              <Save className="w-3.5 h-3.5 text-indigo-200" />
              <span>Guardar Propuesta</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
            <select
              id="element-type-select"
              value={selectedPlacementType}
              onChange={(e) => {
                const newType = e.target.value as UrbanElementType;
                setSelectedPlacementType(newType);
                if (newType !== 'pista_vial') {
                  setRoadPoints([]);
                  setRoadHoverCoords(null);
                }
              }}
              className="bg-slate-800 text-xs font-semibold text-slate-200 py-1.5 px-2.5 rounded-xl border border-slate-700 focus:outline-none"
            >
              <option value="vivienda_social">🏢 Vivienda Social</option>
              <option value="vivienda_incremental">🏠 Vivienda Incremental</option>
              <option value="parque_verde">🌳 Parque / Huerto</option>
              <option value="pista_vial">🛣️ Pista / Corredor Vial</option>
              <option value="centro_salud">🏥 Centro de Salud</option>
              <option value="escuela">🏫 Escuela</option>
              <option value="parada_transporte">🚡 Estación Transporte</option>
              <option value="espacio_comunitario">🏛️ Casa Comunitaria</option>
              <option value="comercio_local">🏪 Cooperativa / Taller</option>
            </select>
            <button
              id="place-element-btn"
              onClick={() => {
                if (isPlacingMode) {
                  setRoadPoints([]);
                  setRoadHoverCoords(null);
                }
                setIsPlacingMode(!isPlacingMode);
              }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isPlacingMode
                  ? 'bg-amber-500 text-slate-950 animate-bounce shadow-lg shadow-amber-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isPlacingMode ? (selectedPlacementType === 'pista_vial' ? 'Traza puntos' : 'Haz clic en el mapa') : '+ Añadir'}</span>
            </button>

            {/* AI Copilot Toggle Button in Toolbar */}
            <button
              id="toggle-copilot-header-btn"
              onClick={() => setIsCopilotOpen(!isCopilotOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isCopilotOpen
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50 shadow-sm shadow-indigo-950/40'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border-indigo-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Asistente IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewports */}
      <div
        ref={mapContainerRef}
        onWheel={(e) => {
          e.stopPropagation();
        }}
        className="relative w-full flex-1 overflow-hidden"
      >
        {/* 3D WebGL Canvas */}
        <canvas
          ref={threeCanvasRef}
          id="three-3d-canvas"
          className={`w-full h-full ${
            isRelocatingSelected || isPlacingMode
              ? 'cursor-crosshair'
              : isDraggingSelectedElement
              ? 'cursor-grabbing'
              : hoveredElementId
              ? 'cursor-pointer'
              : 'cursor-grab active:cursor-grabbing'
          } ${viewMode === '2d' ? 'hidden' : 'block'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={(e) => {
            if (isPlacingMode && selectedPlacementType === 'pista_vial' && roadPoints.length >= 1) {
              const coords = getRaycastGeoCoords(e.clientX, e.clientY);
              const finalPts = coords ? [...roadPoints, coords] : roadPoints;
              if (finalPts.length >= 2) {
                handleFinishRoad(finalPts);
              }
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* 2D GIS Canvas */}
        <canvas
          ref={map2DCanvasRef}
          id="gis-2d-canvas"
          className={`w-full h-full ${
            isRelocatingSelected || isPlacingMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
          } ${viewMode === '3d' ? 'hidden' : 'block'}`}
          onMouseDown={handleMouseDown2D}
          onMouseMove={handleMouseMove2D}
          onMouseUp={handleMouseUp2D}
          onMouseLeave={handleMouseUp2D}
          onDoubleClick={(e) => {
            if (isPlacingMode && selectedPlacementType === 'pista_vial' && roadPoints.length >= 1) {
              const rect = e.currentTarget.getBoundingClientRect();
              const scale = map2DScaleRef.current;
              const cx = rect.width / 2 + map2DPanRef.current.x;
              const cy = rect.height / 2 + map2DPanRef.current.y;
              const x = e.clientX - rect.left - cx;
              const y = -(e.clientY - rect.top - cy);
              const lng = currentCity.center[0] + x / scale;
              const lat = currentCity.center[1] + y / scale;
              const finalPts: [number, number][] = [...roadPoints, [lng, lat]];
              if (finalPts.length >= 2) {
                handleFinishRoad(finalPts);
              }
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Floating Active Road Drafting Toolbar */}
        {isPlacingMode && selectedPlacementType === 'pista_vial' && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-sky-400/50 shadow-2xl flex flex-wrap items-center justify-center gap-3 z-30 animate-in fade-in slide-in-from-top-2 text-xs">
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-sky-400 animate-pulse" />
              <span className="font-bold text-slate-100 hidden sm:inline">Trazando Pista:</span>
              <span className="bg-sky-950/80 border border-sky-500/40 text-sky-300 font-mono px-2 py-0.5 rounded-lg text-[11px] font-bold">
                {roadPoints.length} {roadPoints.length === 1 ? 'punto marcado' : 'puntos marcados'}
              </span>
              {roadPoints.length >= 2 && (
                <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono px-2 py-0.5 rounded-lg text-[11px] font-bold">
                  ~{Math.round(calculatePolylineLengthMeters(roadPoints))} m
                </span>
              )}
            </div>

            {/* Quick Width Selector */}
            <div className="flex items-center gap-1 border-l border-slate-700/80 pl-2 sm:pl-3">
              <span className="text-slate-400 text-[11px] font-medium hidden md:inline">Ancho:</span>
              {[6, 8, 12, 16].map((w) => (
                <button
                  key={w}
                  onClick={() => setDraftingRoadWidth(w)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-colors ${
                    draftingRoadWidth === w
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                  }`}
                  title={`Fijar ancho inicial en ${w}m`}
                >
                  {w}m
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-700/80 pl-2 sm:pl-3">
              <button
                id="finish-road-btn"
                disabled={roadPoints.length < 2}
                onClick={() => handleFinishRoad()}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold transition-all text-xs ${
                  roadPoints.length >= 2
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 cursor-pointer animate-pulse'
                    : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                }`}
                title={roadPoints.length >= 2 ? 'Cerrar trazado y crear pista (o doble clic)' : 'Haz clic para marcar al menos 2 puntos'}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{roadPoints.length >= 2 ? 'Guardar Pista (2x Clic)' : 'Marca 2+ puntos'}</span>
              </button>

              {roadPoints.length > 0 && (
                <button
                  id="undo-road-point-btn"
                  onClick={handleUndoLastRoadPoint}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors text-xs font-semibold"
                  title="Deshacer último punto marcado"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Deshacer</span>
                </button>
              )}

              <button
                id="cancel-road-drafting-btn"
                onClick={handleCancelRoadDrawing}
                className="px-2.5 py-1 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 transition-colors text-xs font-semibold"
                title="Cancelar trazado de pista"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Floating Road Extension Banner */}
        {isExtendingRoad && selectedElement?.type === 'pista_vial' && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-400/60 shadow-2xl flex flex-wrap items-center justify-center gap-3 z-30 animate-in fade-in slide-in-from-top-2 text-xs">
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-bold text-slate-100">Extendiendo Vía:</span>
              <span className="bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono px-2 py-0.5 rounded-lg text-[11px] font-bold">
                {(selectedElement.pathPoints || []).length} puntos actuales
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-700/80 pl-3">
              <span className="text-slate-300 text-[11px] hidden sm:inline">
                Haz clic en el mapa para añadir vértices. Doble clic para finalizar.
              </span>
              <button
                onClick={() => setIsExtendingRoad(false)}
                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors text-xs"
              >
                Finalizar Extensión
              </button>
            </div>
          </div>
        )}

        {/* Mouse Control Guidance Hint Pill */}
        <div className="absolute top-16 right-3 z-20 pointer-events-none hidden md:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 shadow-lg">
          <span className="flex items-center gap-1 font-medium">
            <span className="text-emerald-400 font-bold">🖱️ Clic Izq:</span> {viewMode === '3d' ? (isPlacingMode && selectedPlacementType === 'pista_vial' ? 'Marcar punto pista' : 'Rotar vista') : (isPlacingMode && selectedPlacementType === 'pista_vial' ? 'Marcar punto pista' : 'Seleccionar')}
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 font-medium">
            <span className="text-sky-400 font-bold">🖱️ Clic Der:</span> Mover mapa
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 font-medium">
            <span className="text-amber-400 font-bold">⚙️ 2x Clic:</span> Finalizar Pista
          </span>
        </div>

        {/* Quick Camera Preset & Zoom Floating Toolbar (Right Side) */}
        <div className="absolute top-28 right-3 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-2xl">
          <button
            id="camera-zoom-in-btn"
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all shadow-sm active:scale-95"
            title="Acercar Cámara (Zoom In)"
          >
            <ZoomIn className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            id="camera-zoom-out-btn"
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all shadow-sm active:scale-95"
            title="Alejar Cámara (Zoom Out)"
          >
            <ZoomOut className="w-4 h-4 text-emerald-400" />
          </button>
          <div className="h-px bg-slate-800 my-0.5" />
          <button
            id="camera-isometric-btn"
            onClick={handleSetIsometricView}
            className="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold transition-all text-center"
            title="Vista Isométrica 3D"
          >
            ISO
          </button>
          <button
            id="camera-topdown-btn"
            onClick={handleSetOverheadView}
            className="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold transition-all text-center"
            title="Vista Cenital / Superior"
          >
            TOP
          </button>
          <button
            id="camera-recenter-floating-btn"
            onClick={handleRecenter}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-all text-center active:scale-95"
            title="Centrar vista en la ciudad"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400 mx-auto" />
          </button>
        </div>

        {/* Floating Notification for Drag / Relocation Mode */}
        {isRelocatingSelected && selectedElement && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-2 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 border border-amber-300 animate-pulse pointer-events-none z-30">
            <MapPin className="w-4 h-4" />
            <span>Haz clic en cualquier punto del terreno para reubicar "{selectedElement.name}"</span>
          </div>
        )}

        {isDraggingSelectedElement && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400 pointer-events-none z-30">
            <Move className="w-4 h-4" />
            <span>Moviendo elemento por el relieve 3D...</span>
          </div>
        )}

        {/* Bottom Left: GIS Layer Controls Drawer */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 shadow-2xl max-w-xs text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Capas GIS & Simulación
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <label className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={layerState.shadowSim}
                onChange={() => onToggleLayer('shadowSim')}
                className="rounded accent-emerald-500 w-3.5 h-3.5"
              />
              <span>Sombras 3D</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={layerState.isochroneWalkBuffers}
                onChange={() => onToggleLayer('isochroneWalkBuffers')}
                className="rounded accent-emerald-500 w-3.5 h-3.5"
              />
              <span>Isocronas 15m</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={layerState.ghslBuiltGrid}
                onChange={() => onToggleLayer('ghslBuiltGrid')}
                className="rounded accent-emerald-500 w-3.5 h-3.5"
              />
              <span>GHSL Densidad</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={layerState.wireframeMode}
                onChange={() => onToggleLayer('wireframeMode')}
                className="rounded accent-emerald-500 w-3.5 h-3.5"
              />
              <span>Wireframe</span>
            </label>
          </div>
        </div>

        {/* Bottom Right: Quick Element Inspector & Modifier */}
        {selectedElement && (
          <div className="absolute bottom-4 right-4 z-20 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/40 shadow-2xl w-80 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${ELEMENT_COLORS[selectedElement.type]?.tailwind || 'bg-blue-500'}`} />
                <h4 className="font-bold text-slate-100 truncate max-w-[170px]">
                  {selectedElement.name}
                </h4>
              </div>
              <button
                id="delete-selected-element-btn"
                onClick={() => onDeleteElement(selectedElement.id)}
                className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Eliminar elemento"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Editable Attributes */}
            <div className="py-2.5 space-y-2.5">
              {selectedElement.type === 'pista_vial' ? (
                <>
                  {/* Calzada Ancho Slider & Presets */}
                  <div className="space-y-1.5 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-semibold text-[11px] flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-sky-400" />
                        Ancho de Calzada:
                      </span>
                      <span className="font-mono text-sky-300 font-extrabold text-xs">
                        {selectedElement.roadWidth || 8} metros
                      </span>
                    </div>

                    <input
                      type="range"
                      min="4"
                      max="24"
                      step="1"
                      value={selectedElement.roadWidth || 8}
                      onChange={(e) => {
                        const rw = Number(e.target.value);
                        const pts = selectedElement.pathPoints || [selectedElement.coordinates];
                        const lengthM = pts.length >= 2 ? calculatePolylineLengthMeters(pts) : 50;
                        onUpdateElement({
                          ...selectedElement,
                          roadWidth: rw,
                          footprintArea: Math.round(lengthM * rw),
                          costEstimateUSD: Math.round(lengthM * (rw * 15))
                        });
                      }}
                      className="w-full accent-sky-400 cursor-pointer"
                    />

                    <div className="flex items-center justify-between gap-1 pt-0.5">
                      {[6, 8, 12, 16, 20].map((w) => (
                        <button
                          key={w}
                          onClick={() => {
                            const pts = selectedElement.pathPoints || [selectedElement.coordinates];
                            const lengthM = pts.length >= 2 ? calculatePolylineLengthMeters(pts) : 50;
                            onUpdateElement({
                              ...selectedElement,
                              roadWidth: w,
                              footprintArea: Math.round(lengthM * w),
                              costEstimateUSD: Math.round(lengthM * (w * 15))
                            });
                          }}
                          className={`flex-1 py-0.5 rounded text-[10px] font-bold transition-colors ${
                            (selectedElement.roadWidth || 8) === w
                              ? 'bg-sky-500 text-slate-950 shadow-sm'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {w}m
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Geometría e Información de Longitud */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-2 rounded-xl border border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Longitud total:</span>
                      <span className="font-mono text-slate-200 font-bold">
                        ~{Math.round(calculatePolylineLengthMeters(selectedElement.pathPoints || [selectedElement.coordinates]))} m
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Área ocupada:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {selectedElement.footprintArea.toLocaleString()} m²
                      </span>
                    </div>
                  </div>

                  {/* Puntos Ancla Interactivos & Ajuste de Vértices */}
                  <div className="space-y-2 bg-slate-950/50 p-2.5 rounded-xl border border-sky-500/30">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-[11px] flex items-center gap-1.5">
                        <Route className="w-3.5 h-3.5 text-amber-400" />
                        Puntos Ancla ({(selectedElement.pathPoints || []).length})
                      </span>
                      {selectedRoadWaypointIdx !== null && (
                        <span className="bg-amber-950 text-amber-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-amber-500/40 font-bold">
                          Punto #{selectedRoadWaypointIdx + 1} activo
                        </span>
                      )}
                    </div>

                    {selectedRoadWaypointIdx !== null && selectedElement.pathPoints && selectedElement.pathPoints[selectedRoadWaypointIdx] ? (
                      <div className="space-y-1.5 bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-[11px]">
                        <span className="text-amber-300 font-semibold block">
                          Coordenadas de Punto Ancla #{selectedRoadWaypointIdx + 1}:
                        </span>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-slate-400">Lng:</span>
                          <input
                            type="number"
                            step="0.0001"
                            value={Number(selectedElement.pathPoints[selectedRoadWaypointIdx][0].toFixed(5))}
                            onChange={(e) => {
                              const newLng = Number(e.target.value);
                              const updatedPts = [...(selectedElement.pathPoints || [])];
                              updatedPts[selectedRoadWaypointIdx!] = [newLng, updatedPts[selectedRoadWaypointIdx!][1]];
                              const lenM = calculatePolylineLengthMeters(updatedPts);
                              const rw = selectedElement.roadWidth || 8;
                              onUpdateElement({
                                ...selectedElement,
                                coordinates: updatedPts[0],
                                pathPoints: updatedPts,
                                footprintArea: Math.round(lenM * rw),
                                costEstimateUSD: Math.round(lenM * (rw * 15))
                              });
                            }}
                            className="w-24 bg-slate-800 text-sky-300 font-mono text-right py-0.5 px-1.5 rounded border border-slate-700 text-[11px]"
                          />
                          <span className="text-slate-400">Lat:</span>
                          <input
                            type="number"
                            step="0.0001"
                            value={Number(selectedElement.pathPoints[selectedRoadWaypointIdx][1].toFixed(5))}
                            onChange={(e) => {
                              const newLat = Number(e.target.value);
                              const updatedPts = [...(selectedElement.pathPoints || [])];
                              updatedPts[selectedRoadWaypointIdx!] = [updatedPts[selectedRoadWaypointIdx!][0], newLat];
                              const lenM = calculatePolylineLengthMeters(updatedPts);
                              const rw = selectedElement.roadWidth || 8;
                              onUpdateElement({
                                ...selectedElement,
                                coordinates: updatedPts[0],
                                pathPoints: updatedPts,
                                footprintArea: Math.round(lenM * rw),
                                costEstimateUSD: Math.round(lenM * (rw * 15))
                              });
                            }}
                            className="w-24 bg-slate-800 text-sky-300 font-mono text-right py-0.5 px-1.5 rounded border border-slate-700 text-[11px]"
                          />
                        </div>

                        {selectedElement.pathPoints.length > 2 && (
                          <button
                            onClick={() => {
                              const updatedPts = [...selectedElement.pathPoints!];
                              updatedPts.splice(selectedRoadWaypointIdx!, 1);
                              const lenM = calculatePolylineLengthMeters(updatedPts);
                              const rw = selectedElement.roadWidth || 8;
                              onUpdateElement({
                                ...selectedElement,
                                coordinates: updatedPts[0],
                                pathPoints: updatedPts,
                                footprintArea: Math.round(lenM * rw),
                                costEstimateUSD: Math.round(lenM * (rw * 15))
                              });
                              setSelectedRoadWaypointIdx(null);
                            }}
                            className="w-full mt-1 py-1 rounded bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-800/60 font-semibold text-[10px] flex items-center justify-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar este punto ancla
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">
                        Selecciona o arrastra cualquier esfera/poste del mapa para mover los puntos ancla en tiempo real.
                      </p>
                    )}

                    {/* Acciones de Vía: Extender & Invertir */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => setIsExtendingRoad(!isExtendingRoad)}
                        className={`flex-1 py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1 text-[11px] transition-all ${
                          isExtendingRoad
                            ? 'bg-amber-500 text-slate-950 animate-pulse shadow-md shadow-amber-500/40'
                            : 'bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40'
                        }`}
                        title="Haz clic en el mapa para añadir nuevos vértices a la vía"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isExtendingRoad ? 'Extendiendo... (2x Clic fin)' : '+ Extender Vía'}</span>
                      </button>

                      <button
                        onClick={() => {
                          const pts = selectedElement.pathPoints || [selectedElement.coordinates];
                          const reversed = [...pts].reverse();
                          onUpdateElement({
                            ...selectedElement,
                            coordinates: reversed[0],
                            pathPoints: reversed
                          });
                          setSelectedRoadWaypointIdx(null);
                        }}
                        className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] border border-slate-700 transition-colors"
                        title="Invertir el sentido de los vértices de la vía"
                      >
                        Invertir
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Pisos / Altura:</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={selectedElement.floors}
                        onChange={(e) => {
                          const f = Math.max(1, Number(e.target.value));
                          onUpdateElement({
                            ...selectedElement,
                            floors: f,
                            heightMeters: f * 3.2,
                            unitsCount: selectedElement.type.includes('vivienda') ? f * 8 : 0,
                            populationCapacity: selectedElement.type.includes('vivienda') ? f * 32 : selectedElement.populationCapacity
                          });
                        }}
                        className="w-14 bg-slate-800 text-emerald-300 font-mono text-center py-0.5 rounded-lg border border-slate-700 font-bold"
                      />
                      <span className="text-slate-400 font-medium">pisos ({Math.round(selectedElement.floors * 3.2)}m)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Huella 2D (m²):</span>
                    <input
                      type="number"
                      step="50"
                      min="100"
                      value={selectedElement.footprintArea}
                      onChange={(e) =>
                        onUpdateElement({
                          ...selectedElement,
                          footprintArea: Math.max(50, Number(e.target.value))
                        })
                      }
                      className="w-20 bg-slate-800 text-emerald-300 font-mono text-right py-0.5 px-2 rounded-lg border border-slate-700 font-bold"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Orientación Solar:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={selectedElement.solarOrientation}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            solarOrientation: Number(e.target.value)
                          })
                        }
                        className="w-20 accent-emerald-400"
                      />
                      <span className="font-mono text-slate-300 w-8">{selectedElement.solarOrientation}°</span>
                    </div>
                  </div>

                  {/* Relocate on Map Tool & GPS Direct Coordinates */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <button
                      id="relocate-selected-element-btn"
                      onClick={() => setIsRelocatingSelected(!isRelocatingSelected)}
                      className={`w-full py-1.5 px-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-xs ${
                        isRelocatingSelected
                          ? 'bg-amber-500 text-slate-950 animate-pulse shadow-md shadow-amber-500/30'
                          : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{isRelocatingSelected ? 'Haz clic en el mapa para ubicar' : 'Cambiar Ubicación en Mapa'}</span>
                    </button>

                    <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Longitud (Lng):</span>
                        <input
                          type="number"
                          step="0.0001"
                          value={Number(selectedElement.coordinates[0].toFixed(5))}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              coordinates: [Number(e.target.value), selectedElement.coordinates[1]]
                            })
                          }
                          className="w-24 bg-slate-900 text-emerald-300 font-mono text-right py-0.5 px-1.5 rounded border border-slate-700 text-[11px]"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Latitud (Lat):</span>
                        <input
                          type="number"
                          step="0.0001"
                          value={Number(selectedElement.coordinates[1].toFixed(5))}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              coordinates: [selectedElement.coordinates[0], Number(e.target.value)]
                            })
                          }
                          className="w-24 bg-slate-900 text-emerald-300 font-mono text-right py-0.5 px-1.5 rounded border border-slate-700 text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium">Costo Estimado:</span>
                <span className="font-mono font-extrabold text-emerald-400">
                  ${selectedElement.costEstimateUSD.toLocaleString()} USD
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsRelocatingSelected(false);
                onSelectElement(null);
              }}
              className="w-full mt-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 rounded-xl text-center font-bold transition-colors"
            >
              Cerrar Inspector
            </button>
          </div>
        )}

        {/* Floating Copilot Launcher Button */}
        {!isCopilotOpen && (
          <button
            id="open-urban-copilot-floating-btn"
            onClick={() => setIsCopilotOpen(true)}
            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-2xl shadow-indigo-950/80 border border-indigo-400/40 transition-all hover:scale-105 active:scale-95 group animate-in fade-in"
          >
            <span className="p-1 rounded-lg bg-indigo-900/60 text-amber-300 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <span>Copiloto LangChain</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-md font-mono">
              AI
            </span>
          </button>
        )}

        {/* LangChain Urban Copilot Chat Drawer */}
        <UrbanCopilotChat
          currentCity={currentCity}
          activeScenario={activeScenario}
          elements={elements}
          selectedElement={selectedElement}
          onAddElementAtCoords={onAddElementAtCoords}
          onUpdateElement={onUpdateElement}
          onSelectElement={onSelectElement}
          onToggleLayer={onToggleLayer}
          layerState={layerState}
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
        />
      </div>

      {/* Footer Bar: Real GPS Coordinates & Compass Indicator */}
      <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-slate-300">
            <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
            Lat: {currentCity.center[1].toFixed(4)}°, Lng: {currentCity.center[0].toFixed(4)}°
          </span>
          <span className="hidden sm:inline">| Área Piloto: {currentCity.areaHectares} ha</span>
          <span className="hidden md:inline">| Población: {currentCity.initialPopulation.toLocaleString()} hab</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">{elements.length} elementos en escena</span>
        </div>
      </div>
    </div>
  );
};
