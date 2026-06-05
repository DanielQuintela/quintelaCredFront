import { DashboardCard } from "../components/dashboardCards";
import { MainLayout } from "../components/layout/mainDashboardLayout";

import { BarChart3, Percent, Users2, Landmark } from 'lucide-react'

export function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-7">
        {/* Título e Subtítulo */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Visão Geral
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Acompanhe as métricas de simulações e configurações do sistema.
          </p>
        </div>

        {/* Grid de Cards Inteligente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <DashboardCard
            title="Simulações"
            value="1,248"
            icon={<BarChart3 className="h-5 w-5 text-emerald-500" />}
            trend="+12% este mês"
          />

          <DashboardCard
            title="Taxas Ativas"
            value="4"
            icon={<Percent className="h-5 w-5 text-blue-500" />}
            trend="Última alt. ontem"
          />

          <DashboardCard
            title="Usuários"
            value="18"
            icon={<Users2 className="h-5 w-5 text-violet-500" />}
          />

          <DashboardCard
            title="Bancos Parceiros"
            value="6"
            icon={<Landmark className="h-5 w-5 text-orange-500" />}
          />
        </div>
      </div>
    </MainLayout>
  )
}