const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'initialScenarios.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix Roles
content = content.replace(/role: 'comunidad'/g, "role: 'residente'");
content = content.replace(/role: 'municipalidad'/g, "role: 'administrador'");
content = content.replace(/role: 'experto'/g, "role: 'facilitador'");

// Fix Comments
content = content.replace(/comments: \d+/g, "comments: []");

// Fix Budget Allocation
const badBudgetStr = `export const INITIAL_BUDGET_ALLOCATION: BudgetVoteAllocation = {
  vivienda_social: 30,
  espacio_publico: 25,
  infraestructura_vial: 20,
  equipamiento_servicios: 25
};`;

const goodBudgetStr = `export const INITIAL_BUDGET_ALLOCATION: BudgetVoteAllocation = {
  vivienda: 25,
  areas_verdes: 20,
  salud_cuidados: 15,
  educacion_cultura: 15,
  movilidad: 15,
  empleo_comercio: 10
};`;
content = content.replace(badBudgetStr, goodBudgetStr);

fs.writeFileSync(filePath, content);
