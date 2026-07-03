import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/loginPage'
import { DashboardPage } from '../pages/dashBoardPage'
import { ProtectedRoute } from './ProtectedRoutes'
import { AdminRoute } from './AdminRoutes'
import { TaxPage } from '../pages/taxPage'
import { CreateTaxPage } from '../pages/createTaxPage'
import { EditTaxPage } from '../pages/editarTaxPage'
import { SimulationPage } from '../pages/simulationPage'
import { CreateUserPage } from '../pages/createUserPage'



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
        <Route
          path="/tax/new"
          element={
            <AdminRoute>
              <CreateTaxPage />
            </AdminRoute>
          }
        />

        <Route
          path="/tax/:id/edit"
          element={
            <AdminRoute>
              <EditTaxPage />
            </AdminRoute>
          }
        />    
        <Route
          path="/simulation"
          element={
            <ProtectedRoute>
              <SimulationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <AdminRoute>
              <CreateUserPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}