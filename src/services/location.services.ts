import { api } from "../lib/Axios"
import type { CreateLocation, Location } from "../types/Tax.types"


export const LocationService = {
       async create(data: CreateLocation) {
      const response = await api.post(
        '/location/',
        data
      )

      return response.data
    },

    async findAll() {
        const response = await api.get<Location[]>('/location')

        return response.data
    },

    async findById(id: string) {
      const response = await api.get<Location>(`/location/${id}`)

      return response.data
    },

    async update(
      id: string,
      data: Location,
    ) {
      const response = await api.put(`/location/${id}`,data)
      return response.data
    },

    async updateStatus(
      id: string,
      status: boolean,
    ) {
      const response = await api.patch(`/location/${id}/status`, { status })
      return response.data
    },

    async delete(id: string) {
      await api.delete(`/location/${id}`)
    }
}
