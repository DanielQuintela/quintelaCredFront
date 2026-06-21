import { z } from 'zod'

export const taxSchema = z.object({
  installmentsNumber: z.coerce
    .number()
    .min(1, 'Mínimo 1 parcela')
    .max(12, 'Máximo 12 parcelas'),

  value: z.coerce
    .number()
    .min(0.01, 'Informe uma taxa válida'),

  cardFlag: z.enum([
    'MASTER',
    'VISA',
  ]),

  type: z.enum([
    'LIBERADO',
    'LIMITE',
  ]),
})

export type TaxFormData = z.infer<
  typeof taxSchema
>