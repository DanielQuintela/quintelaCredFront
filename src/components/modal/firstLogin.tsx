import { useNavigate } from 'react-router-dom'
import { ShieldAlert, ArrowRight, X } from 'lucide-react'
import { UserService } from '../../services/user.services'
import { toast } from 'sonner'
import { useAuth } from '../../hooks/UseAuth'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function FirstLoginModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate()
  const { user, loadUser } = useAuth()
  const firstName = user?.data.name?.trim().split(/\s+/)[0] ?? 'Usuário'

  if (!isOpen) return null

  function handleGoToProfile() {
    handleUpdateFirstLogin()
    onClose()
    navigate('/profile')
    loadUser()
  }

  function handleClose() {
    handleUpdateFirstLogin()
    onClose()
    loadUser()
  }


  async function handleUpdateFirstLogin() {
    try {
      await UserService.updateFirstLogin(user?.data.id as string, false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar status do usuário')
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Cabeçalho */}
        <div className="flex items-start justify-between">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 dark:text-yellow-400 rounded-xl">
            <ShieldAlert size={24} />
          </div>
          <button
            type="button"
            onClick={handleGoToProfile}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mensagem */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Seja bem-vindo(a), {firstName}! 🎉
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Identificamos que este é o seu primeiro acesso ao sistema. Recomendamos
            que você altere sua senha temporária e personalize suas preferências,
            como a cor do tema.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button 
            type="button"
            onClick={handleClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Manter como está
          </button>

          <button
            type="button"
            onClick={handleGoToProfile}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-slate-950 dark:text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Ir para meu Perfil</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  )
}