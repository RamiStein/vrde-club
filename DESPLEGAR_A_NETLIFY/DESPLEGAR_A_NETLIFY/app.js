document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ANIMACIONES DE APARICIÓN (OPTIMIZADAS: INMEDIATAS EN MOBILE, PRECARGADAS EN DESKTOP) ---
    const fadeElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    const isMobileViewport = window.innerWidth <= 768;

    if (isMobileViewport) {
        // En celulares todo visible de inmediato: 0 lag y 0 recuadros en blanco
        fadeElements.forEach(el => el.classList.add('visible'));
    } else {
        const observerOptions = {
            root: null,
            rootMargin: '200px 0px', // Precargar con 200px de anticipación
            threshold: 0.05
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    }


    // --- 2. LÍNEA DE TIEMPO Y NAVEGACIÓN ADAPTATIVA (OPTIMIZADO CON RAF Y CACHE) ---
    const nave = document.getElementById('timeline-nave');
    const progress = document.getElementById('timeline-progress');
    const sections = Array.from(document.querySelectorAll('section'));
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarEl = document.getElementById('navbar');
    const navTitleEl = document.getElementById('nav-brand-title');
    const navSubEl = document.getElementById('nav-brand-sub');
    const navLinksBox = document.getElementById('nav-links-container');

    let sectionOffsets = [];
    let isNavbarScrolled = null; // evita forzar repaints si el estado no cambió
    let currentActiveNavId = '';

    function cacheSectionOffsets() {
        sectionOffsets = sections.map(sec => ({
            id: sec.getAttribute('id'),
            top: sec.offsetTop - 180
        }));
    }
    cacheSectionOffsets();

    function onScrollFrame() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // 1. Timeline
        if (scrollHeight > 0 && progress && nave) {
            let scrollPercent = (scrollTop / scrollHeight) * 100;
            scrollPercent = Math.max(0, Math.min(scrollPercent, 98));
            progress.style.height = `${scrollPercent}%`;
            nave.style.top = `${scrollPercent}%`;

            if (scrollPercent > 90) {
                nave.style.backgroundColor = '#FFF';
                nave.style.color = '#10A352';
                nave.style.borderColor = '#10A352';
            } else {
                nave.style.backgroundColor = '#10A352';
                nave.style.color = '#FFF';
                nave.style.borderColor = '#FFF';
            }
        }

        // 2. Resaltado de menú activo (usando cache sin layout thrashing)
        let activeId = '';
        for (let i = sectionOffsets.length - 1; i >= 0; i--) {
            if (scrollTop >= sectionOffsets[i].top) {
                activeId = sectionOffsets[i].id;
                break;
            }
        }

        if (activeId !== currentActiveNavId) {
            currentActiveNavId = activeId;
            navLinks.forEach(link => {
                const target = link.getAttribute('href');
                if (target === `#${activeId}` && activeId !== 'sumate') {
                    link.classList.add('text-vrde-brand', 'font-bold');
                } else {
                    link.classList.remove('text-vrde-brand', 'font-bold');
                }
            });
        }

        // 3. Navbar adaptativo (solo muta el DOM cuando cruza el umbral)
        const shouldBeScrolled = scrollTop > 70;
        if (shouldBeScrolled !== isNavbarScrolled) {
            isNavbarScrolled = shouldBeScrolled;
            if (shouldBeScrolled) {
                if (navbarEl) {
                    navbarEl.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbarEl.style.borderBottom = '1px solid #E2E8F0';
                    navbarEl.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                }
                if (navTitleEl) navTitleEl.style.color = '#10A352';
                if (navSubEl) navSubEl.style.color = '#10A352';
                if (navLinksBox) {
                    navLinksBox.classList.remove('text-gray-200');
                    navLinksBox.classList.add('text-gray-700');
                }
            } else {
                if (navbarEl) {
                    navbarEl.style.background = 'rgba(11, 17, 32, 0.75)';
                    navbarEl.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                    navbarEl.style.boxShadow = 'none';
                }
                if (navTitleEl) navTitleEl.style.color = '#FFFFFF';
                if (navSubEl) navSubEl.style.color = '#34D399';
                if (navLinksBox) {
                    navLinksBox.classList.remove('text-gray-700');
                    navLinksBox.classList.add('text-gray-200');
                }
            }
        }
    }

    let isTicking = false;
    function requestTick() {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                onScrollFrame();
                isTicking = false;
            });
            isTicking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', () => {
        cacheSectionOffsets();
        requestTick();
    }, { passive: true });
    setTimeout(() => {
        cacheSectionOffsets();
        onScrollFrame();
    }, 100);


    // --- 3. EXPLORADOR DE NODOS INTERACTIVO (DINÁMICO CON LUNAR ENGINE) ---
    function renderExploradorNodos() {
        const tabsContainer = document.getElementById('home-node-tabs-container');
        const detailsContainer = document.getElementById('node-details');
        if (!tabsContainer || !detailsContainer) return;

        const nodosActivos = (typeof LunarEngine !== 'undefined') 
            ? LunarEngine.obtenerNodos(true) 
            : {};
        const nodeKeys = Object.keys(nodosActivos);

        if (nodeKeys.length === 0) {
            tabsContainer.innerHTML = '';
            detailsContainer.innerHTML = `
                <div class="text-center py-10 text-gray-500 flex flex-col items-center justify-center h-full">
                    <i class="fas fa-moon text-3xl text-gray-300 mb-3 block"></i>
                    <h4 class="font-tech text-lg font-bold text-gray-700">No hay nodos activos en este momento</h4>
                    <p class="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Pronto abriremos nuevos puntos comunitarios de entrega en tu zona.</p>
                    <a href="#crea-tu-nodo" class="inline-block mt-4 text-xs font-bold text-vrde-brand border border-vrde-brand/30 bg-vrde-brand/10 px-4 py-2 rounded-full hover:bg-vrde-brand hover:text-white transition-all">
                        🌱 Abrí un Nodo en tu Barrio
                    </a>
                </div>
            `;
            return;
        }

        let tabsHtml = '';
        nodeKeys.forEach((k, idx) => {
            const n = nodosActivos[k];
            const label = n.nombre.replace(/^Nodo\s+/i, '');
            tabsHtml += `<button class="node-tab ${idx === 0 ? 'active' : ''}" data-node="${k}">${label}</button>`;
        });
        tabsContainer.innerHTML = tabsHtml;

        function renderNodeDetail(nodeId) {
            const data = nodosActivos[nodeId];
            if (!data) return;
            
            const isPaused = data.pausado || data.activo === false;
            const statusText = isPaused ? 'En Reposo' : 'Activo';
            const statusColor = isPaused ? 'text-orange-600 bg-orange-100' : 'text-green-600 bg-green-100';
            
            const slots = (data.slots && Array.isArray(data.slots) && data.slots.length > 0) 
                ? data.slots 
                : ['Armado de Pedidos', 'Recepción de Alimentos'];
                
            const slotsHtml = slots.map(slot => 
                `<span class="text-xs font-sans bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"><i class="fas fa-check-circle text-vrde-brand mr-1"></i>${slot}</span>`
            ).join('');

            const agenteName = data.contacto || data.responsable || (data.vrdedores && data.vrdedores[0]?.nombre) || 'Coordinador del Nodo';

            detailsContainer.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-tech text-2xl font-bold text-gray-800">${data.nombre}</h4>
                        <p class="text-gray-500 text-sm mt-1"><i class="fas fa-user-circle mr-1"></i> Agente / Responsable: ${agenteName}</p>
                        <p class="text-gray-400 text-xs mt-0.5"><i class="fas fa-map-marker-alt mr-1"></i> ${data.direccion || 'Punto comunitario de entrega'}</p>
                    </div>
                    <span class="text-xs font-bold px-3 py-1 rounded-full ${statusColor}">${statusText}</span>
                </div>
                <p class="text-gray-600 mb-6 line-clamp-3 text-sm">${data.descripcion || 'Punto oficial de acopio, armado y distribución agroecológica comunitaria.'}</p>
                <div class="mb-6">
                    <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Work Slots Activos</p>
                    <div class="flex flex-wrap gap-2">
                        ${slotsHtml}
                    </div>
                </div>
                <div class="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span class="text-sm font-tech text-gray-500"><i class="far fa-calendar-alt mr-1"></i> ${data.diaEntrega || 'Entrega semanal'}</span>
                    <div class="flex items-center gap-2">
                        <a href="admin.html?ref=${data.id || nodeId}" class="text-xs text-gray-500 hover:text-gray-800 font-medium px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1">
                            <i class="fas fa-lock text-[10px]"></i> Panel Gestor
                        </a>
                        <a href="tienda.html?ref=${data.id || nodeId}" class="btn-primary bg-vrde-brand hover:bg-vrde-dark text-white text-xs px-4 py-2 rounded-full font-bold shadow-md shadow-vrde-brand/20 transition-all flex items-center gap-1">
                            <i class="fas fa-shopping-basket"></i> Comprar en este Nodo
                        </a>
                    </div>
                </div>
            `;
        }

        const tabButtons = tabsContainer.querySelectorAll('.node-tab');
        tabButtons.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabButtons.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                detailsContainer.style.opacity = 0;
                setTimeout(() => {
                    renderNodeDetail(e.currentTarget.dataset.node);
                    detailsContainer.style.opacity = 1;
                }, 150);
            });
        });

        if (nodeKeys.length > 0) {
            renderNodeDetail(nodeKeys[0]);
        }
    }

    renderExploradorNodos();


    // --- 4. CALCULADORA ECONÓMICA ---
    const budgetSlider = document.getElementById('budget-slider');
    const budgetDisplay = document.getElementById('budget-display');
    const savingsDisplay = document.getElementById('savings-display');

    if (budgetSlider) {
        budgetSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            budgetDisplay.textContent = val.toLocaleString('es-AR');
            
            const base = 30;
            const extra = (val / 150000) * 15;
            savingsDisplay.textContent = Math.round(base + extra);
        });
    }

    // --- 5. FASE LUNAR DINÁMICA ---
    function updateMoonPhase() {
        const moonElement = document.getElementById('moon-phase-hero');
        if (moonElement && typeof LunarEngine !== 'undefined') {
            const ciclo = LunarEngine.obtenerCicloActual();
            const shadow = moonElement.querySelector('.moon-shadow');
            if (shadow) {
                const pct = ciclo.porcentajeCiclo;
                if (pct <= 50) {
                    shadow.style.width = `${100 - (pct * 2)}%`;
                    shadow.style.right = '0';
                    shadow.style.left = 'auto';
                } else {
                    shadow.style.width = `${((pct - 50) * 2)}%`;
                    shadow.style.left = '0';
                    shadow.style.right = 'auto';
                }
            }
        }
    }
    updateMoonPhase();

});

// --- 6. MANEJO DE MODALES GLOBAL Y POSTULACIONES ---
const modal = document.getElementById('action-modal');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');

const modalData = {
    'consumidor': {
        title: 'Unirme a una Compra',
        icon: 'fa-shopping-basket',
        color: 'text-blue-600',
        content: `
            <p class="text-gray-600 mb-6 text-sm">Elegí tu nodo más cercano para ingresar directamente a la tienda comunitaria y participar del ciclo lunar activo.</p>
            <div class="space-y-3">
                <a href="lunar.html" class="w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm">
                    <i class="fas fa-map-marker-alt"></i> Ver Nodos Activos en la Red
                </a>
                <a href="tienda.html" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-center text-sm block">
                    Ver Catálogo General
                </a>
            </div>
        `
    },
    'nodo': {
        title: 'Abrir un Nodo Almacén en tu Barrio',
        icon: 'fa-store-alt',
        color: 'text-emerald-600',
        content: `
            <p class="text-gray-600 mb-6 text-sm">Completá los datos de tu espacio y nos pondremos en contacto para coordinar la apertura oficial de tu punto de acopio.</p>
            <form class="space-y-4 text-left" onsubmit="event.preventDefault(); submitPostulacionNodo(this);">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tu Nombre y Apellido *</label>
                    <input type="text" id="post-nodo-nombre" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: Carolina Gómez" required>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp de Contacto *</label>
                        <input type="tel" id="post-nodo-tel" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: 11 4829 1029" required>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Localidad / Barrio *</label>
                        <input type="text" id="post-nodo-barrio" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: Tigre / Villa Crespo" required>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Dirección Aproximada</label>
                    <input type="text" id="post-nodo-dir" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: Av. Cazón 850">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tipo de Espacio</label>
                        <select id="post-nodo-tipo" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm bg-white">
                            <option value="Garaje / Cochera">Garaje / Cochera amplia</option>
                            <option value="Local Comercial">Local Comercial / Showroom</option>
                            <option value="Taller / Galpón">Taller / Galpón</option>
                            <option value="Espacio Comunitario / Club">Espacio Comunitario / Club</option>
                            <option value="Casa Particular">Casa Particular con patio cubierto</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Metros Cuadrados Aprox.</label>
                        <input type="text" id="post-nodo-m2" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: 20 m²">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Comentarios o Motivación (Opcional)</label>
                    <textarea id="post-nodo-notas" rows="2" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Contanos brevemente sobre tu barrio o interés en la agroecología"></textarea>
                </div>
                <button type="submit" class="w-full btn-primary bg-emerald-500 hover:bg-emerald-600 border-none py-3.5 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2 mt-4">
                    <i class="fab fa-whatsapp text-lg"></i> ENVIAR POSTULACIÓN A VRDE CLUB
                </button>
            </form>
        `
    },
    'productor': {
        title: 'Sumarme como Productor / Vendedor',
        icon: 'fa-tractor',
        color: 'text-emerald-600',
        content: `
            <p class="text-gray-600 mb-6 text-sm">Ofrecé tus alimentos agroecológicos directo a nuestra red de nodos barriales y compras comunitarias sin intermediarios.</p>
            <form class="space-y-4 text-left" onsubmit="event.preventDefault(); submitPostulacionProductor(this);">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nombre del Productor / Proyecto *</label>
                    <input type="text" id="post-prod-nombre" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: Finca Las Acacias / Molino San José" required>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp de Contacto *</label>
                        <input type="tel" id="post-prod-tel" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: 11 4829 1029" required>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Ubicación / Provincia *</label>
                        <input type="text" id="post-prod-loc" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: San Pedro, Bs. As. / Misiones" required>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tipo de Alimentos que Producís *</label>
                    <input type="text" id="post-prod-alimentos" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Ej: Harinas biodinámicas, yerba orgánica, legumbres, miel" required>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Prácticas Productivas</label>
                    <select id="post-prod-tipo" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm bg-white">
                        <option value="Agroecológico sin químicos">Agroecológico sin químicos</option>
                        <option value="Orgánico Certificado">Orgánico Certificado</option>
                        <option value="Biodinámico / Regenerativo">Biodinámico / Regenerativo</option>
                        <option value="En transición agroecológica">En transición agroecológica</option>
                        <option value="Artesanal / Cooperativa familiar">Artesanal / Cooperativa familiar</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Detalles de Producción y Volúmenes</label>
                    <textarea id="post-prod-notas" rows="2" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vrde-brand outline-none text-sm" placeholder="Contanos sobre tu escala de cosecha, empaque y disponibilidad de acopio"></textarea>
                </div>
                <button type="submit" class="w-full btn-primary bg-emerald-600 hover:bg-emerald-700 border-none py-3.5 rounded-xl font-bold text-white shadow-lg shadow-emerald-600/20 text-sm flex items-center justify-center gap-2 mt-4">
                    <i class="fab fa-whatsapp text-lg"></i> ENVIAR PROPUESTA PRODUCTIVA
                </button>
            </form>
        `
    },
    'transporte': {
        title: 'Ofrecer Transporte',
        icon: 'fa-truck',
        color: 'text-purple-600',
        content: `
            <p class="text-gray-600 mb-6 text-sm">Integrá tu vehículo a la red logística En Conjunto y generá un impacto positivo.</p>
            <form class="space-y-4" onsubmit="event.preventDefault(); alert('Gracias por sumar tu vehículo a la red. Nos pondremos en contacto.'); closeModal();">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Tipo de Vehículo</label>
                    <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vrde-brand outline-none">
                        <option>Camioneta Mediana (Fiorino/Kangoo)</option>
                        <option>Camioneta Grande (Transit/Sprinter)</option>
                        <option>Camión Liviano</option>
                    </select>
                </div>
                <button type="submit" class="w-full btn-primary bg-purple-500 hover:bg-purple-600 border-none mt-4">Ofrecer Vehículo</button>
            </form>
        `
    },
    'difusor': {
        title: 'Ser Difusor',
        icon: 'fa-bullhorn',
        color: 'text-vrde-brand',
        content: `
            <p class="text-gray-600 mb-6 text-sm">Ayudá a expandir la red organizando y comunicando las compras en tu comunidad.</p>
            <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Bienvenido al equipo de difusión!'); closeModal();">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Nombre de Organización o Familia</label>
                    <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vrde-brand outline-none" required>
                </div>
                <button type="submit" class="w-full btn-primary mt-4">Quiero Ser Difusor</button>
            </form>
        `
    }
};

// Postulaciones por WhatsApp
window.submitPostulacionNodo = function(form) {
    const nombre = document.getElementById('post-nodo-nombre')?.value || '';
    const tel = document.getElementById('post-nodo-tel')?.value || '';
    const barrio = document.getElementById('post-nodo-barrio')?.value || '';
    const dir = document.getElementById('post-nodo-dir')?.value || '';
    const tipo = document.getElementById('post-nodo-tipo')?.value || '';
    const m2 = document.getElementById('post-nodo-m2')?.value || '';
    const notas = document.getElementById('post-nodo-notas')?.value || '';

    const msg = `🌿 *POSTULACIÓN NODO ALMACÉN - VRDE CLUB*\n\n` +
                `👤 *Nombre:* ${nombre}\n` +
                `📱 *WhatsApp:* ${tel}\n` +
                `📍 *Barrio/Localidad:* ${barrio}\n` +
                `🏠 *Dirección:* ${dir || 'A convenir'}\n` +
                `📐 *Espacio:* ${tipo} (~${m2 || '15'} m²)\n` +
                `💬 *Motivación:* ${notas || 'Quiero abrir un nodo en mi barrio.'}\n\n` +
                `_Enviado desde el portal Vrde Club_`;

    const wspUrl = `https://wa.me/5491127452476?text=${encodeURIComponent(msg)}`;
    window.open(wspUrl, '_blank');
    closeModal();
};

window.submitPostulacionProductor = function(form) {
    const nombre = document.getElementById('post-prod-nombre')?.value || '';
    const tel = document.getElementById('post-prod-tel')?.value || '';
    const loc = document.getElementById('post-prod-loc')?.value || '';
    const alimentos = document.getElementById('post-prod-alimentos')?.value || '';
    const tipo = document.getElementById('post-prod-tipo')?.value || '';
    const notas = document.getElementById('post-prod-notas')?.value || '';

    const msg = `🚜 *POSTULACIÓN PRODUCTOR/VENDEDOR - VRDE CLUB*\n\n` +
                `🌱 *Proyecto:* ${nombre}\n` +
                `📱 *WhatsApp:* ${tel}\n` +
                `📍 *Ubicación:* ${loc}\n` +
                `🌾 *Alimentos:* ${alimentos}\n` +
                `🍃 *Prácticas:* ${tipo}\n` +
                `📦 *Detalles:* ${notas || 'Quiero comercializar en la red lunar.'}\n\n` +
                `_Enviado desde el portal Vrde Club_`;

    const wspUrl = `https://wa.me/5491127452476?text=${encodeURIComponent(msg)}`;
    window.open(wspUrl, '_blank');
    closeModal();
};

// --- ONBOARDING Y ACCESO A LA COMPRA LUNAR ---
window.handleIngresoCompraLunar = function() {
    if (typeof LunarEngine !== 'undefined') {
        const destino = LunarEngine.obtenerDestinoCompraLunar();
        if (destino.logueado) {
            if (destino.tieneNodo && destino.nodoId) {
                window.location.href = `tienda.html?ref=${encodeURIComponent(destino.nodoId)}`;
            } else {
                window.location.href = 'lunar.html';
            }
            return;
        }
    }
    openOnboardingModal();
};

window.openOnboardingModal = function() {
    const modalEl = document.getElementById('modal-onboarding-login');
    if (!modalEl) {
        window.location.href = 'lunar.html';
        return;
    }
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex');
    setTimeout(() => {
        modalEl.classList.remove('opacity-0');
        const inputNombre = document.getElementById('onboarding-user-nombre');
        if (inputNombre) inputNombre.focus();
    }, 10);
};

window.closeOnboardingModal = function() {
    const modalEl = document.getElementById('modal-onboarding-login');
    if (!modalEl) return;
    modalEl.classList.add('opacity-0');
    setTimeout(() => {
        modalEl.classList.add('hidden');
        modalEl.classList.remove('flex');
    }, 250);
};

window.submitOnboardingLogin = function() {
    const nombreInput = document.getElementById('onboarding-user-nombre');
    const telInput = document.getElementById('onboarding-user-tel');
    const nombre = nombreInput ? nombreInput.value.trim() : '';
    const tel = telInput ? telInput.value.trim() : '';

    if (!tel || tel.replace(/\D/g, '').length < 6) {
        alert('Por favor ingresá un número de teléfono o WhatsApp válido.');
        return;
    }

    if (typeof LunarEngine !== 'undefined') {
        const res = LunarEngine.iniciarSesionUsuario(tel, nombre);
        if (res.ok) {
            closeOnboardingModal();
            if (res.tieneNodo && res.perfil.nodoId) {
                window.location.href = `tienda.html?ref=${encodeURIComponent(res.perfil.nodoId)}`;
            } else {
                window.location.href = 'lunar.html';
            }
            return;
        } else {
            alert(res.mensaje || 'Error al ingresar.');
            return;
        }
    }

    window.location.href = 'lunar.html';
};

window.openModal = function(type) {
    const data = modalData[type];
    if(!data) return;

    modalBody.innerHTML = `
        <div class="text-center mb-6">
            <i class="fas ${data.icon} text-4xl ${data.color} mb-4"></i>
            <h2 class="font-tech text-3xl font-bold text-gray-800">${data.title}</h2>
        </div>
        ${data.content}
    `;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
};

window.closeModal = function() {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};
}

// Close on backdrop click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
