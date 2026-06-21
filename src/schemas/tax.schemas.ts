import { z } from 'zod'

export const taxSchema = z.object({
  installmentsNumber: z.coerce
    .number()
    .min(1, 'Mínimo 1 parcela')
    .max(21, 'Máximo 21 parcelas'),

  value: z.coerce
    .number()
    .min(0.01, 'Informe uma taxa válida'),

  cardFlag: z.enum([
    'MASTER',
    'VISA',
    'ELO',
    'AMEX',
    'DINERS',
    'HIPERCARD',
    'OUTROS',
  ]),

  type: z.enum([
    'LIBERADO',
    'LIMITE',
  ]),
})

export type TaxFormData = z.infer<
  typeof taxSchema
>