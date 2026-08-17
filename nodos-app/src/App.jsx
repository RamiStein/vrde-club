import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LucideLeaf } from 'lucide-react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Portal from './pages/Portal'
import ShopView from './pages/ShopView'
import NodeSelector from './pages/NodeSelector'
import SuperDashboard from './pages/SuperDashboard'
import { 
  subscribeProducts, 
  subscribeNodes, 
  subscribeOrders,
  saveProductInDb,
  saveNodeInDb,
  updateOrderStatusInDb
} from './services/firebaseService'

const initialProducts = [
  { 
    id: 'PROD-1', 
    name: 'Bolsón Agroecológico', 
    subtitle: '7 a 8 kg de verduras de estación',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200',
    tiers: [
      { name: 'Precio Regular', req: 'Comprando 1 a 4 unid.', price: 10500 },
      { name: 'Precio Mayorista', req: 'Comprando +5 unid.', price: 9500 }
    ]
  },
  { 
    id: 'PROD-2', 
    name: 'Aceite de Oliva 1L', 
    subtitle: 'Extra virgen, primera prensada',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=200&h=200',
    tiers: [
      { name: 'Precio Único', req: '', price: 12000 }
    ]
  },
]

const initialNodes = [
  { id: 'escobar', name: 'Nodo Escobar', location: 'Escobar, GBA Norte' },
  { id: 'loma-verde', name: 'Nodo Loma Verde', location: 'Loma Verde, Escobar' },
  { id: 'la-lucila', name: 'Nodo La Lucila', location: 'La Lucila, Vicente López' },
  { id: 'vicente-lopez', name: 'Nodo V. López', location: 'Vicente López, GBA Norte' },
]

const initialOrders = [
  { id: 'ORD-001', nodeId: 'escobar', memberName: 'Juan Pérez', date: '25/07/2026', items: { 'PROD-1': 2, 'PROD-2': 1 }, status: 'Pendiente' },
  { id: 'ORD-002', nodeId: 'loma-verde', memberName: 'María García', date: '24/07/2026', items: { 'PROD-1': 1 }, status: 'Pagado' },
  { id: 'ORD-003', nodeId: 'escobar', memberName: 'Carlos López', date: '22/07/2026', items: { 'PROD-2': 2 }, status: 'Entregado' },
  { id: 'ORD-004', nodeId: 'vicente-lopez', memberName: 'Laura Vega', date: '25/07/2026', items: { 'PROD-1': 5 }, status: 'Pendiente' },
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeNode, setActiveNode] = useState('escobar')
  const [products, setProducts] = useState(initialProducts)
  const [nodes, setNodes] = useState(initialNodes)
  const [orders, setOrders] = useState(initialOrders)
  
  // Suscripciones en tiempo real a Firebase / Fallback local
  useEffect(() => {
    const unsubProducts = subscribeProducts(setProducts, initialProducts);
    const unsubNodes = subscribeNodes(setNodes, initialNodes);
    const unsubOrders = subscribeOrders(setOrders, initialOrders);

    return () => {
      unsubProducts();
      unsubNodes();
      unsubOrders();
    };
  }, []);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // Actualización local inmediata
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    // Guardado en Firebase
    updateOrderStatusInDb(orderId, newStatus);
  };

  const handleUpdateProducts = (newProducts) => {
    setProducts(newProducts);
    if (Array.isArray(newProducts)) {
      newProducts.forEach(p => saveProductInDb(p));
    }
  };

  const handleUpdateNodes = (newNodes) => {
    setNodes(newNodes);
    if (Array.isArray(newNodes)) {
      newNodes.forEach(n => saveNodeInDb(n));
    }
  };

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/select-node" element={<NodeSelector nodes={nodes} />} />
        <Route path="/shop" element={<ShopView products={products} />} />

        {/* Panel y Login */}
        <Route 
          path="/*" 
          element={
            <div className="min-h-screen bg-bg font-body text-text-main flex flex-col">
              <header className="bg-white border-b border-border py-4 px-6 shadow-sm sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-primary font-bold text-2xl font-heading tracking-wide cursor-pointer" onClick={() => window.location.href = '/'}>
                    <LucideLeaf className="h-6 w-6" />
                    <span>VRDE.Club</span>
                  </div>
                  {isAuthenticated && (
                    <button 
                      onClick={() => setIsAuthenticated(false)}
                      className="text-sm font-semibold text-text-muted hover:text-primary transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  )}
                </div>
              </header>
              <main className="flex-1 flex flex-col">
                <Routes>
                  <Route 
                    path="/login" 
                    element={!isAuthenticated ? <Login onLogin={(node) => { setActiveNode(node); setIsAuthenticated(true); }} /> : <Navigate to={activeNode === 'superadmin' ? "/super-dashboard" : "/dashboard"} />} 
                  />
                  <Route 
                    path="/dashboard" 
                    element={isAuthenticated && activeNode !== 'superadmin' ? <Dashboard activeNode={activeNode} orders={orders} setOrders={handleUpdateOrderStatus} products={products} /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/super-dashboard" 
                    element={isAuthenticated && activeNode === 'superadmin' ? <SuperDashboard products={products} setProducts={handleUpdateProducts} nodes={nodes} setNodes={handleUpdateNodes} orders={orders} /> : <Navigate to="/login" />} 
                  />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </main>
            </div>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
