import { useState } from 'react'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { BackButton } from '../components/backButton'
import { useAuth } from '../hooks/UseAuth'
import { KeyRound, ShieldCheck, Lock, Sun, Moon, Monitor, Paintbrush, Check } from 'lucide-react'
import { toast } from 'sonner'
import { UserService } from '../services/user.services'
import { useThemeSystem } from '../hooks/ThemeSistem'

type ThemeOption = 'dark' | 'light' | 'system'

export function ProfilePage() {
  const { user } = useAuth()
  const {theme, setTheme} = useThemeSystem()



  function handleThemeChange(selectedTheme: ThemeOption) {
    setTheme(selectedTheme)
    localStorage.setItem('theme', selectedTheme)

    const root = document.documentElement

    if (selectedTheme === 'dark') {
      root.classList.add('dark')
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // Opção "Sistema": verifica se o sistema operacional está em modo escuro
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemPrefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    toast.success(`Tema alterado para: ${
      selectedTheme === 'light' ? 'Claro' : selectedTheme === 'dark' ? 'Escuro' : 'Padrão do Sistema'
    }`)
  }

  // ---------------------------------------------------------------------------
  // ESTADOS DO FORMULÁRIO DE SENHA
  // ---------------------------------------------------------------------------
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

    let role = "Operador"
  if (user?.data.role == "ADMIN") {
    role = "Administrador"
  }

  async function handleSubmitPassword(e: React.FormEvent) {
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
        
        {/* Cabeçalho de Navegação */}
        <div className="space-y-1.5">
          <div className="mb-2">
            <BackButton />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Meu Perfil & Segurança
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Personalize a interface do sistema e gerencie suas credenciais.
          </p>
        </div>

        {/* Card Informativo do Operador Conectado */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Operador Conectado
            </p>
            <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {user?.data.name || 'Operador'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.data.email}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {role}
          </span>
        </div>

        {/* 🎨 SEÇÃO 1: APARÊNCIA E TEMA */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Paintbrush className="text-blue-500" size={20} />
            <div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">
                Aparência do Sistema
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Escolha o modo de exibição de sua preferência.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            
            {/* Tema Claro */}
            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {theme === 'light' && (
                <div className="absolute top-2 right-2 text-blue-500">
                  <Check size={14} />
                </div>
              )}
              <Sun size={24} className="mb-2 text-amber-500" />
              <span className="text-xs font-semibold">Claro</span>
            </button>

            {/* Tema Escuro */}
            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {theme === 'dark' && (
                <div className="absolute top-2 right-2 text-blue-500">
                  <Check size={14} />
                </div>
              )}
              <Moon size={24} className="mb-2 text-indigo-400" />
              <span className="text-xs font-semibold">Escuro</span>
            </button>

            {/* Tema do Sistema */}
            <button
              type="button"
              onClick={() => handleThemeChange('system')}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                theme === 'system'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {theme === 'system' && (
                <div className="absolute top-2 right-2 text-blue-500">
                  <Check size={14} />
                </div>
              )}
              <Monitor size={24} className="mb-2 text-slate-400" />
              <span className="text-xs font-semibold">Sistema</span>
            </button>

          </div>
        </div>

        {/* 🔑 SEÇÃO 2: FORMULÁRIO DE TROCA DE SENHA */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs space-y-5">
          
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <KeyRound className="text-blue-500" size={20} />
            <div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">
                Alterar Senha de Acesso
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Escolha uma nova senha forte com pelo menos 6 caracteres.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitPassword} className="space-y-4">
            
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
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm p-3.5 shadow-lg shadow-blue-500/10 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
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