import { useNavigate } from 'react-router-dom'
import type { TaxFormData } from '../schemas/tax.schemas'
import { TaxService } from '../services/tax.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { TaxForm } from '../components/tax/tax.form'
import { toast } from 'sonner'
import { BackButton } from '../components/backButton'

export function CreateTaxPage() {
  const navigate = useNavigate()

 async function handleSubmit(data: TaxFormData) {
  try {
    // Garante que se o campo for string vazia "", envie null para o backend
    const payload = {
      ...data,
      locationId: data.locationId ? data.locationId : null,
    }

    await TaxService.create(payload)
    navigate('/tax')
    toast.success('Taxa criada com sucesso.')
  } catch (error) {
    console.error(error)
    toast.error(error instanceof Error ? error.message : 'Erro ao criar a taxa.')
  }
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
            Nova Taxa
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cadastre os parâmetros de juros, bandeira e parcelamento para as simulações.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xs">
          <TaxForm onSubmit={handleSubmit} />
        </div>

      </div>
    </MainLayout>
  )
}