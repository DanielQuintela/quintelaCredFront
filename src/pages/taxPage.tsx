import { useEffect, useState } from 'react'
import { TaxService } from '../services/tax.services'
import type { Tax } from '../types/Tax.types'
import { MainLayout } from '../components/layout/mainDashboardLayout'


export function TaxPage() {
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [loading, setLoading] = useState(true)

  async function loadTaxes() {
    try {
      const data = await TaxService.findAll()

      setTaxes(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTaxes()
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Taxas
        </h1>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
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
                </tr>
              </thead>

              <tbody>
                {taxes.map((tax) => (
                  <tr
                    key={tax.id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {tax.bankName}
                    </td>

                    <td className="p-4">
                      {tax.cardFlag}
                    </td>

                    <td className="p-4">
                      {tax.type}
                    </td>

                    <td className="p-4">
                      {tax.installmentsNumber}
                    </td>

                    <td className="p-4">
                      {tax.value}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  )
}