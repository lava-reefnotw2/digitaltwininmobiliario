const fs = require('fs');
const appFile = 'src/App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

const oldHandleLoad = `  const handleLoadSlot = (slotNumber: 1 | 2 | 3) => {
    const slotId = \\\`custom_\\\${slotNumber}\\\` as ScenarioType;
    setActiveScenario(slotId);
    setSelectedElement(null);
  };`;

const newHandleLoad = `  const handleLoadSlot = (slotNumber: 1 | 2 | 3) => {
    const slotId = \`custom_\${slotNumber}\` as ScenarioType;
    if (slotId === activeScenario) return;
    if (hasUnsavedChanges) {
      setPendingAction({ type: 'scenario', id: slotId });
    } else {
      setActiveScenario(slotId);
      setSelectedElement(null);
    }
  };`;
  
content = content.replace(/const handleLoadSlot = [\s\S]*?setSelectedElement\(null\);\s*\};/, newHandleLoad);

const oldClearSlot = `    if (activeScenario === slotId) {
      setActiveScenario('base');
    }`;

const newClearSlot = `    if (activeScenario === slotId) {
      setActiveScenario('base');
      setHasUnsavedChanges(false);
    }`;
    
content = content.replace(oldClearSlot, newClearSlot);

fs.writeFileSync(appFile, content);
console.log('Fixed slot handlers');
