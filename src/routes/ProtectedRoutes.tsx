
import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/" />
  }

  return children
}