import { useState, useMemo } from 'react'
import type { SimulationRequest, CardFlag } from '../../types/Simulation.types'
import { Calendar, CreditCard, ShieldCheck, MapPin } from 'lucide-react'
import type { Tax } from '../../types/Tax.types'

type Props = {
  taxes: Tax[]
  loading: boolean
  onSubmit: (data: SimulationRequest) => Promise<void>
}

export function SimulationForm({ taxes, loading, onSubmit }: Props) {
  const [amount, setAmount] = useState('')
  const [selectedLocationId, setSelectedLocationId] = useState<string>('')
  
  // Estados selecionados manualmente
  const [cardFlagState, setCardFlagState] = useState<CardFlag | null>(null)
  const [typeState, setTypeState] = useState<'LIMITE' | 'LIBERADO' | null>(null)
  const [installmentsState, setInstallmentsState] = useState<number | null>(null)

  // 1. Lista única de localidades disponíveis
  const availableLocations = useMemo(() => {
    const locMap = new Map<string, { id: string; name: string; city?: string | null }>()

    taxes.forEach((tax) => {
      if (tax.location) {
        locMap.set(tax.location.id, {
          id: tax.location.id,
          name: tax.location.name,
          city: tax.location.city,
        })
      }
    })

    return Array.from(locMap.values())
  }, [taxes])

  // 2. Filtro de taxas por localidade (Se vazio, pega apenas taxas sem localidade)
  const locationTaxes = useMemo(() => {
    if (selectedLocationId) {
      return taxes.filter((t) => t.location?.id === selectedLocationId)
    }
    return taxes.filter((t) => !t.location)
  }, [taxes, selectedLocationId])

  // 3. Bandeiras disponíveis na localidade
  const availableCardFlags = useMemo(() => {
    return [...new Set(locationTaxes.map((t) => t.cardFlag))] as CardFlag[]
  }, [locationTaxes])

  // DERIVAÇÃO AUTOMÁTICA DA BANDEIRA: Usa o estado do usuário se válido; caso contrário, pega a primeira disponível
  const activeCardFlag = useMemo(() => {
    if (cardFlagState && availableCardFlags.includes(cardFlagState)) {
      return cardFlagState
    }
    return availableCardFlags[0] || null
  }, [cardFlagState, availableCardFlags])

  // 4. Tipos disponíveis para a Bandeira + Localidade ativas
  const availableTypes = useMemo(() => {
    if (!activeCardFlag) return []
    return [
      ...new Set(
        locationTaxes
          .filter((t) => t.cardFlag === activeCardFlag)
          .map((t) => t.type)
      ),
    ] as Array<'LIMITE' | 'LIBERADO'>
  }, [locationTaxes, activeCardFlag])

  // DERIVAÇÃO AUTOMÁTICA DO TIPO
  const activeType = useMemo(() => {
    if (typeState && availableTypes.includes(typeState)) {
      return typeState
    }
    return availableTypes[0] || null
  }, [typeState, availableTypes])

  // 5. Parcelas disponíveis para Localidade + Bandeira + Tipo ativos
  const availableInstallments = useMemo(() => {
    if (!activeCardFlag || !activeType) return []
    const filtered = locationTaxes
      .filter((t) => t.cardFlag === activeCardFlag && t.type === activeType)
      .map((t) => t.installmentsNumber)
    return [...new Set(filtered)].sort((a, b) => a - b)
  }, [locationTaxes, activeCardFlag, activeType])

  // DERIVAÇÃO AUTOMÁTICA DA PARCELA
  const activeInstallmentsNumber = useMemo(() => {
    if (installmentsState && availableInstallments.includes(installmentsState)) {
      return installmentsState
    }
    return availableInstallments[0] || 1
  }, [installmentsState, availableInstallments])

  // --- HANDLERS SIMPLES DE MUDANÇA (Sem encadeamento manual) ---

  function handleLocationChange(locId: string) {
    setSelectedLocationId(locId)
    setCardFlagState(null)
    setTypeState(null)
    setInstallmentsState(null)
  }

  function handleCardFlagChange(flag: CardFlag) {
    setCardFlagState(flag)
    setTypeState(null)
    setInstallmentsState(null)
  }

  function handleTypeChange(newType: 'LIMITE' | 'LIBERADO') {
    setTypeState(newType)
    setInstallmentsState(null)
  }

  function handleCurrencyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '')

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

    const rawAmount = Number(amount.replace(/\./g, '').replace(',', '.'))

    if (!activeCardFlag || !activeType) return

    await onSubmit({
      amount: rawAmount,
      installmentsNumber: activeInstallmentsNumber,
      cardFlag: activeCardFlag,
      type: activeType,
      locationId: selectedLocationId || null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo: Localidade / Bairro */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
          Localidade / Bairro
        </label>
        <div className="relative flex items-center">
          <MapPin size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <select
            value={selectedLocationId}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
          >
            <option value="">Padrão (Sem localidade)</option>
            {availableLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} {loc.city ? `- ${loc.city}` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

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
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-10 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            required
          />
        </div>
      </div>

      {/* Grid Duplo: Parcelas e Modalidade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campo: Parcelamento */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Parcelamento
          </label>
          <div className="relative flex items-center">
            <Calendar size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <select
              value={activeInstallmentsNumber}
              disabled={availableInstallments.length === 0}
              onChange={(e) => setInstallmentsState(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none disabled:opacity-50"
            >
              {availableInstallments.map((parcel) => (
                <option key={parcel} value={parcel}>
                  {parcel}x
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campo: Modalidade */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Modalidade
          </label>
          <div className="relative flex items-center">
            <ShieldCheck size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <select
              value={activeType || ''}
              disabled={availableTypes.length === 0}
              onChange={(e) => handleTypeChange(e.target.value as 'LIMITE' | 'LIBERADO')}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none disabled:opacity-50"
            >
              {availableTypes.map((item) => (
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
            value={activeCardFlag || ''}
            disabled={availableCardFlags.length === 0}
            onChange={(e) => handleCardFlagChange(e.target.value as CardFlag)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-9 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none disabled:opacity-50"
          >
            {availableCardFlags.length === 0 ? (
              <option value="">Nenhuma taxa cadastrada nesta localidade</option>
            ) : (
              availableCardFlags.map((flag) => (
                <option key={flag} value={flag}>
                  {flag}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Botão de Submissão */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !activeCardFlag || availableInstallments.length === 0}
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