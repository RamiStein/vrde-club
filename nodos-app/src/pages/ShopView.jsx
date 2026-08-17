import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LucideArrowLeft } from 'lucide-react'

const categories = ['Todos', 'Verduras', 'Almacén', 'Higiene']

export default function ShopView({ products = [] }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [cart, setCart] = useState({}) // { 'PROD-1': 2 }

  const nodeId = searchParams.get('node') || 'escobar'
  const nodeName = nodeId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  const updateCart = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      if (next === 0) {
        const newCart = { ...prev }
        delete newCart[id]
        return newCart
      }
      return { ...prev, [id]: next }
    })
  }

  const getPrice = (prod, qty) => {
    if (prod.tiers.length === 1) return prod.tiers[0].price
    if (qty >= 5) return prod.tiers[1].price
    return prod.tiers[0].price
  }

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const prod = products.find(p => p.id === id)
    if (!prod) return total
    return total + (getPrice(prod, qty) * qty)
  }, 0)

  return (
    <div className="min-h-screen bg-bg relative pb-24 md:pb-6">
      {/* Shop Header */}
      <div className="bg-white px-4 py-4 border-b border-border shadow-sm sticky top-0 z-40 flex items-center justify-between">
        <button onClick={() => navigate('/portal')} className="p-2 -ml-2 text-text-muted hover:text-primary transition-colors">
          <LucideArrowLeft size={24} />
        </button>
        <div className="font-heading font-bold text-xl text-primary text-center">
          Nodo {nodeName}
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Progress & Lunar Banner */}
      <div className="bg-[#1a1a2e] text-white p-4 md:p-6 mb-4 shadow-md rounded-b-xl md:rounded-none md:mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold">Meta del nodo:</span>
          <span className="font-heading text-accent text-lg">45 / 100</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
          <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
        </div>
        
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold">Red global:</span>
          <span className="font-heading text-accent text-lg">850 / 1000</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
          <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
        </div>

        <div className="bg-accent/10 border-l-4 border-accent p-3 mt-4 rounded flex justify-between items-center">
          <div>
            <div className="font-semibold text-white">Luna Llena en Acuario</div>
            <div className="text-sm text-gray-300">Cierra en 3 días</div>
          </div>
          <div className="text-3xl">🌕</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto px-4 md:px-0 mb-6 pb-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold mr-2 whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-primary text-white' 
                : 'bg-bg text-text-muted hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {products.map(prod => {
          const qty = cart[prod.id] || 0
          
          return (
            <div key={prod.id} className="card flex flex-col items-center">
              <img 
                src={prod.image} 
                alt={prod.name} 
                className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover mb-6 shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-2xl font-heading text-primary font-bold mb-1">{prod.name}</h3>
              <p className="text-text-muted text-sm mb-6">{prod.subtitle}</p>

              {/* Price Tiers */}
              <div className="w-full flex flex-col gap-2 mb-6">
                {prod.tiers.map((tier, idx) => {
                  const isActive = prod.tiers.length === 1 || (idx === 0 && qty < 5) || (idx === 1 && qty >= 5)
                  return (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-lg border-2 transition-colors ${isActive ? 'bg-accent/10 border-accent' : 'bg-bg border-transparent'}`}>
                      <div>
                        <div className="text-sm font-bold">{tier.name}</div>
                        <div className="text-xs text-text-muted">{tier.req}</div>
                      </div>
                      <div className={`font-heading text-xl font-bold ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                        ${tier.price.toLocaleString('es-AR')}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Qty Selector */}
              <div className="w-full flex items-center justify-between bg-bg rounded-full p-1 mt-auto">
                <button 
                  onClick={() => updateCart(prod.id, -1)}
                  className="w-10 h-10 rounded-full bg-white text-primary text-xl font-bold shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="font-heading text-xl font-bold">{qty}</span>
                <button 
                  onClick={() => updateCart(prod.id, 1)}
                  className="w-10 h-10 rounded-full bg-white text-primary text-xl font-bold shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Floating Cart */}
      <div className={`fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center transition-transform duration-300 z-50 ${cartTotal > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Total estimado</span>
          <span className="font-heading text-2xl text-primary font-bold">${cartTotal.toLocaleString('es-AR')}</span>
        </div>
        <button className="btn btn-primary shadow-md hover:-translate-y-1">
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  )
}
