
import { api } from '../lib/Axios'
import type { TaxFormData } from '../schemas/tax.schemas'
import type { Tax } from '../types/Tax.types'

export const TaxService = {
  async findAll() {
    const response = await api.get<Tax[]>('/tax')

    return response.data
  },

  async findById(id: string) {
    const response = await api.get<Tax>(`/tax/${id}`)

    return response.data
  },

  async create(data: TaxFormData) {
    const response = await api.post(
      '/tax/',
      data
    )

    return response.data
  },

  async update(
    id: string,
    data: TaxFormData,
  ) {
    const response = await api.put(`/tax/${id}`,data)

    return response.data
  },

  async delete(id: string) {
    await api.delete(`/tax/${id}`)
  },
}