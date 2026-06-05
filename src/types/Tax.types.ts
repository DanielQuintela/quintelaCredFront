export type CardFlag = 'MASTER' | 'VISA'

export type TaxType = 'LIBERADO' | 'LIMITE'

export interface Tax {
  id: string
  installmentsNumber: number
  value: number
  cardFlag: CardFlag
  type: TaxType
  bankName: string
  description: string
}