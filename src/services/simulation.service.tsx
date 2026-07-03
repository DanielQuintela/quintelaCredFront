import { api } from "../lib/Axios"
import type { SimulationRequest } from "../types/Simulation.types"


export const SimulationService = {

  async simulate(data: SimulationRequest) {
    const response = await api.post('/simulation', data)

    return response.data
  }
}