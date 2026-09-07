import React, { useState, useMemo, useEffect } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { Map2D3DView } from './components/Map2D3DView';
import { HousingSimulationPanel } from './components/HousingSimulationPanel';
import { ServicesProximityPanel } from './components/ServicesProximityPanel';
import { CommunityParticipationPanel } from './components/CommunityParticipationPanel';
import { MultiCriteriaEvaluation } from './components/MultiCriteriaEvaluation';
import { BackendScaffoldingViewer } from './components/BackendScaffoldingViewer';
import { AdminAndDataHub } from './components/AdminAndDataHub';
import { SaveProposalModal } from './components/SaveProposalModal';
import { ThemeToggle } from './components/ThemeToggle';

import { 
  PilotCity, 
  PilotCityId, 
  ScenarioType, 
  UrbanElement, 
  Scenario, 
  UserRole, 
  Language, 
  GISLayerState, 
  UrbanElementType,
  ForumThread,
  BudgetVoteAllocation,
  SavedProposalProfile,
  ThemeMode
} from './types';

import { PILOT_CITIES } from './data/pilotCities';
import { 
  INITIAL_CITY_ELEMENTS, 
  INITIAL_SCENARIOS_META, 
  INITIAL_FORUM_THREADS, 
  INITIAL_BUDGET_ALLOCATION 
} from './data/initialScenarios';
import { calculateScenarioKPIs } from './utils/gisCalculations';
import { HelpCircle, AlertTriangle, X, CheckCircle, Sparkles, Building2, Trees, HeartPulse, GraduationCap, Bus, Store, Users, Save } from 'lucide-react';

const DEFAULT_SAVED_PROFILES: SavedProposalProfile[] = [
  {
    id: 'custom_1',
    slotNumber: 1,
    name: 'Propuesta Personalizada 1',
    description: 'Perfil 1 de co-diseño con cambios en equipamiento, pistas y vivienda.',
    savedAt: 'Pendiente de guardar',
    cityId: 'lima',
    cityName: 'Lima',
    baseScenarioSource: 'base',
    elements: [],
    isFilled: false
  },
  {
    id: 'custom_2',
    slotNumber: 2,
    name: 'Propuesta Personalizada 2',
    description: 'Perfil 2 de co-diseño con cambios en equipamiento, pistas y vivienda.',
    savedAt: 'Pendiente de guardar',
    cityId: 'lima',
    cityName: 'Lima',
    baseScenarioSource: 'base',
    elements: [],
    isFilled: false
  },
  {
    id: 'custom_3',
    slotNumber: 3,
    name: 'Propuesta Personalizada 3',
    description: 'Perfil 3 de co-diseño con cambios en equipamiento, pistas y vivienda.',
    savedAt: 'Pendiente de guardar',
    cityId: 'lima',
    cityName: 'Lima',
    baseScenarioSource: 'base',
    elements: [],
    isFilled: false
  }
];

