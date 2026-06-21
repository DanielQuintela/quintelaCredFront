import type { SimulationResponse } from '../../types/Simulation.types'
import { formatCurrency } from '../helpers/formatCurrency'
import { Percent, CreditCard, Wallet, BadgePercent, ArrowRightLeft } from 'lucide-react'

type Props = {
  result: SimulationResponse
}

export function SimulationResult({ result }: Props) {
  return (
    <div className="space-y-6">
      
      {/* 📊 Bloco de Destaque: Resumo de Caixa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Card: Total a ser passado no Cartão */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/40">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard size={14} />
            Passa no Cartão
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {formatCurrency(result.passaNoCartao)}
          </p>
        </div>

        {/* Card: Valor Líquido Liberado/Recebido */}
        <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Wallet size={14} />
            Valor Recebido
          </span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1.5 tracking-tight">
            {formatCurrency(result.receivedAmount)}
          </p>
        </div>

      </div>

      {/* Divisor estético sutil */}
      <div className="border-t border-slate-100 dark:border-slate-800/60" />

      {/* 📝 Extrato Detalhado do Cálculo */}
      <div className="space-y-3.5 text-sm font-medium">
        
        {/* Linha: Valor Solicitado */}
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <ArrowRightLeft size={14} />
            Valor solicitado
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">
            {formatCurrency(result.amount)}
          </span>
        </div>

        {/* Linha: Condição de Parcelamento */}
        <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/40">
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <BadgePercent size={14} />
            Plano de parcelas
          </span>
          <span className="text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold">
            {result.installmentNumber}x de {formatCurrency(result.installmentAmount)}
          </span>
        </div>

        {/* Linha: Alíquota da Taxa */}
        <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/40">
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Percent size={14} />
            Taxa aplicada
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {result.taxPercentage}%
          </span>
        </div>

        {/* Linha: Desconto Retido de Juros */}
        <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/40">
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Percent size={14} />
            Taxa calculada (Custo)
          </span>
          <span className="text-rose-500 dark:text-rose-400 font-bold">
            - {formatCurrency(result.taxaCalculada)}
          </span>
        </div>

      </div>

    </div>
  )
}