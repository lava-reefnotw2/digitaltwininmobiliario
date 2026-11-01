const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'data_json');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Export pilot cities
const pilotCitiesContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'pilotCities.ts'), 'utf8');
const pilotCitiesClean = pilotCitiesContent
  .replace(/import\s+[\s\S]*?from\s+['"].*?['"];/g, '')
  .replace(/export\s+const/g, 'const')
  .replace(/:\s*PilotCity\[\]/g, '');
const sandboxCities = {};
new Function('sandbox', pilotCitiesClean + '\nsandbox.PILOT_CITIES = PILOT_CITIES;')(sandboxCities);
fs.writeFileSync(path.join(outDir, 'pilot_cities.json'), JSON.stringify(sandboxCities.PILOT_CITIES, null, 2));
console.log('Exported pilot_cities.json');

// 2. Export urban knowledge base & preset flows
const kbContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'urbanKnowledgeBase.ts'), 'utf8');
const kbClean = kbContent
  .replace(/import\s+[\s\S]*?from\s+['"].*?['"];/g, '')
  .replace(/export\s+interface[\s\S]*?\n\}/g, '')
  .replace(/export\s+const/g, 'const')
  .replace(/:\s*UrbanRegulationSnippet\[\]/g, '')
  .replace(/:\s*LangflowPresetFlow\[\]/g, '')
  .replace(/as\s+any\[\]/g, '');

const sandboxKb = {};
new Function('sandbox', kbClean + '\nsandbox.URBAN_KNOWLEDGE_BASE = URBAN_KNOWLEDGE_BASE;\nsandbox.PRESET_LANGFLOW_FLOWS = PRESET_LANGFLOW_FLOWS;')(sandboxKb);
fs.writeFileSync(path.join(outDir, 'urban_knowledge_base.json'), JSON.stringify(sandboxKb.URBAN_KNOWLEDGE_BASE, null, 2));
fs.writeFileSync(path.join(outDir, 'preset_langflow_flows.json'), JSON.stringify(sandboxKb.PRESET_LANGFLOW_FLOWS, null, 2));
console.log('Exported urban_knowledge_base.json and preset_langflow_flows.json');

// 3. Export initial scenarios
const scenariosContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'initialScenarios.ts'), 'utf8');
let cleanedScenarios = scenariosContent
  .replace(/import\s+[\s\S]*?from\s+['"].*?['"];/g, '')
  .replace(/export\s+const/g, 'const')
  .replace(/const\s+([A-Za-z0-9_]+)\s*:[^=]+=/g, 'const $1 =')
  .replace(/as\s+any\[\]/g, '');

const sandboxScenarios = {};
new Function('sandbox', cleanedScenarios + '\n' +
  'sandbox.INITIAL_CITY_ELEMENTS = INITIAL_CITY_ELEMENTS;\n' +
  'sandbox.INITIAL_FORUM_THREADS = INITIAL_FORUM_THREADS;\n' +
  'sandbox.INITIAL_BUDGET_ALLOCATION = INITIAL_BUDGET_ALLOCATION;\n' +
  'sandbox.INITIAL_SCENARIOS_META = INITIAL_SCENARIOS_META;\n' +
  'sandbox.INITIAL_AHP_CRITERIA = INITIAL_AHP_CRITERIA;\n' +
  'sandbox.INITIAL_AHP_MATRIX = INITIAL_AHP_MATRIX;\n'
)(sandboxScenarios);

fs.writeFileSync(path.join(outDir, 'city_elements.json'), JSON.stringify(sandboxScenarios.INITIAL_CITY_ELEMENTS));
fs.writeFileSync(path.join(outDir, 'forum_threads.json'), JSON.stringify(sandboxScenarios.INITIAL_FORUM_THREADS, null, 2));
fs.writeFileSync(path.join(outDir, 'budget_allocation.json'), JSON.stringify(sandboxScenarios.INITIAL_BUDGET_ALLOCATION, null, 2));
fs.writeFileSync(path.join(outDir, 'scenarios_meta.json'), JSON.stringify(sandboxScenarios.INITIAL_SCENARIOS_META, null, 2));
fs.writeFileSync(path.join(outDir, 'ahp_criteria.json'), JSON.stringify(sandboxScenarios.INITIAL_AHP_CRITERIA, null, 2));
fs.writeFileSync(path.join(outDir, 'ahp_matrix.json'), JSON.stringify(sandboxScenarios.INITIAL_AHP_MATRIX, null, 2));

console.log('Exported all initial scenarios and datasets successfully.');
