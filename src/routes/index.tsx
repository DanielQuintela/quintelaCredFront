import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/loginPage'
import { DashboardPage } from '../pages/dashBoardPage'
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