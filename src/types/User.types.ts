export type UserRole = 'ADMIN' | 'USER'
export type UserStatus = 'ACTIVE' | 'INACTIVE'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface CreateUserFormData {
  name: string
  email: string
  password: string
  
  role: UserRole
  status: UserStatus
}

export interface UpdateUserData {
  name: string
  email: string

  role?: UserRole
  status?: UserStatus
}

export type UserFormValues = {
  name: string
  email: string
  password: string
  role: UserRole
  status: UserStatus
}
