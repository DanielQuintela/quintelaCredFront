import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'
import { Menu, LogOut } from 'lucide-react'

interface HeaderProps {
  onOpenSidebar: () => void
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const { user, logout } = useAuth() 


  const userInitials = user?.data.name ? user.data.name.substring(0, 2).toUpperCase() : 'U'
  let role = "Operador"
  if (user?.data.role == "ADMIN") {
    role = "Administrador"
  }

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
          {role === "Administrador" ? "Painel Administrativo" : "Painel do Usuário"}
        </h2>
      </div>

      {/* Lado Direito: Perfil Formatado e Botão de Sair */}
      <div className="flex items-center gap-3 sm:gap-4 select-none">
        
        {/* Removido o 'hidden sm:block' para aparecer no mobile e adicionado a formatação da sua imagem */}
        <div className="text-right flex flex-col justify-center">
          <p className="text-[11px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-tight">
            Bem-vindo, <span className="font-bold text-slate-800 dark:text-slate-100">{user?.data.name || 'Usuário'}</span>
          </p>
          <p className="text-[9px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase mt-0.5 leading-tight">
            Nível: <span className="text-blue-500 dark:text-blue-500 font-extrabold">{role}</span>
          </p>
        </div>
        
        {/* Avatar Indicador */}
          <NavLink to="/profile" className="h-9 w-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold flex items-center 
        justify-center text-sm border border-blue-500/20">
            <div >
              {userInitials}
            </div>
          </NavLink>
       

        {/* Divisor Visual */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800  sm:block" />

        {/* Botão de Sair alinhado perfeitamente na direita */}
        <button
          type="button"
          onClick={logout}
          title="Sair do sistema"
          className="flex items-center gap-1.5 p-2 px-2.5 sm:px-3 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
        >
          <LogOut size={16} />
          <span className="text-xs font-bold uppercase tracking-wider hidden xs:block">Sair</span>
        </button>

      </div>
    </header>
  )
}