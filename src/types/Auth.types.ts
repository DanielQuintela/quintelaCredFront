import type { LoginData } from "./Login.types"

export interface User {
  data: {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'USER'
  }
}

export interface UserResponse {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}
export interface AuthResponse {
  data: {
    token: string
  }
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (data: LoginData) => Promise<void>
  logout: () => void
  loadUser: () => void
}
