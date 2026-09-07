const fs = require('fs');

const appFile = 'src/App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

const regex = /const \[hasUnsavedChanges, setHasUnsavedChanges\] = useState<boolean>\(false\);[\s\S]*?(?=const handleLoadSlot =)/;

const fixedCode = `
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
        name: \`Perfil \${t}\`,
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
    const slotId = \`custom_\${slotNumber}\` as 'custom_1' | 'custom_2' | 'custom_3';
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

  `;

content = content.replace(regex, fixedCode);
fs.writeFileSync(appFile, content);
console.log('App.tsx fixed');
