import type { LoginData } from "./Login.types"

export interface User {
  userId: string
  userName: string
  userEmail: string
  userRole: 'ADMIN' | 'USER'
}

export interface AuthResponse {
  token: string
  user: User
}

export interface AuthContextType {
  user: User | null
  token: string | null
  signIn: (data: LoginData) => Promise<void>
  logout: () => void
}
