import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Calculator,
  BadgeDollarSign,
} from 'lucide-react'

import { useAuth } from '../hooks/UseAuth'

export function Sidebar() {
  const { user } = useAuth()

  const isAdmin = user?.userRole === 'ADMIN'

  return (
    <aside className="w-64 bg-white border-r">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="font-bold text-xl">
          QuintelaCred
        </h1>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 p-3 rounded hover:bg-slate-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/simulation"
          className="flex items-center gap-2 p-3 rounded hover:bg-slate-100"
        >
          <Calculator size={18} />
          Simulação
        </Link>

        {isAdmin && (
          <Link
            to="/tax"
            className="flex items-center gap-2 p-3 rounded hover:bg-slate-100"
          >
            <BadgeDollarSign size={18} />
            Taxas
          </Link>
        )}
      </nav>
    </aside>
  )
}