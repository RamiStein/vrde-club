const fs = require('fs');

let html = fs.readFileSync('gas/index.html', 'utf8');

let newHtml = '';
let inBackticks = false;
let currentString = '';

// Very simple transpiler: this is dangerous if not perfect, but let's just do manual replacements on known blocks.
// Wait, I will just rewrite index.html with NO backticks.
