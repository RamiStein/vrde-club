const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

console.log('=== APLICANDO FIXES DE REDES, BOTONES DE GUARDADO Y SCROLL HORIZONTAL DE CARPETAS LUNARES ===');

// =========================================================================
// 1. TIENDA.HTML
// =========================================================================
let tienda = fs.readFileSync(path.join(rootDir, 'tienda.html'), 'utf8');

// Limpiar glyphs o espacios raros en el modal
tienda = tienda.replace(/<strong>📍\s*Dirección:<\/strong>/g, '<strong>📍 Dirección:</strong>');

// Mejorar renderizado de redes sociales en el modal de tienda.html
const cleanSocialTienda = `
      const redes = nodoData.redes || {};
      let socialHtml = '';
      if (redes.instagram && redes.instagram.trim() !== '') {
        const ig = redes.instagram.trim().replace('@', '');
        socialHtml += \`<a href="https://instagram.com/\${ig}" target="_blank" style="background: rgba(225,48,108,0.1); color: #E1306C; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"><i class="fab fa-instagram"></i> @\${ig}</a>\`;
      }
      if (redes.wspComunidad && redes.wspComunidad.trim() !== '') {
        const wsp = redes.wspComunidad.trim();
        socialHtml += \`<a href="\${wsp}" target="_blank" style="background: rgba(37,211,102,0.1); color: #16A34A; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"><i class="fab fa-whatsapp"></i> Comunidad WhatsApp</a>\`;
      }
      if (redes.facebook && redes.facebook.trim() !== '') {
        const fb = redes.facebook.trim();
        const fbUrl = fb.startsWith('http') ? fb : \`https://facebook.com/\${fb.replace('@', '')}\`;
        socialHtml += \`<a href="\${fbUrl}" target="_blank" style="background: rgba(24,119,242,0.1); color: #1877F2; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"><i class="fab fa-facebook"></i> \${fb}</a>\`;
      }
      document.getElementById('prof-social-badges').innerHTML = socialHtml;
`;

tienda = tienda.replace(/const redes = nodoData\.redes \|\| \{\};[\s\S]*?document\.getElementById\('prof-social-badges'\)\.innerHTML = socialHtml;/, cleanSocialTienda);

fs.writeFileSync(path.join(rootDir, 'tienda.html'), tienda, 'utf8');
console.log('✔ tienda.html actualizado con Facebook interactivo y limpio.');

// =========================================================================
// 2. ADMIN.HTML
// =========================================================================
let admin = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');

// 2a. Reemplazar barra de carpetas lunares con controles de flechas y scroll suave
const cleanExcelBar = `
        <!-- BARRA DE PESTAÑAS TIPO EXCEL / CARPETAS LUNARES -->
        <div class="excel-lunar-bar-wrapper">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #0F172A;">
              <i class="fas fa-folder-open" style="color: #6366F1;"></i>
              <span>Carpetas por Compra Lunar (Pestañas de Registro):</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <button onclick="scrollLunarTabs(-240)" style="background: #F1F5F9; border: 1px solid var(--border-color); border-radius: 50%; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; font-size: 11px;" title="Desplazar a la izquierda">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button onclick="scrollLunarTabs(240)" style="background: #F1F5F9; border: 1px solid var(--border-color); border-radius: 50%; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; font-size: 11px;" title="Desplazar a la derecha">
                <i class="fas fa-chevron-right"></i>
              </button>
              <div id="active-lunar-tag" class="vigente-status-tag">
                🟢 Compra Vigente (Activa)
              </div>
            </div>
          </div>
          <div class="excel-tabs-scroll" id="excel-lunar-tabs">
            <!-- Inyectado dinámicamente -->
          </div>
        </div>
`;
admin = admin.replace(/<!-- BARRA DE PESTAÑAS TIPO EXCEL \/ CARPETAS LUNARES -->[\s\S]*?<\/div>\s*<\/div>/, cleanExcelBar);

