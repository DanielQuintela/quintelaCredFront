import { useState } from 'react'
import type { SimulationRequest } from '../../types/Simulation.types'
import { Calendar, CreditCard, ShieldCheck } from 'lucide-react'

type Props = {
  loading: boolean
  onSubmit: (data: SimulationRequest) => Promise<void>
}

const CARD_FLAGS = {
  MASTER: 'Mastercard',
  VISA: 'Visa',
  ELO: 'Elo',
  AMEX: 'American Express',
  DINERS: 'Diners',
  HIPERCARD: 'Hipercard',
  OUTROS: 'Outros',
}

export function SimulationForm({ loading, onSubmit }: Props) {
  const [amount, setAmount] = useState('') // Guarda o valor formatado (ex: "1.250,50")
  const [installmentsNumber, setInstallmentsNumber] = useState(1)
  const [cardFlag, setCardFlag] = useState<keyof typeof CARD_FLAGS>('MASTER')
  const [type, setType] = useState<'LIMITE' | 'LIBERADO'>('LIMITE')

  // FUNÇÃO 1: Transforma o que o usuário digita em formato Moeda Real
  function handleCurrencyChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value

    // Remove tudo o que não for dígito numérico
    value = value.replace(/\D/g, '')

    if (!value) {
      setAmount('')
      return
    }

    // Converte os dígitos para centavos (ex: 1000 vira 10.00)
    const centsValue = Number(value) / 100

    // Formata usando a regra padrão do Brasil (pt-BR)
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(centsValue)

    setAmount(formatted)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // FUNÇÃO 2: Remove os pontos e troca a vírgula por ponto para mandar um Number puro para a API
    const rawAmount = Number(
      amount
        .replace(/\./g, '') // Remove os pontos de milhar
        .replace(',', '.')  // Substitui a vírgula decimal por ponto
    )

    await onSubmit({
      amount: rawAmount,
      installmentsNumber,
      cardFlag,
      type,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Campo: Valor da Operação (Com Máscara) */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
          Valor da Simulação
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center pointer-events-none gap-0.5 text-slate-400 dark:text-slate-500 font-bold text-sm">
            <span>R$</span>
          </div>
          <input
            /* 🌟 MUDANÇA: Convertido para text para aceitar a máscara visual */
            type="text"
            inputMode="numeric" // Força o teclado numérico a abrir no smartphone
            placeholder="0,00"
            value={amount}
            onChange={handleCurrencyChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-10 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            required
          />
        </div>
      </div>

      {/* Grid Duplo: Parcelas e Tipo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Campo: Parcelas */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Parcelamento
          </label>
          <div className="relative flex items-center">
            <Calendar size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <select
              value={installmentsNumber}
              onChange={(e) => setInstallmentsNumber(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
            >
              {Array.from({ length: 21 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}x
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campo: Tipo */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Modalidade
          </label>
          <div className="relative flex items-center">
            <ShieldCheck size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'LIMITE' | 'LIBERADO')}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
            >
              <option value="LIMITE">Limite</option>
              <option value="LIBERADO">Liberado</option>
            </select>
          </div>
        </div>

      </div>

      {/* Campo: Bandeira do Cartão */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
          Bandeira do Cartão
        </label>
        <div className="relative flex items-center">
          <CreditCard size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <select
            value={cardFlag}
            onChange={(e) => setCardFlag(e.target.value as keyof typeof CARD_FLAGS)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
          >
            {Object.entries(CARD_FLAGS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botão de Submissão */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-950 dark:text-white font-bold text-sm p-3.5 shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Processando...</span>
            </div>
          ) : (
            'Calcular Simulação'
          )}
        </button>
      </div>

    </form>
  )
}