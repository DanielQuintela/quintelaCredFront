import { useAuth } from '../hooks/UseAuth'

export function Header() {
  const { user } = useAuth()

  // Pega a primeira letra do nome para o avatar caso não tenha imagem
  const userInitials = user?.data.name ? user.data.name.substring(0, 2).toUpperCase() : 'U'

  return (
    <header className="h-16 bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/80 px-8 flex items-center justify-between backdrop-blur-sm sticky top-0 z-40">
      <h2 className="font-semibold text-slate-700 dark:text-slate-200 tracking-wide">
        Painel Administrativo
      </h2>

      {/* Bloco de Usuário com Avatar */}
      <div className="flex items-center gap-3 select-none">
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
      </div>
    </header>
  )
}