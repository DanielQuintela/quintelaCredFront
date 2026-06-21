import { useAuth } from '../hooks/UseAuth'
import { Menu, LogOut } from 'lucide-react'

interface HeaderProps {
  onOpenSidebar: () => void
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const { user, logout } = useAuth() 
  
  const userInitials = user?.data.name ? user.data.name.substring(0, 2).toUpperCase() : 'U'

  return (
    <header className="h-16 bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-8 flex items-center justify-between backdrop-blur-sm sticky top-0 z-40">
      
      {/* Lado Esquerdo: Menu Mobile e Título */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
        >
          <Menu size={20} />
        </button>

        <h2 className="font-semibold text-slate-700 dark:text-slate-200 tracking-wide hidden sm:block">
          Painel Administrativo
        </h2>
      </div>

      {/* Lado Direito: Perfil, Avatar e Botão de Sair */}
      <div className="flex items-center gap-4 select-none">
        
        {/* Bloco de Informações de Texto */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {user?.data.name || 'Usuário Quintela'}
          </p>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {user?.data.role || 'Operador'}
          </p>
        </div>
        
        {/* Avatar Indicador */}
        <div className="h-9 w-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/20">
          {userInitials}
        </div>

        {/* Divisor Visual Discreto (Apenas visível a partir do 'sm') */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800  sm:block" />

        {/*Botão de Logout Responsivo */}
        <button
          type="button"
          onClick={logout} 
          title="Sair do sistema"
          /* FIX: Adicionado 'flex items-center gap-1.5 px-3' para travar o layout lado a lado */
          className="flex items-center gap-1.5 p-2 px-3 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <LogOut size={16} />
          {/* 🌟 FIX: Envelopado em um span estilizado para dar o acabamento premium */}
          <span className="text-xs font-bold uppercase tracking-wider">Sair</span>
        </button>

      </div>
    </header>
  )
}