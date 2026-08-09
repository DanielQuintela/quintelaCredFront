export type CardFlag = 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS' | 'VISAMASTER' | 'ELODEMAISBANDEIRAS'

export interface SimulationRequest {
  amount: number
  installmentsNumber: number
  cardFlag: CardFlag
  type: 'LIBERADO' | 'LIMITE'
  locationId?: string | null
}

export interface SimulationResponse {
  amount: number
  installmentNumber: number
  installmentAmount: number
  taxPercentage: number
  tax: number
  taxaCalculada: number
  passaNoCartao: number
  receivedAmount: number
}