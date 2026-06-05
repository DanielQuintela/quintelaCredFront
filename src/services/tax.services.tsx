
import { api } from '../lib/Axios'
import type { Tax } from '../types/Tax.types'


export const TaxService = {
  async findAll() {
    const response = await api.get<Tax[]>('/tax')

    return response.data
  },

//   TODO: PAREI ALINHANDO AS ROTAS DAQUI COM O BACKEND

  async create(taxData: Omit<Tax, 'id'>) {
    const response = await api.post<Tax>('/tax', taxData)

    return response.data
  },

  async delete(id: string) {
    await api.delete(`/tax/${id}`)
  },
}