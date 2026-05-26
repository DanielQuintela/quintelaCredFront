import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '../lib/Axios'
import type { AuthContextType, AuthResponse, User } from '../types/Auth.types'
import type { LoginData } from '../types/Login.types'

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  async function signIn(data: LoginData) {
    const response = await api.post<AuthResponse>(
      '/auth/login',
      data
    )

    const { token, user } = response.data

    localStorage.setItem('@token', token)
    localStorage.setItem('@user', JSON.stringify(user))

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setToken(token)
    setUser(user)
  }

  function logout() {
    localStorage.removeItem('@token')
    localStorage.removeItem('@user')

    delete api.defaults.headers.common.Authorization
    
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('@token')
    const user = localStorage.getItem('@user')

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setToken(token)
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}