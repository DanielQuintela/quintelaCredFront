import { DashboardCard } from "../components/dashboardCards";
import { MainLayout } from "../components/layout/mainDashboardLayout";

export function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Visão Geral
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <DashboardCard
            title="Simulações"
            value="0"
          />

          <DashboardCard
            title="Taxas"
            value="0"
          />

          <DashboardCard
            title="Usuários"
            value="0"
          />

          <DashboardCard
            title="Bancos"
            value="0"
          />
        </div>
      </div>
    </MainLayout>
  )
}