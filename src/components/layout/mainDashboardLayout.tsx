import { Sidebar } from '../sidebar'
import { Header } from '../header'
import { useState } from 'react'
import { PwaInstallPrompt } from './PwaInstallPrompt'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Passamos a função de abrir para o Header */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Container de Conteúdo centralizado e limpo */}
        <main className="p-8 max-w-400 w-full mx-auto">
          {children}
        </main>
      </div>
      <PwaInstallPrompt />
    </div>
  )
}