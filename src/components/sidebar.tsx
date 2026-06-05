import { Link } from 'react-router-dom' // Se usar o react-router para marcar o link ativo
import { LayoutDashboard, Calculator, BadgeDollarSign } from 'lucide-react'
import { useAuth } from '../hooks/UseAuth'

export function Sidebar() {
  const { user } = useAuth()
  const isAdmin = user?.data.role === 'ADMIN'   

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 
    flex flex-col transition-colors duration-200 hidden lg:flex">
      
      {/* Brand/Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800/80">
        <h1 className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
          quintela<span className="text-emerald-500">Cred</span>
        </h1>
      </div>

      {/* Links de Navegação */}
      <nav className="p-4 flex flex-col gap-1.5 flex-1">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group duration-150"
        >
          <LayoutDashboard size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/simulation"
          className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group duration-150"
        >
          <Calculator size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span>Simulação</span>
        </Link>

        {/* Sessão de Administração */}
        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 block mb-1">
              Configurações
            </span>
            <Link
              to="/tax"
              className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group duration-150"
            >
              <BadgeDollarSign size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
              <span>Taxas</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  )
}