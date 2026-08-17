document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ANIMACIONES FADE-IN (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    fadeElements.forEach(el => observer.observe(el));


    // --- 2. LÍNEA DE TIEMPO (TIMELINE) ---
    const nave = document.getElementById('timeline-nave');
    const progress = document.getElementById('timeline-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateTimeline() {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollHeight <= 0) return;

        let scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollPercent = Math.max(0, Math.min(scrollPercent, 98));
        
        progress.style.height = `${scrollPercent}%`;
        nave.style.top = `${scrollPercent}%`;

        // Efecto final de la nave
        if(scrollPercent > 90) {
            nave.style.backgroundColor = '#FFF';
            nave.style.color = '#10A352';
            nave.style.borderColor = '#10A352';
        } else {
            nave.style.backgroundColor = '#10A352';
            nave.style.color = '#FFF';
            nave.style.borderColor = '#FFF';
        }

        // Resaltado del menú
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // offset
            if (scrollTop >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-vrde-brand', 'font-bold');
            if (link.getAttribute('href') === `#${currentSectionId}` && currentSectionId !== 'sumate') {
                link.classList.add('text-vrde-brand', 'font-bold');
            }
        });
    }

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    setTimeout(updateTimeline, 100);


    // --- 3. EXPLORADOR DE NODOS INTERACTIVO ---
    const nodeData = {
        'escobar': {
            title: 'Nodo Escobar',
            agent: 'Gonzalo',
            status: 'Activo',
            days: 'Martes y Viernes',
            desc: 'El pulmón de zona norte. Especializado en el armado rápido de cajas frescas y conexión directa con rutas provinciales.',
            slots: ['Armado de Pedidos', 'Recepción Transporte']
        },
        'lomaverde': {
            title: 'Nodo Loma Verde',
            agent: 'Agustina',
            status: 'Activo',
            days: 'Miércoles',
            desc: 'Nodo de gran capacidad de acopio para compras lunares. Espacio rodeado de verde, con enfoque en conservación.',
            slots: ['Conservación', 'Atención Comunitaria']
        },
        'lalucila': {
            title: 'Nodo La Lucila',
            agent: 'Martín',
            status: 'Próxima Apertura',
            days: 'Sábados',
            desc: 'Acercando la red fractal a la ciudad. Funciona como punto de encuentro vecinal para retiros express.',
            slots: ['Difusión Local', 'Entrega Rápida']
        },
        'vicentelopez': {
            title: 'Nodo Vicente López',
            agent: 'Laura',
            status: 'Activo',
            days: 'Jueves',
            desc: 'Enlace vital urbano. Gran volumen de consumo y fuerte red de consumidores organizados.',
            slots: ['Gestión de Stock', 'Difusión']
        }
    };

    const nodeTabs = document.querySelectorAll('.node-tab');
    const nodeDetails = document.getElementById('node-details');

    function renderNode(nodeId) {
        const data = nodeData[nodeId];
        const statusColor = data.status === 'Activo' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100';
        
        const slotsHtml = data.slots.map(slot => 
            `<span class="text-xs font-sans bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"><i class="fas fa-check-circle text-vrde-brand mr-1"></i>${slot}</span>`
        ).join('');

        nodeDetails.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-tech text-2xl font-bold text-gray-800">${data.title}</h4>
                    <p class="text-gray-500 text-sm mt-1"><i class="fas fa-user-circle mr-1"></i> Agente: ${data.agent}</p>
                </div>
                <span class="text-xs font-bold px-3 py-1 rounded-full ${statusColor}">${data.status}</span>
            </div>
            <p class="text-gray-600 mb-6 line-clamp-3">${data.desc}</p>
            <div class="mb-6">
                <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Work Slots Activos</p>
                <div class="flex flex-wrap gap-2">
                    ${slotsHtml}
                </div>
            </div>
            <div class="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span class="text-sm font-tech text-gray-500"><i class="far fa-calendar-alt mr-1"></i> Días: ${data.days}</span>
                <div class="flex items-center gap-2">
                    <a href="admin.html?ref=${nodeId}" class="text-xs text-gray-500 hover:text-gray-800 font-medium px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1">
                        <i class="fas fa-lock text-[10px]"></i> Panel Gestor
                    </a>
                    <a href="tienda.html?ref=${nodeId}" class="btn-primary bg-vrde-brand hover:bg-vrde-dark text-white text-xs px-4 py-2 rounded-full font-bold shadow-md shadow-vrde-brand/20 transition-all flex items-center gap-1">
                        <i class="fas fa-shopping-basket"></i> Comprar en este Nodo
                    </a>
                </div>
            </div>
        `;
    }

    nodeTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            nodeTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // Animación de transición
            nodeDetails.style.opacity = 0;
            setTimeout(() => {
                renderNode(e.target.dataset.node);
                nodeDetails.style.opacity = 1;
            }, 200);
        });
    });
    
    // Init first node
    if (nodeTabs.length > 0) renderNode('escobar');


    // --- 4. CALCULADORA ECON�MICA ---
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

    // --- 5. RASTREADOR LUNAR SINCRONIZADO ---
    function updateMoonPhase() {
        const shadow = document.getElementById('moon-shadow');
        const countdown = document.getElementById('lunar-countdown');
        const heroCycle = document.getElementById('lunar-hero-cycle');
        const heroStatus = document.getElementById('lunar-hero-status');
        
        if (typeof LunarEngine !== 'undefined') {
            const ciclo = LunarEngine.obtenerCicloActual();
            
            if (heroCycle) heroCycle.textContent = ciclo.nombre;
            if (heroStatus) heroStatus.textContent = ciclo.abierta ? `Cierra en Luna Llena (${ciclo.llenaFechaStr})` : `Próxima apertura con Luna Nueva`;
            if (countdown) countdown.textContent = `${ciclo.diasRestantes} DÍAS`;
            
            if (shadow) {
                // Cálculo de fase visual según el porcentaje transcurrido del ciclo lunar
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

// --- 6. MANEJO DE MODALES GLOBAL ---
const modal = document.getElementById('action-modal');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');

const modalData = {
    'consumidor': {
        title: 'Unirme a una Compra',
        icon: 'fa-shopping-basket',
        color: 'text-blue-600',
        content: `
            <p class="text-gray-600 mb-6">Elige tu nodo más cercano y empieza a consumir de manera soberana.</p>
            <form class="space-y-4" onsubmit="event.preventDefault(); alert('Solicitud enviada a Vrde Club. ¡Gracias!'); closeModal();">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                    <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vrde-brand outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Nodo Preferido</label>
                    <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vrde-brand outline-none">
                        <option>Nodo Escobar</option>
                        <option>Nodo Loma Verde</option>
                        <option>Nodo Vicente López</option>
                    </select>
                </div>
                <button type="submit" class="w-full btn-primary mt-4">Unirme a la Red</button>
            </form>
        `
    },
    'nodo': {
        title: 'Ser Nodo Almacén',
        icon: 'fa-store-alt',
        color: 'text-orange-600',
        content: `
            <p class="text-gray-600 mb-6">Convierte tu espacio en un centro de distribución barrial. Completa este pre-formulario.</p>
            <form class="space-y-4" onsubmit="event.preventDefault(); alert('Solicitud de Nodo enviada. Nos pondremos en contacto.'); closeModal();">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Barrio / Ciudad</label>
                    <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vrde-brand outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Metros cuadrados disponibles (Aprox)</label>
                    <input type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vrde-brand outline-none">
                </div>
                <button type="submit" class="w-full btn-primary bg-orange-500 hover:bg-orange-600 border-none mt-4">Aplicar como Nodo</button>
            </form>
        `
    },
    'transporte': {
        title: 'Ofrecer Transporte',
        icon: 'fa-truck',
        color: 'text-purple-600',
        content: `
            <p class="text-gray-600 mb-6">Integra tu vehículo a la red logística En Conjunto y genera un impacto positivo.</p>
            <form class="space-y-4" onsubmit="event.preventDefault(); alert('Gracias por sumar tu vehículo a la red.'); closeModal();">
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
            <p class="text-gray-600 mb-6">Ayuda a expandir la red organizando y comunicando las compras en tu comunidad.</p>
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
    // Trigger animation
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

window.closeModal = function() {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Close on backdrop click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
