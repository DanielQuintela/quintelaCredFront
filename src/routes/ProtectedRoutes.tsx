
import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/UseAuth'
interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}