import { useNavigate } from 'react-router-dom'
import type { TaxFormData } from '../schemas/tax.schemas'
import { TaxService } from '../services/tax.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { TaxForm } from '../components/tax/tax.form'
import { toast } from 'sonner'
import { BackButton } from '../components/backButton'


export function CreateTaxPage() {
  const navigate = useNavigate()

  async function handleSubmit(
    data: TaxFormData,
  ) {
    try {
    await TaxService.create(data)
    navigate('/tax')
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Erro ao criar a taxa.')
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <BackButton />

        <h1 className="text-3xl font-bold mb-6">
          Nova Taxa
        </h1>

        <TaxForm
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  )
}