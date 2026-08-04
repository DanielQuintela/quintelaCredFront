import { useEffect, useState } from 'react'
import type {
  SimulationRequest,
  SimulationResponse,
} from '../types/Simulation.types'
import { SimulationService } from '../services/simulation.service'
import { SimulationForm } from '../components/simulation/simulation.form'
import { SimulationResult } from '../components/simulation/simulation.result'
import { toast } from 'sonner'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { Calculator } from 'lucide-react'
import type { Tax } from '../types/Tax.types'
import { TaxService } from '../services/tax.services'

export function SimulationPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimulationResponse | null>(null)
  const [taxes, setTaxes] = useState<Tax[]>([])

  async function handleSimulate(data: SimulationRequest) {
    try {
      setLoading(true)
      const response = await SimulationService.simulate(data)
      setResult(response)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    async function loadTaxes() {
      try {
        const data = await TaxService.findAll()

        if (isMounted) {
          setTaxes(data)
        }
      } catch (error) {
        toast.error('Erro ao carregar as taxas.')
        console.error(error)
      }
    }

    loadTaxes()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <MainLayout>
      {/* 🌟 Ajustado para max-w-7xl para dar espaço de sobra quando o grid abrir */}
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Cabeçalho da Página */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Calculator className="text-emerald-500 h-7 w-7 shrink-0" />
            <span>Simulador Financeiro</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Preencha os dados da operação abaixo para calcular e comparar as taxas vigentes.
          </p>
        </div>

        {/* 🌟 LAYOUT DINÂMICO: Se tiver resultado, vira duas colunas no PC. Se não, fica centralizado e compacto. */}
        <div className={`grid grid-cols-1 gap-6 transition-all duration-300 ${
          result ? 'lg:grid-cols-12' : 'max-w-2xl'
        }`}>
          
          {/* Coluna do Formulário */}
          <div className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs h-fit ${
            result ? 'lg:col-span-5' : 'w-full'
          }`}>
            <div className="mb-5 border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <h2 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider">
                Parâmetros de Entrada
              </h2>
            </div>

            <SimulationForm
              taxes={taxes}
              loading={loading}
              onSubmit={handleSimulate}
            />
          </div>

          {/* Coluna do Resultado (Só renderiza se o state 'result' for preenchido) */}
          {result && (
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs h-fit animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-5 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <h2 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wider">
                  Demonstrativo do Cálculo
                </h2>
              </div>

              <SimulationResult result={result} />
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  )
}