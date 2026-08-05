import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Plus, Trash2, UserCheck, UserX, Users, ArrowLeft, Mail, Shield } from 'lucide-react'
import { UserService } from '../services/user.services'
import type { UserResponse } from '../types/Auth.types'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { toast } from 'sonner'

export function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function loadUsers() {
    try {
      const data = await UserService.findMany()
      setUsers(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await UserService.findMany()
        if (!mounted) return
        setUsers(data)
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Deseja realmente excluir este usuário?')) {
      return
    }

    try {
      await UserService.delete(id)
      setUsers((prev) => prev.filter((user) => user.id !== id))
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao deletar usuário')
    }
  }

  async function handleUpdateStatus(id: string) {
    try {
      await UserService.updateStatus(id)
      loadUsers()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar status do usuário')
      console.error(error)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Cabeçalho de Navegação e Título */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="group mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Voltar ao Dashboard
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Controle de Usuários
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Gerencie permissões, bloqueios e credenciais de acesso dos operadores do sistema.
            </p>
          </div>

          <Link
            to="/user/new"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-slate-950 
            dark:text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98] w-full md:w-auto"
          >
            <Plus size={16} />
            Novo Usuário
          </Link>
        </div>

        {/* Área da Tabela / Cards */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium animate-pulse">Sincronizando contas de operadores...</p>
            </div>
          ) : users.length === 0 ? (
            /* Empty State customizado */
            <div className="p-16 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 text-slate-400 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                <Users size={28} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Nenhum operador cadastrado</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                O banco de dados de acessos está limpo. Comece adicionando um novo usuário administrativo.
              </p>
            </div>
          ) : (
            /* Tabela Híbrida (Cards no Mobile, Tabela Fluida no PC) */
            <div className="max-h-155 overflow-y-auto">
              <table className="w-full text-sm text-left block lg:table border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest select-none">
                    <th className="p-4 pl-6">Nome</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Perfil</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center pr-6">Ações</th>
                  </tr>
                </thead>

                <tbody className="block lg:table-row-group divide-y divide-slate-200/60 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300 p-4 lg:p-0 space-y-3 lg:space-y-0">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="block lg:table-row bg-slate-50/50 dark:bg-slate-950/20 lg:bg-transparent border lg:border-none border-slate-200 dark:border-slate-800 p-4 rounded-xl lg:rounded-none hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Coluna: Nome */}
                      <td className="flex lg:table-cell justify-between items-center p-1 lg:p-4 lg:pl-6 font-semibold text-slate-900 dark:text-white">
                        <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Nome</span>
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center text-xs font-bold border border-slate-200/40 dark:border-slate-700/40 uppercase sm:flex">
                            {user.name.substring(0, 2)}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>

                      {/* Coluna: Email */}
                      <td className="flex lg:table-cell justify-between items-center p-1 lg:p-4 text-slate-500 dark:text-slate-400">
                        <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email</span>
                        <div className="flex items-center gap-1.5">
                          <Mail size={14} className="text-slate-400 hidden lg:block" />
                          <span className="truncate max-w-50 sm:max-w-none">{user.email}</span>
                        </div>
                      </td>

                      {/* Coluna: Perfil */}
                      <td className="flex lg:table-cell justify-between items-center p-1 lg:p-4">
                        <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Perfil</span>
                        <div className="flex items-center gap-1.5">
                          <Shield size={14} className="text-slate-400 hidden lg:block" />
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                            {user.role}
                          </span>
                        </div>
                      </td>

                      {/* Coluna: Status */}
                      <td className="flex lg:table-cell justify-between lg:text-center items-center p-1 lg:p-4">
                        <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-md font-bold tracking-wide ${
                            user.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {user.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>

                      {/* Coluna: Ações */}
                      <td className="flex lg:table-cell justify-between items-center p-1 pt-3 mt-2 lg:mt-0 border-t lg:border-none border-slate-200 dark:border-slate-800 lg:p-4 lg:pr-6">
                        <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ações</span>
                        
                        <div className="flex items-center justify-end lg:justify-center gap-1 flex-1 lg:flex-none">
                          {/* Editar */}
                          <Link
                            to={`/user/${user.id}/edit`}
                            className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-all"
                            title="Editar Operador"
                          >
                            <Pencil size={16} />
                          </Link>

                          {/* Alternar Status (Ativar/Bloquear) */}
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(user.id)}
                            className={`p-2 rounded-xl transition-all ${
                              user.status === 'ACTIVE'
                                ? 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                                : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                            }`}
                            title={user.status === 'ACTIVE' ? 'Bloquear Acesso' : 'Liberar Acesso'}
                          >
                            {user.status === 'ACTIVE' ? (
                              <UserX size={16} />
                            ) : (
                              <UserCheck size={16} />
                            )}
                          </button>

                          {/* Excluir Registro */}
                          <button
                            type="button"
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all"
                            title="Deletar Usuário"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}