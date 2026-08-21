const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

// 1. Extract CSS
const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>') + '</style>'.length;
const cssContent = html.substring(styleStart, styleEnd);
fs.writeFileSync('gas/CSS.html', cssContent, 'utf8');

// 2. Extract Landing
const landingStart = html.indexOf('<div id="landing-view">');
const shopStart = html.indexOf('<div id="shop-view" class="hidden">');
const landingContent = html.substring(landingStart, shopStart).trim();
fs.writeFileSync('gas/Landing.html', landingContent, 'utf8');

// 3. Extract Shop
const adminStart = html.indexOf('<div id="admin-panel" class="hidden">');
const shopContent = html.substring(shopStart, adminStart).trim();
fs.writeFileSync('gas/Shop.html', shopContent, 'utf8');

// 4. Extract Admin
const scriptStart1 = html.indexOf('<script>');
const adminContent = html.substring(adminStart, scriptStart1).trim();
fs.writeFileSync('gas/Admin.html', adminContent, 'utf8');

// 5. Extract JS
const jsContent = html.substring(scriptStart1, html.lastIndexOf('</body>')).trim();
fs.writeFileSync('gas/JS.html', jsContent, 'utf8');

// 6. Create new index.html
const newIndex = `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!-- Estilos -->
    <?!= include('CSS'); ?>
  </head>
  <body>
    <!-- Pantalla de carga -->
    <div id="loader" class="loader-overlay">
      <div class="spinner"></div>
      <p id="loader-text" style="margin-top:20px; font-weight:600; font-size:16px;">Sincronizando con la luna...</p>
    </div>

    <!-- Componentes de Vistas -->
    <?!= include('Landing'); ?>
    <?!= include('Shop'); ?>
    <?!= include('Admin'); ?>

    <!-- LÃ³gica de la aplicaciÃ³n -->
    <?!= include('JS'); ?>
  </body>
</html>`;

fs.writeFileSync('gas/index.html', newIndex, 'utf8');
console.log('Split successful');
