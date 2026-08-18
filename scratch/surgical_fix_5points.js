const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

console.log('=== APLICANDO CORRECCIONES QUIRÚRGICAS A LAS 5 IMÁGENES ===');

// =========================================================================
// 1. TIENDA.HTML (Pestañas horizontales, quitar barra superior, header y modal)
// =========================================================================
let tienda = fs.readFileSync(path.join(rootDir, 'tienda.html'), 'utf8');

// Quitar la barra de cambiar nodo (node-pills)
tienda = tienda.replace(/<!-- Barra Superior de Navegación y Selector de Nodo -->[\s\S]*?<\/div>\s*<\/div>/, '');

// Arreglar CSS units rotas en tienda.html
tienda = tienda.replaceAll('14p20px', '14px 20px');
tienda = tienda.replaceAll('1psolid', '1px solid');
tienda = tienda.replaceAll('2psolid', '2px solid');
tienda = tienda.replaceAll('8p16px', '8px 16px');
tienda = tienda.replaceAll('6p12px', '8px 16px');
tienda = tienda.replaceAll('z-inde50', 'z-index: 50');
tienda = tienda.replaceAll('2p0 0', '2px 0 0');
tienda = tienda.replaceAll('fle1', 'flex: 1');

// Arreglar la cabecera limpia de la tienda
const cleanTiendaHeader = `
  <header class="shop-header" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; background: white; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 50;">
    <div style="display: flex; align-items: center; gap: 14px;">
      <button onclick="if(window.history.length > 1) { window.history.back() } else { location.href='lunar.html' }" style="background: #F1F5F9; color: #334155; border: 1px solid #CBD5E1; border-radius: 20px; padding: 8px 16px; font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; white-space: nowrap; flex-shrink: 0;" title="Volver a la página anterior">
        <i class="fas fa-arrow-left"></i> Volver
      </button>
      <div class="shop-brand" onclick="openNodeProfile()" style="cursor: pointer; display: flex; align-items: center; gap: 10px;">
        <div class="shop-brand-logo" id="shop-logo" style="width: 40px; height: 40px; border-radius: 50%; background: rgba(16,163,82,0.1); display: flex; align-items: center; justify-content: center; font-size: 20px; border: 2px solid var(--primary); flex-shrink: 0;">🌱</div>
        <div>
          <h2 class="shop-brand-name" id="shop-name" style="font-size: 17px; font-weight: 700; color: #0F172A; margin: 0; line-height: 1.2;">Nodo Escobar</h2>
          <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0 0; display: flex; align-items: center; gap: 4px;">
            <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i>
            <span id="shop-subheading">Ver dirección, día de entrega y contacto &rarr;</span>
          </p>
        </div>
      </div>
    </div>
    <a href="javascript:void(0)" onclick="openNodeProfile()" style="text-decoration: none; font-size: 12px; font-weight: 700; color: var(--primary); background: rgba(16,163,82,0.1); padding: 8px 16px; border-radius: 20px; border: 1px solid rgba(16,163,82,0.25); white-space: nowrap; flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px;">
      <i class="fas fa-info-circle"></i> Info del Nodo
    </a>
  </header>
`;
tienda = tienda.replace(/<header class="shop-header"[\s\S]*?<\/header>/, cleanTiendaHeader);

// En el título del banner hero de la tienda, quitar emoji duplicado (dejar solo el texto)
tienda = tienda.replace(
  `document.getElementById('shop-lunar-title').innerText = ciclo.nombre;`,
  `document.getElementById('shop-lunar-title').innerText = ciclo.nombre.replace(/^[^\wáéíóúÁÉÍÓÚñÑ]+/, '').trim();`
);

