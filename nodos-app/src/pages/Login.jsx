import { useState } from 'react'
import { LucideLock } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  
  const nodeId = searchParams.get('node') || 'escobar'
  const nodeName = nodeId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (pin.length === 4) { 
        if (username.toLowerCase() === 'superadmin') {
          onLogin('superadmin')
        } else {
          onLogin(nodeId)
        }
      } else {
        setError('El PIN debe tener 4 dígitos')
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary opacity-5"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent rounded-full opacity-10 blur-3xl"></div>
      
      <div className="card w-full max-w-sm relative z-10 p-8 text-center shadow-xl">
        <div className="mx-auto w-16 h-16 bg-bg rounded-full flex items-center justify-center mb-6 text-primary shadow-sm border border-border">
          <LucideLock className="w-8 h-8" />
        </div>
        
        <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">Acceso al Sistema</h2>
        <p className="text-text-muted mb-8 text-sm">Administrando: <strong className="text-primary">{nodeName}</strong></p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-sm font-semibold text-text-muted mb-1 ml-1">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: admin_escobar"
              className="w-full text-center text-lg input-control font-body h-12 bg-bg"
              required
            />
          </div>

          <div>
            <label className="block text-left text-sm font-semibold text-text-muted mb-1 ml-1">PIN de Seguridad</label>
            <input 
              type="password" 
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center text-4xl tracking-[1em] pl-4 input-control font-heading font-bold h-16 bg-bg"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2 font-semibold">{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full btn btn-primary flex justify-center items-center h-12 mt-4"
            disabled={isLoading || pin.length < 4 || !username}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Ingresar al Panel'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
