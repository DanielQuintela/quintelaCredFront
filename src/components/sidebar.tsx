import { useAuth } from '../hooks/UseAuth'
import { NavLink } from 'react-router-dom' 
import { LayoutDashboard, Calculator, BadgeDollarSign, X, UsersIcon, ShieldCheck } from 'lucide-react'
import { PwaInstallPrompt } from './layout/PwaInstallPrompt'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth()
  const isAdmin = user?.data.role === 'ADMIN'

  // 🌟 Função auxiliar para não repetir código de estilização nos links
  const linkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-all group
    ${isActive 
      ? 'text-slate-900 dark:text-white bg-slate-100/80 dark:bg-slate-800' // Estilo quando ATIVO (igual ou similar ao hover)
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50' // Estilo padrão + Hover
    }
  `

  // 🌟 Função auxiliar para o ícone mudar de cor se o link estiver ativo
  const iconClass = (isActive: boolean) => `
    transition-colors
    ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'}
  `
   const iconSimulationClass = (isActive: boolean) => `
    transition-colors
    ${isActive ? 'text-emerald-500' : 'text-slate-400 group-hover:text-emerald-500'}
  `

  return (
    <>
      {/* ESCURECIMENTO DE FUNDO */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 lg:hidden transition-all duration-200"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 flex flex-col shrink-0 
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand/Logo + Botão de fechar */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/80">
          <NavLink to="/dashboard" className="font-black text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Marechal<span className="text-blue-500">Cred</span>
          </NavLink>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="p-4 flex flex-col gap-1.5 flex-1">
          
          <NavLink to="/dashboard" onClick={onClose} className={linkClass}>
            {({ isActive }) => (
              <>
                <LayoutDashboard size={18} className={iconClass(isActive)} />
                <span>Dashboard</span>
              </>
            )}
          </NavLink>

          <NavLink to="/simulation" onClick={onClose} className={linkClass}>
            {({ isActive }) => (
              <>
                <Calculator size={18} className={iconSimulationClass(isActive)} />
                <span>Simulação</span>
              </>
            )}
          </NavLink>

          {/* Sessão de Administração */}
          {isAdmin && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 block mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-blue-400" />
                  <span>Configurações de adm</span>
                </span>
              </span>
              
              <NavLink to="/tax" onClick={onClose} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <BadgeDollarSign size={18} className={iconClass(isActive)} />
                    <span>Taxas</span>
                  </>
                )}
              </NavLink>

              <NavLink to="/users" onClick={onClose} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <UsersIcon size={18} className={iconClass(isActive)} />
                    <span>Usuários</span>
                  </>
                )}
              </NavLink>

               <PwaInstallPrompt />
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}