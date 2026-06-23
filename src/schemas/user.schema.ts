import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve possuir pelo menos 2 caracteres'),

  email: z
    .string()
    .email('Email inválido'),

  password: z
    .string()
    .min(6, 'Senha deve possuir pelo menos 6 caracteres'),

  role: z.enum(['ADMIN', 'USER']),

  status: z.enum(['ACTIVE', 'INACTIVE'])
})

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve possuir pelo menos 2 caracteres'),

  email: z
    .string()
    .email('Email inválido'),

  role: z.enum(['ADMIN', 'USER']),

  status: z.enum(['ACTIVE', 'INACTIVE'])
})

export type CreateUserFormData = z.infer<typeof createUserSchema>
export type UpdateUserData = z.infer<typeof updateUserSchema>