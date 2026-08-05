import { useState, useMemo, useEffect } from 'react'
import type { SimulationRequest, CardFlag } from '../../types/Simulation.types' // 🌟 Importe o CardFlag aqui
import { Calendar, CreditCard, ShieldCheck } from 'lucide-react'
import type { Tax } from '../../types/Tax.types'

type Props = {
  taxes: Tax[]
  loading: boolean
  onSubmit: (data: SimulationRequest) => Promise<void>
}

export function SimulationForm({ taxes, loading, onSubmit }: Props) {
  const [amount, setAmount] = useState('')
  const [cardFlag, setCardFlag] = useState<CardFlag | ''>('')
  const [type, setType] = useState<'LIMITE' | 'LIBERADO'>('LIMITE')
  const [installmentsNumber, setInstallmentsNumber] = useState(1)

  // 1. Extraímos as bandeiras únicas de forma memoizada
  const cardFlags = useMemo(() => {
    return [...new Set(taxes.map(t => t.cardFlag))] as CardFlag[]
  }, [taxes])

  // Efeito de Sincronização Inicial
  // Roda APENAS quando a lista de taxas (taxes) é carregada da API pela primeira vez
  useEffect(() => {
    if (taxes.length > 0 && !cardFlag) {
      // 1. Define a primeira bandeira disponível
      const firstFlag = cardFlags[0]
      // Evita setState síncrono dentro do efeito para não disparar renders em cascata.
      // Adiamos as atualizações para a próxima iteração do loop de eventos.
      setTimeout(() => {
        setCardFlag(firstFlag)

        // 2. Define o primeiro tipo disponível para essa bandeira
        const firstTypes = [
          ...new Set(taxes.filter(t => t.cardFlag === firstFlag).map(t => t.type))
        ] as Array<'LIMITE' | 'LIBERADO'>
        const firstType = firstTypes[0] || 'LIMITE'
        setType(firstType)

        // 3. Define a primeira parcela disponível para essa combinação
        const firstInstallments = taxes
          .filter(t => t.cardFlag === firstFlag && t.type === firstType)
          .map(t => t.installmentsNumber)
          .sort((a, b) => a - b)
        
        if (firstInstallments.length > 0) {
          setInstallmentsNumber(firstInstallments[0])
        }
      }, 0)
    }
  }, [taxes, cardFlags, cardFlag])

  // 2. Seletores derivados para preencher as opções dos <select>
  const availableTypes = useMemo(() => {
    if (!cardFlag) return []
    return [
      ...new Set(
        taxes
          .filter(t => t.cardFlag === cardFlag)
          .map(t => t.type)
      )
    ] as Array<'LIMITE' | 'LIBERADO'>
  }, [taxes, cardFlag])

  const availableInstallments = useMemo(() => {
    if (!cardFlag || !type) return []
    const filtered = taxes
      .filter(t => t.cardFlag === cardFlag && t.type === type)
      .map(t => t.installmentsNumber)
    return [...new Set(filtered)].sort((a, b) => a - b)
  }, [taxes, cardFlag, type])

  // 3. Funções de alteração manual pelo usuário (mantêm tudo sincronizado ao clicar)
  function handleCardFlagChange(newFlag: CardFlag) {
    setCardFlag(newFlag)
    
    const nextTypes = [
      ...new Set(taxes.filter(t => t.cardFlag === newFlag).map(t => t.type))
    ] as Array<'LIMITE' | 'LIBERADO'>
    const nextType = nextTypes[0] || 'LIMITE'
    setType(nextType)

    const nextInstallments = taxes
      .filter(t => t.cardFlag === newFlag && t.type === nextType)
      .map(t => t.installmentsNumber)
      .sort((a, b) => a - b)

    if (nextInstallments.length > 0) {
      setInstallmentsNumber(nextInstallments[0])
    }
  }

  function handleTypeChange(newType: 'LIMITE' | 'LIBERADO') {
    setType(newType)

    const nextInstallments = taxes
      .filter(t => t.cardFlag === cardFlag && t.type === newType)
      .map(t => t.installmentsNumber)
      .sort((a, b) => a - b)

    if (nextInstallments.length > 0) {
      setInstallmentsNumber(nextInstallments[0])
    }
  }

  // Transforma o que o usuário digita em formato Moeda Real
  function handleCurrencyChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value
    value = value.replace(/\D/g, '')

    if (!value) {
      setAmount('')
      return
    }

    const centsValue = Number(value) / 100
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(centsValue)

    setAmount(formatted)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const rawAmount = Number(
      amount
        .replace(/\./g, '') // Remove os pontos de milhar
        .replace(',', '.')  // Substitui a vírgula decimal por ponto
    )

    if (!cardFlag) return

    await onSubmit({
      amount: rawAmount,
      installmentsNumber,
      cardFlag, // Agora é perfeitamente compatível com o tipo CardFlag!
      type,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Campo: Valor da Operação */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
          Valor da Simulação
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center pointer-events-none gap-0.5 text-slate-400 dark:text-slate-500 font-bold text-sm">
            <span>R$</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            value={amount}
            onChange={handleCurrencyChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl 
            p-3 pl-10 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 
            focus:ring-emerald-500 transition-all"
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
              disabled={availableInstallments.length === 0}
              onChange={(e) => setInstallmentsNumber(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 
              text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 
              focus:ring-emerald-500 transition-all cursor-pointer appearance-none disabled:opacity-50"
            >
              {availableInstallments.map(parcel => (
                <option key={parcel} value={parcel}>
                  {parcel}x
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campo: Tipo / Modalidade */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Modalidade
          </label>
          <div className="relative flex items-center">
            <ShieldCheck size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <select
              value={type}
              disabled={availableTypes.length === 0}
              onChange={(e) => handleTypeChange(e.target.value as 'LIMITE' | 'LIBERADO')}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none disabled:opacity-50"
            >
              {availableTypes.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
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
            disabled={cardFlags.length === 0}
            onChange={(e) => handleCardFlagChange(e.target.value as CardFlag)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none disabled:opacity-50"
          >
            {cardFlags.map(flag => (
              <option key={flag} value={flag}>
                {flag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botão de Submissão */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !cardFlag}
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