import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taxSchema, type TaxFormData } from '../../schemas/tax.schemas'
import { useNavigate } from 'react-router-dom'

interface Props {
  defaultValues?: TaxFormData
  onSubmit: SubmitHandler<TaxFormData>
}

export function TaxForm({ defaultValues, onSubmit }: Props) {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaxFormData>({
    resolver: zodResolver(taxSchema) as Resolver<TaxFormData>,
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
            Bandeira do Cartão
          </label>
          <select
            {...register('cardFlag')}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
          >
            <option value="MASTER">Mastercard</option>
            <option value="VISA">Visa</option>
            <option value="ELO">Elo</option>
            <option value="AMEX">American Express</option>
            <option value="DINERS">Diners</option>
            <option value="HIPERCARD">Hipercard</option>
            <option value="OUTROS">Outros</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
            Tipo de Transação
          </label>
          <select
            {...register('type')}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
          >
            <option value="LIBERADO">Liberado</option>
            <option value="LIMITE">Limite</option>
          </select>
        </div>
      </div>

      {/*Parcelas e Valor Percentual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
            Número de Parcelas
          </label>
          <input
            type="number"
            placeholder="Ex: 12"
            {...register('installmentsNumber')}
            className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
              errors.installmentsNumber 
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' 
                : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
            }`}
          />
          {errors.installmentsNumber?.message && (
            <p className="text-rose-500 text-xs font-medium mt-1.5">
              {errors.installmentsNumber.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
            Taxa do Sistema (%)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            {...register('value')}
            className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
              errors.value 
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' 
                : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
            }`}
          />
          {errors.value?.message && (
            <p className="text-rose-500 text-xs font-medium mt-1.5">
              {errors.value.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/60">
        <button
          type="button"
          onClick={() => navigate('/tax')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-950 dark:text-white font-bold text-sm shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Taxa'}
        </button>
      </div>
    </form>
  )
}