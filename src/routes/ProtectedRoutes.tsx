import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'
import { toast } from 'sonner'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      toast.error('Sessão terminada', {
        id: 'auth-expired', // Evita que o toast duplique na tela em re-renders rápidos
      })
    }
  }, [loading, user])

  if (loading) {
    return (
      <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-200 z-50">
        <div className="h-8 w-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 animate-pulse select-none">
          Verificando credenciais...
        </p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (user.data.status === 'INACTIVE') {
    toast.error('Usuário inativo. Contate o administrador.', {
      id: 'user-inactive',
    })
    return <Navigate to="/" replace />
  }
  return children
}