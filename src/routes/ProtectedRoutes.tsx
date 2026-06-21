
import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/UseAuth'
// import { toast } from 'sonner'
// import { useEffect } from 'react'
interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  // TODO: CORRIGIR ESSA VALIDAÇÃO, AO BUSCAR USUARIO, ELE NÃO DA TEMPO DE RECEBER OS DADOS E RECUSA ABRIR A ROTA
  // SÓ ABRE QUANDO FAZ LOGIN, PQ SETA USER, MAS AO CARREGAR A PAGINA AO ABRIR O NAVEGADOR ELE NÃO RECUPERAR O TOKEN
  // CORRIGIR O LOADUSER PQ ELE EXECUTA LOGOFF AO SER CHAMADO 
  // const { loadUser } = useAuth()
  const { user } = useAuth()
   
  // loadUser()

  // useEffect (() => {
  //   if (!user) {
  //     toast.info('Realize login para acessar esta página')
  //   }
  // }, [user])

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}