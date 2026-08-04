import { useState, useEffect } from 'react'
import { Smartphone, Apple, X, Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PwaInstallPrompt() {
  const [isIOSModalOpen, setIsIOSModalOpen] = useState(false)
  const [showAndroidBtn, setShowAndroidBtn] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  const isClient = typeof window !== 'undefined'
  const isIOS = isClient && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)
  const isStandalone = isClient && window.matchMedia('(display-mode: standalone)').matches
  const showIOSBtn = isClient && !isStandalone && isIOS

  useEffect(() => {
    if (!isClient || isStandalone || isIOS) return

    // 2. Ouvinte para navegadores Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowAndroidBtn(true)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [isClient, isStandalone, isIOS])

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowAndroidBtn(false)
    }
    setDeferredPrompt(null)
  }

  // Se o app já estiver instalado ou não for mobile, não renderiza nada
  if (!showAndroidBtn && !showIOSBtn) return null

  return (
    <>
      {/* 📱 CONTAINER DOS BOTÕES (Estilizado para o ecossistema Quintela) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-xs w-full p-2 lg:hidden animate-in fade-in slide-in-from-bottom-5">
        
        {/* Botão Android/Chrome */}
        {showAndroidBtn && (
          <button
            onClick={handleAndroidInstall}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-5 rounded-xl shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer text-sm"
          >
            <Download size={18} />
            Instalar QuintelaCred
          </button>
        )}

        {/* Botão iPhone (Manual) */}
        {showIOSBtn && (
          <button
            onClick={() => setIsIOSModalOpen(true)}
            className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-bold py-3 px-5 rounded-xl shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer text-sm border border-slate-800 dark:border-slate-200"
          >
            <Apple size={18} />
            Instalar no iPhone
          </button>
        )}
      </div>

      {/* 🍏 MODAL DE INSTRUÇÕES PARA IPHONE (Estilizado Dark/Light) */}
      {isIOSModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative space-y-4">
            
            <button 
              onClick={() => setIsIOSModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl text-emerald-500">
                <Smartphone size={22} />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Instalar no iPhone
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm font-medium">
              <p>Siga estes passos simples para adicionar à sua tela de início:</p>
              
              <ol className="space-y-3 list-none pl-0">
                <li className="flex gap-2.5 items-start">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">1</span>
                  <span>Toque no botão de <strong>Compartilhar</strong> (o ícone de quadrado com uma seta para cima na barra do Safari).</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">2</span>
                  <span>Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">3</span>
                  <span>Confirme o nome do aplicativo e toque em <strong>"Adicionar"</strong> no canto superior direito.</span>
                </li>
              </ol>

              <div className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60 text-xs text-slate-400 dark:text-slate-500 font-medium">
                <strong>Pronto!</strong> O app se comportará como um aplicativo nativo, com carregamento rápido e visual limpo em tela cheia.
              </div>
            </div>

            <button
              onClick={() => setIsIOSModalOpen(false)}
              className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-xl transition-colors text-sm cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  )
}