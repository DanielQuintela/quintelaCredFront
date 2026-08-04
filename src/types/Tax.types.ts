export type CardFlag = 'MASTER' | 'VISA'

export type TaxType = 'LIBERADO' | 'LIMITE'

export interface Tax {
  id: string
  installmentsNumber: number
  value: number
  cardFlag: CardFlag
  type: TaxType
  bankName: string | null
  description: string | null

  createdAt: string
  updatedAt: string
}

export interface CreateTaxDTO {
  installmentsNumber: number
  value: number
  cardFlag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
}