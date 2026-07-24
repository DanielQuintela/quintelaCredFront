import { useState } from 'react'
import type { SimulationResponse } from '../../types/Simulation.types'
import { formatCurrency } from '../helpers/formatCurrency'
import { Percent, CreditCard, Wallet, BadgePercent, ArrowRightLeft, Copy, Check } from 'lucide-react'

type Props = {
  result: SimulationResponse
}

export function SimulationResult({ result }: Props) {
  const [copied, setCopied] = useState(false)

  // 🌟 Função para montar o texto formatado e copiar para a área de transferência
  async function handleCopy() {
    const textToCopy = `
      📊 *RESUMO DA SIMULAÇÃO*

      💳 *Passa no Cartão:* ${formatCurrency(result.passaNoCartao)}
      💰 *Valor Recebido:* ${formatCurrency(result.receivedAmount)}

      --------------------------------
      💵 *Valor Solicitado:* ${formatCurrency(result.amount)}
      📅 *Plano:* ${result.installmentNumber}x de ${formatCurrency(result.installmentAmount)}
      📈 *Taxa aplicada:* ${result.taxPercentage}%
      `.trim()

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      // Volta o ícone/texto para o estado inicial após 2 segundos
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar texto: ', err)
    }
  }

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
            {result.tax}%
          </span>
        </div>

        {/* Linha: Taxa em %*/}
        <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/40">
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Percent size={14} />
            Taxa (%)
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {result.taxPercentage}%
          </span>
        </div>

        {/* Linha: Desconto Retido de Juros, Valor do lucro, e da despesa do cliente*/}
        {/* <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/40">
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Percent size={14} />
            Taxa calculada (Custo)
          </span>
          <span className="text-rose-500 dark:text-rose-400 font-bold">
            - {formatCurrency(result.taxaCalculada)}
          </span>
        </div> */}

      </div>

      {/* 📋 Botão para Copiar Resultado */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 rounded-xl p-3 text-sm font-bold border transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          {copied ? (
            <>
              <Check size={16} className="text-emerald-500" />
              <span>Copiado com Sucesso!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copiar Resumo da Simulação</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}