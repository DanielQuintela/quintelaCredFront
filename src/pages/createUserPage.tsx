import { useNavigate } from 'react-router-dom'
import type { CreateUserFormData } from '../types/User.types'
import { UserService } from '../services/user.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { UserForm } from '../components/user/user.formm'


export function CreateUserPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: CreateUserFormData) {
    await UserService.create(data)

    navigate('/user')
  }

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Novo Usuário
          </h1>

          <p className="text-slate-500 mt-2">
            Cadastre um novo usuário no sistema.
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <UserForm
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MainLayout>
  )
}