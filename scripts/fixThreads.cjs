const fs = require('fs');

const filePath = 'src/data/initialScenarios.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const additionalFields = `
    coordinates: [-77.01, -12.01],
    category: 'espacio_publico',
    sentiment: 'propuesta',
    downvotes: 0,
`;

content = content.replace(/comments: \[\]/g, `comments: [],\n    coordinates: [-77.01, -12.01],\n    category: 'espacio_publico',\n    sentiment: 'propuesta',\n    downvotes: 0`);

fs.writeFileSync(filePath, content);
console.log('Fixed threads');
