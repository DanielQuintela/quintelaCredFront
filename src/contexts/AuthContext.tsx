import { createContext } from 'react'

import type { AuthContextType } from '../types/Auth.types'

//PARA TODO CODIGO PEGAR OS DADOS
export const AuthContext = createContext({} as AuthContextType)