// Arreglar el modal de información del nodo (aire en botones y alineación)
const cleanModalNodeInfo = `
      <div style="background: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; text-align: left; font-size: 14px; margin-bottom: 16px;">
        <p style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;"><strong>📍 Dirección:</strong> <span id="prof-dir"></span></p>
        <p style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;"><strong>👤 Agente Responsable:</strong> <span id="prof-contacto"></span></p>
        <p style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;"><strong>🚚 Día de Entrega:</strong> <span id="prof-entrega"></span></p>
        <p style="margin-bottom: 0; display: flex; align-items: center; gap: 8px;"><strong>💳 Alias:</strong> <span id="prof-cbu" style="color: var(--primary); font-weight: bold;"></span></p>
      </div>

      <div id="prof-social-badges" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin: 16px 0;">
        <!-- Inyectado por JS -->
      </div>

      <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
        <a id="prof-admin-link" href="admin.html" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: #475569; text-decoration: none; font-size: 13px; font-weight: 600; background: #F8FAFC;">
          <i class="fas fa-lock"></i> Panel Gestor (PIN)
        </a>
        <button class="btn-checkout-cta" style="flex: 1; border-radius: var(--radius-sm); padding: 12px 16px; font-size: 14px;" onclick="closeModal('modal-node')">
          Entendido
        </button>
      </div>
`;
tienda = tienda.replace(/<div style="background: #F8FAFC; border: 1psolid[\s\S]*?<\/button>\s*<\/div>/, cleanModalNodeInfo);

fs.writeFileSync(path.join(rootDir, 'tienda.html'), tienda, 'utf8');
console.log('✔ tienda.html actualizado (sin barra superior, header alineado, modal con aire).');

// =========================================================================
// 2. LUNAR-STYLE.CSS (Scroll de pestañas y layout sidebar 270px)
// =========================================================================
let css = fs.readFileSync(path.join(rootDir, 'lunar-style.css'), 'utf8');

// Scrollbar horizontal de productos libre y suave
css = css.replace(
  /\.product-tabs-wrapper\s*\{[\s\S]*?\}/,
  `.product-tabs-wrapper {
  max-width: 1200px;
  margin: 0 auto 16px;
  padding: 0 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}`
);

css = css.replace(
  /\.product-tabs\s*\{[\s\S]*?\}/,
  `.product-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 6px 4px 12px 4px;
  white-space: nowrap;
  scrollbar-width: auto;
}`
);

css = css.replace(
  /\.tab-item\s*\{[\s\S]*?\}/,
  `.tab-item {
  flex-shrink: 0;
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  background: white;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}`
);

// Agregar las reglas fijas de layout sidebar a lunar-style.css
if (!css.includes('.admin-layout-wrapper')) {
  css += `

/* =================================================================
   LAYOUT DE BARRA LATERAL IZQUIERDA (ADMIN Y SUPER ADMIN)
   ================================================================= */
.admin-layout-wrapper {
  display: grid;
  grid-template-columns: 270px 1fr;
  min-height: calc(100vh - 65px);
  max-width: 1440px;
  margin: 0 auto;
}
@media (max-width: 960px) {
  .admin-layout-wrapper {
    grid-template-columns: 1fr;
  }
}
.admin-sidebar-nav {
  background: white;
  border-right: 1px solid var(--border-color);
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
@media (max-width: 960px) {
  .admin-sidebar-nav {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
  }
}
.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  width: 100%;
  white-space: nowrap;
}
.sidebar-btn:hover {
  background: #F8FAFC;
  color: var(--primary);
  border-color: #E2E8F0;
}
.sidebar-btn.active {
  background: rgba(16, 163, 82, 0.1);
  color: var(--primary);
  border-color: rgba(16, 163, 82, 0.25);
  font-weight: 700;
}
.sidebar-btn i {
  font-size: 16px;
  width: 20px;
  text-align: center;
}
.admin-main-view {
  padding: 24px;
  overflow-y: auto;
}
@media (max-width: 600px) {
  .admin-main-view {
    padding: 14px;
  }
}
`;
}

fs.writeFileSync(path.join(rootDir, 'lunar-style.css'), css, 'utf8');
console.log('✔ lunar-style.css actualizado con scroll horizontal fluido y layout 270px.');

// =========================================================================
// 3. ADMIN.HTML (Arreglar CSS de sidebar 270px y todas las unidades p rotas)
// =========================================================================
let admin = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');

admin = admin.replaceAll('10p18px', '10px 18px');
admin = admin.replaceAll('1psolid', '1px solid');
admin = admin.replaceAll('2psolid', '2px solid');
admin = admin.replaceAll('3psolid', '3px solid');
admin = admin.replaceAll('8p8p0 0', '8px 8px 0 0');
admin = admin.replaceAll('4p10px', '4px 10px');
admin = admin.replaceAll('140p1fr', '140px 1fr');
admin = admin.replaceAll('8p12px', '8px 12px');
admin = admin.replaceAll('8p14px', '8px 14px');
admin = admin.replaceAll('8p16px', '8px 16px');
admin = admin.replaceAll('6p8p12px', '6px 8px 12px');
admin = admin.replaceAll('20p0', '20px 0');
admin = admin.replaceAll('z-inde2', 'z-index: 2');
admin = admin.replaceAll('z-inde50', 'z-index: 50');
admin = admin.replaceAll('â€¢', '•');

// Insertar las reglas CSS de layout en admin.html
if (!admin.includes('.admin-layout-wrapper {')) {
  admin = admin.replace(
    '</style>',
    `
    /* LAYOUT CON SIDEBAR IZQUIERDA PARA PANEL DEL NODO */
    .admin-layout-wrapper {
      display: grid;
      grid-template-columns: 270px 1fr;
      min-height: calc(100vh - 65px);
      max-width: 1440px;
      margin: 0 auto;
    }
    @media (max-width: 960px) {
      .admin-layout-wrapper {
        grid-template-columns: 1fr;
      }
    }
    .admin-sidebar-nav {
      background: white;
      border-right: 1px solid var(--border-color);
      padding: 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    @media (max-width: 960px) {
      .admin-sidebar-nav {
        border-right: none;
        border-bottom: 1px solid var(--border-color);
        flex-direction: row;
        overflow-x: auto;
        padding: 10px;
      }
    }
    .sidebar-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      background: transparent;
      color: #475569;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;
      width: 100%;
      white-space: nowrap;
    }
    .sidebar-btn:hover {
      background: #F8FAFC;
      color: var(--primary);
      border-color: #E2E8F0;
    }
    .sidebar-btn.active {
      background: rgba(16, 163, 82, 0.1);
      color: var(--primary);
      border-color: rgba(16, 163, 82, 0.25);
      font-weight: 700;
    }
    .sidebar-btn i {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }
    .admin-main-view {
      padding: 24px;
      overflow-y: auto;
    }
    @media (max-width: 600px) {
      .admin-main-view {
        padding: 14px;
      }
    }
  </style>`
  );
}

fs.writeFileSync(path.join(rootDir, 'admin.html'), admin, 'utf8');
console.log('✔ admin.html actualizado con sidebar vertical 270px.');

// =========================================================================
// 4. SUPERADMIN.HTML (Corregir padding del contador y â€¢ en footers)
// =========================================================================
let sp = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

sp = sp.replaceAll('16p20px', '16px 20px');
sp = sp.replaceAll('8p12px', '8px 12px');
sp = sp.replaceAll('â€¢', '•');

fs.writeFileSync(path.join(rootDir, 'superadmin.html'), sp, 'utf8');
console.log('✔ superadmin.html corregido (contador de pedidos y footer con •).');

// =========================================================================
// 5. SINCRONIZACIÓN Y DISTRIBUCIÓN
// =========================================================================
const origDist = path.join(rootDir, 'dist');
const easyDist = path.join(rootDir, 'DESPLEGAR_A_NETLIFY');

['superadmin.html', 'admin.html', 'lunar.html', 'tienda.html', 'index.html', 'lunar-engine.js', 'app.js', 'lunar-style.css', 'style.css', '_redirects'].forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(origDist, f));
    fs.copyFileSync(p, path.join(easyDist, f));
  }
});

console.log('✔ Todos los archivos sincronizados a dist y DESPLEGAR_A_NETLIFY.');
