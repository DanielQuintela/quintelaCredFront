import { useState } from 'react'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { BackButton } from '../components/backButton'
import { useAuth } from '../hooks/UseAuth'
import { KeyRound, ShieldCheck, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { UserService } from '../services/user.services'

export function ProfilePage() {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  let role = "Operador"
  if (user?.data.role == "ADMIN") {
    role = "Administrador"
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('A confirmação da senha não confere.')
      return
    }

    try {
      setLoading(true)
      
      await UserService.updatePassword(user?.data.id as string, currentPassword, newPassword)
    
      toast.success('Senha alterada com sucesso!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao alterar senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="space-y-1.5">
          <div className="mb-2">
            <BackButton />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Meu Perfil & Segurança
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gerencie suas credenciais de acesso ao sistema.
          </p>
        </div>

        {/* Card Informativo do Usuário */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Usuário Conectado
            </p>
            <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {user?.data.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.data.email}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            {role}
          </span>
        </div>

        {/* Formulário de Troca de Senha */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs">
          
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <KeyRound className="text-emerald-500" size={20} />
            <h2 className="font-bold text-slate-800 dark:text-slate-100">
              Alterar Senha de Acesso
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Senha Atual */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Senha Atual
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Nova Senha */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Nova Senha
              </label>
              <div className="relative flex items-center">
                <KeyRound size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirmar Nova Senha */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Confirmar Nova Senha
              </label>
              <div className="relative flex items-center">
                <ShieldCheck size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-950 dark:text-white font-bold text-sm p-3.5 shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Atualizando...' : 'Salvar Nova Senha'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </MainLayout>
  )
}