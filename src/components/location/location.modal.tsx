import { useState } from 'react'
import { X, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { LocationService } from '../../services/location.services'
import type { Location } from '../../types/Tax.types'

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newLocation: Location) => void
}

export function LocationModal({ isOpen, onClose, onSuccess }: LocationModalProps) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Informe o nome do bairro/localidade.')
      return
    }

    try {
      setIsSubmitting(true)
      const newLoc = await LocationService.create({
        name: name.trim(),
        city: city.trim() || undefined,
        state: state.trim() || undefined,
      })

      toast.success('Localidade cadastrada!')
      onSuccess(newLoc)
      handleClose()
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao cadastrar localidade.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClose() {
    setName('')
    setCity('')
    setState('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Nova Localidade</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Cadastre um novo bairro ou região.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">
              Nome do Bairro / Região *
            </label>
            <input
              type="text"
              placeholder="Ex: Centro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                Cidade (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ex: Marechal Deodoro"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                UF 
              </label>
              <input
                type="text"
                maxLength={2}
                placeholder="AL"
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                className="w-full uppercase bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-center font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-slate-950 dark:text-white font-bold text-xs transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Cadastrar Bairro'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}