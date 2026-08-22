/**
 * Vrde Club - Motor Lunar y Capa de Datos
 * Sincronización con ciclos astronómicos 2026-2027 y Google Sheets / Apps Script
 */

const LUNAR_CONFIG = {
  sheetId: '1AotbTN241SmM_lsjrrQdbMOTtq9UDu9lyX41Ta6E0F4',
  wspCentral: '5491127452476',
  // URL de la Web App de Apps Script (si está desplegada como ejecutable público)
  gasApiUrl: '', // Puede configurarse con la URL de despliegue de Apps Script
  
  // Ciclos lunares 2026-2027 identificados por la Luna Llena de cierre (Meses base 0: Ene=0, Dic=11)
  ciclosLunares: [
    // 2026
    { id: 'leo-ene-2026', nuevaFecha: new Date(2026, 0, 18), nuevaSigno: 'Capricornio', llenaFecha: new Date(2026, 1, 1), llenaSigno: 'Leo', nombreLlena: '🌑 Luna Llena en Leo', mesStr: 'Ene/Feb 2026', archivado: true },
    { id: 'virgo-feb-2026', nuevaFecha: new Date(2026, 1, 17), nuevaSigno: 'Acuario', llenaFecha: new Date(2026, 2, 3), llenaSigno: 'Virgo', nombreLlena: '🌑 Luna Llena en Virgo', mesStr: 'Feb/Mar 2026', archivado: true },
    { id: 'libra-mar-2026', nuevaFecha: new Date(2026, 2, 19), nuevaSigno: 'Piscis', llenaFecha: new Date(2026, 3, 1), llenaSigno: 'Libra', nombreLlena: '🌑 Luna Llena en Libra', mesStr: 'Mar/Abr 2026', archivado: true },
    { id: 'escorpio-abr-2026', nuevaFecha: new Date(2026, 3, 17), nuevaSigno: 'Aries', llenaFecha: new Date(2026, 4, 1), llenaSigno: 'Escorpio', nombreLlena: '🌑 Luna Llena en Escorpio', mesStr: 'Abr/May 2026', archivado: true },
    { id: 'sagitario-may-2026', nuevaFecha: new Date(2026, 4, 17), nuevaSigno: 'Tauro', llenaFecha: new Date(2026, 4, 31), llenaSigno: 'Sagitario', nombreLlena: '🌑 Luna Llena en Sagitario', mesStr: 'Mayo 2026', archivado: true },
    { id: 'capricornio-jun-2026', nuevaFecha: new Date(2026, 5, 15), nuevaSigno: 'Géminis', llenaFecha: new Date(2026, 5, 29), llenaSigno: 'Capricornio', nombreLlena: '🌑 Luna Llena en Capricornio', mesStr: 'Junio 2026', archivado: true },
    { id: 'acuario-jul-2026', nuevaFecha: new Date(2026, 6, 14), nuevaSigno: 'Cáncer', llenaFecha: new Date(2026, 6, 29), llenaSigno: 'Acuario', nombreLlena: '🌑 Luna Llena en Acuario', mesStr: 'Julio 2026', archivado: true },
    { id: 'piscis-ago-2026', nuevaFecha: new Date(2026, 7, 12), nuevaSigno: 'Leo', llenaFecha: new Date(2026, 7, 28), llenaSigno: 'Piscis', nombreLlena: '🌑 Luna Llena en Piscis', mesStr: 'Agosto 2026', esVigente: true, archivado: false },
    { id: 'aries-sep-2026', nuevaFecha: new Date(2026, 8, 11), nuevaSigno: 'Virgo', llenaFecha: new Date(2026, 8, 26), llenaSigno: 'Aries', nombreLlena: '🌑 Luna Llena en Aries', mesStr: 'Septiembre 2026', archivado: false },
    { id: 'tauro-oct-2026', nuevaFecha: new Date(2026, 9, 10), nuevaSigno: 'Libra', llenaFecha: new Date(2026, 9, 26), llenaSigno: 'Tauro', nombreLlena: '🌑 Luna Llena en Tauro', mesStr: 'Octubre 2026', archivado: false },
    { id: 'geminis-nov-2026', nuevaFecha: new Date(2026, 10, 9), nuevaSigno: 'Escorpio', llenaFecha: new Date(2026, 10, 24), llenaSigno: 'Géminis', nombreLlena: '🌑 Luna Llena en Géminis', mesStr: 'Noviembre 2026', archivado: false },
    { id: 'cancer-dic-2026', nuevaFecha: new Date(2026, 11, 8), nuevaSigno: 'Sagitario', llenaFecha: new Date(2026, 11, 24), llenaSigno: 'Cáncer', nombreLlena: '🌑 Luna Llena en Cáncer', mesStr: 'Diciembre 2026', archivado: false }
  ],

  // Base inicial de Nodos y Aliados
  nodos: {
    'escobar': {
      id: 'escobar',
      nombre: 'Nodo Escobar',
      color: '#10A352',
      logo: '🌑',
      imagen: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600',
      banner: 'assets/hero_bg.png',
      direccion: 'Ruta 25 y Colectora Este, Escobar',
      contacto: 'Gonzalo Ramos (Agente Nodo)',
      descripcion: 'El pulmón de zona norte. Punto de acopio centralizado con conexión directa con productores agroecológicos y huertas regenerativas.',
      cbu: 'vrde.escobar.mp',
      wspPedidos: '5491127452476',
      redes: {
        instagram: 'vrde.escobar',
        facebook: 'Vrde Escobar Comunidad',
        wspComunidad: 'https://chat.whatsapp.com/VrdeEscobarComunidad'
      },
      metaPropia: 120,
      diaEntrega: 'Viernes de 15:00 a 19:00 hs',
      pin: '1234',
      slots: ['Armado de Pedidos', 'Recepción Transporte'],
      mostrarVrdedores: true,
      vrdedores: [
        { id: 'VRD-101', nombre: 'Gonzalo Ramos', rol: 'Coordinador General', wsp: '5491127452476', avatar: '🌑' },
        { id: 'VRD-102', nombre: 'Camila Rossi', rol: 'Vrdedora Zona Centro', wsp: '5491148291029', avatar: '🌑' }
      ]
    },
    'lomaverde': {
      id: 'lomaverde',
      nombre: 'Nodo Loma Verde',
      color: '#4e8d26',
      logo: '🌑',
      imagen: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
      banner: 'assets/hero_bg.png',
      direccion: 'Calle Los Tilos 420, Loma Verde',
      contacto: 'Agustina Vidal (Agente Nodo)',
      descripcion: 'Nodo de gran capacidad de acopio para compras comunitarias. Espacio rodeado de verde con enfoque en conservación y vida silvestre.',
      cbu: 'lomaverde.vrde.uala',
      wspPedidos: '5491127452476',
      redes: {
        instagram: 'vrde.lomaverde',
        facebook: '',
        wspComunidad: 'https://chat.whatsapp.com/LomaVerdeVrde'
      },
      metaPropia: 80,
      diaEntrega: 'Miércoles de 16:00 a 20:00 hs',
      pin: '2345',
      slots: ['Conservación', 'Atención Comunitaria'],
      mostrarVrdedores: true,
      vrdedores: [
        { id: 'VRD-201', nombre: 'Agustina Vidal', rol: 'Coordinadora Loma Verde', wsp: '5491159201948', avatar: '🌱' },
        { id: 'VRD-202', nombre: 'Joaquín Paz', rol: 'Vrdedor Barrio Los Tilos', wsp: '5491138291028', avatar: '🌱' }
      ]
    },
    'lalucila': {
      id: 'lalucila',
      nombre: 'Nodo La Lucila',
      color: '#2D8A4E',
      logo: '🌑',
      imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
      banner: 'assets/hero_bg.png',
      direccion: 'Av. Libertador 3600, La Lucila',
      contacto: 'Martín Romero (Agente Nodo)',
      descripcion: 'Acercando la red a la ciudad. Punto de encuentro barrial y retiros express de alimentos agroecológicos frescos.',
      cbu: 'lalucila.vrde.nx',
      wspPedidos: '5491127452476',
      redes: {
        instagram: 'vrde.lalucila',
        facebook: '',
        wspComunidad: 'https://chat.whatsapp.com/LaLucilaVrde'
      },
      metaPropia: 100,
      diaEntrega: 'Sábados de 10:00 a 14:00 hs',
      pin: '3456',
      slots: ['Difusión Local', 'Entrega Rápida'],
      mostrarVrdedores: true,
      vrdedores: [
        { id: 'VRD-301', nombre: 'Martín Romero', rol: 'Coordinador La Lucila', wsp: '5491129481029', avatar: '🌑' }
      ]
    },
    'vicentelopez': {
      id: 'vicentelopez',
      nombre: 'Nodo Vicente López',
      color: '#1B5E20',
      logo: '🌑',
      imagen: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=600',
      banner: 'assets/hero_bg.png',
      direccion: 'Melo y Maipú, Vicente López',
      contacto: 'Laura Benítez (Agente Nodo)',
      descripcion: 'Enlace vital urbano con gran volumen de consumo familiar y alimentos agroecológicos de temporada directa del campo.',
      cbu: 'vlopez.vrde.mp',
      wspPedidos: '5491127452476',
      redes: {
        instagram: 'vrde.vicentelopez',
        facebook: '',
        wspComunidad: 'https://chat.whatsapp.com/VicenteLopezVrde'
      },
      metaPropia: 90,
      diaEntrega: 'Jueves de 17:00 a 20:30 hs',
      pin: '4567',
      slots: ['Gestión de Stock', 'Difusión'],
      mostrarVrdedores: true,
      vrdedores: [
        { id: 'VRD-401', nombre: 'Laura Benítez', rol: 'Coordinadora Vicente López', wsp: '5491148291029', avatar: '🌑' }
      ]
    }
  },

  // Catálogo base de Productos con Escalas Colectivas, Costo de Producción, Variantes y Ficha Informativa
  productos: [
    {
      id: 'P1',
      nombre: 'Bolsón Agroecológico de Estación',
      categoria: 'huerta',
      subcategoria: 'bolson',
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
      titulo: 'Bolsón de 7 a 8 kg de verduras frescas sin agrotóxicos',
      subtitulo: 'Cosechado 24hs antes de la entrega por familias productoras',
      origen: 'Finca Ovoro & Productores de La Plata',
      variedad: 'Agroecológica Certificada de Estación',
      meta: 150,
      unidad: 'bolsón 7-8kg',
      costo: 6800,
      p1: 11500, m1: 1,
      p2: 9800,  m2: 30,
      p3: 8900,  m3: 60,
      tipsVrdedor: 'Cosechado horas antes del reparto. 7 a 8 kg variados de hojas verdes, hortalizas y tubérculos de estación sin agroquímicos.',
      productorInfo: {
        productor: 'Finca Ovoro & Productores del Cordón Platense',
        historia: 'Familias campesinas organizadas que cultivan en suelos vivos sin agrotóxicos. Cosechan de madrugada horas antes del reparto al nodo.',
        impacto: 'Soberanía alimentaria real y precio justo directo a la familia productora.',
        loc: '📍 La Plata, Buenos Aires'
      },
      variantes: [
        { id: 'bolson_std', label: 'Bolsón Familiar (7 a 8 kg)', unidad: 'bolsón', costo: 6800, p1: 11500, p2: 9800, p3: 8900, m1: 1, m2: 30, m3: 60, tiers: 'Mayorista (+30u): $9.800 • Dist (+60u): $8.900' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P2',
      nombre: 'Aceite de Oliva Extra Virgen Lorenzo Cabrera',
      categoria: 'aceite',
      subcategoria: 'aceite',
      img: 'assets/aceite_lorenzo_cabrera.jpg',
      titulo: 'Aceite de oliva virgen extra de primera prensada en frío',
      subtitulo: 'Acidez menor a 0.4% • Olivares tradicionales de Traslasierra',
      origen: 'Finca Lorenzo Cabrera (Traslasierra, Córdoba)',
      variedad: 'Arbequina / Arauco Agroecológico',
      meta: 80,
      unidad: 'botella 1L',
      costo: 12000,
      p1: 19300, m1: 1,
      p2: 17900, m2: 20,
      p3: 16500, m3: 50,
      tipsVrdedor: 'Primera prensada en frío con acidez garantizada < 0.4%. Aceite 100% puro sin cortes ni químicos.',
      productorInfo: {
        productor: 'Finca Lorenzo Cabrera',
        historia: 'Olivares tradicionales en el microclima único de Traslasierra regados con agua pura de vertientes serranas. Prensado mecánico en frío a pocas horas de la cosecha.',
        impacto: 'Cultura olivícola artesanal libre de agroquímicos sintéticos.',
        loc: '📍 Valle de Traslasierra, Córdoba'
      },
      variantes: [
        { id: '1L', label: 'Botella 1 Litro', unidad: 'botella 1L', costo: 12000, p1: 19300, p2: 17900, p3: 16500, m1: 1, m2: 20, m3: 50, tiers: 'Mayorista (+20L): $17.900 • Dist (+50L): $16.500' },
        { id: '2L', label: 'Bidón 2 Litros (Ahorro)', unidad: 'bidón 2L', costo: 22500, p1: 36000, p2: 33500, p3: 31000, m1: 1, m2: 10, m3: 25, tiers: 'Mayorista (+10u): $33.500 • Dist (+25u): $31.000' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P3',
      nombre: 'Miel Pura de Monte Nativo',
      categoria: 'granja',
      subcategoria: 'miel',
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=600',
      titulo: 'Miel cruda sin pasteurizar de monte silvestre',
      subtitulo: 'Frasco de vidrio • Conserva enzimas y polen vivos',
      origen: 'Cooperativa Apícola Monte Adentro',
      variedad: 'Multifloral Nativa',
      meta: 100,
      unidad: 'frasco 1kg',
      costo: 4200,
      p1: 7200, m1: 1,
      p2: 6100, m2: 25,
      p3: 5400, m3: 50,
      tipsVrdedor: 'Miel cruda sin pasteurizar ni diluir. Extraída de flores silvestres del monte nativo.',
      productorInfo: {
        productor: 'Cooperativa Apícola Monte Adentro',
        historia: 'Colmenas ubicadas en áreas protegidas de monte nativo libre de fumigaciones. Miel cruda sin pasteurizar con enzimas y polen vivos intactos.',
        impacto: 'Polinización de flora silvestre autóctona y desarrollo cooperativo.',
        loc: '📍 Monte Nativo del Salado'
      },
      variantes: [
        { id: '1kg', label: 'Frasco 1 kg', unidad: 'frasco 1kg', costo: 4200, p1: 7200, p2: 6100, p3: 5400, m1: 1, m2: 25, m3: 50, tiers: 'Mayorista (+25u): $6.100 • Dist (+50u): $5.400' },
        { id: '500g', label: 'Frasco 500g', unidad: 'frasco 500g', costo: 2400, p1: 4200, p2: 3600, p3: 3100, m1: 1, m2: 25, m3: 50, tiers: 'Mayorista (+25u): $3.600 • Dist (+50u): $3.100' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P4',
      nombre: 'Harina Integral Agroecológica Molino del Salado',
      categoria: 'granos',
      subcategoria: 'harinas',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
      titulo: 'Molienda en piedra de trigo agroecológico no OGM',
      subtitulo: 'Conserva el germen y salvado vivo • Ideal para masa madre',
      origen: 'Molino Harinero del Salado',
      variedad: 'Trigo Pan 100% Integral',
      meta: 120,
      unidad: 'bolsa 5kg',
      costo: 3800,
      p1: 6500, m1: 1,
      p2: 5400, m2: 6,
      p3: 4800, m3: 20,
      tipsVrdedor: 'Trigo sin pesticidas molido a la piedra. Mantiene el germen vivo y todo el salvado natural.',
      productorInfo: {
        productor: 'Molino Harinero del Salado',
        historia: 'Trigo pan agroecológico de semillas no modificadas molido lentamente en piedras francesas, manteniendo el germen vivo y todo el salvado natural.',
        impacto: 'Panificación viva con masa madre y soberanía de molienda comunitaria.',
        loc: '📍 Cuenca del Salado, Buenos Aires'
      },
      variantes: [
        { id: '1kg', label: 'Bolsa 1 kg', unidad: 'bolsa 1kg', costo: 1500, p1: 2500, p2: 2100, p3: 1800, m1: 1, m2: 10, m3: 30, tiers: 'Mayorista (+10u): $2.100 • Dist (+30u): $1.800' },
        { id: '5kg', label: 'Bolsa 5 kg (Familiar)', unidad: 'bolsa 5kg', costo: 3800, p1: 6500, p2: 5400, p3: 4800, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $5.400 • Dist (+20u): $4.800' },
        { id: '25kg', label: 'Bolsa 25 kg (Panadería)', unidad: 'bolsa 25kg', costo: 16500, p1: 27000, p2: 23500, p3: 21000, m1: 1, m2: 2, m3: 6, tiers: 'Mayorista (+2u): $23.500 • Dist (+6u): $21.000' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P5',
      nombre: 'Huevos de Campo Pastoriles (Maples)',
      categoria: 'granja',
      subcategoria: 'huevos',
      img: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&q=80&w=600',
      titulo: 'Maple de 30 huevos de gallinas libres de jaula',
      subtitulo: 'Pastoreo rotativo diario y alimentación con granos no OGM',
      origen: 'Granja Agroecológica El Encuentro',
      variedad: 'Pastoreo Libre',
      meta: 90,
      unidad: 'maple 30u',
      costo: 5200,
      p1: 8500, m1: 1,
      p2: 7400, m2: 20,
      p3: 6800, m3: 45,
      tipsVrdedor: 'Gallinas criadas libres a campo abierto con sol y pastoreo diario. Huevos frescos con yema de intenso color natural.',
      productorInfo: {
        productor: 'Granja Agroecológica El Encuentro',
        historia: 'Gallinas criadas libres a campo abierto con pastoreo rotativo diario, sol y aire puro. Alimentación sana con granos no OGM.',
        impacto: 'Bienestar animal estricto sin jaulas ni estrés y alimentos de alta densidad biológica.',
        loc: '📍 Granja El Encuentro, Bs. As.'
      },
      variantes: [
        { id: 'maple', label: 'Maple 30 Huevos', unidad: 'maple 30u', costo: 5200, p1: 8500, p2: 7400, p3: 6800, m1: 1, m2: 20, m3: 45, tiers: 'Mayorista (+20u): $7.400 • Dist (+45u): $6.800' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P6',
      nombre: 'Gírgolas Grises del Delta',
      categoria: 'hongos',
      subcategoria: 'hongos',
      img: 'assets/girgolas.png',
      titulo: 'Hongos frescos cultivados en los bosques del Delta',
      subtitulo: 'Sembrado en tronco fresco de álamo • Producto orgánico',
      origen: 'Productores del Delta • Alimento local y orgánico',
      variedad: 'Gírgola Gris (Pleurotus ostreatus)',
      meta: 50,
      unidad: 'kg',
      costo: 18000,
      p1: 23000, m1: 1,
      p2: 21500, m2: 5,
      p3: 20000, m3: 10,
      tipsVrdedor: 'Hongos frescos, gírgolas grises cultivadas en los bosques del delta. Producto orgánico sembrado en tronco fresco de álamo.',
      productorInfo: {
        productor: 'Productores del Delta • Bosque Nativo',
        historia: 'Hongos frescos Pleurotus sembrados en troncos frescos de álamo bajo el microclima sombrío y húmedo de los humedales del Delta.',
        impacto: 'Producción forestal regenerativa sin desmonte y alimento gourmet medicinal.',
        loc: '📍 Islas del Delta del Paraná'
      },
      variantes: [
        { id: '1kg', label: 'Bandeja 1 kg', unidad: 'kg', costo: 18000, p1: 23000, p2: 21500, p3: 20000, m1: 1, m2: 5, m3: 10, tiers: 'Mayorista (+5kg): $21.500 • Dist (+10kg): $20.000' },
        { id: '500g', label: 'Bandeja 500g', unidad: '500g', costo: 9500, p1: 12500, p2: 11500, p3: 10800, m1: 1, m2: 5, m3: 10, tiers: 'Mayorista (+5u): $11.500 • Dist (+10u): $10.800' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P7',
      nombre: 'Yerba Mate Agroecológica Grapia Milenaria',
      categoria: 'yerba',
      subcategoria: 'yerba',
      img: 'assets/yerba_grapia_1kg.jpg',
      titulo: 'Yerba mate con palo y estacionamiento natural de 2 años',
      subtitulo: 'Secado en cinta sin humo • Sabor suave sin acidez',
      origen: 'Cooperativa El Colono (Campo Ramón, Misiones)',
      variedad: 'Canchada y estacionada 18 a 24 meses',
      meta: 60,
      unidad: 'paquete 1kg',
      costo: 3300,
      p1: 5100, m1: 1,
      p2: 4400, m2: 12,
      p3: 3800, m3: 52,
      tipsVrdedor: 'Elaborada por familias de pequeños colonos en Campo Ramón, Misiones. Estacionamiento natural prolongado.',
      productorInfo: {
        productor: 'Cooperativa El Colono (Campo Ramón, Misiones)',
        historia: 'Elaborada por familias de pequeños colonos en las serranías misioneras. Cosecha manual, secado en cinta sin humo y estacionamiento natural de 18 a 24 meses.',
        impacto: 'Comercio justo cooperativo sin intermediarios y reforestación de monte.',
        loc: '📍 Campo Ramón, Misiones'
      },
      variantes: [
        { id: '1kg', label: 'Paquete 1 kg', unidad: 'paquete 1kg', img: 'assets/yerba_grapia_1kg.jpg', costo: 3300, p1: 5100, p2: 4400, p3: 3800, m1: 1, m2: 12, m3: 52, tiers: 'Mayorista (+12u): $4.400 • Dist (+52u): $3.800' },
        { id: '2kg', label: 'Paquete 2 kg (Ahorro)', unidad: 'paquete 2kg', img: 'assets/yerba_grapia_2kg.jpg', costo: 5600, p1: 8600, p2: 7400, p3: 6400, m1: 1, m2: 6, m3: 26, tiers: 'Mayorista (+6u): $7.400 • Dist (+26u): $6.400' },
        { id: '10kg', label: 'Bolsón 10 kg (Saca)', unidad: 'bolsón 10kg', img: 'assets/yerba_grapia_10kg.jpg', costo: 26000, p1: 37000, p2: 32000, p3: 27500, m1: 1, m2: 2, m3: 6, tiers: 'Mayorista (+2u): $32.000 • Dist (+6u): $27.500' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P8',
      nombre: 'Lentejas Agroecológicas Salve la Tierra',
      categoria: 'granos',
      subcategoria: 'legumbres',
      img: 'assets/lentejas_salve_tierra.jpg',
      titulo: 'Lentejas verdes seleccionadas de agricultura regenerativa',
      subtitulo: 'Suelo vivo pampeano • Semillas 100% libres de transgénicos (NO OGM)',
      origen: 'Salve la Tierra (Capilla del Señor / Areco, Bs. As.)',
      variedad: 'Lentejas verdes NO OGM',
      meta: 70,
      unidad: 'bolsa 1kg',
      costo: 2200,
      p1: 3500, m1: 1,
      p2: 3000, m2: 6,
      p3: 2600, m3: 20,
      tipsVrdedor: 'Lentejas verdes de producción regenerativa sin pesticidas ni fertilizantes sintéticos.',
      productorInfo: {
        productor: 'Salve la Tierra • Suelo Vivo',
        historia: 'Agricultura regenerativa en Capilla del Señor. Cultivo sin fertilizantes químicos ni pesticidas que regenera la materia orgánica del suelo pampeano.',
        impacto: 'Alimentos limpios a precio accesible y regeneración de suelos.',
        loc: '📍 Capilla del Señor / Areco, Buenos Aires'
      },
      variantes: [
        { id: '1kg', label: 'Bolsa 1 kg', unidad: 'bolsa 1kg', costo: 2200, p1: 3500, p2: 3000, p3: 2600, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $3.000 • Dist (+20u): $2.600' },
        { id: '5kg', label: 'Bolsa 5 kg (Ahorro)', unidad: 'bolsa 5kg', costo: 10500, p1: 16000, p2: 14000, p3: 12000, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $14.000 • Dist (+20u): $12.000' },
        { id: '25kg', label: 'Bolsa 25 kg (Mayorista)', unidad: 'bolsa 25kg', costo: 48000, p1: 70000, p2: 62000, p3: 55000, m1: 1, m2: 2, m3: 5, tiers: 'Mayorista (+2u): $62.000 • Dist (+5u): $55.000' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P9',
      nombre: 'Garbanzos Agroecológicos Salve la Tierra',
      categoria: 'granos',
      subcategoria: 'legumbres',
      img: 'assets/garbanzos_salve_tierra.jpg',
      titulo: 'Garbanzos grandes de cultivo natural sin agroquímicos',
      subtitulo: 'Textura cremosa para hummus y guisos • Suelo vivo pampeano',
      origen: 'Salve la Tierra (Capilla del Señor / Areco, Bs. As.)',
      variedad: 'Garbanzos NO OGM',
      meta: 60,
      unidad: 'bolsa 1kg',
      costo: 2200,
      p1: 3500, m1: 1,
      p2: 3000, m2: 6,
      p3: 2600, m3: 20,
      tipsVrdedor: 'Garbanzos de alta densidad proteica y mineral cultivados sin agroquímicos.',
      productorInfo: {
        productor: 'Salve la Tierra • Suelo Vivo',
        historia: 'Garbanzos seleccionados de ciclo natural secados al sol. Granos enteros y tiernos de alta concentración mineral y proteica.',
        impacto: 'Cuidado de semillas nativas y soberanía legumbrera.',
        loc: '📍 Capilla del Señor, Buenos Aires'
      },
      variantes: [
        { id: '1kg', label: 'Bolsa 1 kg', unidad: 'bolsa 1kg', costo: 2200, p1: 3500, p2: 3000, p3: 2600, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $3.000 • Dist (+20u): $2.600' },
        { id: '5kg', label: 'Bolsa 5 kg (Ahorro)', unidad: 'bolsa 5kg', costo: 10500, p1: 16000, p2: 14000, p3: 12000, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $14.000 • Dist (+20u): $12.000' },
        { id: '25kg', label: 'Bolsa 25 kg (Mayorista)', unidad: 'bolsa 25kg', costo: 48000, p1: 70000, p2: 62000, p3: 55000, m1: 1, m2: 2, m3: 5, tiers: 'Mayorista (+2u): $62.000 • Dist (+5u): $55.000' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P10',
      nombre: 'Arroz Yamaní Integral Agroecológico Caupolicán',
      categoria: 'granos',
      subcategoria: 'arroz',
      img: 'assets/arroz_caupolican.jpg',
      titulo: 'Arroz Yamaní integral libre de agroquímicos y sin TACC',
      subtitulo: 'Capital Nacional del Arroz • Procesado físico sin aditivos',
      origen: 'Molino Arrocero Caupolicán S.R.L. (San Salvador, Entre Ríos)',
      variedad: 'Yamaní Integral Sin TACC',
      meta: 80,
      unidad: 'paquete 1kg',
      costo: 2400,
      p1: 3800, m1: 1,
      p2: 3200, m2: 6,
      p3: 2800, m3: 20,
      tipsVrdedor: 'Grano entero integral libre de agroquímicos y pesticidas. Cultivo natural de San Salvador, Entre Ríos.',
      productorInfo: {
        productor: 'Molino Arrocero Caupolicán S.R.L.',
        historia: 'Cultivo natural en San Salvador, Entre Ríos. Grano entero integral sin agroquímicos, procesado físico sin pulido químico ni blanqueadores.',
        impacto: 'Cuidado de humedales entrerrianos y alimento 100% libre de TACC.',
        loc: '📍 San Salvador, Entre Ríos'
      },
      variantes: [
        { id: '1kg', label: 'Paquete 1 kg', unidad: 'paquete 1kg', costo: 2400, p1: 3800, p2: 3200, p3: 2800, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $3.200 • Dist (+20u): $2.800' },
        { id: '5kg', label: 'Bolsa 5 kg (Ahorro)', unidad: 'bolsa 5kg', costo: 11500, p1: 17500, p2: 15000, p3: 13000, m1: 1, m2: 6, m3: 20, tiers: 'Mayorista (+6u): $15.000 • Dist (+20u): $13.000' },
        { id: '30kg', label: 'Bolsa 30 kg (Saca)', unidad: 'bolsa 30kg', costo: 65000, p1: 95000, p2: 84000, p3: 75000, m1: 1, m2: 2, m3: 5, tiers: 'Mayorista (+2u): $84.000 • Dist (+5u): $75.000' }
      ],
      activo: true,
      nodos: ['TODOS']
    },
    {
      id: 'P11',
      nombre: 'Pasta Pura Cacao Silvestre Amazónico de Bolivia',
      categoria: 'cacao',
      subcategoria: 'cacao',
      img: 'assets/cacao_bolivia.jpg',
      titulo: '100% puro cacao silvestre de recolección en selva virgen',
      subtitulo: 'Semillas fermentadas y suavemente tostadas • Sabor profundo',
      origen: 'Comunidades Recolectoras de Rurrenabaque (Beni, Bolivia 🇧🇴)',
      variedad: 'Cacao Criollo Silvestre Amazónico',
      meta: 50,
      unidad: 'barra 1kg',
      costo: 42000,
      p1: 60000, m1: 1,
      p2: 57000, m2: 3,
      p3: 55000, m3: 5,
      tipsVrdedor: 'Cacao silvestre puro sin azúcar ni aditivos. Cierre 25-08-2026. Llega entre el 28 y 30 de agosto.',
      productorInfo: {
        productor: 'Familias Recolectoras de Rurrenabaque',
        historia: 'Cacao criollo silvestre recolectado manualmente en canoas en islas vírgenes del río Beni (Madidi). Fermentado tradicional y suavemente tostado.',
        impacto: 'Protección activa de la Amazonía boliviana y soberanía comunitaria.',
        loc: '📍 Rurrenabaque, Beni, Bolivia'
      },
      variantes: [
        { id: '1kg', label: 'Barra 1 kg', unidad: 'barra 1kg', costo: 42000, p1: 60000, p2: 57000, p3: 55000, m1: 1, m2: 3, m3: 5, tiers: 'Mayorista (+3kg): $57.000 • Dist (+5kg): $55.000 • +10kg: $50.000' },
        { id: '500g', label: 'Barra 500g (1/2 kg)', unidad: 'barra 500g', costo: 22000, p1: 32500, p2: 28500, p3: 27500, m1: 1, m2: 6, m3: 10, tiers: 'Mayorista (+6u): $28.500 • Dist (+10u): $27.500 • +20u: $25.000' },
        { id: '100g', label: 'Barra 100g', unidad: 'barra 100g', costo: 4800, p1: 7500, p2: 6800, p3: 6200, m1: 1, m2: 10, m3: 20, tiers: 'Mayorista (+10u): $6.800 • Dist (+20u): $6.200' }
      ],
      activo: true,
      nodos: ['TODOS']
    }
  ],

  // Categorías Principales del Ecosistema (Barra Spotify y Filtros)
  categorias: [
    { id: 'granos', nombre: 'Granos & Legumbres', emoji: '🌾', colorBg: '#F59E0B', colorText: '#FFFFFF', orden: 1, activa: true },
    { id: 'cacao', nombre: 'Cacao Silvestre', emoji: '🍫', colorBg: '#854D0E', colorText: '#FFFFFF', orden: 2, activa: true },
    { id: 'yerba', nombre: 'Yerba Mate', emoji: '🌿', colorBg: '#15803D', colorText: '#FFFFFF', orden: 3, activa: true },
    { id: 'aceite', nombre: 'Aceite Oliva', emoji: '🫒', colorBg: '#4D7C0F', colorText: '#FFFFFF', orden: 4, activa: true },
    { id: 'hongos', nombre: 'Hongos del Delta', emoji: '🍄', colorBg: '#B91C1C', colorText: '#FFFFFF', orden: 5, activa: true },
    { id: 'huerta', nombre: 'Huerta & Frescos', emoji: '🥬', colorBg: '#16A34A', colorText: '#FFFFFF', orden: 6, activa: true },
    { id: 'granja', nombre: 'Granja & Mieles', emoji: '🥚', colorBg: '#D97706', colorText: '#FFFFFF', orden: 7, activa: true },
    { id: 'panificados', nombre: 'Panadería & Masa Madre', emoji: '🍞', colorBg: '#C2410C', colorText: '#FFFFFF', orden: 8, activa: true }
  ]
};

// =================================================================
// MOTOR ASTRONÓMICO Y DE CICLOS LUNARES
// =================================================================

class LunarEngine {
  /**
   * Obtiene todas las categorías (activas o todas con orden y persistencia)
   */
  static obtenerCategorias(soloActivas = true) {
    let cats = LUNAR_CONFIG.categorias;
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const stored = localStorage.getItem('VRDE_CATEGORIAS');
      if (stored) {
        try {
          cats = JSON.parse(stored);
          // Asegurar que las categorías por defecto existan
          LUNAR_CONFIG.categorias.forEach(def => {
            if (!cats.some(c => c.id === def.id)) {
              cats.push(def);
            }
          });
        } catch(e) {
          cats = LUNAR_CONFIG.categorias;
        }
      } else {
        localStorage.setItem('VRDE_CATEGORIAS', JSON.stringify(cats));
      }
    }
    if (soloActivas) {
      cats = cats.filter(c => c.activa !== false);
    }
    return cats.sort((a, b) => (a.orden || 99) - (b.orden || 99));
  }

  /**
   * Guarda o actualiza una categoría
   */
  static guardarCategoria(catData) {
    let cats = this.obtenerCategorias(false);
    const idx = cats.findIndex(c => c.id === catData.id);
    if (idx >= 0) {
      cats[idx] = { ...cats[idx], ...catData };
    } else {
      cats.push({
        id: catData.id || ('cat_' + Date.now()),
        nombre: catData.nombre || 'Nueva Categoría',
        emoji: catData.emoji || '🌱',
        colorBg: catData.colorBg || '#10A352',
        colorText: catData.colorText || '#FFFFFF',
        orden: catData.orden || (cats.length + 1),
        activa: catData.activa !== false
      });
    }
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_CATEGORIAS', JSON.stringify(cats));
    }
    return cats;
  }

  /**
   * Elimina una categoría
   */
  static eliminarCategoria(catId) {
    let cats = this.obtenerCategorias(false);
    cats = cats.filter(c => c.id !== catId);
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_CATEGORIAS', JSON.stringify(cats));
    }
    return cats;
  }

  /**
   * Obtiene todos los productos (con persistencia local y filtros de nodo/activo)
   */
  static obtenerProductos(nodoId = null, soloActivos = false) {
    let prods = LUNAR_CONFIG.productos;
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const stored = localStorage.getItem('VRDE_PRODUCTOS');
      if (stored) {
        try { 
          prods = JSON.parse(stored);
          let updated = false;
          
          // Asegurar que todos los productos oficiales estén presentes en storage
          ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11'].forEach(pid => {
            const hasP = prods.some(p => p.id === pid);
            if (!hasP) {
              const def = LUNAR_CONFIG.productos.find(p => p.id === pid);
              if (def) {
                prods.push(def);
                updated = true;
              }
            }
          });

          // Sincronizar variantes y fotos actualizadas
          prods.forEach(p => {
            const def = LUNAR_CONFIG.productos.find(x => x.id === p.id);
            if (def) {
              if (!p.variantes || p.variantes.length === 0) {
                p.variantes = def.variantes;
                updated = true;
              }
              if (!p.productorInfo) {
                p.productorInfo = def.productorInfo;
                updated = true;
              }
              if (!p.categoria) {
                p.categoria = def.categoria;
                p.subcategoria = def.subcategoria;
                updated = true;
              }
              if (p.img !== def.img && def.img.startsWith('assets/')) {
                p.img = def.img;
                updated = true;
              }
            }
          });

          if (updated) {
            localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
          }
        } catch(e) {
          prods = LUNAR_CONFIG.productos;
        }
      } else {
        localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
      }
    }

    if (soloActivos) {
      const activos = prods.filter(p => p.activo !== false);
      if (activos.length > 0) prods = activos;
    }

    if (nodoId) {
      const porNodo = prods.filter(p => {
        if (!p.nodos || p.nodos.length === 0 || p.nodos.includes('TODOS') || p.nodos.includes(nodoId.toLowerCase())) {
          return true;
        }
        return false;
      });
      if (porNodo.length > 0) prods = porNodo;
    }

    if (!prods || prods.length === 0) {
      prods = LUNAR_CONFIG.productos;
    }

    return prods;
  }

  /**
   * Guarda o actualiza un producto en el catálogo
   */
  static guardarProducto(prodData) {
    let prods = this.obtenerProductos(null, false);
    const index = prods.findIndex(p => p.id === prodData.id);

    if (index > -1) {
      prods[index] = { ...prods[index], ...prodData };
    } else {
      prods.push(prodData);
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
    }
    LUNAR_CONFIG.productos = prods;
    return prods;
  }

  /**
   * Elimina un producto del catálogo
   */
  static eliminarProducto(prodId) {
    let prods = this.obtenerProductos(null, false);
    prods = prods.filter(p => p.id !== prodId);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
    }
    LUNAR_CONFIG.productos = prods;
    return prods;
  }

  /**
   * Obtiene todos los nodos configurados
   */
  static obtenerNodos() {
    let nodos = LUNAR_CONFIG.nodos;
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('VRDE_NODOS');
      if (stored) {
        try { nodos = JSON.parse(stored); } catch(e){}
      }
    }

    // Auto-sanear iconos corruptos o caracteres residuales (ej: 'x')
    let needsResave = false;
    Object.keys(nodos).forEach(k => {
      if (!nodos[k].logo || nodos[k].logo === 'x' || nodos[k].logo === 'X') {
        nodos[k].logo = '🌑';
        needsResave = true;
      }
      if (nodos[k].vrdedores && Array.isArray(nodos[k].vrdedores)) {
        nodos[k].vrdedores.forEach(v => {
          if (!v.avatar || v.avatar === 'x' || v.avatar === 'x"' || v.avatar === 'X') {
            v.avatar = '🌱';
            needsResave = true;
          }
        });
      }
    });

    if (needsResave && typeof localStorage !== 'undefined') {
      try { localStorage.setItem('VRDE_NODOS', JSON.stringify(nodos)); } catch(e){}
    }

    return nodos;
  }

  /**
   * Guarda configuración de nodos
   */
  static guardarNodos(nodosData) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('VRDE_NODOS', JSON.stringify(nodosData));
    }
    LUNAR_CONFIG.nodos = nodosData;
    return nodosData;
  }

  /**
   * Obtiene los Vrdedores de un nodo específico
   */
  static obtenerVrdedoresNodo(nodoId) {
    const nodos = this.obtenerNodos();
    const n = nodos[nodoId.toLowerCase()] || nodos['escobar'];
    return {
      mostrar: n.mostrarVrdedores !== false,
      lista: n.vrdedores || []
    };
  }

  /**
   * Guarda o actualiza un Vrdedor en un nodo
   */
  static guardarVrdedor(nodoId, vrdedorData) {
    const nodos = this.obtenerNodos();
    const key = nodoId.toLowerCase();
    if (!nodos[key]) return;
    if (!nodos[key].vrdedores) nodos[key].vrdedores = [];

    const index = nodos[key].vrdedores.findIndex(v => v.id === vrdedorData.id);
    if (index > -1) {
      nodos[key].vrdedores[index] = { ...nodos[key].vrdedores[index], ...vrdedorData };
    } else {
      nodos[key].vrdedores.push(vrdedorData);
    }

    this.guardarNodos(nodos);
    return nodos[key].vrdedores;
  }

  /**
   * Elimina un Vrdedor de un nodo
   */
  static eliminarVrdedor(nodoId, vrdedorId) {
    const nodos = this.obtenerNodos();
    const key = nodoId.toLowerCase();
    if (!nodos[key] || !nodos[key].vrdedores) return;

    nodos[key].vrdedores = nodos[key].vrdedores.filter(v => v.id !== vrdedorId);
    this.guardarNodos(nodos);
    return nodos[key].vrdedores;
  }

  /**
   * Activa o desactiva la visibilidad pública de Vrdedores para un nodo
   */
  static toggleMostrarVrdedores(nodoId, mostrar) {
    const nodos = this.obtenerNodos();
    const key = nodoId.toLowerCase();
    if (!nodos[key]) return;
    nodos[key].mostrarVrdedores = mostrar;
    this.guardarNodos(nodos);
    return mostrar;
  }

  /**
   * Actualiza el perfil completo del nodo (imagen, descripción, horarios, responsable, etc.)
   */
  static actualizarPerfilNodo(nodoId, datos) {
    const nodos = this.obtenerNodos();
    const key = nodoId.toLowerCase();
    if (!nodos[key]) return;

    nodos[key] = {
      ...nodos[key],
      ...datos
    };

    this.guardarNodos(nodos);

    if (typeof db !== 'undefined' && db) {
      try {
        const docRef = doc(db, "nodes", key);
        setDoc(docRef, nodos[key], { merge: true }).catch(err => console.log("Firebase node profile sync error:", err));
      } catch(e) {}
    }

    return nodos[key];
  }

  /**
   * Edita completamente un pedido existente y lo sincroniza en vivo en Firebase Firestore
   */
  static actualizarPedidoCompleto(pedidoId, nuevosDatos) {
    let pedidos = this.obtenerPedidos();
    const index = pedidos.findIndex(p => String(p.id) === String(pedidoId));
    if (index > -1) {
      pedidos[index] = { ...pedidos[index], ...nuevosDatos, updatedAt: new Date().toISOString() };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(pedidos));
      }

      if (typeof db !== 'undefined' && db) {
        try {
          const docRef = doc(db, "orders", String(pedidoId));
          setDoc(docRef, pedidos[index], { merge: true }).catch(err => console.log("Firebase sync edit error:", err));
        } catch(e) {}
      }
    }
    return pedidos;
  }


  /**
   * Calcula la economía, costos, margen y la división tripartita 33.3% (Vrde, Nodo, Vrdedores)
   */
  static calcularEconomiaNodo(nodoId = null, pedidosParam = null) {
    const pedidos = pedidosParam || this.obtenerPedidos(nodoId);
    const prods = this.obtenerProductos(null, false);
    const prodsMap = {};
    prods.forEach(p => { prodsMap[p.id] = p; });

    const nodosObj = this.obtenerNodos();
    const nodoData = nodoId ? (nodosObj[nodoId.toLowerCase()] || nodosObj['escobar']) : null;
    const vrdedoresList = (nodoData && nodoData.vrdedores) ? nodoData.vrdedores : [];

    let totalVentas = 0;
    let totalCosto = 0;
    let totalUnidades = 0;

    // Inicializar desglose por Vrdedor
    const vrdedoresEcon = {};
    vrdedoresList.forEach(v => {
      vrdedoresEcon[v.nombre] = {
        id: v.id,
        nombre: v.nombre,
        rol: v.rol || 'Vrdedor/a',
        wsp: v.wsp || '',
        avatar: v.avatar || '🌑',
        pedidosCount: 0,
        unidadesCount: 0,
        ventasTotal: 0,
        costoTotal: 0,
        margenNeto: 0,
        pagoLabor: 0 // 33.33% del margen neto
      };
    });

    // Caso para pedidos gestionados directamente por el Nodo o sin Vrdedor específico
    vrdedoresEcon['Coordinación General del Nodo'] = {
      id: 'COORD',
      nombre: 'Coordinación General del Nodo',
      rol: 'Gestión Directa del Nodo',
      wsp: nodoData?.wspPedidos || '',
      avatar: '🌑',
      pedidosCount: 0,
      unidadesCount: 0,
      ventasTotal: 0,
      costoTotal: 0,
      margenNeto: 0,
      pagoLabor: 0
    };

    pedidos.forEach(o => {
      let orderVentas = 0;
      let orderCosto = 0;
      let orderUnits = 0;

      if (o.items && o.items.length > 0) {
        o.items.forEach(it => {
          const p = prodsMap[it.prodId] || {};
          const cant = it.cant || 0;
          orderUnits += cant;
          const costoUnit = p.costo || Math.round((p.p1 || 10000) * 0.65);
          const saleUnit = p.p1 || 10000;
          
          orderCosto += (costoUnit * cant);
          orderVentas += (saleUnit * cant);
        });
      } else {
        orderVentas = o.total || 0;
        orderCosto = Math.round(orderVentas * 0.65);
        orderUnits = o.unidades || 1;
      }

      totalVentas += orderVentas;
      totalCosto += orderCosto;
      totalUnidades += orderUnits;

      const orderMargen = Math.max(0, orderVentas - orderCosto);

      // Atribuir a Vrdedor
      let vrKey = o.vrdedor || 'Coordinación General del Nodo';
      if (!vrdedoresEcon[vrKey]) {
        vrdedoresEcon[vrKey] = {
          id: 'VRD-AUTO',
          nombre: vrKey,
          rol: 'Vrdedor Comunitario',
          wsp: '',
          avatar: 'x',
          pedidosCount: 0,
          unidadesCount: 0,
          ventasTotal: 0,
          costoTotal: 0,
          margenNeto: 0,
          pagoLabor: 0
        };
      }

      vrdedoresEcon[vrKey].pedidosCount += 1;
      vrdedoresEcon[vrKey].unidadesCount += orderUnits;
      vrdedoresEcon[vrKey].ventasTotal += orderVentas;
      vrdedoresEcon[vrKey].costoTotal += orderCosto;
      vrdedoresEcon[vrKey].margenNeto += orderMargen;
      vrdedoresEcon[vrKey].pagoLabor += Math.round(orderMargen * 0.333333);
    });

    const margenNetoTotal = Math.max(0, totalVentas - totalCosto);
    const parteVrde = Math.round(margenNetoTotal * 0.333333);
    const parteNodo = Math.round(margenNetoTotal * 0.333333);
    const parteVrdedores = Math.round(margenNetoTotal * 0.333334);

    return {
      totalVentas,
      totalCosto,
      margenNetoTotal,
      totalUnidades,
      pedidosCount: pedidos.length,
      split: {
        porcentaje: 33.33,
        vrde: parteVrde,
        nodo: parteNodo,
        vrdedores: parteVrdedores
      },
      vrdedoresDesglose: Object.values(vrdedoresEcon).filter(v => v.pedidosCount > 0 || (nodoData?.vrdedores || []).some(nv => nv.nombre === v.nombre))
    };
  }

  /**
   * Obtiene la lista de todos los ciclos lunares configurados (vigentes y archivados)
   */
    static obtenerListaCiclos() {
    const hoy = new Date();
    const mesesFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const actual = this.obtenerCicloActual();

    return LUNAR_CONFIG.ciclosLunares.map(c => {
      const nuevaF = (c.nuevaFecha instanceof Date) ? c.nuevaFecha : new Date(c.nuevaFecha || '2026-08-12');
      const llenaF = (c.llenaFecha instanceof Date) ? c.llenaFecha : new Date(c.llenaFecha || '2026-08-28');
      const esVigente = (c.id === actual.id);
      
      const milisegundosRestantes = llenaF.getTime() - hoy.getTime();
      const diasRestantes = Math.max(0, Math.ceil(milisegundosRestantes / (1000 * 3600 * 24)));
      const abierta = hoy >= nuevaF && hoy <= llenaF;
      const llenaFechaStr = `${llenaF.getDate()} de ${mesesFull[llenaF.getMonth()]}`;
      const nuevaFechaStr = `${nuevaF.getDate()} de ${mesesFull[nuevaF.getMonth()]}`;

      return {
        id: c.id,
        nombre: c.nombreLlena || `🌑 Luna Llena en ${c.llenaSigno}`,
        llenaSigno: c.llenaSigno,
        nuevaSigno: c.nuevaSigno,
        mesStr: c.mesStr,
        nuevaFecha: nuevaF,
        llenaFecha: llenaF,
        nuevaFechaStr: nuevaFechaStr,
        llenaFechaStr: llenaFechaStr,
        diasRestantes: diasRestantes,
        abierta: abierta,
        esVigente: esVigente,
        archivado: c.archivado !== false && !esVigente,
        badge: esVigente ? 'Compra Vigente' : 'Archivada'
      };
    });
  }

  /**
   * Obtiene la información de un ciclo por su ID
   */
  static obtenerCicloPorId(cicloId) {
    const lista = this.obtenerListaCiclos();
    const found = lista.find(c => c.id === cicloId);
    return found || this.obtenerCicloActual();
  }

  /**
   * Obtiene todos los pedidos centralizados con persistencia y filtrado por Nodo y Ciclo Lunar
   */
  static obtenerPedidos(nodoId = null, cicloId = null) {
    const cicloActual = this.obtenerCicloActual();
    const defaultCicloId = cicloActual.id || 'piscis-ago-2026';

    let pedidos = [
      // ==========================================
      // COMPRA VIGENTE: LUNA LLENA EN PISCIS (AGO 2026)
      // ==========================================
      { 
        id: 'G-748291', 
        fecha: '14/08/2026, 11:30', 
        cicloId: 'piscis-ago-2026',
        ciclo: '🌑 Luna Llena en Piscis', 
        nodo: 'Nodo Escobar',
        nodoId: 'escobar',
        vrdedor: 'Camila Rossi',
        nombre: 'Sofía Almada', 
        telefono: '1148291029', 
        tipoEntrega: 'Delivery',
        direccionEntrega: 'Calle Los Jazmines 340, Escobar',
        detalle: '1 bolsón Bolsón Agroecológico, 1 bidón 2L Aceite de Oliva', 
        items: [
          { prodId: 'P1', nombre: 'Bolsón Agroecológico de Estación', cant: 1, unidad: 'bolsón' },
          { prodId: 'P2', nombre: 'Aceite de Oliva Extra Virgen 2L', cant: 1, unidad: 'bidón 2L' }
        ],
        unidades: 2, 
        donacion: 930,
        total: 33500, 
        estado: 'Pendiente', 
        mensaje: 'Dejar en portería si no atiendo.' 
      },
      { 
        id: 'G-392810', 
        fecha: '13/08/2026, 17:45', 
        cicloId: 'piscis-ago-2026',
        ciclo: '🌑 Luna Llena en Piscis', 
        nodo: 'Nodo Loma Verde',
        nodoId: 'lomaverde',
        vrdedor: 'Agustina Vidal',
        nombre: 'Carlos Menéndez', 
        telefono: '1159201948', 
        tipoEntrega: 'Retiro en Nodo',
        direccionEntrega: '',
        detalle: '2 bolsón Bolsón Agroecológico, 1 frasco 1kg Miel Pura', 
        items: [
          { prodId: 'P1', nombre: 'Bolsón Agroecológico de Estación', cant: 2, unidad: 'bolsón' },
          { prodId: 'P3', nombre: 'Miel Pura de Monte 1kg', cant: 1, unidad: 'frasco 1kg' }
        ],
        unidades: 3, 
        donacion: 906,
        total: 30200, 
        estado: 'Pagado', 
        mensaje: 'Retiro viernes por la tarde.' 
      },
      { 
        id: 'G-194820', 
        fecha: '12/08/2026, 09:15', 
        cicloId: 'piscis-ago-2026',
        ciclo: '🌑 Luna Llena en Piscis', 
        nodo: 'Nodo Escobar',
        nodoId: 'escobar',
        vrdedor: 'Gonzalo Ramos',
        nombre: 'Lucía Fernández', 
        telefono: '1138291028', 
        tipoEntrega: 'Delivery',
        direccionEntrega: 'Av. Tapia de Cruz 820 4B, Escobar',
        detalle: '1 bidón 2L Aceite de Oliva, 2 frasco 1kg Miel Pura', 
        items: [
          { prodId: 'P2', nombre: 'Aceite de Oliva Extra Virgen 2L', cant: 1, unidad: 'bidón 2L' },
          { prodId: 'P3', nombre: 'Miel Pura de Monte 1kg', cant: 2, unidad: 'frasco 1kg' }
        ],
        unidades: 3, 
        donacion: 1092,
        total: 36400, 
        estado: 'Pendiente', 
        mensaje: '' 
      },
      { 
        id: 'G-984201', 
        fecha: '11/08/2026, 14:00', 
        cicloId: 'piscis-ago-2026',
        ciclo: '🌑 Luna Llena en Piscis', 
        nodo: 'Nodo Escobar',
        nodoId: 'escobar',
        vrdedor: 'Camila Rossi',
        nombre: 'Mariana López', 
        telefono: '1129481029', 
        tipoEntrega: 'Retiro en Nodo',
        direccionEntrega: '',
        detalle: '3 bolsón Bolsón Agroecológico, 2 bolsa 5kg Harina Integral', 
        items: [
          { prodId: 'P1', nombre: 'Bolsón Agroecológico de Estación', cant: 3, unidad: 'bolsón' },
          { prodId: 'P4', nombre: 'Harina Integral Agroecológica 5kg', cant: 2, unidad: 'bolsa 5kg' }
        ],
        unidades: 5, 
        donacion: 1425,
        total: 47500, 
        estado: 'Pagado', 
        mensaje: '' 
      },
      // ==========================================
      // HISTORIAL ARCHIVADO: LUNA LLENA EN ACUARIO (JUL 2026)
      // ==========================================
      {
        id: 'G-551029',
        fecha: '25/07/2026, 16:20',
        cicloId: 'acuario-jul-2026',
        ciclo: '🌑 Luna Llena en Acuario',
        nodo: 'Nodo Escobar',
        nodoId: 'escobar',
        vrdedor: 'Gonzalo Ramos',
        nombre: 'Esteban Morales',
        telefono: '1168291044',
        tipoEntrega: 'Retiro en Nodo',
        direccionEntrega: '',
        detalle: '2 bolsón Bolsón Agroecológico, 1 maple 30u Huevos de Campo',
        items: [
          { prodId: 'P1', nombre: 'Bolsón Agroecológico de Estación', cant: 2, unidad: 'bolsón' },
          { prodId: 'P5', nombre: 'Huevos de Campo Pastoriles (Maples)', cant: 1, unidad: 'maple 30u' }
        ],
        unidades: 3,
        donacion: 850,
        total: 28500,
        estado: 'Entregado',
        mensaje: 'Retirado con éxito.'
      },
      {
        id: 'G-551088',
        fecha: '24/07/2026, 10:15',
        cicloId: 'acuario-jul-2026',
        ciclo: '🌑 Luna Llena en Acuario',
        nodo: 'Nodo Escobar',
        nodoId: 'escobar',
        vrdedor: 'Camila Rossi',
        nombre: 'Valeria Russo',
        telefono: '1149201948',
        tipoEntrega: 'Delivery',
        direccionEntrega: 'Barrio El Cazador, Escobar',
        detalle: '1 bidón 2L Aceite de Oliva, 2 bolsa 5kg Harina Integral',
        items: [
          { prodId: 'P2', nombre: 'Aceite de Oliva Extra Virgen 2L', cant: 1, unidad: 'bidón 2L' },
          { prodId: 'P4', nombre: 'Harina Integral Agroecológica 5kg', cant: 2, unidad: 'bolsa 5kg' }
        ],
        unidades: 3,
        donacion: 960,
        total: 32000,
        estado: 'Entregado',
        mensaje: ''
      },
      // ==========================================
      // HISTORIAL ARCHIVADO: LUNA LLENA EN CAPRICORNIO (JUN 2026)
      // ==========================================
      {
        id: 'G-440912',
        fecha: '26/06/2026, 18:30',
        cicloId: 'capricornio-jun-2026',
        ciclo: '🌑 Luna Llena en Capricornio',
        nodo: 'Nodo Escobar',
        nodoId: 'escobar',
        vrdedor: 'Gonzalo Ramos',
        nombre: 'Facundo Quiroga',
        telefono: '1138291055',
        tipoEntrega: 'Retiro en Nodo',
        direccionEntrega: '',
        detalle: '4 bolsón Bolsón Agroecológico, 2 frasco 1kg Miel Pura',
        items: [
          { prodId: 'P1', nombre: 'Bolsón Agroecológico de Estación', cant: 4, unidad: 'bolsón' },
          { prodId: 'P3', nombre: 'Miel Pura de Monte 1kg', cant: 2, unidad: 'frasco 1kg' }
        ],
        unidades: 6,
        donacion: 1600,
        total: 54000,
        estado: 'Entregado',
        mensaje: ''
      }
    ];

    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('VRDE_PEDIDOS');
      if (stored) {
        try { 
          pedidos = JSON.parse(stored); 
        } catch(e){}
      } else {
        // Inicializar persistencia con la base completa
        localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(pedidos));
      }
    }

    // Filtro por Nodo
    if (nodoId && nodoId !== 'ALL') {
      pedidos = pedidos.filter(p => (p.nodoId || '').toLowerCase() === nodoId.toLowerCase() || (p.nodo || '').toLowerCase().includes(nodoId.toLowerCase()));
    }

    // Filtro por Ciclo Lunar
    if (cicloId && cicloId !== 'ALL') {
      pedidos = pedidos.filter(p => {
        if (p.cicloId === cicloId) return true;
        if (p.ciclo && (p.ciclo.includes(cicloId) || cicloId.includes(p.ciclo))) return true;
        return false;
      });
    }

    return pedidos;
  }

  /**
   * Guarda un nuevo pedido en el almacenamiento persistente
   */
  static guardarNuevoPedido(pedidoData) {
    let pedidos = this.obtenerPedidos(null, 'ALL');
    const cicloActual = this.obtenerCicloActual();

    // Asegurar cicloId en el nuevo pedido
    if (!pedidoData.cicloId) {
      pedidoData.cicloId = cicloActual.id || 'piscis-ago-2026';
    }
    if (!pedidoData.ciclo) {
      pedidoData.ciclo = cicloActual.nombre;
    }

    pedidos.unshift(pedidoData);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(pedidos));
    }
    return pedidos;
  }

  /**
   * Actualiza el estado de un pedido y persiste en localStorage
   */
  static actualizarEstadoPedido(pedidoId, nuevoEstado) {
    let pedidos = this.obtenerPedidos(null, 'ALL');
    const p = pedidos.find(item => item.id === pedidoId);
    if (p) {
      p.estado = nuevoEstado;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(pedidos));
      }
    }
    return pedidos;
  }

  /**
   * Archiva un pedido completado
   */
  static archivarPedido(pedidoId) {
    return this.actualizarEstadoPedido(pedidoId, 'Archivado');
  }

  /**
   * Obtiene el ciclo lunar actual o más reciente según la fecha del sistema
   */
  static obtenerCicloActual(customDate = null) {
    const hoy = customDate ? new Date(customDate) : new Date();
    const mesesAbbr = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const mesesFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    let cicloActual = null;
    
    // Buscar de más reciente a más antiguo el ciclo cuya luna nueva ya pasó o está activa
    for (let i = LUNAR_CONFIG.ciclosLunares.length - 1; i >= 0; i--) {
      if (hoy >= LUNAR_CONFIG.ciclosLunares[i].nuevaFecha) {
        cicloActual = LUNAR_CONFIG.ciclosLunares[i];
        break;
      }
    }
    
    if (!cicloActual) {
      cicloActual = LUNAR_CONFIG.ciclosLunares.find(c => c.id === 'piscis-ago-2026') || LUNAR_CONFIG.ciclosLunares[0];
    }

    const nuevaF = (cicloActual.nuevaFecha instanceof Date) ? cicloActual.nuevaFecha : new Date(cicloActual.nuevaFecha || '2026-08-12');
    const llenaF = (cicloActual.llenaFecha instanceof Date) ? cicloActual.llenaFecha : new Date(cicloActual.llenaFecha || '2026-08-28');
    const mesIndex = nuevaF.getMonth();
    const ano = nuevaF.getFullYear();
    const nombre = cicloActual.nombreLlena || `🌑 Luna Llena en ${cicloActual.llenaSigno}`;
    
    const milisegundosRestantes = llenaF.getTime() - hoy.getTime();
    const diasRestantes = Math.max(0, Math.ceil(milisegundosRestantes / (1000 * 3600 * 24)));
    const abierta = hoy >= nuevaF && hoy <= llenaF;
    
    const duracionTotalMs = llenaF.getTime() - nuevaF.getTime();
    const transcurridoMs = Math.max(0, hoy.getTime() - nuevaF.getTime());
    const porcentajeCiclo = Math.min(100, Math.max(0, Math.round((transcurridoMs / duracionTotalMs) * 100)));

    return {
      id: cicloActual.id || 'piscis-ago-2026',
      nombre: nombre,
      nombreComercial: nombre,
      nombreCompleto: `${nombre} (${mesesFull[mesIndex]} ${ano})`,
      signo: cicloActual.nuevaSigno,
      llenaSigno: cicloActual.llenaSigno,
      nuevaSigno: cicloActual.nuevaSigno,
      mesStr: cicloActual.mesStr || `${mesesAbbr[mesIndex]} ${ano}`,
      nuevaFecha: nuevaF,
      llenaFecha: llenaF,
      nuevaFechaStr: `${nuevaF.getDate()} de ${mesesFull[mesIndex]}`,
      llenaFechaStr: `${llenaF.getDate()} de ${mesesFull[llenaF.getMonth()]}`,
      diasRestantes: diasRestantes,
      abierta: abierta,
      esVigente: true,
      porcentajeCiclo: porcentajeCiclo
    };
  }

  /**
   * Calcula el precio de un producto según las unidades acumuladas en la red
   */
  static calcularPrecio(prod, unidadesTotales) {
    if (prod.p3 > 0 && prod.m3 > 0 && unidadesTotales >= prod.m3) {
      return { precio: prod.p3, tier: 3, tierName: 'Distribuidora', metaSiguiente: null };
    }
    if (prod.p2 > 0 && prod.m2 > 0 && unidadesTotales >= prod.m2) {
      return { precio: prod.p2, tier: 2, tierName: 'Mayorista', metaSiguiente: prod.m3 };
    }
    return { precio: prod.p1, tier: 1, tierName: 'Minorista', metaSiguiente: prod.m2 };
  }

  /**
   * Envía un nuevo pedido a Google Sheets vía la API de Apps Script
   */
  static async enviarPedidoApi(orderData) {
    if (!LUNAR_CONFIG.gasApiUrl) {
      console.log("️ Base de datos local: pedido registrado con ID", orderData.id);
      return { success: true, id: orderData.id };
    }
    try {
      await fetch(LUNAR_CONFIG.gasApiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return { success: true, id: orderData.id };
    } catch (err) {
      console.warn("No se pudo conectar con Apps Script, se mantiene en memoria:", err);
      return { success: true, id: orderData.id };
    }
  }

  /**
   * Obtiene los pedidos reales desde Google Sheets si la API está configurada
   */
  static async obtenerPedidosApi(nodoRef = null) {
    if (!LUNAR_CONFIG.gasApiUrl) return null;
    try {
      const url = nodoRef ? `${LUNAR_CONFIG.gasApiUrl}?ref=${nodoRef}` : LUNAR_CONFIG.gasApiUrl;
      const res = await fetch(url);
      const data = await res.json();
      return data.success ? data.pedidos : null;
    } catch (err) {
      console.warn("Error al consultar pedidos de Google Sheets:", err);
      return null;
    }
  }

  /**
   * Obtiene la base de datos consolidada de socios / clientes a partir de todos los pedidos
   * nodoId: 'ALL' o ID del nodo (ej: 'escobar')
   * cicloId: 'ALL' o ID del ciclo (ej: 'piscis-ago-2026')
   * filtroTipo: 'ALL' | 'COMPRO_EN_CICLO' | 'INACTIVO_EN_CICLO'
   */
  static obtenerBaseSocios(nodoId = null, cicloId = null, filtroTipo = 'ALL') {
    const allPedidos = this.obtenerPedidos(null, 'ALL');
    const cicloReferencia = cicloId && cicloId !== 'ALL' ? cicloId : (this.obtenerCicloActual().id || 'piscis-ago-2026');
    
    // Mapa para consolidar por teléfono o nombre
    const sociosMap = {};

    allPedidos.forEach(p => {
      // Si se filtra por nodo específico
      if (nodoId && nodoId !== 'ALL') {
        const matchesNode = (p.nodoId || '').toLowerCase() === nodoId.toLowerCase() || (p.nodo || '').toLowerCase().includes(nodoId.toLowerCase());
        if (!matchesNode) return;
      }

      const cleanPhone = (p.telefono || '').replace(/\D/g, '');
      const key = cleanPhone || (p.nombre || '').toLowerCase().trim();
      if (!key) return;

      if (!sociosMap[key]) {
        sociosMap[key] = {
          id: 'SOC-' + (cleanPhone ? cleanPhone.slice(-4) : Math.floor(Math.random()*9000+1000)),
          nombre: p.nombre || 'Socio Comunitario',
          telefono: p.telefono || '',
          cleanPhone: cleanPhone,
          nodo: p.nodo || 'Nodo Central',
          nodoId: p.nodoId || 'escobar',
          vrdedor: p.vrdedor || 'Coordinación General del Nodo',
          direccion: p.direccionEntrega || '',
          tipoEntregaHabitual: p.tipoEntrega || 'Retiro en Nodo',
          pedidosCount: 0,
          unidadesCount: 0,
          totalGastado: 0,
          pedidos: [],
          lunas: new Set(),
          ultimaFecha: p.fecha || '',
          ultimaLuna: p.ciclo || '',
          ultimaLunaId: p.cicloId || '',
          comproEnCicloSeleccionado: false
        };
      }

      const socio = sociosMap[key];
      socio.pedidosCount += 1;
      socio.unidadesCount += (p.unidades || 1);
      socio.totalGastado += (p.total || 0);
      socio.pedidos.push(p);

      if (p.cicloId) socio.lunas.add(p.cicloId);
      if (p.ciclo) socio.ultimaLuna = p.ciclo;
      if (p.cicloId) socio.ultimaLunaId = p.cicloId;

      if (p.vrdedor && p.vrdedor !== 'Coordinación General del Nodo') {
        socio.vrdedor = p.vrdedor;
      }
      if (p.direccionEntrega) {
        socio.direccion = p.direccionEntrega;
        socio.tipoEntregaHabitual = 'Delivery';
      }

      if (p.cicloId === cicloReferencia || (p.ciclo && p.ciclo.includes(cicloReferencia))) {
        socio.comproEnCicloSeleccionado = true;
      }
    });

    let socios = Object.values(sociosMap);

    // Convertir sets de lunas a arrays legibles
    socios.forEach(s => {
      s.lunasArray = Array.from(s.lunas);
      s.lunasCount = s.lunasArray.length;
      s.esRecurrente = s.pedidosCount >= 2;
    });

    // Filtros de estado respecto al ciclo
    if (filtroTipo === 'COMPRO_EN_CICLO') {
      socios = socios.filter(s => s.comproEnCicloSeleccionado);
    } else if (filtroTipo === 'INACTIVO_EN_CICLO') {
      socios = socios.filter(s => !s.comproEnCicloSeleccionado);
    }

    // Ordenar: primero los que tienen más compras
    socios.sort((a, b) => b.pedidosCount - a.pedidosCount || b.totalGastado - a.totalGastado);

    return socios;
  }

  /**
   * Exporta la base de datos de socios a un archivo CSV compatible con Excel
   */
  static exportarSociosCSV(sociosArray, filename = 'socios_vrde_club.csv') {
    if (!sociosArray || sociosArray.length === 0) {
      alert("No hay socios para exportar con los filtros actuales.");
      return;
    }

    let csv = '\uFEFF'; // UTF-8 BOM para que Excel abra sin problemas de tildes
    csv += 'ID;Nombre y Apellido;Teléfono;Nodo;Vrdedor de Referencia;Tipo Entrega Habitual;Dirección;Pedidos Totales;Unidades Totales;Total Gastado ($);altima Luna;Compró en Luna Activa\n';

    sociosArray.forEach(s => {
      const fila = [
        s.id,
        `"${(s.nombre || '').replace(/"/g, '""')}"`,
        `"${s.telefono}"`,
        `"${s.nodo}"`,
        `"${(s.vrdedor || '').replace(/"/g, '""')}"`,
        `"${s.tipoEntregaHabitual}"`,
        `"${(s.direccion || '').replace(/"/g, '""')}"`,
        s.pedidosCount,
        s.unidadesCount,
        s.totalGastado,
        `"${s.ultimaLuna}"`,
        s.comproEnCicloSeleccionado ? 'SI' : 'NO'
      ];
      csv += fila.join(';') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Exportar globalmente para scripts tradicionales y módulos
if (typeof window !== 'undefined') {
  window.LUNAR_CONFIG = LUNAR_CONFIG;
  window.LunarEngine = LunarEngine;

  // Carga e inicialización de Firebase Firestore en tiempo real
  const initFirebaseSync = async () => {
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js");
      const { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc } = await import("https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js");

      const firebaseConfig = {
        apiKey: "AIzaSyCOqV_ktDmgMw4SQEq1U3omo-faPG0BwyA",
        authDomain: "vrde-club-ee9e2.firebaseapp.com",
        projectId: "vrde-club-ee9e2",
        storageBucket: "vrde-club-ee9e2.firebasestorage.app",
        messagingSenderId: "347690183351",
        appId: "1:347690183351:web:15740a62f1b0b6976a3b32"
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      window.vrdeFirebaseDb = db;

      // Escuchador en tiempo real de Pedidos en Firestore con Merge por ID único
      onSnapshot(collection(db, "orders"), (snapshot) => {
        if (!snapshot.empty) {
          const remoteOrders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

          let localOrders = [];
          try {
            const stored = localStorage.getItem('VRDE_PEDIDOS');
            if (stored) localOrders = JSON.parse(stored);
          } catch(e){}

          const ordersMap = {};
          localOrders.forEach(o => { if (o && o.id) ordersMap[o.id] = o; });
          remoteOrders.forEach(o => { if (o && o.id) ordersMap[o.id] = o; });

          const mergedOrders = Object.values(ordersMap);
          localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(mergedOrders));
          window.dispatchEvent(new CustomEvent('vrde:data-updated'));
        }
      });

      // Sobrescribir guardarNuevoPedido para guardar en Firebase
      const originalGuardarNuevoPedido = LunarEngine.guardarNuevoPedido.bind(LunarEngine);
      LunarEngine.guardarNuevoPedido = function(pedidoData) {
        const pedidos = originalGuardarNuevoPedido(pedidoData);
        try {
          const docRef = doc(db, "orders", pedidoData.id);
          setDoc(docRef, pedidoData, { merge: true });
        } catch(e) { console.error("Firebase sync error:", e); }
        return pedidos;
      };

      // Sobrescribir actualizarEstadoPedido para guardar en Firebase
      const originalActualizarEstado = LunarEngine.actualizarEstadoPedido.bind(LunarEngine);
      LunarEngine.actualizarEstadoPedido = function(pedidoId, nuevoEstado) {
        const pedidos = originalActualizarEstado(pedidoId, nuevoEstado);
        try {
          const docRef = doc(db, "orders", pedidoId);
          updateDoc(docRef, { estado: nuevoEstado });
        } catch(e) { console.error("Firebase update status error:", e); }
        return pedidos;
      };

      console.log("x Sincronización de Firebase Firestore activa en LunarEngine");
    } catch(e) {
      console.warn("Modo local sin conexión Firebase:", e);
    }
  };

  initFirebaseSync();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LunarEngine, LUNAR_CONFIG };
}


