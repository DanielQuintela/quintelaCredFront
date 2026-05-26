import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashBoardPage'
import { ProtectedRoute } from './ProtectedRoutes'



export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}