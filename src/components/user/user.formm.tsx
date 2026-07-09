import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm,
  type Resolver,
} from 'react-hook-form'

import {
  createUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema'
import type { UserFormValues } from '../../types/User.types'


interface Props {
  defaultValues?: Partial<UserFormValues>
  onSubmit: (data: UserFormValues) => void | Promise<void>

  submitLabel?: string
  cancelRoute?: string
}

export function UserForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Salvar Usuário',
  cancelRoute = '/users',
}: Props) {
  const navigate = useNavigate()
  const isEditMode = submitLabel === 'Atualizar Usuario'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema) as Resolver<UserFormValues>,
    defaultValues,
  })

  return (
   <form
  onSubmit={handleSubmit(
    (data) => {
      console.log(data);
      onSubmit(data);
    },
    (errors) => {
      console.log(errors);
    }
  )}
>
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Nome
        </label>

        <input
          type="text"
          placeholder="Nome do usuário"
          {...register('name')}
          className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
            errors.name
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
          }`}
        />

        {errors.name && (
          <p className="text-rose-500 text-xs font-medium mt-1.5">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          E-mail
        </label>

        <input
          type="email"
          placeholder="usuario@email.com"
          {...register('email')}
          className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
            errors.email
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
          }`}
        />

        {errors.email && (
          <p className="text-rose-500 text-xs font-medium mt-1.5">
            {errors.email.message}
          </p>
        )}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {!isEditMode && (
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Senha temporária
            </label>

            <input
              type="password"
              placeholder="********"
              {...register('password')}
              className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
                errors.password
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
              }`}
            />

            {errors.password && (
              <p className="text-rose-500 text-xs font-medium mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>
        )}

        <div className={`flex flex-col ${isEditMode ? 'sm:col-span-2' : ''}`}>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Perfil
          </label>

          <select
            {...register('role')}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/60">
        <button
          type="button"
          onClick={() => navigate(cancelRoute)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-950 dark:text-white font-bold text-sm shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}