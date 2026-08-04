import { useAuth } from "../hooks/UseAuth";
import { DashboardCard } from "../components/dashboardCards";
import { MainLayout } from "../components/layout/mainDashboardLayout";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Percent, 
  Users2,
  Calculator, 
  KeyRound, 
  ArrowRight,
  TrendingUp
} from 'lucide-react'

export function DashboardPage() {
  const { user } = useAuth()
  const isAdmin = user?.data.role === 'ADMIN'

  return (
    <MainLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Banner de Boas-Vindas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-emerald-500/10 via-slate-900/5 
        to-transparent border border-emerald-500/20">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Olá, {user?.data.name || 'Operador'}! 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isAdmin 
                ? 'Aqui está o resumo geral das operações e acessos da plataforma.' 
                : 'Selecione uma das ações abaixo para iniciar os atendimentos do dia.'}
            </p>
          </div>

          <Link
            to="/simulation"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 
            text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95 shrink-0"
          >
            <Calculator size={18} />
            <span>Nova Simulação</span>
          </Link>
        </div>

        {/* VISÃO ADMIN: Métricas do Sistema */}
        {isAdmin && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Métricas Globais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              <DashboardCard
                title="Simulações"
                value="1,248"
                icon={<BarChart3 className="h-5 w-5 text-emerald-500" />}
                trend="+12% este mês"
              />
              <DashboardCard
                title="Taxas Ativas"
                value="4"
                icon={<Percent className="h-5 w-5 text-blue-500" />}
                trend="Última alt. ontem"
              />
              <DashboardCard
                title="Usuários"
                value="18"
                icon={<Users2 className="h-5 w-5 text-violet-500" />}
              />
              <DashboardCard
                title="Simulações Convertidas"
                value="324"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                trend="26% de conversão"
              />
            </div>
          </div>
        )}

        {/* VISÃO OPERADOR (Ou Atalhos Rápidos para Todos) */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Ações Rápidas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Ir para Simulador */}
            <Link
              to="/simulation"
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 
              hover:border-emerald-500/50 transition-all shadow-xs flex flex-col justify-between h-40"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Calculator size={22} />
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  Simulador de Crédito
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Calcule parcelas, taxas e margem líquida para clientes.
                </p>
              </div>
            </Link>

            {/* Card 2: Consultar Taxas */}
            <Link
              to="/tax"
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 
              hover:border-blue-500/50 transition-all shadow-xs flex flex-col justify-between h-40"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Percent size={22} />
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  Tabela de Taxas
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Verifique os coeficientes e percentuais atualizados.
                </p>
              </div>
            </Link>

            {/* Card 3: Alterar Senha / Perfil */}
            <Link
              to="/profile"
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-violet-500/50 transition-all shadow-xs flex flex-col justify-between h-40"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
                  <KeyRound size={22} />
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
                  Meu Perfil & Segurança
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Gerencie suas credenciais de acesso e personalize a aparência e temas do sistema.
                </p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </MainLayout>
  )
}