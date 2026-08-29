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
    { id: 'leo-ene-2026', nuevaFecha: new Date(2026, 0, 18), nuevaSigno: 'Capricornio', llenaFecha: new Date(2026, 1, 1), llenaSigno: 'Leo', entregaFecha: new Date(2026, 1, 6), nombreLlena: '🌑 Luna Llena en Leo', mesStr: 'Ene/Feb 2026', archivado: true },
    { id: 'virgo-feb-2026', nuevaFecha: new Date(2026, 1, 17), nuevaSigno: 'Acuario', llenaFecha: new Date(2026, 2, 3), llenaSigno: 'Virgo', entregaFecha: new Date(2026, 2, 10), nombreLlena: '🌑 Luna Llena en Virgo', mesStr: 'Feb/Mar 2026', archivado: true },
    { id: 'libra-mar-2026', nuevaFecha: new Date(2026, 2, 19), nuevaSigno: 'Piscis', llenaFecha: new Date(2026, 3, 1), llenaSigno: 'Libra', entregaFecha: new Date(2026, 3, 8), nombreLlena: '🌑 Luna Llena en Libra', mesStr: 'Mar/Abr 2026', archivado: true },
    { id: 'escorpio-abr-2026', nuevaFecha: new Date(2026, 3, 17), nuevaSigno: 'Aries', llenaFecha: new Date(2026, 4, 1), llenaSigno: 'Escorpio', entregaFecha: new Date(2026, 4, 8), nombreLlena: '🌑 Luna Llena en Escorpio', mesStr: 'Abr/May 2026', archivado: true },
    { id: 'sagitario-may-2026', nuevaFecha: new Date(2026, 4, 17), nuevaSigno: 'Tauro', llenaFecha: new Date(2026, 4, 31), llenaSigno: 'Sagitario', entregaFecha: new Date(2026, 5, 5), nombreLlena: '🌑 Luna Llena en Sagitario', mesStr: 'Mayo 2026', archivado: true },
    { id: 'capricornio-jun-2026', nuevaFecha: new Date(2026, 5, 15), nuevaSigno: 'Géminis', llenaFecha: new Date(2026, 5, 29), llenaSigno: 'Capricornio', entregaFecha: new Date(2026, 6, 3), nombreLlena: '🌑 Luna Llena en Capricornio', mesStr: 'Junio 2026', archivado: true },
    { id: 'acuario-jul-2026', nuevaFecha: new Date(2026, 6, 14), nuevaSigno: 'Cáncer', llenaFecha: new Date(2026, 6, 29), llenaSigno: 'Acuario', entregaFecha: new Date(2026, 7, 7), nombreLlena: '🌑 Luna Llena en Acuario', mesStr: 'Julio 2026', archivado: true },
    { id: 'piscis-ago-2026', nuevaFecha: new Date(2026, 7, 12), nuevaSigno: 'Leo', llenaFecha: new Date(2026, 7, 28), llenaSigno: 'Piscis', entregaFecha: new Date(2026, 8, 4), nombreLlena: '🌑 Luna Llena en Piscis', mesStr: 'Agosto 2026', esVigente: true, archivado: false },
    { id: 'aries-sep-2026', nuevaFecha: new Date(2026, 8, 11), nuevaSigno: 'Virgo', llenaFecha: new Date(2026, 8, 26), llenaSigno: 'Aries', entregaFecha: new Date(2026, 9, 2), nombreLlena: '🌑 Luna Llena en Aries', mesStr: 'Septiembre 2026', archivado: false },
    { id: 'tauro-oct-2026', nuevaFecha: new Date(2026, 9, 10), nuevaSigno: 'Libra', llenaFecha: new Date(2026, 9, 26), llenaSigno: 'Tauro', entregaFecha: new Date(2026, 10, 30), nombreLlena: '🌑 Luna Llena en Tauro', mesStr: 'Octubre 2026', archivado: false },
    { id: 'geminis-nov-2026', nuevaFecha: new Date(2026, 10, 9), nuevaSigno: 'Escorpio', llenaFecha: new Date(2026, 10, 24), llenaSigno: 'Géminis', entregaFecha: new Date(2026, 11, 4), nombreLlena: '🌑 Luna Llena en Géminis', mesStr: 'Noviembre 2026', archivado: false },
    { id: 'cancer-dic-2026', nuevaFecha: new Date(2026, 11, 8), nuevaSigno: 'Sagitario', llenaFecha: new Date(2026, 11, 24), llenaSigno: 'Cáncer', entregaFecha: new Date(2026, 11, 30), nombreLlena: '🌑 Luna Llena en Cáncer', mesStr: 'Diciembre 2026', archivado: false }
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
      activo: false,
      pausado: true,
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
      nombre: 'Aceite de Oliva Agroecológico Lorenzo Cabrera',
      categoria: 'aceite',
      subcategoria: 'aceite',
      img: 'assets/aceite_lorenzo_cabrera.jpg',
      titulo: 'Aceite de oliva virgen extra de 1° prensada en frío',
      subtitulo: 'Extra Virgen 1° Prensa • Olivares centenarios de Villa Mazán, La Rioja',
      origen: 'Villa Mazán, La Rioja',
      variedad: 'Arauco • Lote Agroecológico #GAIA-25-A',
      unidadGlobal: 'litros',
      meta: 100,
      costo: 14300,
      costo2: 13500,
      costo3: 12500,
      m1: 20,
      m2: 50,
      m3: 100,
      p1: 19700,
      p2: 18700,
      p3: 18100,
      tipsVrdedor: 'Extra Virgen 1° Prensa en frío de variedad Arauco. Cosechado en olivares centenarios de Villa Mazán, La Rioja. 100% agroecológico, puro y sin químicos (Lote #GAIA-25-A).',
      productorInfo: {
        productor: 'Mónica Carrizo (Lorenzo Cabrera)',
        historia: 'Mónica Carrizo creció entre olivos en Villa Mazán. Hoy elabora un aceite único, maneja su propio camión y sostiene la tradición junto a su familia en olivares centenarios.',
        impacto: 'Cultura olivícola tradicional de olivares centenarios, 100% agroecológica y soberanía familiar.',
        loc: '📍 Villa Mazán, La Rioja'
      },
      variantes: [
        { id: '1L', label: 'Botella 1 Litro', unidad: 'botella 1L', pesoFactor: 1.0, p1: 19700, m2: 6, p2: 18700, m3: 12, p3: 18100, tiers: 'Mayorista (+6u): $18.700 • Distribuidor (+12u): $18.100' },
        { id: '2L', label: 'Bidón 2 Litros (Ahorro)', unidad: 'bidón 2L', pesoFactor: 2.0, p1: 37500, m2: 3, p2: 35500, m3: 6, p3: 34000, tiers: 'Mayorista (+3u): $35.500 • Distribuidor (+6u): $34.000' },
        { id: '5L', label: 'Bidón 5 Litros (Familiar)', unidad: 'bidón 5L', pesoFactor: 5.0, p1: 89000, m2: 2, p2: 84000, m3: 4, p3: 80000, tiers: 'Mayorista (+2u): $84.000 • Distribuidor (+4u): $80.000' }
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
      unidadGlobal: 'kg',
      meta: 40,
      costo: 49000,
      costo2: 45000,
      costo3: 40000,
      m1: 10,
      m2: 20,
      m3: 40,
      p1: 60000,
      p2: 57000,
      p3: 55000,
      tipsVrdedor: 'Cacao silvestre puro sin azúcar ni aditivos. Escala de costo del productor en la red: $49.000 (10kg), $45.000 (20kg) y $40.000 (40kg acumulados en total).',
      productorInfo: {
        productor: 'Familias Recolectoras de Rurrenabaque',
        historia: 'Cacao criollo silvestre recolectado manualmente en canoas en islas vírgenes del río Beni (Madidi). Fermentado tradicional y suavemente tostado.',
        impacto: 'Protección activa de la Amazonía boliviana y soberanía comunitaria.',
        loc: '📍 Rurrenabaque, Beni, Bolivia'
      },
      variantes: [
        { id: '1kg', label: 'Barra 1 kg', unidad: 'barra 1kg', pesoFactor: 1.0, p1: 60000, m2: 3, p2: 57000, m3: 5, p3: 55000, tiers: 'Mayorista (+3u): $57.000 • Distribuidor (+5u): $55.000' },
        { id: '500g', label: 'Barra 500g (1/2 kg)', unidad: 'barra 500g', pesoFactor: 0.5, p1: 32500, m2: 6, p2: 28500, m3: 10, p3: 27500, tiers: 'Mayorista (+6u): $28.500 • Distribuidor (+10u): $27.500' },
        { id: '100g', label: 'Barra 100g', unidad: 'barra 100g', pesoFactor: 0.1, p1: 7500, m2: 10, p2: 6800, m3: 20, p3: 6200, tiers: 'Mayorista (+10u): $6.800 • Distribuidor (+20u): $6.200' }
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
  ],

  // Banco de Recursos y Mediateca de Difusión (Tipo Google Drive)
  recursosMediateca: [
    {
      id: 'REC-001',
      titulo: 'Flyer Oficial • Aceite de Oliva Lorenzo Cabrera',
      tipo: 'imagen',
      categoria: 'Flyers & Gráficas',
      cicloId: 'TODOS',
      url: 'assets/aceite_lorenzo_cabrera.jpg',
      formato: 'JPG / Vertical',
      descripcion: 'Flyer promocional de Aceite de Oliva Virgen Extra 1° prensada de Villa Mazán, La Rioja.',
      copyTexto: '🫒 *ACEITE DE OLIVA EXTRA VIRGEN LORENZO CABRERA*\nDirecto de olivares centenarios en Villa Mazán, La Rioja 🌿\n\n✨ 1° prensada en frío, acidez menor a 0.5%, sin aditivos ni mezclas.\n🏷️ Formatos disponibles: 500cc, 2 Litros y 5 Litros.\n\nPedilo para este ciclo lunar en nuestro nodo:\n{LINK_TIENDA}',
      fechaCreacion: '2026-08-20'
    },
    {
      id: 'REC-002',
      titulo: 'Carpeta Google Drive Central de Materiales Vrde',
      tipo: 'enlace',
      categoria: 'Drive Central',
      cicloId: 'TODOS',
      url: 'https://drive.google.com',
      formato: 'Google Drive',
      descripcion: 'Carpeta compartida con fotos de productores en alta resolución, videos de cosechas y manual de marca.',
      copyTexto: 'Accedé a todo el material audiovisual en alta resolución de Vrde Club.',
      fechaCreacion: '2026-08-20'
    },
    {
      id: 'REC-003',
      titulo: 'Mensaje de Difusión • Apertura Luna Nueva',
      tipo: 'texto',
      categoria: 'Textos & Copies',
      cicloId: 'TODOS',
      url: '',
      formato: 'Texto WhatsApp',
      descripcion: 'Texto listo para enviar a grupos de WhatsApp de la comunidad al inicio de la compra colectiva.',
      copyTexto: '🌑 *¡ABRIMOS LA COMPRA LUNAR EN NUESTRO NODO!*\n\nFamilias, arranca un nuevo ciclo de compra comunitaria directa de la huerta a tu mesa 🥕🌿\n\n🛒 *¿Cómo funciona?*\nCuanto más volumen sumamos como comunidad, mejores precios por escala desbloqueamos para todos.\n\n📲 Hacé tu pedido ingresando acá:\n{LINK_TIENDA}',
      fechaCreacion: '2026-08-21'
    },
    {
      id: 'REC-004',
      titulo: 'Mensaje de Cierre y Recordatorio • Luna Llena',
      tipo: 'texto',
      categoria: 'Textos & Copies',
      cicloId: 'TODOS',
      url: '',
      formato: 'Texto WhatsApp',
      descripcion: 'Mensaje recordatorio para avisar el cierre del ciclo de pedidos a los socios de la comunidad.',
      copyTexto: '🌕 *¡ÚLTIMAS HORAS PARA PEDIR! • Cierre Luna Llena*\n\nHoy consolidamos la compra comunitaria de nuestro nodo para enviar a las quintas productoras 🌱\n\nSi todavía no hiciste tu pedido o querés sumar algo más, aprovechá ahora antes de que cierre la tienda:\n{LINK_TIENDA}',
      fechaCreacion: '2026-08-22'
    },
    {
      id: 'REC-005',
      titulo: 'Catálogo de Productos y Fichas de Origen (PDF / Info)',
      tipo: 'documento',
      categoria: 'Catálogos & Listas',
      cicloId: 'TODOS',
      url: 'assets/hero_bg.png',
      formato: 'Documento / PDF',
      descripcion: 'Guía informativa con el origen de cada alimento, historias de los productores y beneficios de la agroecología.',
      copyTexto: '📖 Descargá el catálogo completo de alimentos agroecológicos de Vrde Club.',
      fechaCreacion: '2026-08-22'
    }
  ]
};

