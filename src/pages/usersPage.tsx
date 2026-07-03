import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2, UserCheck, UserX } from 'lucide-react'
import { UserService } from '../services/user.services'
import type { UserResponse } from '../types/Auth.types'
import { MainLayout } from '../components/layout/mainDashboardLayout'


export function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [loading, setLoading] = useState(true)

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
    }
  }

  async function handleUpdateStatus(id: string) {
    try {
      await UserService.updateStatus(id)

      loadUsers()
    } catch (error) {
      console.error(error)
    }
  }
  console.log(users)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Usuários
            </h1>

            <p className="text-slate-500 mt-1">
              Gerencie os usuários do sistema.
            </p>
          </div>

          <Link
            to="/user/new"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            <Plus size={18} />
            Novo Usuário
          </Link>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              Carregando usuários...
            </div>
          ) : users.length === 0 ? (
            <div className="p-6">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="text-left p-4">Nome</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Perfil</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Ações</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.role}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.status === 'ACTIVE'
                          ? 'Ativo'
                          : 'Inativo'}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/user/${user.id}/edit`}
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            handleUpdateStatus(user.id)
                          }
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Alterar status"
                        >
                          {user.status === 'ACTIVE' ? (
                            <UserX size={18} />
                          ) : (
                            <UserCheck size={18} color='green'/>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user.id)
                          }
                          className="text-red-600 hover:text-red-800"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  )
}