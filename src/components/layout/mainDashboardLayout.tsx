import { Sidebar } from '../sidebar'
import { Header } from '../header'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* Container de Conteúdo centralizado e limpo */}
        <main className="p-8 max-w-400 w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}