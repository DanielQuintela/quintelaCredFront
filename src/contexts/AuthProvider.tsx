import { useState } from "react"
import type { LoginData } from "../types/Login.types"
import type { AuthResponse, User } from "../types/Auth.types"
import { api } from "../lib/Axios"
import { AuthContext } from "./AuthContext"


export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function signIn(data: LoginData) {
    const response = await api.post<AuthResponse>(
      '/auth/login',
      data
    )

    const { data: { token } } = response.data

    localStorage.setItem('@token', token)
    
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    const meResponse = await api.get<User>('/auth/me/')

    setUser(meResponse.data)
  }

  function logout() {
    localStorage.removeItem('@token')

    delete api.defaults.headers.common.Authorization

    setUser(null)
  }

  async function loadUser() {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        return
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      const response = await api.get<User>('/auth/me')

      setUser(response.data)

    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}