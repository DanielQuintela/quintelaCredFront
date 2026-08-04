import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useThemeSystem } from '../hooks/ThemeSistem'

export function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {theme} = useThemeSystem()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    
    if (password.length < 6) {
      toast.error('Senha deve ter 6 caracteres ou mais')
      return
    }

    setIsLoading(true)

    try {
      await signIn({
        email,
        password,
      })
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Erro ao realizar login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-slate-600 dark:bg-slate-950 
    text-slate-100 px-4 z-50 overflow-y-auto">
    
    {/* Container Principal / Card com bordas e fundo bem definidos */}
    <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md my-auto">
      
      {/* Header do Card */}
      <div className="text-center mb-8">
        {/* 🌟 Forçamos o text-slate-100 com o modificador '!' para garantir o contraste perfeito em qualquer tema */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100! mb-2">
          Marechal<span className="text-blue-500">Cred</span>
        </h1>
        <p className="text-sm text-slate-400">
          Sistema de cálculos e taxas.
        </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Input Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              E-mail
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-slate-500 h-5 w-5" />
              <input
                type="email"
                required
                placeholder="nome@quintelacred.com"
                className="w-full bg-slate-950/60 border border-slate-800 p-3 pl-11 rounded-xl text-sm text-slate-200 
                placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Input Senha */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Senha de acesso
              </label>
              {/* TODO: Implementar funcionalidade de "Esqueci minha senha" */}
              {/* <a href="#" className="text-xs text-emerald-500 hover:underline transition-all">
                Esqueceu a senha?
              </a> */}
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-slate-500 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 p-3 pl-11 pr-11 rounded-xl text-sm text-slate-200 
                placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* TODO: Opções extras */}
          {/* <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500 
              focus:ring-offset-slate-950"
            />
            {/* TODO: Implementar funcionalidade de "Lembrar-me" 
            <label htmlFor="remember-me" className="ml-2 text-xs text-slate-400 cursor-pointer select-none">
              Manter conectado neste dispositivo
            </label>
          </div> 
          */}

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-slate-950 font-semibold p-3.5 rounded-xl 
            transition-all shadow-lg shadow-blue-500/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? 'Autenticando...' : 'Acessar Sistema'}
          </button>
        </form>
      </div>

      {/* Footer de Segurança */}
      <div className="mt-6 flex items-center gap-1.5 text-xs text-slate-600">
        <ShieldCheck className="h-4 w-4 text-slate-500" />
        <span>Ambiente restrito e criptografado com SSL</span>
      </div>
    </div>
  )
}