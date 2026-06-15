import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/loginPage'
import { DashboardPage } from '../pages/dashBoardPage'
import { ProtectedRoute } from './ProtectedRoutes'
import { AdminRoute } from './AdminRoutes'
import { TaxPage } from '../pages/taxPage'



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
        <Route
          path="/tax"
          element={
            <AdminRoute>
              <TaxPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}