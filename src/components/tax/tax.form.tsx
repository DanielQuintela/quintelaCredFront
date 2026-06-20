import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taxSchema, type TaxFormData } from '../../schemas/tax.schemas'


interface Props {
  defaultValues?: TaxFormData
  onSubmit: SubmitHandler<TaxFormData>
}

export function TaxForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    } = useForm<TaxFormData>({
    resolver: zodResolver(taxSchema) as Resolver<TaxFormData>,
    defaultValues,
})

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Bandeira</label>

          <select
            {...register('cardFlag')}
            className="w-full border rounded-lg p-3"
          >
            <option value="MASTER">
              Master
            </option>

            <option value="VISA">
              Visa
            </option>
          </select>
        </div>

        <div>
          <label>Tipo</label>

          <select
            {...register('type')}
            className="w-full border rounded-lg p-3"
          >
            <option value="LIBERADO">
              Liberado
            </option>

            <option value="LIMITE">
              Limite
            </option>
          </select>
        </div>
      </div>

      <div>
        <label>Parcelas</label>

        <input
          type="number"
          {...register(
            'installmentsNumber'
          )}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm">
          {
            errors.installmentsNumber
              ?.message
          }
        </p>
      </div>

      <div>
        <label>Taxa (%)</label>

        <input
          type="number"
          step="0.01"
          {...register('value')}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.value?.message}
        </p>
      </div>

      <button
        disabled={isSubmitting}
        className="px-5 py-3 rounded-lg bg-slate-900 text-white"
      >
        {isSubmitting
          ? 'Salvando...'
          : 'Salvar'}
      </button>
    </form>
  )
}