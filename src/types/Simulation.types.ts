export type CardFlag = 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'

export interface SimulationRequest {
  amount: number
  installmentsNumber: number
  cardFlag: CardFlag
  type: 'LIBERADO' | 'LIMITE'
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