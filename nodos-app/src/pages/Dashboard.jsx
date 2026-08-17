import { useState } from 'react'
import { LucideSearch, LucideEdit, LucideCheckCircle, LucidePackage, LucideCalendar, LucideUser } from 'lucide-react'

export default function Dashboard({ activeNode = 'escobar', orders = [], setOrders, products = [] }) {
  const [activeTab, setActiveTab] = useState('pedidos')
  
  const nodeName = activeNode.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  const nodeOrders = orders.filter(o => o.nodeId === activeNode)

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const getOrderTotal = (order) => {
    return Object.entries(order.items).reduce((total, [prodId, qty]) => {
      const prod = products.find(p => p.id === prodId)
      if (!prod) return total
      const price = (prod.tiers.length > 1 && qty >= 5) ? prod.tiers[1].price : prod.tiers[0].price
      return total + (price * qty)
    }, 0)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pendiente': return <span className="badge badge-pendiente">Pendiente</span>
      case 'Pagado': return <span className="badge badge-pagado">Pagado</span>
      case 'Entregado': return <span className="badge badge-entregado">Entregado</span>
      default: return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full p-4 md:p-6 flex-1 flex flex-col">
      {/* Saludo y Resumen */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-800">Panel de Control</h1>
          <p className="text-text-muted mt-1">Luna actual: <span className="text-primary font-bold">Luna Llena en Acuario</span></p>
        </div>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-border">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
             <LucideUser className="text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-sm">Nodo {nodeName}</p>
            <p className="text-xs text-green-600 font-bold">Activo</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('pedidos')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'pedidos' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'}`}
        >
          <div className="flex items-center gap-2"><LucidePackage size={16}/> Pedidos</div>
        </button>
        <button 
          onClick={() => setActiveTab('perfil')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'perfil' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'}`}
        >
          <div className="flex items-center gap-2"><LucideEdit size={16}/> Mi Perfil</div>
        </button>
      </div>

      {/* Contenido de Pedidos */}
      {activeTab === 'pedidos' && (
        <div className="card overflow-hidden !p-0">
          <div className="p-4 border-b border-border bg-gray-50 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
               <LucideCalendar className="text-primary" size={20}/> Pedidos de esta Luna
            </h2>
            <div className="relative">
              <input type="text" placeholder="Buscar socio..." className="pl-9 pr-4 py-2 border border-border rounded-full text-sm focus:outline-none focus:border-primary" />
              <LucideSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-border text-xs uppercase tracking-wider text-text-muted">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Socio</th>
                  <th className="p-4 font-semibold">Fecha</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Estado</th>
                  <th className="p-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {nodeOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-500">{order.id}</td>
                    <td className="p-4 font-bold">{order.memberName}</td>
                    <td className="p-4 text-sm text-gray-600">{order.date}</td>
                    <td className="p-4 font-semibold text-primary">${getOrderTotal(order).toLocaleString('es-AR')}</td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-sm border border-border rounded-md px-2 py-1 bg-white focus:outline-none focus:border-primary"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contenido de Perfil */}
      {activeTab === 'perfil' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-heading text-xl font-bold mb-4 border-b border-border pb-2">Información Pública del Nodo</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1">Nombre del Nodo</label>
                <input type="text" defaultValue="Nodo Escobar" className="input-control" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1">Días de entrega</label>
                <input type="text" defaultValue="Martes y Viernes" className="input-control" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1">Descripción</label>
                <textarea rows="3" className="input-control" defaultValue="El pulmón de zona norte. Especializado en el armado rápido de cajas frescas."></textarea>
              </div>
              <button type="button" className="btn btn-primary w-full mt-2">Guardar Cambios</button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="card text-center flex flex-col items-center">
               <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                 <LucideUser className="text-gray-400 w-10 h-10" />
               </div>
               <button className="text-primary font-semibold text-sm hover:underline">Cambiar Imagen</button>
            </div>
            
            <div className="card bg-blue-50 border-blue-200">
               <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><LucideCheckCircle size={18}/> Sugerencia</h3>
               <p className="text-sm text-blue-700">Recuerda mantener actualizados los días de entrega para que los socios sepan cuándo buscar sus compras.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
