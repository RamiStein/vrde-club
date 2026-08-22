const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

const lines = html.split('\n');
let newHtml = '';

for (let i=0; i<lines.length; i++) {
  if (lines[i].includes('function initApp() {')) {
    newHtml += `    function switchView(viewId) {
      document.getElementById('landing-view').classList.add('hidden');
      document.getElementById('shop-view').classList.add('hidden');
      document.getElementById('admin-panel').classList.add('hidden');
      document.getElementById(viewId).classList.remove('hidden');
    }\n\n` + lines[i] + '\n';
  } else if (lines[i].includes("document.getElementById('landing-view').classList.remove('hidden');")) {
    newHtml += "      switchView('landing-view');\n";
  } else if (lines[i].includes("document.getElementById('shop-view').classList.remove('hidden');")) {
    newHtml += "      switchView('shop-view');\n";
  } else if (lines[i].includes("document.getElementById('admin-panel').classList.remove('hidden');")) {
    newHtml += "      switchView('admin-panel');\n";
  } else if (lines[i].includes('window.location.href = APP_URL;')) {
    newHtml += "      CURRENT_REF = null; initApp();\n";
  } else {
    newHtml += lines[i] + '\n';
  }
}

fs.writeFileSync('gas/index.html', newHtml, 'utf8');
console.log('Fixed SPA routing');
