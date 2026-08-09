import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TaxService } from '../services/tax.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { TaxForm } from '../components/tax/tax.form'
import type { TaxFormData } from '../schemas/tax.schemas'
import { toast } from 'sonner'
import { BackButton } from '../components/backButton'

export function EditTaxPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tax, setTax] = useState<TaxFormData>()

  useEffect(() => {
    async function loadTax() {
      if (!id) return

      try {
        const data = await TaxService.findById(id)
        setTax({
          installmentsNumber: data.installmentsNumber,
          value: data.value,
          cardFlag: data.cardFlag,
          type: data.type,
          locationId: data.location?.id ?? null,
        })
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar os dados da taxa.')
        navigate('/tax')
      }
    }

    loadTax()
  }, [id, navigate])

  async function handleSubmit(data: TaxFormData) {
    if (!id) return

    try {
      await TaxService.update(id, data)
      navigate('/tax')
      toast.success('Taxa atualizada com sucesso.')
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar a taxa.')
    }
  }

  if (!tax) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
          <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse">Buscando informações da taxa...</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Cabeçalho da Tela */}
        <div className="space-y-1.5">
          <div className="mb-2">
            <BackButton />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Editar Taxa
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Modifique as regras e percentuais aplicados a este perfil de parcelamento.
          </p>
        </div>

        {/* Card Premium do Formulário */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs">
          <TaxForm
            defaultValues={tax}
            onSubmit={handleSubmit}
          />
        </div>

      </div>
    </MainLayout>
  )
}