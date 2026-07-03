import { useAuth } from '../hooks/UseAuth'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Calculator, BadgeDollarSign, X, UsersIcon, ShieldCheck } from 'lucide-react' // 🌟 Importando o X

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth()
  const isAdmin = user?.data.role === 'ADMIN'

  return (
    <>
      {/* 🌟 ESCURECIMENTO DE FUNDO: Só aparece no mobile se a sidebar estiver aberta */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 lg:hidden transition-all duration-200"
        />
      )}

      {/* 🌟 SIDEBAR: Adaptada para fixo/slide no mobile e fixa normal no Desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 flex flex-col shrink-0 
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand/Logo + Botão de fechar */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/80">
        <Link to="/dashboard" className="font-black text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
          quintela<span className="text-emerald-500">Cred</span>
        </Link>

          {/* 🌟 BOTÃO FECHAR: Só visível no mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links de Navegação (Ao clicar em um link, você também pode disparar o 'onClose' para fechar a barra) */}
        <nav className="p-4 flex flex-col gap-1.5 flex-1">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
          >
            <LayoutDashboard size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/simulation"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
          >
            <Calculator size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span>Simulação</span>
          </Link>

          {/* Sessão de Administração */}
          {isAdmin && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 block mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>Configurações de adm</span>
                </span>
              </span>
              <Link
                to="/tax"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <BadgeDollarSign size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span>Taxas</span>
              </Link>

              <Link
                to="/users"
                onClick={onClose}   
              className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <UsersIcon size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span>Usuários</span>
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}