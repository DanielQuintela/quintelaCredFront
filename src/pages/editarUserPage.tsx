import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserService } from '../services/user.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import type { UpdateUserData } from '../types/User.types'
import { BackButton } from '../components/backButton'
import { toast } from 'sonner'
import { UserForm } from '../components/user/user.formm'

export function EditUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<UpdateUserData>()

  useEffect(() => {
    async function loadUser() {
      if (!id) return

      try {
        const data = await UserService.findById(id)
        setUser({
          name: data.name,
          email: data.email
        })
      } catch (error) {
        console.error(error)
        toast.error('Usuário não encontrado ou erro de comunicação.')
        navigate('/users')
      }
    }

    loadUser()
  }, [id, navigate])

  async function handleSubmit(data: UpdateUserData) {
    if (!id) return

    try {
      await UserService.update(id, data)
      toast.success('Perfil de usuário atualizado com sucesso.')
      navigate('/users')
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar dados.')
    }
  }

  // Loading State customizado integrado perfeitamente ao grid
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
      {/* Mantenho rigorosamente a mesma malha fina de layout da criação */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Cabeçalho da Tela */}
        <div className="space-y-1.5">
          <div className="mb-2">
            <BackButton />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Editar Usuário
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Atualize as credenciais cadastrais e níveis de permissão do operador selecionado.
          </p>
        </div>

        {/* Card Premium do Formulário */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs">
          <UserForm
            defaultValues={user}
            submitLabel="Atualizar Usuario"
            onSubmit={handleSubmit}
          />
        </div>

      </div>
    </MainLayout>
  )
}