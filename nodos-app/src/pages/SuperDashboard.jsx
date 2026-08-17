import { useState } from 'react'
import { LucidePlus, LucideEdit, LucideTrash2, LucideSearch, LucidePackage, LucideMapPin, LucideBarChart2 } from 'lucide-react'

export default function SuperDashboard({ products, setProducts, nodes, setNodes, orders }) {
  const [activeTab, setActiveTab] = useState('catalogo')
  
  // States para agregar nodo
  const [newNodeName, setNewNodeName] = useState('')
  const [newNodeLocation, setNewNodeLocation] = useState('')

  const handleDeleteProduct = (id) => {
    if(confirm('¿Seguro que deseas eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleAddNode = (e) => {
    e.preventDefault()
    if(!newNodeName) return
    const id = newNodeName.toLowerCase().replace(/\s+/g, '-')
    setNodes([...nodes, { id, name: newNodeName, location: newNodeLocation }])
    setNewNodeName('')
    setNewNodeLocation('')
  }

  // Cálculos para el Consolidado
  const globalStats = products.map(prod => {
    const totalQty = orders.reduce((sum, order) => sum + (order.items[prod.id] || 0), 0)
    const breakdown = nodes.map(node => {
      const qty = orders.filter(o => o.nodeId === node.id).reduce((sum, o) => sum + (o.items[prod.id] || 0), 0)
      return { nodeName: node.name, qty }
    }).filter(b => b.qty > 0) // solo mostrar nodos que pidieron
    return { ...prod, totalQty, breakdown }
  })

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-6 flex-1 flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-800">Administración Central</h1>
          <p className="text-text-muted mt-1">Gestión global de la red de nodos.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold border border-primary/20">
          Super Admin
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('catalogo')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'catalogo' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'}`}
        >
          <LucidePackage size={16}/> Catálogo Global
        </button>
        <button 
          onClick={() => setActiveTab('nodos')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'nodos' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'}`}
        >
          <LucideMapPin size={16}/> Nodos
        </button>
        <button 
          onClick={() => setActiveTab('consolidado')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'consolidado' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'}`}
        >
          <LucideBarChart2 size={16}/> Consolidado de Pedidos
        </button>
      </div>

      {/* Tienes Catálogo */}
      {activeTab === 'catalogo' && (
        <div className="card overflow-hidden !p-0">
          <div className="p-4 border-b border-border bg-gray-50 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">Catálogo de Productos</h2>
            <button className="btn btn-primary flex items-center gap-2 py-2">
              <LucidePlus size={18} /> Nuevo Producto
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-border text-xs uppercase tracking-wider text-text-muted">
                  <th className="p-4 font-semibold w-16">IMG</th>
                  <th className="p-4 font-semibold">Producto</th>
                  <th className="p-4 font-semibold">Precio Regular</th>
                  <th className="p-4 font-semibold">Precio Mayorista</th>
                  <th className="p-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map(prod => (
                  <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover border border-border" />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{prod.name}</div>
                      <div className="text-xs text-text-muted">{prod.subtitle}</div>
                    </td>
                    <td className="p-4 font-semibold text-primary">
                      ${prod.tiers[0].price.toLocaleString('es-AR')}
                    </td>
                    <td className="p-4 font-semibold text-accent">
                      {prod.tiers.length > 1 ? `$${prod.tiers[1].price.toLocaleString('es-AR')}` : '-'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50">
                          <LucideEdit size={18} />
                        </button>
                        <button onClick={() => handleDeleteProduct(prod.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                          <LucideTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Nodos */}
      {activeTab === 'nodos' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card overflow-hidden !p-0">
            <div className="p-4 border-b border-border bg-gray-50">
              <h2 className="font-heading text-xl font-bold">Nodos Activos</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-border text-xs uppercase tracking-wider text-text-muted">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Nombre</th>
                  <th className="p-4 font-semibold">Ubicación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {nodes.map(node => (
                  <tr key={node.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm text-gray-500">{node.id}</td>
                    <td className="p-4 font-bold">{node.name}</td>
                    <td className="p-4 text-sm text-gray-600">{node.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="card h-fit">
            <h2 className="font-heading text-xl font-bold mb-4">Agregar Nodo</h2>
            <form onSubmit={handleAddNode} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  placeholder="Ej: Nodo Tigre" 
                  className="input-control" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1">Ubicación</label>
                <input 
                  type="text" 
                  value={newNodeLocation}
                  onChange={(e) => setNewNodeLocation(e.target.value)}
                  placeholder="Ej: Tigre, GBA Norte" 
                  className="input-control" 
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                <LucidePlus size={18} /> Agregar Nodo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Consolidado */}
      {activeTab === 'consolidado' && (
        <div className="card overflow-hidden !p-0">
          <div className="p-4 border-b border-border bg-gray-50 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">Consolidado Total de Pedidos</h2>
            <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
              {orders.length} pedidos totales en la red
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalStats.map(stat => (
              <div key={stat.id} className="border border-border rounded-xl p-5 hover:border-primary transition-colors bg-white shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={stat.image} alt={stat.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-gray-800">{stat.name}</h3>
                      <p className="text-xs text-text-muted">{stat.subtitle}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-center">
                    <div className="text-xs font-bold uppercase tracking-wider">Total Red</div>
                    <div className="font-heading text-2xl font-bold">{stat.totalQty}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs font-semibold text-text-muted uppercase mb-2">Desglose por nodo</div>
                  {stat.breakdown.length === 0 ? (
                    <div className="text-sm text-gray-500 italic">No hay pedidos registrados</div>
                  ) : (
                    <ul className="space-y-1">
                      {stat.breakdown.map((b, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-1 last:pb-0">
                          <span className="font-medium text-gray-700">{b.nodeName}</span>
                          <span className="font-bold text-gray-900 bg-white px-2 rounded shadow-sm border border-border">{b.qty} und.</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