export default function App() {
  // Navigation & Preferences State
  const [selectedCityId, setSelectedCityId] = useState<PilotCityId>('lima');
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('hibrido');
  const [userRole, setUserRole] = useState<UserRole>('residente');
  const [language, setLanguage] = useState<Language>('es');
  const [activeTab, setActiveTab] = useState<string>('map');
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  // Dark / Light Theme Mode with Persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('urban_twin_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('urban_twin_theme', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [theme]);
  
  // Pending Action State for Unsaved Changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'scenario'; id: ScenarioType } | { type: 'city'; id: PilotCityId } | null>(null);

  // Saved Proposal Profiles (up to 3 slots)
  const [savedProfiles, setSavedProfiles] = useState<SavedProposalProfile[]>(() => {
    try {
      const stored = localStorage.getItem('urban_twin_custom_profiles_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return DEFAULT_SAVED_PROFILES;
  });

  // Urban Elements State per City and Scenario
  const [cityElements, setCityElements] = useState<Record<PilotCityId, Record<string, UrbanElement[]>>>(
    INITIAL_CITY_ELEMENTS
  );

  // Selected Urban Element for Inspector
  const [selectedElement, setSelectedElement] = useState<UrbanElement | null>(null);

  // GIS Layer State
  const [layerState, setLayerState] = useState<GISLayerState>({
    osmBuildings: true,
    osmRoads: true,
    ghslBuiltGrid: true,
    worldPopGrid: false,
    unHabitatVulnerability: false,
    isochroneWalkBuffers: true,
    treeCanopyLayer: true,
    volumetric3D: true,
    shadowSim: true,
    wireframeMode: false
  });

  // Forum Threads State
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_FORUM_THREADS);

  // Budget Allocation State
  const [budgetVote, setBudgetVote] = useState<BudgetVoteAllocation>(INITIAL_BUDGET_ALLOCATION);

  // Current City Object
  const currentCity: PilotCity = useMemo(() => {
    return PILOT_CITIES.find((c) => c.id === selectedCityId) || PILOT_CITIES[0];
  }, [selectedCityId]);

  // Current Scenario Elements
  const currentElements: UrbanElement[] = useMemo(() => {
    return cityElements[selectedCityId]?.[activeScenario] || [];
  }, [cityElements, selectedCityId, activeScenario]);

  // Compute Full Scenarios with Live KPIs
  const computedScenarios: Record<ScenarioType, Scenario> = useMemo(() => {
    const types: ScenarioType[] = ['base', 'municipal', 'comunitario', 'hibrido', 'custom_1', 'custom_2', 'custom_3'];
    const result: Partial<Record<ScenarioType, Scenario>> = {};
    types.forEach((t) => {
      const elems = cityElements[selectedCityId]?.[t] || [];
      const kpis = calculateScenarioKPIs(elems, currentCity.areaHectares, currentCity.initialPopulation);
      const meta = INITIAL_SCENARIOS_META[t] || {
        name: `Perfil ${t}`,
        shortDesc: 'Propuesta personalizada de co-diseño.',
        author: 'Usuario'
      };

      // If it's a custom profile and has a saved name, use it
      const savedProf = savedProfiles.find(p => p.id === t);
      const displayName = savedProf && savedProf.isFilled ? savedProf.name : meta.name;
      const displayDesc = savedProf && savedProf.isFilled ? savedProf.description : meta.shortDesc;

      result[t] = {
        id: t,
        name: displayName,
        shortDesc: displayDesc,
        author: meta.author,
        updatedAt: savedProf?.savedAt || 'Reciente',
        elements: elems,
        kpis
      };
    });
    return result as Record<ScenarioType, Scenario>;
  }, [cityElements, selectedCityId, currentCity, savedProfiles]);

  const activeScenarioObject = computedScenarios[activeScenario] || computedScenarios.base;

  const discardUnsavedChanges = (scenarioToRestore: ScenarioType) => {
    setCityElements(prev => {
      const cityData = prev[selectedCityId] || {};
      let restoredElements: UrbanElement[] = [];
      if (scenarioToRestore.startsWith('custom_')) {
        const slotNum = parseInt(scenarioToRestore.split('_')[1]);
        const profile = savedProfiles.find(p => p.slotNumber === slotNum);
        restoredElements = profile && profile.isFilled ? profile.elements : [];
      } else {
        restoredElements = INITIAL_CITY_ELEMENTS[selectedCityId]?.[scenarioToRestore] || [];
      }
      return {
        ...prev,
        [selectedCityId]: {
          ...cityData,
          [scenarioToRestore]: restoredElements
        }
      };
    });
    setHasUnsavedChanges(false);
  };

  const handleSaveToSlot = (
    slotNumber: 1 | 2 | 3,
    name: string,
    description: string,
    elementsToSave: UrbanElement[]
  ) => {
    const slotId = `custom_${slotNumber}` as 'custom_1' | 'custom_2' | 'custom_3';
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString();
    
    const updatedProfile: SavedProposalProfile = {
      id: slotId,
      slotNumber,
      name,
      description,
      savedAt: nowStr,
      cityId: selectedCityId,
      cityName: currentCity.name,
      baseScenarioSource: activeScenario,
      elements: elementsToSave,
      isFilled: true
    };
    
    const newSavedProfiles = savedProfiles.map(p => p.slotNumber === slotNumber ? updatedProfile : p);
    setSavedProfiles(newSavedProfiles);
    try {
      localStorage.setItem('urban_twin_custom_profiles_v1', JSON.stringify(newSavedProfiles));
    } catch {
      // ignore
    }
    
    setCityElements(prev => {
      const cityData = prev[selectedCityId] || {};
      let restoredPreviousElements = cityData[activeScenario] || [];
      if (activeScenario !== slotId) {
        if (activeScenario.startsWith('custom_')) {
           const prevProfile = savedProfiles.find(p => p.id === activeScenario);
           restoredPreviousElements = prevProfile && prevProfile.isFilled ? prevProfile.elements : [];
        } else {
           restoredPreviousElements = INITIAL_CITY_ELEMENTS[selectedCityId]?.[activeScenario] || [];
        }
      }
      
      const newCityData = {
        ...cityData,
        [slotId]: elementsToSave.map(el => ({ ...el, scenarioId: slotId }))
      };
      
      if (activeScenario !== slotId) {
         newCityData[activeScenario] = restoredPreviousElements;
      }
      
      return {
        ...prev,
        [selectedCityId]: newCityData
      };
    });
    setHasUnsavedChanges(false);
    setActiveScenario(slotId);
  };

    const handleLoadSlot = (slotNumber: 1 | 2 | 3) => {
    const slotId = `custom_${slotNumber}` as ScenarioType;
    if (slotId === activeScenario) return;
    if (hasUnsavedChanges) {
      setPendingAction({ type: 'scenario', id: slotId });
    } else {
      setActiveScenario(slotId);
      setSelectedElement(null);
    }
  };

  const handleClearSlot = (slotNumber: 1 | 2 | 3) => {
    const slotId = `custom_${slotNumber}` as 'custom_1' | 'custom_2' | 'custom_3';
    const clearedProfile: SavedProposalProfile = {
      id: slotId,
      slotNumber,
      name: `Propuesta Personalizada ${slotNumber}`,
      description: `Perfil ${slotNumber} vacío.`,
      savedAt: 'Sin datos',
      cityId: selectedCityId,
      cityName: currentCity.name,
      baseScenarioSource: 'base',
      elements: [],
      isFilled: false
    };

    const newSavedProfiles = savedProfiles.map(p => p.slotNumber === slotNumber ? clearedProfile : p);
    setSavedProfiles(newSavedProfiles);
    try {
      localStorage.setItem('urban_twin_custom_profiles_v1', JSON.stringify(newSavedProfiles));
    } catch {
      // ignore
    }

    setCityElements(prev => {
      const cityData = prev[selectedCityId] || {};
      return {
        ...prev,
        [selectedCityId]: {
          ...cityData,
          [slotId]: []
        }
      };
    });

    if (activeScenario === slotId) {
      setActiveScenario('base');
      setHasUnsavedChanges(false);
    }
  };

  // Element CRUD Handlers
  const handleUpdateElement = (updated: UrbanElement) => {
    setHasUnsavedChanges(true);
    setCityElements((prev) => {
      const cityData = prev[selectedCityId] || {};
      const scenarioElems = cityData[activeScenario] || [];
      const newElems = scenarioElems.map((el) => (el.id === updated.id ? updated : el));
      return {
        ...prev,
        [selectedCityId]: {
          ...cityData,
          [activeScenario]: newElems
        }
      };
    });
    setSelectedElement(updated);
  };

  const handleDeleteElement = (id: string) => {
    setHasUnsavedChanges(true);
    setCityElements((prev) => {
      const cityData = prev[selectedCityId] || {};
      const scenarioElems = cityData[activeScenario] || [];
      const newElems = scenarioElems.filter((el) => el.id !== id);
      return {
        ...prev,
        [selectedCityId]: {
          ...cityData,
          [activeScenario]: newElems
        }
      };
    });
    if (selectedElement?.id === id) setSelectedElement(null);
  };

  const handleAddElementAtCoords = (
    coords: [number, number], 
    type: UrbanElementType = 'vivienda_social',
    customProps?: Partial<UrbanElement>
  ) => {
    setHasUnsavedChanges(true);
    const isHousing = type === 'vivienda_social' || type === 'vivienda_incremental';
    const isPark = type === 'parque_verde';
    const isHealth = type === 'centro_salud';
    const isSchool = type === 'escuela';
    const isTransit = type === 'parada_transporte';
    const isRoad = type === 'pista_vial';

    const defaultName =
      type === 'vivienda_social'
        ? 'Nueva Vivienda Social Colectiva'
        : type === 'vivienda_incremental'
        ? 'Módulo de Vivienda Incremental'
        : type === 'parque_verde'
        ? 'Nuevo Parque / Huerto Barrial'
        : type === 'centro_salud'
        ? 'Centro de Salud Comunitario'
        : type === 'escuela'
        ? 'Equipamiento Educativo'
        : type === 'parada_transporte'
        ? 'Parada Transporte Masivo'
        : type === 'pista_vial'
        ? 'Nueva Pista / Corredor Vial'
        : 'Comercio Local / Cooperativa';

    const newElement: UrbanElement = {
      id: `elem-${Date.now()}`,
      scenarioId: activeScenario,
      type,
      name: customProps?.name || defaultName,
      coordinates: coords,
      pathPoints: customProps?.pathPoints,
      roadWidth: customProps?.roadWidth || (isRoad ? 8 : undefined),
      footprintArea: customProps?.footprintArea || (isPark ? 2400 : isHousing ? 1800 : isRoad ? 1600 : 900),
      floors: customProps?.floors !== undefined ? customProps.floors : (isPark || isRoad ? 1 : isHousing ? 4 : 2),
      heightMeters: customProps?.heightMeters !== undefined ? customProps.heightMeters : (isPark ? 0 : isRoad ? 0.15 : isHousing ? 12 : 7),
      unitsCount: customProps?.unitsCount !== undefined ? customProps.unitsCount : (isHousing ? 36 : 0),
      populationCapacity: customProps?.populationCapacity !== undefined ? customProps.populationCapacity : (isHousing ? 144 : isPark ? 600 : isHealth ? 8000 : isRoad ? 6000 : 400),
      solarOrientation: customProps?.solarOrientation !== undefined ? customProps.solarOrientation : 180,
      ventilationScore: customProps?.ventilationScore !== undefined ? customProps.ventilationScore : (isRoad ? 92 : 85),
      costEstimateUSD: customProps?.costEstimateUSD !== undefined ? customProps.costEstimateUSD : (isPark ? 150000 : isHousing ? 1400000 : isRoad ? 120000 : 450000),
      status: 'propuesto',
      notes: customProps?.notes
    };

    setCityElements((prev) => {
      const cityData = prev[selectedCityId] || {};
      const scenarioElems = cityData[activeScenario] || [];
      return {
        ...prev,
        [selectedCityId]: {
          ...cityData,
          [activeScenario]: [...scenarioElems, newElement]
        }
      };
    });

    setSelectedElement(newElement);
  };

  const handleToggleLayer = (key: keyof GISLayerState) => {
    setLayerState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Forum Handlers
  const handleAddForumThread = (newThreadData: Omit<ForumThread, 'id' | 'timestamp' | 'upvotes' | 'downvotes' | 'comments'>) => {
    const thread: ForumThread = {
      ...newThreadData,
      id: `forum-${Date.now()}`,
      timestamp: 'Recién publicado',
      upvotes: 1,
      downvotes: 0,
      comments: []
    };
    setForumThreads([thread, ...forumThreads]);
  };

  const handleVoteThread = (threadId: string, type: 'up' | 'down') => {
    setForumThreads((prev) =>
      prev.map((th) => {
        if (th.id !== threadId) return th;
        return {
          ...th,
          upvotes: type === 'up' ? th.upvotes + 1 : th.upvotes,
          downvotes: type === 'down' ? th.downvotes + 1 : th.downvotes
        };
      })
    );
  };

  const handleAddComment = (threadId: string, content: string) => {
    setForumThreads((prev) =>
      prev.map((th) => {
        if (th.id !== threadId) return th;
        return {
          ...th,
          comments: [
            ...th.comments,
            {
              id: `cmt-${Date.now()}`,
              author: userRole === 'residente' ? 'Vecino/a' : userRole === 'facilitador' ? 'Facilitador' : 'Administrador',
              role: userRole,
              content,
              timestamp: 'Ahora'
            }
          ]
        };
      })
    );
  };

  // Export Reports
  const handleExportReport = (format: 'geojson' | 'csv' | 'json') => {
    let content = '';
    let filename = `digital_twin_${currentCity.id}_${activeScenario}`;
    let mimeType = 'text/plain';

    if (format === 'geojson') {
      const geojson = {
        type: 'FeatureCollection',
        properties: {
          city: currentCity.name,
          scenario: activeScenarioObject.name,
          kpis: activeScenarioObject.kpis,
          exportedAt: new Date().toISOString()
        },
        features: currentElements.map((el) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: el.coordinates
          },
          properties: {
            id: el.id,
            name: el.name,
            type: el.type,
            floors: el.floors,
            footprintArea: el.footprintArea,
            unitsCount: el.unitsCount,
            populationCapacity: el.populationCapacity,
            solarOrientation: el.solarOrientation,
            ventilationScore: el.ventilationScore,
            costEstimateUSD: el.costEstimateUSD,
            status: el.status
          }
        }))
      };
      content = JSON.stringify(geojson, null, 2);
      filename += '.geojson';
      mimeType = 'application/geo+json';
    } else if (format === 'csv') {
      const rows = [
        ['Escenario', 'Viviendas', 'Poblacion_Alojada', 'Densidad_Hab_Ha', 'M2_Verde_Hab', 'Cobertura_15min_Pct', 'Confort_Solar_Pct', 'Inversion_USD'],
        ...Object.values(computedScenarios).map((s) => [
          s.name,
          s.kpis.totalHousingUnits,
          s.kpis.populationHoused,
          s.kpis.densityHabHa,
          s.kpis.greenSpacePerCapita,
          s.kpis.services15MinCoverage,
          s.kpis.solarComfortIndex,
          s.kpis.estimatedInvestmentUSD
        ])
      ];
      content = rows.map((r) => r.join(',')).join('\n');
      filename += '_metrics.csv';
      mimeType = 'text/csv';
    } else {
      content = JSON.stringify(computedScenarios, null, 2);
      filename += '_full.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light bg-slate-100 text-slate-900' : 'theme-dark bg-[#020617] text-slate-100'} flex flex-col lg:flex-row font-sans selection:bg-emerald-500 selection:text-white bento-dot-grid transition-colors duration-200`}>
      {/* Left Sidebar Navigation */}
      <SidebarNav
        currentCity={currentCity}
        onSelectCity={(cityId) => {
          if (cityId === selectedCityId) return;
          if (hasUnsavedChanges) {
            setPendingAction({ type: 'city', id: cityId });
          } else {
            setSelectedCityId(cityId);
            setSelectedElement(null);
          }
        }}
        activeScenario={activeScenario}
        onSelectScenario={(sc) => {
          if (sc === activeScenario) return;
          if (hasUnsavedChanges) {
            setPendingAction({ type: 'scenario', id: sc });
          } else {
            setActiveScenario(sc);
            setSelectedElement(null);
          }
        }}
        userRole={userRole}
        onChangeRole={setUserRole}
        language={language}
        onChangeLanguage={setLanguage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenHelp={() => setShowHelpModal(true)}
        savedProfiles={savedProfiles}
        onOpenSaveProposal={() => setIsSaveModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area (Offset by sidebar on desktop) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Top Header Bar with Breadcrumbs & Theme Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentCity.name}
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs font-semibold text-slate-300">
              {activeScenarioObject.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggleTheme={toggleTheme} variant="compact" />
            <button
              id="header-help-btn"
              onClick={() => setShowHelpModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-slate-800 hover:border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 shadow-sm"
              title="Guía Metodológica"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Guía</span>
            </button>
          </div>
        </div>

        {/* Bento Top Context Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                {language === 'es' ? 'Sector Piloto Activo' : language === 'pt' ? 'Setor Piloto Ativo' : 'Active Pilot Sector'}
              </span>
              <p className="text-sm font-extrabold text-white tracking-tight">{currentCity.name}</p>
              <span className="text-[11px] text-emerald-400 font-mono block">
                {currentCity.center[1].toFixed(4)}°N, {currentCity.center[0].toFixed(4)}°W • {currentCity.areaHectares} ha
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              GIS
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                {language === 'es' ? 'Escenario / Propuesta' : language === 'pt' ? 'Cenário / Proposta' : 'Scenario / Proposal'}
              </span>
              <p className="text-sm font-extrabold text-white truncate max-w-[140px]">{activeScenarioObject.name}</p>
              <span className="text-[11px] text-slate-400 block">
                {currentElements.length} {language === 'es' ? 'elementos modelados' : language === 'pt' ? 'elementos modelados' : 'modeled elements'}
              </span>
            </div>
            <button
              id="top-strip-save-proposal-btn"
              onClick={() => setIsSaveModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-all shadow-sm"
              title="Guardar propuesta en uno de los 3 perfiles"
            >
              <Save className="w-3.5 h-3.5 text-indigo-400" />
              <span>Guardar</span>
            </button>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                {language === 'es' ? 'Índice de Calidad' : language === 'pt' ? 'Índice de Qualidade' : 'Quality of Life'}
              </span>
              <p className="text-sm font-extrabold text-emerald-400 font-mono">
                {activeScenarioObject.kpis.qualityOfLifeScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </p>
              <div className="w-28 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, activeScenarioObject.kpis.qualityOfLifeScore)}%` }}
                />
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              {activeScenarioObject.kpis.qualityOfLifeScore >= 70 ? 'Óptimo' : 'Regular'}
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-600/90 to-teal-700/90 text-white rounded-2xl p-3.5 flex items-center justify-between shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
            <div className="space-y-0.5">
              <span className="text-[10px] text-emerald-100 uppercase tracking-widest font-bold block">
                {language === 'es' ? 'Gemelo Digital Activo' : language === 'pt' ? 'Gêmeo Digital Ativo' : 'Live Twin Status'}
              </span>
              <p className="text-sm font-black text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                QGIS + Three.js
              </p>
              <span className="text-[11px] text-emerald-100/90 font-medium">PostGIS GeoEngine v3.4</span>
            </div>
            <button 
              onClick={() => handleExportReport('geojson')}
              className="px-3 py-1.5 bg-slate-950/40 hover:bg-slate-950/60 rounded-xl text-xs font-bold text-emerald-100 transition-colors border border-emerald-300/30 shadow-sm"
            >
              Export
            </button>
          </div>
        </div>

        {/* Tab 1: Map 2D / 3D Participatory Workspace */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <Map2D3DView
              currentCity={currentCity}
              activeScenario={activeScenario}
              elements={currentElements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
              onAddElementAtCoords={handleAddElementAtCoords}
              language={language}
              layerState={layerState}
              onToggleLayer={handleToggleLayer}
              onOpenSaveProposal={() => setIsSaveModalOpen(true)}
              theme={theme}
              onToggleTheme={toggleTheme}
            />

            {/* Bento Grid Live Scenario Quick KPIs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl text-center space-y-1 hover:border-slate-700 transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Viviendas Nuevas</span>
                <span className="text-2xl font-extrabold font-mono text-sky-400 block">
                  {activeScenarioObject.kpis.totalHousingUnits}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">Unidades</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl text-center space-y-1 hover:border-slate-700 transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Densidad Barrio</span>
                <span className="text-2xl font-extrabold font-mono text-amber-400 block">
                  {activeScenarioObject.kpis.densityHabHa}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">hab / ha</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl text-center space-y-1 hover:border-slate-700 transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Área Verde / Hab</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400 block">
                  {activeScenarioObject.kpis.greenSpacePerCapita}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">m² por persona</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl text-center space-y-1 hover:border-slate-700 transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Servicios 15 Min</span>
                <span className="text-2xl font-extrabold font-mono text-teal-400 block">
                  {activeScenarioObject.kpis.services15MinCoverage}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">Cobertura peatonal</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl text-center space-y-1 hover:border-slate-700 transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Confort Solar</span>
                <span className="text-2xl font-extrabold font-mono text-yellow-300 block">
                  {activeScenarioObject.kpis.solarComfortIndex}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">Heliofanía útil</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl text-center space-y-1 hover:border-slate-700 transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Calidad de Vida</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-300 block">
                  {activeScenarioObject.kpis.qualityOfLifeScore}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">Puntuación / 100</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Housing Simulation */}
        {activeTab === 'housing' && (
          <HousingSimulationPanel
            scenario={activeScenarioObject}
            city={currentCity}
            elements={currentElements}
          />
        )}

        {/* Tab 3: Services & Proximity */}
        {activeTab === 'services' && (
          <ServicesProximityPanel
            scenario={activeScenarioObject}
            city={currentCity}
            elements={currentElements}
          />
        )}

        {/* Tab 4: Participatory Deliberation & Voting */}
        {activeTab === 'deliberation' && (
          <CommunityParticipationPanel
            city={currentCity}
            userRole={userRole}
            language={language}
            activeScenario={activeScenario}
            budgetVote={budgetVote}
            onUpdateBudgetVote={setBudgetVote}
            forumThreads={forumThreads}
            onAddForumThread={handleAddForumThread}
            onVoteThread={handleVoteThread}
            onAddComment={handleAddComment}
          />
        )}

        {/* Tab 5: Multi-Criteria Scenario Evaluation */}
        {activeTab === 'evaluation' && (
          <MultiCriteriaEvaluation
            scenarios={computedScenarios}
            currentCity={currentCity}
            activeScenario={activeScenario}
            onSelectScenario={(sc) => {
            if (sc === activeScenario) return;
            if (hasUnsavedChanges) {
              setPendingAction({ type: 'scenario', id: sc });
            } else {
              setActiveScenario(sc);
              setSelectedElement(null);
            }
          }}
            onExportReport={handleExportReport}
          />
        )}

        {/* Tab 6: Full Architecture Scaffolding & API */}
        {activeTab === 'scaffolding' && (
          <div className="space-y-6">
            <BackendScaffoldingViewer />
            <AdminAndDataHub
              currentCity={currentCity}
              scenarios={computedScenarios}
              onExportReport={handleExportReport}
              language={language}
            />
          </div>
        )}
      </main>
      </div>

      {/* Help / Methodology Modal */}
      
      {/* Unsaved Changes Modal */}
      {pendingAction && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-white">
                Propuesta sin guardar
              </h3>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Has modificado este escenario. Si cambias de {pendingAction.type === 'city' ? 'ciudad' : 'perfil'} sin guardar, 
              perderás los últimos cambios y el escenario regresará a su estado original. ¿Qué deseas hacer?
            </p>
            
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => setPendingAction(null)}
                className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all text-sm"
              >
                Quedarme y Guardar
              </button>
              <button
                onClick={() => {
                  discardUnsavedChanges(activeScenario);
                  if (pendingAction.type === 'scenario') {
                    setActiveScenario(pendingAction.id as ScenarioType);
                  } else {
                    setSelectedCityId(pendingAction.id as PilotCityId);
                  }
                  setSelectedElement(null);
                  setPendingAction(null);
                }}
                className="w-full px-4 py-2.5 bg-red-600/90 hover:bg-red-500 text-white rounded-xl font-bold transition-all text-sm shadow-lg shadow-red-950/40"
              >
                Descartar Cambios y Salir
              </button>
            </div>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-white">
                  Guía Metodológica: Digital Twin Comunitario
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[420px] overflow-y-auto pr-2">
              <p>
                Esta plataforma es un <strong>Gemelo Digital participativo</strong> diseñado para talleres comunitarios presenciales con tablets y asambleas barriales en 3 ciudades piloto (Medellín, Barcelona y Ciudad de México).
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-emerald-300 text-sm">Flujo de Co-Diseño en 4 Fases:</h4>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-400">
                  <li>
                    <strong className="text-slate-200">1. Diagnóstico Base:</strong> Visualización de la huella construida satelital (GHSL), densidad demográfica (WorldPop) y equipamientos OSM existentes.
                  </li>
                  <li>
                    <strong className="text-slate-200">2. Co-Diseño Espacial:</strong> Uso del mapa 2D/3D interactivo para arrastrar bloques de vivienda social, huertos urbanos, escuelas y dispensarios de salud.
                  </li>
                  <li>
                    <strong className="text-slate-200">3. Captura de Preferencias:</strong> Distribución de 100 puntos presupuestarios y priorización mediante matrices AHP de Saaty.
                  </li>
                  <li>
                    <strong className="text-slate-200">4. Evaluación Multicriterio:</strong> Generación del <em>Escenario Híbrido</em> con balance óptimo entre sostenibilidad ambiental, equidad espacial y costo de inversión.
                  </li>
                </ol>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-bold text-sky-300">Stack Tecnológico Implementado:</span>
                <p className="text-slate-400">
                  GeoDjango (PostGIS) + QGIS Server WMS + Three.js 3D Volumetry + DRF GeoJSON REST API + Docker Compose.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl transition-colors text-xs shadow-lg shadow-emerald-950/40"
            >
              Entendido, comenzar a explorar
            </button>
          </div>
        </div>
      )}

      {/* Save Proposal Modal (Up to 3 Custom Profiles) */}
      <SaveProposalModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        currentCity={currentCity}
        activeScenario={activeScenario}
        currentElements={currentElements}
        savedProfiles={savedProfiles}
        onSaveToSlot={handleSaveToSlot}
        onLoadSlot={handleLoadSlot}
        onClearSlot={handleClearSlot}
      />
    </div>
  );
}
