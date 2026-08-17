import { useNavigate, useSearchParams } from 'react-router-dom'
import { LucideArrowLeft, LucideMapPin } from 'lucide-react'

export default function NodeSelector({ nodes = [] }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // action puede ser "shop" o "admin"
  const action = searchParams.get('action') || 'shop'

  const handleNodeSelect = (nodeId) => {
    if (action === 'admin') {
      navigate(`/login?node=${nodeId}`)
    } else {
      navigate(`/shop?node=${nodeId}`)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative">
      <button 
        onClick={() => navigate('/portal')}
        className="absolute top-6 left-6 text-text-muted hover:text-primary transition-colors flex items-center gap-2 font-semibold"
      >
        <LucideArrowLeft size={20} />
        Volver al portal
      </button>

      <div className="max-w-xl w-full text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">
          Selecciona tu Nodo
        </h1>
        <p className="text-text-muted">
          {action === 'admin' 
            ? 'Elige el nodo que deseas administrar.' 
            : 'Elige el almacén más cercano para realizar tu pedido.'}
        </p>
      </div>

      <div className="w-full max-w-xl grid gap-4">
        {nodes.map(node => (
          <button
            key={node.id}
            onClick={() => handleNodeSelect(node.id)}
            className="bg-white p-6 rounded-2xl border border-border hover:border-primary shadow-sm hover:shadow-md transition-all text-left group flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <LucideMapPin size={24} className="text-gray-500 group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-800">{node.name}</h3>
              <p className="text-sm text-text-muted">{node.location}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
