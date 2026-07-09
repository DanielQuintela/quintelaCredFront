import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type Resolver } from 'react-hook-form'
import { User, Mail, Lock, Shield } from 'lucide-react' // 🌟 Importação de ícones para os campos

import { createUserSchema, updateUserSchema } from '../../schemas/user.schema'
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
    /* 🌟 FIX: Adicionado 'space-y-5' para distribuir os blocos do form uniformemente */
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      {/* Campo: Nome completo */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 block">
          Nome Completo
        </label>
        <div className="relative flex items-center">
          <User size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Nome do usuário"
            {...register('name')}
            className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 pl-10 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
              errors.name
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
            }`}
          />
        </div>
        {errors.name && (
          <p className="text-rose-500 text-xs font-medium mt-1.5">{errors.name.message}</p>
        )}
      </div>

      {/* Campo: E-mail de Acesso */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 block">
          E-mail Corporativo
        </label>
        <div className="relative flex items-center">
          <Mail size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="email"
            placeholder="usuario@quintelacred.com.br"
            {...register('email')}
            className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 pl-10 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
              errors.email
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-rose-500 text-xs font-medium mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Grid Duplo Dinâmico: Senha (se for criação) e Perfil de Acesso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {!isEditMode && (
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 block">
              Senha Temporária
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="password"
                placeholder="********"
                {...register('password')}
                className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 pl-10 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 transition-all ${
                  errors.password
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-rose-500 text-xs font-medium mt-1.5">{errors.password.message}</p>
            )}
          </div>
        )}

        {/* Campo: Nível/Role */}
        <div className={`flex flex-col ${isEditMode ? 'sm:col-span-2' : ''}`}>
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 block">
            Perfil de Acesso
          </label>
          <div className="relative flex items-center">
            <Shield size={16} className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <select
              {...register('role')}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-10 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
            >
              <option value="USER">Operador padrão</option>
              <option value="ADMIN">Administrador master</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rodapé de Ações */}
      <div className="flex items-center justify-end gap-3 pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/60">
        <button
          type="button"
          onClick={() => navigate(cancelRoute)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-950 dark:text-white font-bold text-sm shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Processando...</span>
            </div>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
}