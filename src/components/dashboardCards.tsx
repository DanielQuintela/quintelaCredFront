import type { DashboardCardProps } from "../types/Dashboards";

export function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h3 className="text-slate-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>
    </div>
  )
}