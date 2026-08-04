import { useNavigate } from 'react-router-dom'
import type { CreateUserFormData } from '../types/User.types'
import { UserService } from '../services/user.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { BackButton } from '../components/backButton'
import { toast } from 'sonner'
import { UserForm } from '../components/user/user.formm'

export function CreateUserPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: CreateUserFormData) {
    try {
      await UserService.create(data)
      toast.success('Usuário cadastrado com sucesso.')
      navigate('/users')
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao cadastrar usuário.')
    }
  }

  return (
    <MainLayout>
      {/* 🌟 Container estruturado e centralizado de forma idêntica ao de taxas */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Cabeçalho da Tela */}
        <div className="space-y-1.5">
          <div className="mb-2">
            <BackButton />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Novo Usuário
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cadastre um novo operador ou administrador para conceder acesso à plataforma.
          </p>
        </div>

        {/* Card Premium do Formulário */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs">
          <UserForm onSubmit={handleSubmit} />
        </div>

      </div>
    </MainLayout>
  )
}