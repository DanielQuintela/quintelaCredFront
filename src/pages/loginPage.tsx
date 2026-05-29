import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'


export function LoginPage() {
  const navigate = useNavigate()

  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      await signIn({
        email,
        password,
      })

      navigate('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao realizar login')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">
          QuintelaCred
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}