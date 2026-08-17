import { useNavigate } from 'react-router-dom'
import { LucideShoppingBag, LucideSettings, LucideArrowLeft } from 'lucide-react'

export default function Portal() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative">
      {/* Botón volver */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-text-muted hover:text-primary transition-colors flex items-center gap-2 font-semibold"
      >
        <LucideArrowLeft size={20} />
        Volver al inicio
      </button>

      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Portal de Compra Lunar</h1>
        <p className="text-text-muted text-lg">
          Selecciona cómo deseas ingresar al ecosistema en este momento.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Realizar Pedido (Consumidor) */}
        <div 
          onClick={() => navigate('/select-node?action=shop')}
          className="bg-white rounded-2xl p-8 border-2 border-transparent hover:border-primary shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-20 h-20 bg-green-50 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <LucideShoppingBag size={36} />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3">Realizar Pedido</h2>
          <p className="text-text-muted text-sm">
            Ingresa al catálogo centralizado para ver los productos disponibles y armar tu carrito para la próxima luna.
          </p>
          <div className="mt-6 font-semibold text-primary group-hover:underline">
            Ir a la tienda &rarr;
          </div>
        </div>

        {/* Administrar Nodo */}
        <div 
          onClick={() => navigate('/select-node?action=admin')}
          className="bg-white rounded-2xl p-8 border-2 border-transparent hover:border-blue-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <LucideSettings size={36} />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3">Administrar Nodo</h2>
          <p className="text-text-muted text-sm">
            Ingresa al panel de control de tu almacén para gestionar los pedidos de tus socios y actualizar tu información.
          </p>
          <div className="mt-6 font-semibold text-blue-600 group-hover:underline">
            Ir al CRM &rarr;
          </div>
        </div>
      </div>
    </div>
  )
}
