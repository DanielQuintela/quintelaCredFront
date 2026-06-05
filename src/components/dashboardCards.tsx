import type { DashboardCardProps } from "../types/Dashboards";


export function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex items-start justify-between hover:shadow-md transition-all duration-200">
      <div className="space-y-2">
        <h3 className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
        
        {trend && (
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium pt-1">
            {trend}
          </p>
        )}
      </div>

      {/* Box do Ícone com fundo transparente suave */}
      {icon && (
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/40">
          {icon}
        </div>
      )}
    </div>
  )
}