// 2b. Agregar botón de guardado en la tarjeta de "Redes Sociales y Comunidad"
const cleanSocialCard = `
          <!-- Redes Sociales del Nodo -->
          <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h4 style="margin-bottom: 16px; font-size: 16px; color: #0F172A; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-share-alt" style="color: #EC4899;"></i> Redes Sociales y Comunidad
              </h4>
              <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">
                Configura tus redes para que las familias de la comunidad puedan seguir las novedades y sumarse al canal barrial.
              </p>

              <div class="input-field-group">
                <label><i class="fab fa-instagram" style="color: #E1306C; margin-right: 4px;"></i> Instagram (@usuario o URL)</label>
                <input type="text" id="editInstagram" class="input-field" placeholder="Ej: vrde.escobar" oninput="updateSocialPreview()">
              </div>

              <div class="input-field-group">
                <label><i class="fab fa-whatsapp" style="color: #25D366; margin-right: 4px;"></i> Enlace Grupo Comunitario de WhatsApp</label>
                <input type="text" id="editWspComunidad" class="input-field" placeholder="https://chat.whatsapp.com/..." oninput="updateSocialPreview()">
              </div>

              <div class="input-field-group">
                <label><i class="fab fa-facebook" style="color: #1877F2; margin-right: 4px;"></i> Facebook / Otra Red</label>
                <input type="text" id="editFacebook" class="input-field" placeholder="Ej: https://facebook.com/vrde.escobar" oninput="updateSocialPreview()">
              </div>

              <div id="node-social-preview-badges" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                <!-- Badges dinámicos de redes -->
              </div>
            </div>

            <div>
              <button class="btn-checkout-cta" style="width: 100%; border-radius: var(--radius-sm); padding: 12px; margin-top: 16px; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="saveProfile()">
                <i class="fas fa-save"></i> Guardar Redes Sociales
              </button>
              <div id="social-save-msg" style="font-size: 12px; font-weight: 700; color: var(--primary); text-align: center; margin-top: 6px; min-height: 18px;"></div>
            </div>
          </div>
`;
admin = admin.replace(/<!-- Redes Sociales del Nodo -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, cleanSocialCard + '\n        </div>');

