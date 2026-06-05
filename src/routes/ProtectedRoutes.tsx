
import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/UseAuth'
// import { toast } from 'sonner'
// import { useEffect } from 'react'
interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user } = useAuth()

  // useEffect (() => {
  //   if (!user) {
  //     toast.info('Realize login para acessar esta página')
  //   }
  // }, [user])

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}