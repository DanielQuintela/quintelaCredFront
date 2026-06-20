import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { TaxService } from '../services/tax.services'
import { MainLayout } from '../components/layout/mainDashboardLayout'
import { TaxForm } from '../components/tax/tax.form'
import type { TaxFormData } from '../schemas/tax.schemas'
import { toast } from 'sonner'
import { BackButton } from '../components/backButton'

export function EditTaxPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [tax, setTax] =
    useState<TaxFormData>()

  useEffect(() => {
    async function loadTax() {
      if (!id) return

      const data =
        await TaxService.findById(id)

      setTax({
        installmentsNumber: data.installmentsNumber,
        value: data.value,
        cardFlag: data.cardFlag,
        type: data.type,
      })
    }

    loadTax()
  }, [id])

  async function handleSubmit(
    data: TaxFormData,
  ) {
    if (!id) return

    try { 
      await TaxService.update(id,data)
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
        <p>Carregando...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6">
          Editar Taxa
        </h1>

        <TaxForm
          defaultValues={tax}
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  )
}