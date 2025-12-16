const fs = require('fs');
const path = require('path');

const WRITEUPS_ROOT = path.join(__dirname, 'public', 'writeups');
const OUTPUT_FILE = path.join(__dirname, 'public', 'writeups.json');

function buildDirectoryStructure(currentPath) {
    const structure = {};
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            structure[item] = buildDirectoryStructure(fullPath);
        } else if (stats.isFile() && item.endsWith('.md')) {
            const fileName = path.basename(item, '.md');
            structure[fileName] = null;
        }
    }
    return structure;
}
console.log('Building writeups.json...');
const data = buildDirectoryStructure(WRITEUPS_ROOT);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log('Done! Created public/writeups.json');