// =================================================================
// MOTOR ASTRONÓMICO Y DE CICLOS LUNARES
// =================================================================

class LunarEngine {
  /**
   * Obtiene todas las categorías (activas o todas con orden y persistencia)
   * Si soloConProductos es true, pausa y oculta automáticamente las categorías sin productos asignados
   */
  static obtenerCategorias(soloActivas = true, soloConProductos = false, refNodo = null) {
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
    if (soloConProductos) {
      const productos = this.obtenerProductos(refNodo, true);
      const catIdsConProductos = new Set(
        productos.map(p => String(p.categoria || '').trim().toLowerCase())
      );
      cats = cats.filter(c => catIdsConProductos.has(String(c.id || '').trim().toLowerCase()));
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
    let eliminados = [];

    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      try {
        const elStored = localStorage.getItem('VRDE_PRODUCTOS_ELIMINADOS');
        if (elStored) {
          eliminados = JSON.parse(elStored) || [];
        }

        const stored = localStorage.getItem('VRDE_PRODUCTOS');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            prods = parsed;

            // Sincronizar campos estructurales y actualizar datos semilla desactualizados
            prods.forEach(p => {
              const def = LUNAR_CONFIG.productos.find(x => x.id === p.id);
              if (def) {
                if (p.id === 'P11' || p.id === 'P2' || (p.id === 'P2' && (p.origen && p.origen.includes('Traslasierra')))) {
                  p.nombre = def.nombre;
                  p.titulo = def.titulo;
                  p.subtitulo = def.subtitulo;
                  p.origen = def.origen;
                  p.variedad = def.variedad;
                  p.productorInfo = def.productorInfo;
                  p.tipsVrdedor = def.tipsVrdedor;
                  p.p1 = def.p1;
                  p.p2 = def.p2;
                  p.p3 = def.p3;
                  p.m1 = def.m1;
                  p.m2 = def.m2;
                  p.m3 = def.m3;
                  p.costo = def.costo;
                  p.costo2 = def.costo2;
                  p.costo3 = def.costo3;
                  p.meta = def.meta;
                  p.unidadGlobal = def.unidadGlobal || 'litros';
                  p.variantes = def.variantes;
                }
                if (def && (!p.costo2 || !p.costo3)) {
                  p.costo2 = def.costo2;
                  p.costo3 = def.costo3;
                  p.m1 = def.m1;
                  p.m2 = def.m2;
                  p.m3 = def.m3;
                }
                if (!p.variantes || p.variantes.length === 0) {
                  p.variantes = def.variantes;
                }
                if (!p.categoria) {
                  p.categoria = def.categoria;
                }
                if (!p.subcategoria && def.subcategoria) {
                  p.subcategoria = def.subcategoria;
                }
                if (!p.productorInfo && def.productorInfo) {
                  p.productorInfo = def.productorInfo;
                }
              }
            });
          }
        } else if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
        }
      } catch(e) {
        prods = LUNAR_CONFIG.productos;
      }
    }

    // Filtrar estrictamente productos eliminados
    if (eliminados.length > 0) {
      prods = prods.filter(p => !eliminados.includes(p.id));
    }

    if (soloActivos) {
      const activos = prods.filter(p => p.activo !== false);
      if (activos.length > 0) prods = activos;
    }

    if (nodoId && nodoId !== 'ALL') {
      const porNodo = prods.filter(p => {
        if (!p.nodos || p.nodos.length === 0 || p.nodos.includes('TODOS') || p.nodos.includes(nodoId.toLowerCase())) {
          return true;
        }
        return false;
      });
      if (porNodo.length > 0) prods = porNodo;
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
      try {
        // Si estaba en la lista de eliminados, removerlo
        const elStored = localStorage.getItem('VRDE_PRODUCTOS_ELIMINADOS');
        if (elStored) {
          let eliminados = JSON.parse(elStored) || [];
          if (eliminados.includes(prodData.id)) {
            eliminados = eliminados.filter(id => id !== prodData.id);
            localStorage.setItem('VRDE_PRODUCTOS_ELIMINADOS', JSON.stringify(eliminados));
          }
        }
        if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
        }
      } catch(e) {}
    }
    LUNAR_CONFIG.productos = prods;
    return prods;
  }

  /**
   * Envía un producto a la Papelera / Archivados
   */
  static eliminarProducto(prodId) {
    let prods = this.obtenerProductos(null, false);
    const itemToDelete = prods.find(p => p.id === prodId) || LUNAR_CONFIG.productos.find(p => p.id === prodId);
    prods = prods.filter(p => p.id !== prodId);

    if (!LUNAR_CONFIG._archivados) LUNAR_CONFIG._archivados = [];
    if (itemToDelete) {
      LUNAR_CONFIG._archivados = LUNAR_CONFIG._archivados.filter(x => x.id !== prodId);
      LUNAR_CONFIG._archivados.push(itemToDelete);
    }
    if (!LUNAR_CONFIG._eliminados) LUNAR_CONFIG._eliminados = [];
    if (!LUNAR_CONFIG._eliminados.includes(prodId)) {
      LUNAR_CONFIG._eliminados.push(prodId);
    }

    if (typeof localStorage !== 'undefined') {
      try {
        let eliminados = [];
        const elStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ELIMINADOS') : null;
        if (elStored) {
          eliminados = JSON.parse(elStored) || [];
        }
        if (!eliminados.includes(prodId)) {
          eliminados.push(prodId);
        }
        if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_PRODUCTOS_ELIMINADOS', JSON.stringify(eliminados));
        }

        // Guardar snapshot en papelera/archivados
        let archivados = [];
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ARCHIVADOS') : null;
        if (archStored) {
          archivados = JSON.parse(archStored) || [];
        }
        if (itemToDelete) {
          archivados = archivados.filter(x => x.id !== prodId);
          archivados.push(itemToDelete);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_PRODUCTOS_ARCHIVADOS', JSON.stringify(archivados));
          }
        }

        if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_PRODUCTOS', JSON.stringify(prods));
        }
      } catch(e) {}
    }
    LUNAR_CONFIG.productos = prods;
    return prods;
  }

  /**
   * Obtiene la lista de productos en Papelera / Archivados
   */
  static obtenerProductosArchivados() {
    let archivados = LUNAR_CONFIG._archivados || [];
    if (typeof localStorage !== 'undefined') {
      try {
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ARCHIVADOS') : null;
        if (archStored) {
          archivados = JSON.parse(archStored) || [];
        }
        const elStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ELIMINADOS') : null;
        const eliminados = elStored ? (JSON.parse(elStored) || []) : (LUNAR_CONFIG._eliminados || []);

        // Si hay IDs en eliminados que no están en archivados, buscar en semilla por defecto
        eliminados.forEach(id => {
          if (!archivados.some(a => a.id === id)) {
            const seed = LUNAR_CONFIG.productos.find(x => x.id === id);
            if (seed) archivados.push(seed);
          }
        });
      } catch(e) {}
    }
    return archivados;
  }

  /**
   * Restaura un producto de la papelera con 1 solo clic
   */
  static restaurarProducto(prodId) {
    const archivados = this.obtenerProductosArchivados();
    const itemToRestore = archivados.find(x => x.id === prodId) || LUNAR_CONFIG.productos.find(x => x.id === prodId) || { id: prodId, nombre: `Producto ${prodId}`, activo: true };

    if (itemToRestore) {
      itemToRestore.activo = true;
      this.guardarProducto(itemToRestore);
    }

    if (LUNAR_CONFIG._archivados) {
      LUNAR_CONFIG._archivados = LUNAR_CONFIG._archivados.filter(x => x.id !== prodId);
    }
    if (LUNAR_CONFIG._eliminados) {
      LUNAR_CONFIG._eliminados = LUNAR_CONFIG._eliminados.filter(x => x !== prodId);
    }

    if (typeof localStorage !== 'undefined') {
      try {
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ARCHIVADOS') : null;
        if (archStored) {
          let arch = JSON.parse(archStored) || [];
          arch = arch.filter(x => x.id !== prodId);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_PRODUCTOS_ARCHIVADOS', JSON.stringify(arch));
          }
        }
        const elStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ELIMINADOS') : null;
        if (elStored) {
          let el = JSON.parse(elStored) || [];
          el = el.filter(id => id !== prodId);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_PRODUCTOS_ELIMINADOS', JSON.stringify(el));
          }
        }
      } catch(e) {}
    }
    return this.obtenerProductos(null, false);
  }

  /**
   * Elimina definitivamente de la papelera
   */
  static eliminarProductoPermanente(prodId) {
    if (LUNAR_CONFIG._archivados) {
      LUNAR_CONFIG._archivados = LUNAR_CONFIG._archivados.filter(x => x.id !== prodId);
    }
    if (typeof localStorage !== 'undefined') {
      try {
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PRODUCTOS_ARCHIVADOS') : null;
        if (archStored) {
          let arch = JSON.parse(archStored) || [];
          arch = arch.filter(x => x.id !== prodId);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_PRODUCTOS_ARCHIVADOS', JSON.stringify(arch));
          }
        }
      } catch(e) {}
    }
    return true;
  }

  /**
   * Obtiene todos los nodos configurados (activos y opcionalmente en reposo)
   */
  static obtenerNodos(soloActivos = false) {
    let nodos = LUNAR_CONFIG.nodos;
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS') : null;
        if (stored) {
          nodos = JSON.parse(stored);
        }
        // Filtrar nodos eliminados/archivados
        const elStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ELIMINADOS') : null;
        if (elStored) {
          const elList = JSON.parse(elStored) || [];
          elList.forEach(deletedId => {
            if (nodos[deletedId]) delete nodos[deletedId];
          });
        }
      } catch(e){}
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

    if (soloActivos) {
      const activeNodos = {};
      Object.keys(nodos).forEach(k => {
        if (nodos[k].activo !== false && !nodos[k].pausado) {
          activeNodos[k] = nodos[k];
        }
      });
      return activeNodos;
    }

    return nodos;
  }

  /**
   * Obtiene nodos archivados en papelera
   */
  static obtenerNodosArchivados() {
    let archivados = LUNAR_CONFIG._nodosArchivados || [];
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ARCHIVADOS') : null;
        if (stored) {
          archivados = JSON.parse(stored);
        }
      } catch(e){}
    }
    return archivados;
  }

  /**
   * Guarda configuración de nodos
   */
  static guardarNodos(nodosData) {
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_NODOS', JSON.stringify(nodosData));
    }
    LUNAR_CONFIG.nodos = nodosData;
    return nodosData;
  }

  /**
   * Guarda o actualiza un Nodo Almacén individual
   */
  static guardarNodo(nodoData) {
    const nodos = this.obtenerNodos();
    const id = String(nodoData.id || '').trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
    if (!id) return null;

    const existing = nodos[id] || {};
    nodos[id] = {
      id: id,
      nombre: nodoData.nombre || existing.nombre || 'Nuevo Nodo',
      color: nodoData.color || existing.color || '#10A352',
      logo: nodoData.logo || existing.logo || '🌱',
      descripcion: nodoData.descripcion || existing.descripcion || 'Punto comunitario de acopio y distribución agroecológica.',
      direccion: nodoData.direccion || existing.direccion || 'A coordinar con el responsable',
      diaEntrega: nodoData.diaEntrega || existing.diaEntrega || 'Viernes 16 a 20 hs',
      contacto: nodoData.contacto || existing.contacto || 'Coordinador Nodo',
      telefono: nodoData.telefono || existing.telefono || '',
      pin: String(nodoData.pin || existing.pin || '1234').trim(),
      metaPropia: parseInt(nodoData.metaPropia || existing.metaPropia || 100, 10),
      imagen: nodoData.imagen || existing.imagen || '',
      activo: nodoData.activo !== false,
      redes: {
        instagram: (nodoData.redes && nodoData.redes.instagram) || (existing.redes && existing.redes.instagram) || '',
        wspGrupo: (nodoData.redes && nodoData.redes.wspGrupo) || (existing.redes && existing.redes.wspGrupo) || '',
        maps: (nodoData.redes && nodoData.redes.maps) || (existing.redes && existing.redes.maps) || ''
      },
      vrdedores: existing.vrdedores || [],
      mostrarVrdedores: existing.mostrarVrdedores !== false
    };

    // Si estaba en papelera, sacarlo
    this.restaurarNodo(id, false);

    this.guardarNodos(nodos);
    return nodos[id];
  }

  /**
   * Cambia el estado activo / en reposo de un nodo
   */
  static togglePausarNodo(nodoId) {
    const nodos = this.obtenerNodos();
    const id = String(nodoId || '').trim().toLowerCase();
    if (!nodos[id]) return null;
    nodos[id].activo = (nodos[id].activo === false) ? true : false;
    this.guardarNodos(nodos);
    return nodos[id];
  }

  /**
   * Elimina un Nodo Almacén y lo envía a la papelera / archivados
   */
  static eliminarNodo(nodoId) {
    const nodos = this.obtenerNodos();
    const id = String(nodoId || '').trim().toLowerCase();
    if (!nodos[id]) return false;

    const nodoAEliminar = JSON.parse(JSON.stringify(nodos[id]));
    nodoAEliminar.fechaEliminado = new Date().toISOString();
    delete nodos[id];
    this.guardarNodos(nodos);

    // Guardar en archivados y lista de eliminados
    if (typeof localStorage !== 'undefined') {
      try {
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ARCHIVADOS') : null;
        let arch = archStored ? JSON.parse(archStored) : (LUNAR_CONFIG._nodosArchivados || []);
        arch = arch.filter(x => x.id !== id);
        arch.push(nodoAEliminar);
        LUNAR_CONFIG._nodosArchivados = arch;
        if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_NODOS_ARCHIVADOS', JSON.stringify(arch));
        }

        const elStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ELIMINADOS') : null;
        let el = elStored ? JSON.parse(elStored) : [];
        if (!el.includes(id)) el.push(id);
        if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_NODOS_ELIMINADOS', JSON.stringify(el));
        }
      } catch(e){}
    }

    return true;
  }

  /**
   * Restaura un nodo desde la papelera
   */
  static restaurarNodo(nodoId, guardar = true) {
    const id = String(nodoId || '').trim().toLowerCase();
    let nodoRestaurado = null;

    if (typeof localStorage !== 'undefined') {
      try {
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ARCHIVADOS') : null;
        if (archStored) {
          let arch = JSON.parse(archStored) || [];
          nodoRestaurado = arch.find(x => x.id === id);
          arch = arch.filter(x => x.id !== id);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_NODOS_ARCHIVADOS', JSON.stringify(arch));
          }
          LUNAR_CONFIG._nodosArchivados = arch;
        }

        const elStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ELIMINADOS') : null;
        if (elStored) {
          let el = JSON.parse(elStored) || [];
          el = el.filter(x => x !== id);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_NODOS_ELIMINADOS', JSON.stringify(el));
          }
        }
      } catch(e){}
    }

    if (guardar && nodoRestaurado) {
      delete nodoRestaurado.fechaEliminado;
      nodoRestaurado.activo = true;
      const nodos = this.obtenerNodos();
      nodos[id] = nodoRestaurado;
      this.guardarNodos(nodos);
    }

    return nodoRestaurado;
  }

  /**
   * Elimina definitivamente un nodo de la papelera
   */
  static eliminarNodoPermanente(nodoId) {
    const id = String(nodoId || '').trim().toLowerCase();
    if (typeof localStorage !== 'undefined') {
      try {
        const archStored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_NODOS_ARCHIVADOS') : null;
        if (archStored) {
          let arch = JSON.parse(archStored) || [];
          arch = arch.filter(x => x.id !== id);
          if (typeof localStorage.setItem === 'function') {
            localStorage.setItem('VRDE_NODOS_ARCHIVADOS', JSON.stringify(arch));
          }
          LUNAR_CONFIG._nodosArchivados = arch;
        }
      } catch(e){}
    }
    return true;
  }

  // =================================================================
  // BANCO DE RECURSOS Y MEDIATECA DE DIFUSIÓN (DRIVE VRDE)
  // =================================================================

  /**
   * Obtiene todos los recursos de la Mediateca de difusión
   */
  static obtenerRecursosMediateca(filtroCiclo = null) {
    let recursos = LUNAR_CONFIG.recursosMediateca || [];
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_RECURSOS_MEDIATECA') : null;
        if (stored) {
          recursos = JSON.parse(stored);
        }
      } catch(e){}
    }

    if (filtroCiclo && filtroCiclo !== 'TODOS') {
      return recursos.filter(r => !r.cicloId || r.cicloId === 'TODOS' || r.cicloId === filtroCiclo);
    }
    return recursos;
  }

  /**
   * Guarda o actualiza un recurso en la Mediateca
   */
  static guardarRecursoMediateca(recursoData) {
    const recursos = this.obtenerRecursosMediateca();
    const id = recursoData.id || ('REC-' + Date.now().toString(36).toUpperCase());
    
    const existingIndex = recursos.findIndex(r => r.id === id);
    const item = {
      id: id,
      titulo: (recursoData.titulo || 'Sin título').trim(),
      tipo: recursoData.tipo || 'imagen', // imagen, video, texto, documento, enlace
      categoria: recursoData.categoria || 'Flyers & Gráficas',
      cicloId: recursoData.cicloId || 'TODOS',
      url: (recursoData.url || '').trim(),
      formato: recursoData.formato || 'JPG / Imagen',
      descripcion: (recursoData.descripcion || '').trim(),
      copyTexto: (recursoData.copyTexto || '').trim(),
      fechaCreacion: recursoData.fechaCreacion || new Date().toISOString().split('T')[0]
    };

    if (existingIndex >= 0) {
      recursos[existingIndex] = item;
    } else {
      recursos.unshift(item);
    }

    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_RECURSOS_MEDIATECA', JSON.stringify(recursos));
    }
    LUNAR_CONFIG.recursosMediateca = recursos;
    return item;
  }

  /**
   * Elimina un recurso de la Mediateca
   */
  static eliminarRecursoMediateca(recursoId) {
    let recursos = this.obtenerRecursosMediateca();
    recursos = recursos.filter(r => r.id !== recursoId);
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_RECURSOS_MEDIATECA', JSON.stringify(recursos));
    }
    LUNAR_CONFIG.recursosMediateca = recursos;
    return true;
  }

  /**
   * Obtiene los Vrdedores de un nodo específico
   */
  static obtenerVrdedoresNodo(nodoId) {
    const nodos = this.obtenerNodos();
    const nodeKeys = Object.keys(nodos);
    const safeKey = nodoId && nodos[nodoId.toLowerCase()] ? nodoId.toLowerCase() : (nodeKeys[0] || 'vicente_lopez');
    const n = nodos[safeKey] || {};
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
   * Edita completamente un pedido existente y lo sincroniza en persistencia
   */
  static actualizarPedidoCompleto(pedidoId, nuevosDatos) {
    let pedidos = this.obtenerPedidos(null, 'ALL');
    const index = pedidos.findIndex(p => String(p.id) === String(pedidoId));
    if (index > -1) {
      pedidos[index] = { ...pedidos[index], ...nuevosDatos, updatedAt: new Date().toISOString() };
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
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
   * Elimina un pedido/compra individual de la base de datos
   */
  static eliminarPedido(pedidoId) {
    let pedidos = this.obtenerPedidos(null, 'ALL');
    const filtered = pedidos.filter(p => String(p.id) !== String(pedidoId));
    if (filtered.length !== pedidos.length) {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(filtered));
      }
      return true;
    }
    return false;
  }

  /**
   * Actualiza los datos de un Socio en la base de datos y en sus compras asociadas
   */
  static actualizarSocio(identificador, nuevosDatos) {
    let pedidos = this.obtenerPedidos(null, 'ALL');
    const cleanPhone = (identificador || '').replace(/\D/g, '');
    const cleanName = (identificador || '').toLowerCase().trim();

    let updatedCount = 0;
    pedidos.forEach(p => {
      const pPhone = (p.telefono || '').replace(/\D/g, '');
      const pName = (p.nombre || '').toLowerCase().trim();

      const match = (cleanPhone && pPhone === cleanPhone) || (cleanName && pName === cleanName) || (p.socioId === identificador);
      if (match) {
        if (nuevosDatos.nombre) p.nombre = nuevosDatos.nombre;
        if (nuevosDatos.telefono) p.telefono = nuevosDatos.telefono;
        if (nuevosDatos.direccion !== undefined) p.direccionEntrega = nuevosDatos.direccion;
        if (nuevosDatos.vrdedor) p.vrdedor = nuevosDatos.vrdedor;
        if (nuevosDatos.nodoId) {
          p.nodoId = nuevosDatos.nodoId;
          const nodos = this.obtenerNodos();
          if (nodos[nuevosDatos.nodoId]) p.nodo = nodos[nuevosDatos.nodoId].nombre;
        }
        updatedCount++;
      }
    });

    if (updatedCount > 0 && typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(pedidos));
    }
    return updatedCount;
  }

  /**
   * Elimina un socio y todas sus compras/registros de la base de datos
   */
  static eliminarSocio(identificador) {
    let pedidos = this.obtenerPedidos(null, 'ALL');
    const cleanPhone = (identificador || '').replace(/\D/g, '');
    const cleanName = (identificador || '').toLowerCase().trim();

    const filtered = pedidos.filter(p => {
      const pPhone = (p.telefono || '').replace(/\D/g, '');
      const pName = (p.nombre || '').toLowerCase().trim();
      const match = (cleanPhone && pPhone === cleanPhone) || (cleanName && pName === cleanName) || (p.socioId === identificador);
      return !match;
    });

    if (filtered.length !== pedidos.length) {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(filtered));
      }
      return true;
    }
    return false;
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

          // Buscar variante si existe
          const variant = (p.variantes && it.variantId) 
            ? (p.variantes.find(v => v.id === it.variantId || v.label === it.variantId) || p.variantes[0]) 
            : (p.variantes ? p.variantes[0] : p);

          const targetObj = variant || p;
          const costoUnit = LunarEngine.obtenerCostoUnitarioPresentacion(p, variant);
          const saleUnit = it.precioUnitario || variant.p1 || targetObj.p1 || 10000;
          
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

  // =================================================================
  // ASTRONOMÍA LUNAR & CALENDARIO INTERACTIVO
  // =================================================================

  /**
   * Calcula la fase lunar astronómica exacta, iluminación y signo zodiacal para cualquier fecha
   */
  static obtenerFaseLunar(dateParam = new Date()) {
    const date = (dateParam instanceof Date) ? dateParam : new Date(dateParam);
    // Ancla astronómica: Luna Nueva del 18 de Enero de 2026, 17:52 UTC
    const anchor = new Date(Date.UTC(2026, 0, 18, 17, 52, 0));
    const synodicMonth = 29.53058770576; // días por lunación

    const diffDays = (date.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24);
    let phaseDays = diffDays % synodicMonth;
    if (phaseDays < 0) phaseDays += synodicMonth;

    const phaseNormalized = phaseDays / synodicMonth; // 0 a 1
    const illumination = Math.round((1 - Math.cos(phaseNormalized * 2 * Math.PI)) / 2 * 100);

    let phaseName = '';
    let emoji = '🌑';
    let isPrincipal = false;
    let principalType = null;

    if (phaseDays < 1.4 || phaseDays >= 28.1) {
      phaseName = 'Luna Nueva';
      emoji = '🌑';
      isPrincipal = true;
      principalType = 'NUEVA';
    } else if (phaseDays < 6.4) {
      phaseName = 'Luna Creciente';
      emoji = '🌒';
    } else if (phaseDays < 8.4) {
      phaseName = 'Cuarto Creciente';
      emoji = '🌓';
      isPrincipal = true;
      principalType = 'CRECIENTE';
    } else if (phaseDays < 13.6) {
      phaseName = 'Gibosa Creciente';
      emoji = '🌔';
    } else if (phaseDays < 16.0) {
      phaseName = 'Luna Llena';
      emoji = '🌕';
      isPrincipal = true;
      principalType = 'LLENA';
    } else if (phaseDays < 20.8) {
      phaseName = 'Gibosa Menguante';
      emoji = '🌖';
    } else if (phaseDays < 23.0) {
      phaseName = 'Cuarto Menguante';
      emoji = '🌗';
      isPrincipal = true;
      principalType = 'MENGUANTE';
    } else {
      phaseName = 'Luna Menguante';
      emoji = '🌘';
    }

    const zodiacSigns = [
      'Aries ♈', 'Tauro ♉', 'Géminis ♊', 'Cáncer ♋', 
      'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Escorpio ♏', 
      'Sagitario ♐', 'Capricornio ♑', 'Acuario ♒', 'Piscis ♓'
    ];
    const zodiacDays = 27.321661; // mes sideral
    const diffSidereal = (date.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24);
    let siderealDays = diffSidereal % zodiacDays;
    if (siderealDays < 0) siderealDays += zodiacDays;
    const signIndex = Math.floor(((siderealDays / zodiacDays) * 12 + 9) % 12);
    const zodiacSign = zodiacSigns[signIndex];

    return {
      phaseName,
      emoji,
      phaseNormalized,
      phaseDays: parseFloat(phaseDays.toFixed(1)),
      illumination,
      zodiacSign,
      isPrincipal,
      principalType
    };
  }

  /**
   * Genera la grilla de días con fases lunares y eventos del ciclo para un mes específico
   */
  static obtenerCalendarioMes(year, monthIndex) {
    const mesesFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const cicloActivo = this.obtenerCicloActual();

    const inicioMes = new Date(year, monthIndex, 1);
    const totalDiasMes = new Date(year, monthIndex + 1, 0).getDate();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Ajustar para empezar en Lunes (0 = Lun, 6 = Dom)
    let diaSemanaPrimerDia = inicioMes.getDay() - 1;
    if (diaSemanaPrimerDia < 0) diaSemanaPrimerDia = 6;

    const totalDiasPrevio = new Date(year, monthIndex, 0).getDate();
    const dias = [];

    // Días del mes anterior para completar la primera semana
    for (let i = diaSemanaPrimerDia - 1; i >= 0; i--) {
      const dNum = totalDiasPrevio - i;
      const dDate = new Date(year, monthIndex - 1, dNum);
      dDate.setHours(12, 0, 0, 0);
      dias.push({
        num: dNum,
        date: dDate,
        isCurrentMonth: false,
        isToday: false,
        phase: this.obtenerFaseLunar(dDate)
      });
    }

    // Fechas clave del ciclo activo para resaltar
    const cicloInicioDate = new Date(cicloActivo.nuevaFecha);
    cicloInicioDate.setHours(0, 0, 0, 0);
    const cicloCierreDate = new Date(cicloActivo.llenaFecha);
    cicloCierreDate.setHours(0, 0, 0, 0);
    const cicloEntregaDate = cicloActivo.entregaFecha ? new Date(cicloActivo.entregaFecha) : null;
    if (cicloEntregaDate) cicloEntregaDate.setHours(0, 0, 0, 0);

    // Días del mes actual
    for (let d = 1; d <= totalDiasMes; d++) {
      const dDate = new Date(year, monthIndex, d);
      dDate.setHours(12, 0, 0, 0);
      const dDateZero = new Date(year, monthIndex, d);
      dDateZero.setHours(0, 0, 0, 0);

      const isToday = dDateZero.getTime() === hoy.getTime();
      const phase = this.obtenerFaseLunar(dDate);

      const isInicio = dDateZero.getTime() === cicloInicioDate.getTime();
      const isCierre = dDateZero.getTime() === cicloCierreDate.getTime();
      const isEntrega = cicloEntregaDate && dDateZero.getTime() === cicloEntregaDate.getTime();

      let eventoCiclo = null;
      if (isInicio) eventoCiclo = { tipo: 'INICIO', label: '🟢 Apertura Tienda', color: '#16A34A' };
      else if (isCierre) eventoCiclo = { tipo: 'CIERRE', label: '🟡 Cierre Pedidos', color: '#D97706' };
      else if (isEntrega) eventoCiclo = { tipo: 'ENTREGA', label: '📦 Entrega en Nodos', color: '#6366F1' };

      dias.push({
        num: d,
        date: dDate,
        isCurrentMonth: true,
        isToday: isToday,
        phase: phase,
        isInicio: isInicio,
        isCierre: isCierre,
        isEntrega: isEntrega,
        eventoCiclo: eventoCiclo
      });
    }

    // Días del mes siguiente para completar la última semana
    const rest = (7 - (dias.length % 7)) % 7;
    for (let j = 1; j <= rest; j++) {
      const dDate = new Date(year, monthIndex + 1, j);
      dDate.setHours(12, 0, 0, 0);
      dias.push({
        num: j,
        date: dDate,
        isCurrentMonth: false,
        isToday: false,
        phase: this.obtenerFaseLunar(dDate)
      });
    }

    // Detectar exactamente 1 día por cada fase principal (sin duplicados)
    const targets = [
      { type: 'NUEVA', val: 0.0, name: 'Luna Nueva', emoji: '🌑' },
      { type: 'CRECIENTE', val: 0.25, name: 'Cuarto Creciente', emoji: '🌓' },
      { type: 'LLENA', val: 0.50, name: 'Luna Llena', emoji: '🌕' },
      { type: 'MENGUANTE', val: 0.75, name: 'Cuarto Menguante', emoji: '🌗' }
    ];

    for (let i = 0; i < dias.length; i++) {
      dias[i].phase.isPrincipal = false;
      dias[i].phase.principalType = null;

      const pCurr = dias[i].phase.phaseNormalized;
      const pPrev = (i > 0) ? dias[i - 1].phase.phaseNormalized : (pCurr - 1/29.53);
      const pNext = (i < dias.length - 1) ? dias[i + 1].phase.phaseNormalized : (pCurr + 1/29.53);

      for (const t of targets) {
        const dCurr = Math.min(Math.abs(pCurr - t.val), Math.abs(pCurr - (t.val + 1)), Math.abs(pCurr - (t.val - 1)));
        const dPrev = Math.min(Math.abs(pPrev - t.val), Math.abs(pPrev - (t.val + 1)), Math.abs(pPrev - (t.val - 1)));
        const dNext = Math.min(Math.abs(pNext - t.val), Math.abs(pNext - (t.val + 1)), Math.abs(pNext - (t.val - 1)));

        if (dCurr <= dPrev && dCurr <= dNext && dCurr < 0.025) {
          dias[i].phase.isPrincipal = true;
          dias[i].phase.principalType = t.type;
          dias[i].phase.principalName = t.name;
          dias[i].phase.principalEmoji = t.emoji;
        }
      }
    }

    return {
      year,
      monthIndex,
      monthName: mesesFull[monthIndex],
      dias
    };
  }

  /**
   * Obtiene la lista de todos los ciclos lunares configurados (vigentes y archivados)
   */
  static obtenerListaCiclos() {
    const hoy = new Date();
    const mesesFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    let baseList = LUNAR_CONFIG.ciclosLunares;
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const stored = localStorage.getItem('VRDE_CICLOS_LUNARES');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) baseList = parsed;
        } catch(e) {}
      }
    }

    const activoId = this.obtenerIdCicloActivo();

    return baseList.map(c => {
      const nuevaF = (c.nuevaFecha instanceof Date) ? c.nuevaFecha : new Date(c.nuevaFecha || '2026-08-12');
      const llenaF = (c.llenaFecha instanceof Date) ? c.llenaFecha : new Date(c.llenaFecha || '2026-08-28');
      const entregaF = c.entregaFecha ? ((c.entregaFecha instanceof Date) ? c.entregaFecha : new Date(c.entregaFecha)) : new Date(llenaF.getTime() + (7 * 24 * 3600 * 1000));
      
      const esVigente = (c.id === activoId);
      
      const milisegundosRestantes = llenaF.getTime() - hoy.getTime();
      const diasRestantes = Math.max(0, Math.ceil(milisegundosRestantes / (1000 * 3600 * 24)));
      const abierta = hoy >= nuevaF && hoy <= llenaF;
      const llenaFechaStr = `${llenaF.getDate()} de ${mesesFull[llenaF.getMonth()]}`;
      const nuevaFechaStr = `${nuevaF.getDate()} de ${mesesFull[nuevaF.getMonth()]}`;
      const entregaFechaStr = `${entregaF.getDate()} de ${mesesFull[entregaF.getMonth()]}`;

      return {
        id: c.id,
        nombre: c.nombreLlena || c.nombre || `🌑 Luna Llena en ${c.llenaSigno || 'Piscis'}`,
        nombreLlena: c.nombreLlena || c.nombre,
        llenaSigno: c.llenaSigno || 'Piscis',
        nuevaSigno: c.nuevaSigno || 'Leo',
        mesStr: c.mesStr || `${mesesFull[llenaF.getMonth()]} ${llenaF.getFullYear()}`,
        nuevaFecha: nuevaF,
        llenaFecha: llenaF,
        entregaFecha: entregaF,
        nuevaFechaStr: nuevaFechaStr,
        llenaFechaStr: llenaFechaStr,
        entregaFechaStr: entregaFechaStr,
        diasRestantes: diasRestantes,
        abierta: abierta,
        esVigente: esVigente,
        mensajeTienda: c.mensajeTienda || '',
        archivado: !esVigente && (c.archivado === true || hoy > llenaF),
        badge: esVigente ? 'Compra Vigente' : 'Archivada'
      };
    });
  }

  /**
   * Obtiene el ID del ciclo activo en el sistema
   */
  static obtenerIdCicloActivo() {
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const stored = localStorage.getItem('VRDE_CICLO_ACTIVO');
      if (stored) return stored;
    }
    return 'piscis-ago-2026';
  }

  /**
   * Activa un ciclo como el vigente para toda la tienda y red
   */
  static activarCiclo(cicloId) {
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_CICLO_ACTIVO', cicloId);
    }
    return this.obtenerCicloActual();
  }

  /**
   * Guarda o actualiza la configuración de un ciclo lunar
   */
  static guardarCicloConfigurado(cicloData) {
    let lista = this.obtenerListaCiclos();
    const idx = lista.findIndex(c => c.id === cicloData.id);

    const formatData = {
      id: cicloData.id || (`ciclo_${Date.now()}`),
      nombre: cicloData.nombre || '🌑 Luna Llena',
      nombreLlena: cicloData.nombre || '🌑 Luna Llena',
      llenaSigno: cicloData.llenaSigno || 'Piscis',
      nuevaSigno: cicloData.nuevaSigno || 'Leo',
      mesStr: cicloData.mesStr || '',
      nuevaFecha: new Date(cicloData.nuevaFecha),
      llenaFecha: new Date(cicloData.llenaFecha),
      entregaFecha: cicloData.entregaFecha ? new Date(cicloData.entregaFecha) : new Date(new Date(cicloData.llenaFecha).getTime() + (7 * 24 * 3600 * 1000)),
      mensajeTienda: cicloData.mensajeTienda || '',
      archivado: false
    };

    if (idx >= 0) {
      lista[idx] = { ...lista[idx], ...formatData };
    } else {
      lista.push(formatData);
    }

    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_CICLOS_LUNARES', JSON.stringify(lista));
      if (cicloData.activar !== false) {
        localStorage.setItem('VRDE_CICLO_ACTIVO', formatData.id);
      }
    }
    return formatData;
  }

  /**
   * Obtiene la información de un ciclo por su ID
   */
  static obtenerCicloPorId(cicloId) {
    const lista = this.obtenerListaCiclos();
    const found = lista.find(c => c.id === cicloId);
    return found || this.obtenerCicloActual();
  }

  // =================================================================
  // GESTIÓN DE SEGURIDAD, PINs Y CONTRASEÑAS
  // =================================================================

  /**
   * Obtiene los PINs maestros autorizados para el Super Admin
   */
  static obtenerMasterPins() {
    let pins = ['9999', '1234', '0000', 'vrde2026'];
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const stored = localStorage.getItem('VRDE_MASTER_PINS');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) pins = parsed;
        } catch(e) {}
      }
    }
    return pins;
  }

  /**
   * Guarda un nuevo PIN Maestro de Super Admin
   */
  static guardarMasterPin(nuevoPin) {
    let pins = this.obtenerMasterPins();
    const cleanPin = String(nuevoPin).trim();
    if (!cleanPin) return false;
    
    // Poner el nuevo PIN al principio como el principal
    pins = pins.filter(p => p !== cleanPin);
    pins.unshift(cleanPin);

    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('VRDE_MASTER_PINS', JSON.stringify(pins));
    }
    return true;
  }

  /**
   * Guarda o actualiza el PIN de acceso de un Nodo Almacén
   */
  static guardarNodoPin(nodoId, nuevoPin) {
    const nodos = this.obtenerNodos();
    const key = String(nodoId).toLowerCase();
    if (!nodos[key]) return false;
    
    nodos[key].pin = String(nuevoPin).trim();
    this.guardarNodos(nodos);
    return true;
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
      try {
        const stored = (typeof localStorage.getItem === 'function') ? localStorage.getItem('VRDE_PEDIDOS') : null;
        if (stored) {
          pedidos = JSON.parse(stored);
        } else if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('VRDE_PEDIDOS', JSON.stringify(pedidos));
        }
      } catch(e){}
    }

    // Filtro por Nodo
    if (nodoId && nodoId !== 'ALL') {
      pedidos = pedidos.filter(p => (p.nodoId || '').toLowerCase() === nodoId.toLowerCase() || (p.nodo || '').toLowerCase().includes(nodoId.toLowerCase()));
    }

    // Filtro por Ciclo Lunar
    if (cicloId && cicloId !== 'ALL') {
      const targetCicloId = (cicloId === 'VIGENTE') ? this.obtenerIdCicloActivo() : cicloId;
      pedidos = pedidos.filter(p => {
        if (!p.cicloId || p.cicloId === targetCicloId || p.cicloId === cicloId || p.cicloId === 'VIGENTE') return true;
        if (p.ciclo && (p.ciclo.includes(targetCicloId) || targetCicloId.includes(p.ciclo))) return true;
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
   * Obtiene el ciclo lunar actual o activo según la configuración y almacenamiento
   */
  static obtenerCicloActual(customDate = null) {
    const lista = this.obtenerListaCiclos();
    const activoId = this.obtenerIdCicloActivo();
    let cicloActual = lista.find(c => c.id === activoId);

    if (!cicloActual) {
      cicloActual = lista.find(c => c.esVigente) || lista.find(c => c.id === 'piscis-ago-2026') || lista[0];
    }

    const hoy = customDate ? new Date(customDate) : new Date();
    const nuevaF = (cicloActual.nuevaFecha instanceof Date) ? cicloActual.nuevaFecha : new Date(cicloActual.nuevaFecha || '2026-08-12');
    const llenaF = (cicloActual.llenaFecha instanceof Date) ? cicloActual.llenaFecha : new Date(cicloActual.llenaFecha || '2026-08-28');
    const entregaF = cicloActual.entregaFecha ? ((cicloActual.entregaFecha instanceof Date) ? cicloActual.entregaFecha : new Date(cicloActual.entregaFecha)) : new Date(llenaF.getTime() + (7 * 24 * 3600 * 1000));
    
    const mesesAbbr = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const mesesFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesIndex = nuevaF.getMonth();
    const ano = nuevaF.getFullYear();
    const nombre = cicloActual.nombreLlena || cicloActual.nombre || `🌑 Luna Llena en ${cicloActual.llenaSigno || 'Piscis'}`;
    
    const milisegundosRestantes = llenaF.getTime() - hoy.getTime();
    const diasRestantes = Math.max(0, Math.ceil(milisegundosRestantes / (1000 * 3600 * 24)));
    const abierta = hoy >= nuevaF && hoy <= llenaF;
    
    const duracionTotalMs = Math.max(1, llenaF.getTime() - nuevaF.getTime());
    const transcurridoMs = Math.max(0, hoy.getTime() - nuevaF.getTime());
    const porcentajeCiclo = Math.min(100, Math.max(0, Math.round((transcurridoMs / duracionTotalMs) * 100)));

    return {
      id: cicloActual.id,
      nombre: nombre,
      nombreComercial: nombre,
      nombreCompleto: `${nombre} (${mesesFull[mesIndex]} ${ano})`,
      signo: cicloActual.nuevaSigno,
      llenaSigno: cicloActual.llenaSigno,
      nuevaSigno: cicloActual.nuevaSigno,
      mesStr: cicloActual.mesStr || `${mesesAbbr[mesIndex]} ${ano}`,
      nuevaFecha: nuevaF,
      llenaFecha: llenaF,
      entregaFecha: entregaF,
      nuevaFechaStr: `${nuevaF.getDate()} de ${mesesFull[mesIndex]}`,
      llenaFechaStr: `${llenaF.getDate()} de ${mesesFull[llenaF.getMonth()]}`,
      entregaFechaStr: `${entregaF.getDate()} de ${mesesFull[entregaF.getMonth()]}`,
      diasRestantes: diasRestantes,
      abierta: abierta,
      esVigente: true,
      mensajeTienda: cicloActual.mensajeTienda || '',
      porcentajeCiclo: porcentajeCiclo
    };
  }

  static obtenerCicloVigente() {
    return this.obtenerCicloActual();
  }

  /**
   * Obtiene el volumen/peso total acumulado pedido en toda la red para un producto en el ciclo lunar actual
   * Suma todas las presentaciones convirtiéndolas a su unidad global (ej: kg, litros)
   */
  static obtenerVolumenAcumuladoProducto(prodId, cicloId = null) {
    const pedidos = this.obtenerPedidos(null, cicloId || 'VIGENTE');
    const prods = this.obtenerProductos(null, false);
    const prod = prods.find(p => p.id === prodId);
    if (!prod) return 0;

    let totalVolumen = 0;
    pedidos.forEach(o => {
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach(it => {
          if (it.prodId === prodId) {
            const cant = Number(it.cant) || Number(it.unidades) || 0;
            let factor = 1;
            if (prod.variantes && it.variantId) {
              const v = prod.variantes.find(vr => vr.id === it.variantId || vr.label === it.variantId);
              if (v && v.pesoFactor !== undefined && v.pesoFactor !== null) {
                factor = Number(v.pesoFactor);
              } else if (v) {
                const uStr = (v.unidad || v.label || '').toLowerCase();
                if (uStr.includes('500g') || uStr.includes('1/2')) factor = 0.5;
                else if (uStr.includes('100g')) factor = 0.1;
                else if (uStr.includes('250g') || uStr.includes('1/4')) factor = 0.25;
                else if (uStr.includes('2l') || uStr.includes('2 litros') || uStr.includes('2 lt')) factor = 2;
                else if (uStr.includes('5l') || uStr.includes('5 litros') || uStr.includes('5 lt')) factor = 5;
                else if (uStr.includes('25kg') || uStr.includes('25 kg')) factor = 25;
                else if (uStr.includes('5kg') || uStr.includes('5 kg')) factor = 5;
              }
            }
            totalVolumen += (cant * factor);
          }
        });
      }
    });
    return Math.round(totalVolumen * 100) / 100;
  }

  /**
   * Obtiene la escala de costo global del productor según el volumen total acumulado en toda la red
   */
  static obtenerCostoGlobalProductor(prodOrId, volumenParam = null) {
    const prod = typeof prodOrId === 'string' 
      ? this.obtenerProductos(null, false).find(p => p.id === prodOrId) 
      : prodOrId;
    if (!prod) return { costoBase: 0, tier: 1, volumenActual: 0, metaActual: 10, metaSiguiente: 20, faltante: 0, unidadGlobal: 'kg' };

    const volumen = (volumenParam !== null && volumenParam !== undefined) 
      ? Number(volumenParam) 
      : this.obtenerVolumenAcumuladoProducto(prod.id);

    const unidadGlobal = prod.unidadGlobal || prod.unidad || 'kg';
    const m1 = Number(prod.m1 || 10);
    const m2 = Number(prod.m2 || 20);
    const m3 = Number(prod.m3 || 40);

    const c1 = Number(prod.costo || 0);
    const c2 = Number(prod.costo2 || (c1 ? Math.round(c1 * 0.92) : 0));
    const c3 = Number(prod.costo3 || (c1 ? Math.round(c1 * 0.82) : 0));

    if (m3 > 0 && volumen >= m3) {
      return {
        tier: 3,
        tierName: 'Meta Cumplida (Máximo Descuento)',
        costoBase: c3,
        volumenActual: volumen,
        unidadGlobal,
        metaActual: m3,
        metaSiguiente: null,
        faltante: 0,
        porcentajeMeta: 100,
        m1, m2, m3, c1, c2, c3
      };
    } else if (m2 > 0 && volumen >= m2) {
      return {
        tier: 2,
        tierName: 'Meta Intermedia',
        costoBase: c2,
        volumenActual: volumen,
        unidadGlobal,
        metaActual: m2,
        metaSiguiente: m3,
        faltante: Math.max(0, m3 - volumen),
        porcentajeMeta: Math.min(100, Math.round((volumen / m3) * 100)),
        m1, m2, m3, c1, c2, c3
      };
    } else {
      return {
        tier: 1,
        tierName: 'Nivel Base Inicial',
        costoBase: c1,
        volumenActual: volumen,
        unidadGlobal,
        metaActual: m1,
        metaSiguiente: m2,
        faltante: Math.max(0, m2 - volumen),
        porcentajeMeta: Math.min(100, Math.round((volumen / (m2 || 20)) * 100)),
        m1, m2, m3, c1, c2, c3
      };
    }
  }

  /**
   * Obtiene el costo de una presentación particular en base al costo global del productor alcanzado por la red
   */
  static obtenerCostoUnitarioPresentacion(prod, variant, volumenGlobal = null) {
    const escalaGlobal = this.obtenerCostoGlobalProductor(prod, volumenGlobal);
    const factor = (variant && variant.pesoFactor !== undefined && variant.pesoFactor !== null) 
      ? Number(variant.pesoFactor) 
      : 1.0;
    
    return Math.round(escalaGlobal.costoBase * factor);
  }

  /**
   * Obtiene el costo base y precio activo de un producto/variante según las unidades acumuladas en la red (compatibilidad)
   */
  static obtenerEscalaColectiva(itemOrVariant, unidadesAcumuladas = null, prodId = null) {
    return this.obtenerCostoGlobalProductor(prodId || itemOrVariant, unidadesAcumuladas);
  }

  /**
   * Obtiene las unidades totales acumuladas
   */
  static obtenerUnidadesAcumuladasProducto(prodId, cicloId = null) {
    return this.obtenerVolumenAcumuladoProducto(prodId, cicloId);
  }

  /**
   * Calcula el precio de un producto según las unidades acumuladas en la red
   */
  static calcularPrecio(prod, unidadesTotales) {
    const escala = this.obtenerEscalaColectiva(prod, unidadesTotales);
    return {
      precio: escala.precioVenta,
      costo: escala.costoBase,
      tier: escala.tier,
      tierName: escala.tierName,
      metaSiguiente: escala.metaSiguiente,
      unidadesFaltantes: escala.unidadesFaltantes
    };
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
        `"${s.tipoEntregaHabitual || ''}"`,
        `"${(s.direccion || '').replace(/"/g, '""')}"`,
        s.pedidosCount || 0,
        s.unidadesCount || 0,
        s.totalGastado || 0,
        `"${s.ultimaLuna || ''}"`,
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

  // ==========================================
  // CÍRCULOS Y GRUPOS DE COMPRA COMUNITARIOS
  // ==========================================
  static obtenerCirculos(nodoId = null, soloAbiertos = false) {
    let circulos = [];
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('VRDE_CIRCULOS');
        if (stored) circulos = JSON.parse(stored);
      } catch(e){}
    }
    if (!circulos || circulos.length === 0) {
      circulos = [
        {
          id: 'circulo-maipu-101',
          slug: 'vecinos-edificio-maipu',
          nombre: 'Vecinos Edificio Maipú',
          anfitrion: 'Ramiro Stein',
          whatsapp: '1148291029',
          nodoId: 'lomaverde',
          direccionEntrega: 'Maipú 450 (Hall PB)',
          privacidad: 'abierto',
          creadoEn: '2026-08-20',
          activo: true
        },
        {
          id: 'circulo-familia-gomez',
          slug: 'familia-gomez',
          nombre: 'Familia Gómez & Amigos',
          anfitrion: 'Mariana Gómez',
          whatsapp: '1159203948',
          nodoId: 'lomaverde',
          direccionEntrega: 'Los Álamos 120',
          privacidad: 'abierto',
          creadoEn: '2026-08-22',
          activo: true
        },
        {
          id: 'circulo-san-isidro-eco',
          slug: 'vecinos-plaza-mitre',
          nombre: 'Vecinos Plaza Mitre',
          anfitrion: 'Esteban Paz',
          whatsapp: '1169304123',
          nodoId: 'vicentelopez',
          direccionEntrega: 'Mitre 250 (Frente a la plaza)',
          privacidad: 'abierto',
          creadoEn: '2026-08-24',
          activo: true
        }
      ];
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem('VRDE_CIRCULOS', JSON.stringify(circulos)); } catch(e){}
      }
    }

    let resultado = circulos.filter(c => c.activo !== false);

    if (nodoId && nodoId !== 'ALL') {
      resultado = resultado.filter(c => c.nodoId === nodoId);
    }
    if (soloAbiertos) {
      resultado = resultado.filter(c => c.privacidad !== 'cerrado');
    }
    return resultado;
  }

  static obtenerCirculo(idOrSlug, fallbackParams = null) {
    if (!idOrSlug) return null;
    const lista = this.obtenerCirculos();
    const query = String(idOrSlug).toLowerCase().trim();
    let encontrado = lista.find(c => c.id === query || c.slug === query || c.id === idOrSlug || (c.slug && c.slug.toLowerCase() === query));
    
    if (encontrado) return encontrado;

    // Rescate / Auto-registro universal desde parámetros de URL para cross-device
    let params = fallbackParams;
    if (!params && typeof window !== 'undefined' && window.location) {
      params = new URLSearchParams(window.location.search);
    }

    if (params) {
      const cNom = params.get('c_nom') || params.get('circName');
      if (cNom) {
        const cAnf = params.get('c_anf') || params.get('circHost') || 'Anfitrión del Círculo';
        const cWsp = params.get('c_wsp') || params.get('circWsp') || '';
        const cRef = params.get('ref') || 'lomaverde';
        const cTipo = params.get('c_tipo') || 'abierto';
        const cDir = params.get('c_dir') || '';

        const autoCirculo = {
          id: 'circulo-' + query,
          slug: query,
          nombre: decodeURIComponent(cNom),
          anfitrion: decodeURIComponent(cAnf),
          whatsapp: decodeURIComponent(cWsp),
          nodoId: cRef,
          direccionEntrega: decodeURIComponent(cDir),
          privacidad: cTipo,
          creadoEn: new Date().toISOString(),
          activo: true
        };

        lista.unshift(autoCirculo);
        if (typeof localStorage !== 'undefined') {
          try { localStorage.setItem('VRDE_CIRCULOS', JSON.stringify(lista)); } catch(e){}
        }

        // Sincronizar con Firestore si está disponible
        if (typeof window !== 'undefined' && window.vrdeFirebaseDb) {
          try {
            import("https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js").then(({ doc, setDoc }) => {
              setDoc(doc(window.vrdeFirebaseDb, "circulos", autoCirculo.id), autoCirculo, { merge: true });
            });
          } catch(e){}
        }

        return autoCirculo;
      }
    }

    return null;
  }

  static crearCirculo(datos) {
    const lista = this.obtenerCirculos();
    const rawNombre = datos.nombre || 'circulo';
    const slug = rawNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = 'circulo-' + slug + '-' + Math.floor(Math.random() * 900 + 100);

    const nuevoCirculo = {
      id: id,
      slug: slug || id,
      nombre: datos.nombre,
      anfitrion: datos.anfitrion,
      whatsapp: datos.whatsapp,
      nodoId: datos.nodoId || 'lomaverde',
      direccionEntrega: datos.direccionEntrega || '',
      privacidad: datos.privacidad || 'abierto', // 'abierto' | 'cerrado'
      notas: datos.notas || '',
      creadoEn: new Date().toISOString(),
      activo: true
    };

    lista.unshift(nuevoCirculo);
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem('VRDE_CIRCULOS', JSON.stringify(lista)); } catch(e){}
    }

    // Sincronización en Firebase Firestore en tiempo real
    if (typeof window !== 'undefined' && window.vrdeFirebaseDb) {
      try {
        import("https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js").then(({ doc, setDoc }) => {
          setDoc(doc(window.vrdeFirebaseDb, "circulos", nuevoCirculo.id), nuevoCirculo, { merge: true });
        });
      } catch(e){
        console.warn("Error sync Firestore al crear círculo:", e);
      }
    }

    return nuevoCirculo;
  }

  static generarLinkCirculo(circulo, baseUrl = null) {
    if (!circulo) return '';
    const base = baseUrl || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : 'https://www.vrde.club/tienda.html');
    const params = new URLSearchParams();
    params.set('ref', circulo.nodoId || 'lomaverde');
    params.set('circulo', circulo.slug || circulo.id);
    params.set('c_nom', circulo.nombre || '');
    params.set('c_anf', circulo.anfitrion || '');
    if (circulo.whatsapp) params.set('c_wsp', circulo.whatsapp);
    if (circulo.privacidad) params.set('c_tipo', circulo.privacidad);
    if (circulo.direccionEntrega) params.set('c_dir', circulo.direccionEntrega);
    return `${base}?${params.toString()}`;
  }

  static obtenerPedidosCirculo(circuloId, cicloId = null) {
    const pedidos = this.obtenerPedidos(null, cicloId || 'VIGENTE');
    return pedidos.filter(p => p.circuloId === circuloId || p.circuloSlug === circuloId);
  }

  static obtenerEstadisticasCirculo(circuloId, cicloId = null) {
    const circulo = this.obtenerCirculo(circuloId);
    const pedidos = this.obtenerPedidosCirculo(circuloId, cicloId);
    const total = pedidos.reduce((acc, p) => acc + (Number(p.total) || 0), 0);
    const unidades = pedidos.reduce((acc, p) => acc + (Number(p.unidades) || 0), 0);
    const miembrosSet = new Set(pedidos.map(p => (p.nombre || '').toLowerCase().trim()).filter(Boolean));
    const ahorroEstimado = Math.round(total * 0.12);

    return {
      circulo: circulo,
      pedidos: pedidos,
      integrantesCount: miembrosSet.size,
      unidadesTotal: unidades,
      totalRecaudado: total,
      ahorroEstimado: ahorroEstimado
    };
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

      // 1. Escuchador en tiempo real de Pedidos en Firestore con Merge por ID único
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

      // 2. Escuchador en tiempo real de Círculos en Firestore
      onSnapshot(collection(db, "circulos"), (snapshot) => {
        if (!snapshot.empty) {
          const remoteCirculos = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

          let localCirculos = [];
          try {
            const stored = localStorage.getItem('VRDE_CIRCULOS');
            if (stored) localCirculos = JSON.parse(stored);
          } catch(e){}

          const circMap = {};
          localCirculos.forEach(c => { if (c && c.id) circMap[c.id] = c; });
          remoteCirculos.forEach(c => { if (c && c.id) circMap[c.id] = c; });

          const mergedCirculos = Object.values(circMap);
          localStorage.setItem('VRDE_CIRCULOS', JSON.stringify(mergedCirculos));
          window.dispatchEvent(new CustomEvent('vrde:circulos-updated'));
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

      console.log("🌱 Sincronización de Firebase Firestore (Pedidos y Círculos) activa en LunarEngine");
    } catch(e) {
      console.warn("Modo local sin conexión Firebase:", e);
    }
  };

  initFirebaseSync();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LunarEngine, LUNAR_CONFIG };
}
