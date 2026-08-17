import { useState } from 'react'

export default function Landing() {
  const [budget, setBudget] = useState(50000)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const openModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }

  return (
    <div className="antialiased">
      {/* Timeline Scroll Tracker (Mocked visually for now) */}
      <div className="fixed left-6 top-0 bottom-0 w-px bg-vrde-brand/20 hidden md:block z-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-vrde-brand bg-white rounded-full p-2 border border-vrde-brand/20">
          <i className="fas fa-leaf"></i>
        </div>
      </div>

      {/* Navegación */}
      <nav id="navbar" className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-vrde-brand/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center md:pl-28">
          <div className="flex flex-col leading-none cursor-pointer">
            <span className="font-pixel text-vrde-brand text-4xl font-bold tracking-widest uppercase" style={{ lineHeight: 0.8 }}>VRDE</span>
            <span className="text-[0.6rem] tracking-[0.4em] font-sans text-vrde-brand uppercase mt-1 font-semibold">.Club</span>
          </div>
          
          <div className="hidden lg:flex gap-8 font-sans font-medium text-sm text-gray-600 items-center">
            <a href="#origen" className="nav-link hover:text-vrde-brand transition-colors">El Origen</a>
            <a href="#ecosistema" className="nav-link hover:text-vrde-brand transition-colors">Ecosistema</a>
            <a href="#nodos" className="nav-link hover:text-vrde-brand transition-colors">Labor y Nodos</a>
            <a href="#economia" className="nav-link hover:text-vrde-brand transition-colors">Economía</a>
            <a href="/portal" className="nav-link text-vrde-brand font-bold bg-vrde-brand/10 px-4 py-2 rounded-full hover:bg-vrde-brand hover:text-white transition-all">Compra Lunar</a>
          </div>
          
          <button className="lg:hidden text-vrde-brand text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-vrde-brand/10 shadow-xl absolute w-full left-0 flex flex-col px-6 py-6 gap-4">
            <a href="#origen" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 font-medium hover:text-vrde-brand transition-colors">El Origen</a>
            <a href="#ecosistema" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 font-medium hover:text-vrde-brand transition-colors">Ecosistema</a>
            <a href="#nodos" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 font-medium hover:text-vrde-brand transition-colors">Labor y Nodos</a>
            <a href="#economia" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 font-medium hover:text-vrde-brand transition-colors">Economía</a>
            <a href="/portal" className="text-center text-vrde-brand font-bold bg-vrde-brand/10 px-4 py-4 rounded-xl hover:bg-vrde-brand hover:text-white transition-all mt-4 text-lg">Compra Lunar</a>
          </div>
        )}
      </nav>

      {/* INICIO / HERO */}
      <section id="inicio" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden pt-20 pb-16 px-6 md:pl-28 section-dark text-white bg-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-vrde-dark/90 mix-blend-multiply"></div>
        </div>
        
        <div className="z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="logo-v-container mb-8 relative">
            <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-3xl p-4 flex items-center justify-center border border-white/20 shadow-2xl">
              <i className="fas fa-seedling text-6xl text-vrde-light"></i>
            </div>
          </div>

          <h1 className="font-tech text-5xl md:text-7xl mb-6 leading-[1.1] font-bold text-white drop-shadow-lg">
            El club que sostiene <br/>
            <span className="text-vrde-light">la naturaleza.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-sans font-light">
            Somos una cooperativa acuariana que organiza la labor comunitaria para expandir la vida desde el campo hasta tu barrio. El sólido del cubo.
          </p>
          
          <a href="#origen" className="animate-bounce mt-8 text-white/50 hover:text-white transition-colors z-10">
            <i className="fas fa-chevron-down text-3xl"></i>
          </a>
        </div>
      </section>

      {/* PARADA 1: EL ORIGEN Y LOS PRODUCTORES */}
      <section id="origen" className="py-24 relative bg-white pl-6 md:pl-28 section-light">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-500 font-tech text-xs uppercase tracking-wider rounded-full mb-4">Parada 1: El Origen</div>
            <h2 className="font-tech text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              Los productores en grande, lo más sagrado de nuestra tierra a tu disposición.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Vrde acompaña procesos de productores a nivel nacional. Desde el establecimiento Ovoro hasta las fincas de aceite agroecológico, generamos puentes transparentes donde el productor fija el precio justo y la tierra dicta los tiempos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-vrde-brand text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
                Conoce a los productores
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-200">
               <div className="absolute inset-0 bg-vrde-dark/20 flex items-center justify-center">
                 <span className="text-white font-bold text-xl drop-shadow-md">Red de Distribución En Conjunto</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARADA 2: EL ECOSISTEMA Y LOS CICLOS */}
      <section id="ecosistema" className="py-24 relative bg-vrde-bg pl-6 md:pl-28 section-light">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-gray-200 text-gray-600 font-tech text-xs uppercase tracking-wider rounded-full mb-4">Parada 2: La Red En Conjunto</div>
            <h2 className="font-tech text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              La propuesta Vrde en el ecosistema.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Los productores ingresan al ecosistema Vrde. Disponibilizamos nuestra propuesta organizativa en la gran red "En Conjunto" para sincronizarnos con los ritmos naturales y logísticos.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-vrde-brand text-white rounded-full flex items-center justify-center text-2xl mb-6 shadow-lg shadow-vrde-brand/30">
                <i className="fas fa-sun"></i>
              </div>
              <h3 className="font-tech text-2xl font-bold mb-4 text-gray-800">Compra Semanal</h3>
              <p className="text-gray-600 text-sm">El pulso constante. Provee alimentos de primera necesidad a las comunidades y proyectos de reventa, asegurando un sostén cotidiano y fresco.</p>
            </div>

            <div className="rounded-2xl p-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-vrde-brand/30">
              <h3 className="font-tech text-xl font-bold mb-2 z-10 text-vrde-light">Rastreador Lunar</h3>
              <p className="text-xs text-gray-400 mb-6 z-10">Sincronización de Acopio</p>
              
              <div className="relative w-32 h-32 mb-6 z-10">
                <div className="absolute inset-0 rounded-full bg-white/10 blur-xl"></div>
                <div className="w-full h-full rounded-full bg-gray-200 shadow-[inset_-15px_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gray-900/80"></div>
                </div>
              </div>
              
              <div className="z-10">
                <p className="text-sm font-tech">Próxima Compra Lunar:</p>
                <p className="text-3xl font-bold text-vrde-light font-pixel tracking-widest mt-2">14 DÍAS</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-2xl mb-6 shadow-lg">
                <i className="fas fa-moon group-hover:text-vrde-light transition-colors"></i>
              </div>
              <h3 className="font-tech text-2xl font-bold mb-4 text-gray-800">Compra Lunar</h3>
              <p className="text-gray-600 text-sm">El gran acopio. Sincronizada con los ciclos de la luna, propone grandes volúmenes a costos más bajos. Logística eficiente y mecanización sagrada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARADA 3: LA LABOR (NODOS ALMACÉN) */}
      <section id="nodos" className="py-24 relative bg-white pl-6 md:pl-28 section-light overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-vrde-light/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-500 font-tech text-xs uppercase tracking-wider rounded-full mb-4">Parada 3: La Labor</div>
            <h2 className="font-tech text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              Nodos almacén, el corazón barrial.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Vrde genera puestos de trabajo inmediatos dentro de las comunidades. Espacios mutables donde se materializa la labor: recepción, conservación y armado de pedidos. Cada <strong>"Work slot"</strong> brinda certidumbre y nos conecta con la naturaleza de estar al servicio del otro.
            </p>
            <div className="bg-gray-200 aspect-video rounded-xl shadow-inner flex items-center justify-center text-gray-400">
               [Imagen de Nodo Almacén]
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-xl h-full flex flex-col">
              <h3 className="font-tech text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-vrde-brand"></i> Explorador de Nodos
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-vrde-brand text-white">Escobar</button>
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200">Loma Verde</button>
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200">La Lucila</button>
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200">V. López</button>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 flex-1 flex flex-col justify-center items-center text-center">
                 <h4 className="font-bold text-xl text-vrde-brand mb-2">Nodo Escobar</h4>
                 <p className="text-gray-500 text-sm">El pulmón de zona norte. Abierto martes y viernes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARADA 4: ECONOMIA Y CALCULADORA */}
      <section id="economia" className="py-24 relative bg-gray-900 text-white pl-6 md:pl-28 section-dark">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10 relative">
          <div className="inline-block px-3 py-1 bg-white/10 text-white border border-white/20 font-tech text-xs uppercase tracking-wider rounded-full mb-4">Parada 4: La Economía</div>
          <h2 className="font-tech text-4xl md:text-5xl font-bold mb-6 leading-tight">
            El impacto real en tu comunidad.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mb-12">
            Simula el impacto de participar en las compras comunitarias frente al mercado tradicional. Soberanía alimentaria con transparencia.
          </p>

          <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-left">
                <label className="block text-sm font-sans text-gray-400 mb-2">Presupuesto Mensual Frutas/Verduras</label>
                <input 
                  type="range" 
                  min="20000" 
                  max="150000" 
                  step="5000" 
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-vrde-brand h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                />
                <div className="text-3xl font-tech font-bold text-vrde-light mt-4">
                  ${budget.toLocaleString('es-AR')}
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-sm text-gray-400 font-sans mb-1">Supermercado Tradicional</h4>
                  <div className="text-xl font-bold text-gray-200">Menos volumen</div>
                  <div className="text-xs text-red-400 mt-2"><i className="fas fa-times"></i> Sin trazabilidad agroecológica</div>
                </div>
                <div className="bg-vrde-brand/20 rounded-2xl p-6 border border-vrde-brand/50 relative overflow-hidden group hover:scale-105 transition-transform">
                  <h4 className="text-sm text-vrde-light font-sans mb-1 relative z-10">Compra Lunar Vrde</h4>
                  <div className="text-2xl font-bold text-white relative z-10">+35% de Volumen</div>
                  <div className="text-xs text-vrde-light mt-2 relative z-10"><i className="fas fa-check"></i> 100% Agroecológico</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARADA 5: EL DESTINO (SUMATE) */}
      <section id="sumate" className="py-32 relative bg-vrde-bg text-gray-800 text-center pl-6 md:pl-28 overflow-hidden section-light">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-tech text-5xl md:text-6xl font-bold mb-6 text-gray-900">El sueño verde se sostiene juntos.</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            Elegí cómo querés integrarte a este ecosistema y ocupá tu lugar en la red.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center" onClick={() => openModal('consumidor')}>
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fas fa-shopping-basket"></i>
              </div>
              <h3 className="font-tech text-xl font-bold mb-2">Consumidor</h3>
              <p className="text-sm text-gray-500">Unirme a una compra comunitaria.</p>
            </button>
            
            <button className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center" onClick={() => openModal('nodo')}>
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <i className="fas fa-store-alt"></i>
              </div>
              <h3 className="font-tech text-xl font-bold mb-2">Nodo Almacén</h3>
              <p className="text-sm text-gray-500">Crear o ser parte de un almacén.</p>
            </button>
            
            <button className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center" onClick={() => openModal('transporte')}>
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="font-tech text-xl font-bold mb-2">Transporte</h3>
              <p className="text-sm text-gray-500">Ofrecer mi vehículo para logística.</p>
            </button>
            
            <button className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center" onClick={() => openModal('difusor')}>
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 bg-vrde-light text-vrde-dark group-hover:bg-vrde-brand group-hover:text-white transition-colors">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h3 className="font-tech text-xl font-bold mb-2">Difusor</h3>
              <p className="text-sm text-gray-500">Comunicar en mi comunidad.</p>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 py-16 pl-6 md:pl-28">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-800 pb-12 mb-8">
          <div className="text-center md:text-left">
            <div className="flex flex-col leading-none mb-4 opacity-50 hover:opacity-100 transition-opacity">
              <span className="font-pixel text-gray-300 text-3xl font-bold tracking-widest uppercase" style={{ lineHeight: 0.8 }}>VRDE</span>
              <span className="text-[0.55rem] tracking-[0.4em] font-sans text-gray-400 uppercase mt-1 font-semibold">.Club</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">El sólido del cubo. Cooperativa y Red Fractal agroecológica a nivel nacional.</p>
          </div>
          
          <div className="flex gap-6 text-2xl">
            <a href="#" className="hover:text-vrde-brand transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-vrde-brand transition-colors"><i className="fab fa-whatsapp"></i></a>
            <a href="#" className="hover:text-vrde-brand transition-colors"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        <div className="text-center text-xs opacity-50">
          &copy; 2026 Vrde Club. Todos los derechos reservados. Diseñado bajo filosofía Acuariana.
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative mx-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-tech font-bold text-vrde-brand mb-4 uppercase">Sumate como {modalType}</h2>
            <p className="text-gray-600 mb-6 font-sans">
              Gracias por tu interés en integrar la red Vrde Club. En este momento estamos organizando la nueva plataforma. ¡Déjanos tu contacto!
            </p>
            <input type="email" placeholder="Tu correo electrónico" className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-vrde-brand" />
            <button className="w-full bg-vrde-brand text-white font-bold py-3 rounded-lg hover:bg-vrde-dark transition-colors">
              Enviar Solicitud
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
