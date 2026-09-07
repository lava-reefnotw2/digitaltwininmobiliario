const fs = require('fs');

const appFile = 'src/App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// 1. Add state imports and variables
content = content.replace(
  /const \[isSaveModalOpen, setIsSaveModalOpen\] = useState<boolean>\(false\);/,
  `const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  
  // Pending Action State for Unsaved Changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'scenario'; id: ScenarioType } | { type: 'city'; id: PilotCityId } | null>(null);
  
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
`
);

// 2. Modify Element CRUD to setHasUnsavedChanges(true)
content = content.replace(
  /const handleUpdateElement = \(updated: UrbanElement\) => \{/,
  `const handleUpdateElement = (updated: UrbanElement) => {
    setHasUnsavedChanges(true);`
);

content = content.replace(
  /const handleDeleteElement = \(id: string\) => \{/,
  `const handleDeleteElement = (id: string) => {
    setHasUnsavedChanges(true);`
);

content = content.replace(
  /const handleAddElementAtCoords = \([\s\S]*?\{/,
  (match) => match + `\n    setHasUnsavedChanges(true);`
);


// 3. Modify handleSaveToSlot
content = content.replace(
  /setCityElements\(prev => \{[\s\S]*?\}\);\s*\/\/ Switch active scenario to saved slot\s*setActiveScenario\(slotId\);/,
  `setCityElements(prev => {
      const cityData = prev[selectedCityId] || {};
      
      // Prepare restored state for the activeScenario if it's different from the slot we are saving to
      let restoredPreviousElements = cityData[activeScenario] || [];
      if (activeScenario !== slotId) {
        if (activeScenario.startsWith('custom_')) {
           const prevProfile = newSavedProfiles.find(p => p.id === activeScenario);
           restoredPreviousElements = prevProfile && prevProfile.isFilled ? prevProfile.elements : [];
        } else {
           restoredPreviousElements = INITIAL_CITY_ELEMENTS[selectedCityId]?.[activeScenario] || [];
        }
      }
      
      const newCityData = {
        ...cityData,
        [slotId]: elementsToSave.map(el => ({ ...el, scenarioId: slotId }))
      };
      
      // Revert the previous scenario if we moved to a new slot
      if (activeScenario !== slotId) {
         newCityData[activeScenario] = restoredPreviousElements;
      }
      
      return {
        ...prev,
        [selectedCityId]: newCityData
      };
    });
    setHasUnsavedChanges(false);
    setActiveScenario(slotId);`
);

// 4. Update the render section to include the modal and the SidebarNav overrides
content = content.replace(
  /onSelectCity=\{\(cityId\) => \{\s*setSelectedCityId\(cityId\);\s*setSelectedElement\(null\);\s*\}\}/,
  `onSelectCity={(cityId) => {
          if (cityId === selectedCityId) return;
          if (hasUnsavedChanges) {
            setPendingAction({ type: 'city', id: cityId });
          } else {
            setSelectedCityId(cityId);
            setSelectedElement(null);
          }
        }}`
);

content = content.replace(
  /onSelectScenario=\{\(sc\) => \{\s*setActiveScenario\(sc\);\s*setSelectedElement\(null\);\s*\}\}/,
  `onSelectScenario={(sc) => {
          if (sc === activeScenario) return;
          if (hasUnsavedChanges) {
            setPendingAction({ type: 'scenario', id: sc });
          } else {
            setActiveScenario(sc);
            setSelectedElement(null);
          }
        }}`
);

// We also need to update it for MultiCriteriaEvaluation which also has onSelectScenario
content = content.replace(
  /<MultiCriteriaEvaluation[\s\S]*?onSelectScenario=\{setActiveScenario\}/,
  (match) => match.replace('onSelectScenario={setActiveScenario}', `onSelectScenario={(sc) => {
            if (sc === activeScenario) return;
            if (hasUnsavedChanges) {
              setPendingAction({ type: 'scenario', id: sc });
            } else {
              setActiveScenario(sc);
              setSelectedElement(null);
            }
          }}`)
);

// 5. Inject Modal at the end
const modalCode = `
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
`;

content = content.replace(
  /\{showHelpModal && \(/,
  modalCode + '\n      {showHelpModal && ('
);

// We need to make sure AlertTriangle is imported in App.tsx
if (!content.includes('AlertTriangle')) {
  content = content.replace(
    /import \{([^}]+)\} from 'lucide-react';/,
    "import {$1, AlertTriangle} from 'lucide-react';"
  );
}

fs.writeFileSync(appFile, content);
console.log('App.tsx patched');
