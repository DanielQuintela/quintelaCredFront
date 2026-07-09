import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { UserService } from '../services/user.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { UserForm } from '../components/user/user.formm'
import type { UpdateUserData } from '../types/User.types'

export function EditUserPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [user, setUser] = useState<UpdateUserData>()

  useEffect(() => {
    async function loadUser() {
      if (!id) return

      const data = await UserService.findById(id)

      setUser({
        name: data.name,
        email: data.email
      })
    }

    loadUser()
  }, [id])

  async function handleSubmit(data: UpdateUserData) {
    if (!id) return

    await UserService.update(id, data)

    navigate('/users')
  }

  if (!user) {
    return (
      <MainLayout>
         <div className="max-w-2xl mx-auto p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
          <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse">Buscando informações do usuário...</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Editar Usuário
          </h1>

          <p className="text-slate-500 mt-2">
            Atualize as informações do usuário.
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <UserForm
            defaultValues={user}
            submitLabel='Atualizar Usuario'
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MainLayout>
  )
}