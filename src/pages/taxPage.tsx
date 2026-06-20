import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react'
import type { Tax } from '../types/Tax.types'
import { TaxService } from '../services/tax.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'

export function TaxPage() {
  const [taxes, setTaxes] = useState<Tax[]>([])
  const navigate = useNavigate()

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
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDeleteTax = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta taxa?')) {
      return
    }
    try {
      await TaxService.delete(id)
      setTaxes((prev) => prev.filter((tax) => tax.id !== id))
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Erro ao excluir a taxa.')
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Top Header Navigation */}
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
              Tabela de Taxas
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Gerencie parâmetros, bandeiras e regras tributárias operadas nas simulações.
            </p>
          </div>

          <Link
            to="/tax/new"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-950 dark:text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] w-full md:w-auto"
          >
            <Plus size={16} />
            Nova Taxa
          </Link>
        </div>

        {/* Card Content & Table Area */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          
          {/* Conteúdo com scroll vertical controlado para não ir ao infinito */}
          <div className="max-h-[580px] overflow-y-auto">
            
            <table className="w-full text-sm text-left block lg:table border-collapse">
              
              <thead className="hidden lg:table-header-group bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest select-none">
                <tr>
                  <th className="p-4 pl-6">Bandeira</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4 text-center">Parcelas</th>
                  <th className="p-4 text-right">Taxa Aplicada</th>
                  <th className="p-4 text-center pr-6">Ações</th>
                </tr>
              </thead>

              <tbody className="block lg:table-row-group divide-y divide-slate-200/60 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300 p-4 lg:p-0 space-y-3 lg:space-y-0">
                {taxes.map((tax) => (
                  <tr
                    key={tax.id}
                    className="block lg:table-row bg-slate-50/50 dark:bg-slate-950/20 lg:bg-transparent border lg:border-none border-slate-200 dark:border-slate-800 p-4 rounded-xl lg:rounded-none hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Coluna Bandeira */}
                    <td className="flex lg:table-cell justify-between items-center p-1 lg:p-4 lg:pl-6">
                      <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bandeira</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md font-bold">
                        {tax.cardFlag}
                      </span>
                    </td>

                    {/* Coluna Tipo */}
                    <td className="flex lg:table-cell justify-between items-center p-1 lg:p-4">
                      <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tipo</span>
                      <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                        tax.type.toUpperCase() === 'DÉBITO' 
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      }`}>
                        {tax.type}
                      </span>
                    </td>

                    {/* Coluna Parcelas */}
                    <td className="flex lg:table-cell justify-between lg:text-center items-center p-1 lg:p-4">
                      <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Parcelas</span>
                      <span className="text-slate-900 dark:text-slate-100">{tax.installmentsNumber}x</span>
                    </td>

                    {/* Coluna Taxa */}
                    <td className="flex lg:table-cell justify-between lg:text-right items-center p-1 lg:p-4">
                      <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Taxa</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">{tax.value.toFixed(2)}%</span>
                    </td>

                    {/* Coluna Ações */}
                    <td className="flex lg:table-cell justify-between items-center p-1 pt-3 mt-2 lg:mt-0 border-t lg:border-none border-slate-200 dark:border-slate-800 lg:p-4 lg:pr-6">
                      <span className="lg:hidden text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ações</span>
                      
                      {/* 🌟 FIX: Mudamos de 'w-full' para 'justify-end lg:justify-center' */}
                      <div className="flex items-center justify-end lg:justify-center gap-2 flex-1 lg:flex-none">
                        <Link
                          to={`/tax/${tax.id}/edit`}
                          className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-all"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteTax(tax.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all"
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
        </div>
      </div>
    </MainLayout>
  )
}