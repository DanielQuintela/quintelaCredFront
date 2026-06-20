import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2, Plus } from 'lucide-react'
import type { Tax } from '../types/Tax.types'
import { TaxService } from '../services/tax.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'



export function TaxPage() {
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const data = await TaxService.findAll()
        if (isMounted) {
          setTaxes(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Taxas
            </h1>

            <p className="text-slate-500 mt-1">
              Gerencie as taxas utilizadas nas simulações.
            </p>
          </div>

          <Link
            to="/tax/new"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            <Plus size={18} />
            Nova Taxa
          </Link>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              <p>Carregando taxas...</p>
            </div>
          ) : taxes.length === 0 ? (
            <div className="p-6">
              <p className="text-slate-500">
                Nenhuma taxa cadastrada.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="text-left p-4">
                    Banco
                  </th>

                  <th className="text-left p-4">
                    Bandeira
                  </th>

                  <th className="text-left p-4">
                    Tipo
                  </th>

                  <th className="text-left p-4">
                    Parcelas
                  </th>

                  <th className="text-left p-4">
                    Taxa
                  </th>

                  <th className="text-left p-4">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {taxes.map((tax) => (
                  <tr
                    key={tax.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {tax.bankName ?? '-'}
                    </td>

                    <td className="p-4">
                      {tax.cardFlag}
                    </td>

                    <td className="p-4">
                      {tax.type}
                    </td>

                    <td className="p-4">
                      {tax.installmentsNumber}x
                    </td>

                    <td className="p-4">
                      {tax.value.toFixed(2)}%
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/tax/${tax.id}/edit`}
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Excluir"
                          onClick={() => {
                            console.log(
                              'Excluir:',
                              tax.id,
                            )
                          }}
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