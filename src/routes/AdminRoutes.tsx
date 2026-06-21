import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'

export function AdminRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  if (user?.data.role !== 'ADMIN') {
    return <Navigate to="/dashboard" />
  }

  return children
}