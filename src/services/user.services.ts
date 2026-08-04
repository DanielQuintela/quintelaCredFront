import { api } from "../lib/Axios"
import type { CreateUserFormData, UpdateUserData } from "../types/User.types"


export const UserService = {

    async create(data: CreateUserFormData) {
        const response = await api.post(
            '/auth/register', data
        )
        return response.data
    },

    async findMany() {
        const response = await api.get('/user/')
        return response.data
    },

    async findById(id: string) {
        const response = await api.get(`/user/${id}`)
        return response.data
    },

    async update(id: string, data: UpdateUserData) {
        const response = await api.put(`/user/${id}`, data)
        return response.data
    },

    async delete(id: string) {
        await api.delete(`/user/${id}`)
    },

    async updateStatus(id: string) {
        const response = await api.patch(`/user/${id}/status`)
        return response.data
    },

    async updatePassword(id: string, currentPassword: string, newPassword: string) {
        const response = await api.patch(`/user/${id}/password`, {
            currentPassword,
            newPassword
        })
        return response.data
    }
}