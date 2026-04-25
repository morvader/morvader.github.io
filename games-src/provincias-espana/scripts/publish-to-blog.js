#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const DEFAULT_DEST = path.resolve(root, '../../static/games/provincias-espana');
const dest = process.env.BLOG_GAME_DIR || DEFAULT_DEST;
const items = ['index.html', 'scripts', 'styles', 'vendor'];
const SELF = path.basename(__filename);

if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}
fs.mkdirSync(dest, { recursive: true });

for (const name of items) {
    const src = path.join(root, name);
    if (!fs.existsSync(src)) {
        console.error(`Missing source: ${src}`);
        process.exit(1);
    }
    fs.cpSync(src, path.join(dest, name), {
        recursive: true,
        filter: (s) => path.basename(s) !== SELF,
    });
}

console.log(`Published to ${dest}`);