// 2c. En la función saveProfile() de admin.html, mostrar feedback en todos los mensajes de guardado
const cleanSaveProfile = `
    function scrollLunarTabs(offset) {
      const container = document.getElementById('excel-lunar-tabs');
      if (container) {
        container.scrollBy({ left: offset, behavior: 'smooth' });
      }
    }

    function updateSocialPreview() {
      const ig = (document.getElementById('editInstagram').value || '').trim();
      const wsp = (document.getElementById('editWspComunidad').value || '').trim();
      const fb = (document.getElementById('editFacebook').value || '').trim();

      let html = '';
      if (ig) html += \`<span style="background: rgba(225,48,108,0.1); color: #E1306C; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 15px;"><i class="fab fa-instagram"></i> @\${ig.replace('@','')}</span>\`;
      if (wsp) html += \`<span style="background: rgba(37,211,102,0.1); color: #16A34A; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 15px;"><i class="fab fa-whatsapp"></i> Comunidad</span>\`;
      if (fb) html += \`<span style="background: rgba(24,119,242,0.1); color: #1877F2; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 15px;"><i class="fab fa-facebook"></i> \${fb}</span>\`;

      const prev = document.getElementById('node-social-preview-badges');
      if (prev) prev.innerHTML = html;
    }

    function saveProfile() {
      const nombre = (document.getElementById('editNombre') ? document.getElementById('editNombre').value : '').trim();
      const direccion = (document.getElementById('editDireccion') ? document.getElementById('editDireccion').value : '').trim();
      const contacto = (document.getElementById('editContacto') ? document.getElementById('editContacto').value : '').trim();
      const diaEntrega = (document.getElementById('editDia') ? document.getElementById('editDia').value : '').trim();
      const imagen = (document.getElementById('editImagen') ? document.getElementById('editImagen').value : '').trim();
      const descripcion = (document.getElementById('editDescripcion') ? document.getElementById('editDescripcion').value : '').trim();
      const cbu = (document.getElementById('editCbu') ? document.getElementById('editCbu').value : '').trim();

      const instagram = (document.getElementById('editInstagram') ? document.getElementById('editInstagram').value : '').trim();
      const wspComunidad = (document.getElementById('editWspComunidad') ? document.getElementById('editWspComunidad').value : '').trim();
      const facebook = (document.getElementById('editFacebook') ? document.getElementById('editFacebook').value : '').trim();

      const existingNodos = LunarEngine.obtenerNodos();
      const currentData = existingNodos[CURRENT_REF] || {};

      LunarEngine.actualizarPerfilNodo(CURRENT_REF, {
        nombre: nombre || currentData.nombre,
        direccion: direccion || currentData.direccion,
        contacto: contacto || currentData.contacto,
        diaEntrega: diaEntrega || currentData.diaEntrega,
        imagen: imagen || currentData.imagen,
        descripcion: descripcion || currentData.descripcion,
        cbu: cbu || currentData.cbu,
        redes: {
          instagram: instagram !== undefined ? instagram : (currentData.redes?.instagram || ''),
          wspComunidad: wspComunidad !== undefined ? wspComunidad : (currentData.redes?.wspComunidad || ''),
          facebook: facebook !== undefined ? facebook : (currentData.redes?.facebook || '')
        }
      });

      const msg = document.getElementById('save-msg');
      if (msg) {
        msg.style.color = "var(--primary)";
        msg.innerText = "✓ ¡Cambios guardados con éxito en la red!";
        setTimeout(() => { msg.innerText = ""; }, 3500);
      }

      const socMsg = document.getElementById('social-save-msg');
      if (socMsg) {
        socMsg.innerText = "✓ ¡Redes sociales guardadas correctamente!";
        setTimeout(() => { socMsg.innerText = ""; }, 3500);
      }

      updateSocialPreview();
      loadDashboard();
    }
`;

admin = admin.replace(/function saveProfile\(\)\s*\{[\s\S]*?loadDashboard\(\);\s*\}/, cleanSaveProfile);

// 2d. CSS en admin.html para pestañas lunares fluidas y sin roturas
admin = admin.replace(
  /\.excel-tabs-scroll\s*\{[\s\S]*?\}/,
  `.excel-tabs-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding: 4px 4px 12px 4px;
      border-bottom: 2px solid #E2E8F0;
      white-space: nowrap;
      width: 100%;
      max-width: 100%;
      scroll-behavior: smooth;
      scrollbar-width: thin;
      scrollbar-color: var(--primary) #F1F5F9;
    }
    .excel-tabs-scroll::-webkit-scrollbar {
      height: 6px;
    }
    .excel-tabs-scroll::-webkit-scrollbar-thumb {
      background: #CBD5E1;
      border-radius: 4px;
    }
    .excel-tabs-scroll::-webkit-scrollbar-thumb:hover {
      background: var(--primary);
    }`
);

fs.writeFileSync(path.join(rootDir, 'admin.html'), admin, 'utf8');
console.log('✔ admin.html actualizado con flechas de scroll lunar y botón para guardar redes.');

// =========================================================================
// 3. LUNAR-STYLE.CSS
// =========================================================================
let css = fs.readFileSync(path.join(rootDir, 'lunar-style.css'), 'utf8');
css = css.replace(
  /\.excel-tabs-scroll\s*\{[\s\S]*?\}/,
  `.excel-tabs-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 4px 4px 12px 4px;
  border-bottom: 2px solid #E2E8F0;
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--primary) #F1F5F9;
}
.excel-tabs-scroll::-webkit-scrollbar {
  height: 6px;
}
.excel-tabs-scroll::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}
.excel-tabs-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}`
);
fs.writeFileSync(path.join(rootDir, 'lunar-style.css'), css, 'utf8');
console.log('✔ lunar-style.css actualizado.');
