import { useAuth } from '../hooks/UseAuth'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h2 className="font-semibold">
        Dashboard
      </h2>

      <div className="text-right">
        <p className="font-medium">
          {user?.userName}
        </p>

        <p className="text-sm text-slate-500">
          {user?.userRole}
        </p>
      </div>
    </header>
  )
}