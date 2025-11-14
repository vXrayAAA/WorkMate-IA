'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFeatherAlt,
  faLightbulb,
  faTasks,
  faGraduationCap,
  faRocket,
  faRobot,
  faCheck,
  faBrain,
  faClock,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const agents = [
    {
      name: 'DataMate',
      icon: faChartBar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      description: 'Analista de Dados IA que transforma planilhas complexas em insights acionáveis.',
      features: ['Análise preditiva', 'Visualização automática', 'Relatórios instantâneos'],
    },
    {
      name: 'TextMate',
      icon: faFeatherAlt,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      description: 'Escritor IA que cria emails, documentos e comunicações profissionais.',
      features: ['Redação profissional', 'Revisão inteligente', 'Múltiplos idiomas'],
    },
    {
      name: 'CreativeMate',
      icon: faLightbulb,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-100',
      description: 'Idealizador criativo que gera conceitos inovadores para seus projetos.',
      features: ['Brainstorming IA', 'Design thinking', 'Soluções criativas'],
    },
    {
      name: 'TaskMate',
      icon: faTasks,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-100',
      description: 'Organizador inteligente que prioriza e gerencia suas tarefas automaticamente.',
      features: ['Priorização smart', 'Automação de fluxos', 'Gestão de tempo'],
    },
    {
      name: 'CoachMate',
      icon: faGraduationCap,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-100',
      description: 'Mentor pessoal que acelera seu desenvolvimento profissional.',
      features: ['Aprendizado personalizado', 'Feedback contínuo', 'Trilhas de carreira'],
    },
  ];

  const problems = [
    {
      stat: '70%',
      label: 'dos profissionais sentem sobrecarga cognitiva',
      description: 'Informação demais, tempo de menos',
    },
    {
      stat: '23min',
      label: 'perdidos por dia com tarefas repetitivas',
      description: 'Tempo que poderia ser investido em criatividade',
    },
    {
      stat: '65%',
      label: 'têm receio de usar IA sem orientação',
      description: 'Falta de confiança limita o potencial',
    },
    {
      stat: '4 apps',
      label: 'diferentes usados diariamente',
      description: 'Dados dispersos, workflow fragmentado',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold gradient-text">WorkMate AI</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary transition font-medium">
                Dashboard
              </Link>
              <Link href="/agentes" className="text-gray-700 hover:text-primary transition font-medium">
                Agentes IA
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-2.5 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="text-sm font-semibold gradient-text">
                <FontAwesomeIcon icon={faBrain} className="mr-2" />
                Potencializado por IA Avançada
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Seu Time de{' '}
              <span className="gradient-text">5 Agentes IA</span>
              {' '}trabalhando para você
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Pare de fazer tudo sozinho. Delegue para agentes especializados que entendem seu contexto,
              aprendem com você e entregam resultados enquanto você foca no que realmente importa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 gradient-bg text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Começar Gratuitamente
              </Link>
              <Link
                href="/agentes"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:shadow-lg transition border-2 border-gray-200"
              >
                Conhecer os Agentes
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 items-center mb-16 opacity-70">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-600">🎓 FIAP</div>
              <div className="text-xs text-gray-500">Global Solution</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-600">🌍 ODS</div>
              <div className="text-xs text-gray-500">Trabalho Decente</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-600">🤖 AI Powered</div>
              <div className="text-xs text-gray-500">Tecnologia Avançada</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O trabalho moderno está <span className="gradient-text">quebrado</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profissionais gastam mais tempo gerenciando trabalho do que fazendo trabalho.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{problem.stat}</div>
                <div className="text-sm font-semibold text-gray-900 mb-2">{problem.label}</div>
                <div className="text-xs text-gray-600">{problem.description}</div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full gradient-bg animate-pulse" style={{ width: problem.stat }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Uma plataforma. <span className="gradient-text">Cinco especialistas.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                WorkMate AI não é só mais uma ferramenta de IA. É seu time completo de assistentes especializados,
                cada um expert em uma área crítica do seu trabalho.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Contexto Compartilhado</div>
                    <div className="text-sm text-gray-600">
                      Todos os agentes entendem seu projeto, seu estilo e suas preferências
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faClock} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Trabalho Proativo</div>
                    <div className="text-sm text-gray-600">
                      Os agentes antecipam necessidades e sugerem ações antes de você pedir
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faChartLine} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Aprendizado Contínuo</div>
                    <div className="text-sm text-gray-600">
                      Quanto mais você usa, mais inteligentes e personalizados eles ficam
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 animate-float">
                <div className="space-y-4">
                  {agents.slice(0, 3).map((agent, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r ${agent.bgColor} rounded-xl p-4 flex items-center space-x-4`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                        <FontAwesomeIcon icon={agent.icon} className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{agent.name}</div>
                        <div className="text-xs text-gray-600">
                          {index === 0 && 'Analisando seus dados...'}
                          {index === 1 && 'Email pronto para revisão'}
                          {index === 2 && 'Gerando 5 ideias criativas'}
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={index === 1 ? faCheck : faClock}
                        className={index === 1 ? 'text-green-500' : 'text-orange-500'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Conheça seu <span className="gradient-text">time IA</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cinco agentes especializados, um objetivo: multiplicar sua produtividade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-8 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <FontAwesomeIcon icon={agent.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{agent.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{agent.description}</p>
                <ul className="space-y-2">
                  {agent.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-700">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/agentes?agent=${agent.name.toLowerCase()}`}
                  className={`mt-6 w-full block text-center py-3 bg-gradient-to-r ${agent.bgColor} rounded-xl font-semibold hover:shadow-md transition`}
                >
                  Conversar com {agent.name}
                </Link>
              </div>
            ))}

            {/* All Together Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-8 border-2 border-yellow-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faRocket} className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Todos Juntos</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Quando você precisa do poder combinado de todos os agentes trabalhando em sinergia.
              </p>
              <div className="flex gap-2 mb-6">
                {agents.map((agent, index) => (
                  <div key={index} className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                    <FontAwesomeIcon icon={agent.icon} className="text-white text-xs" />
                  </div>
                ))}
              </div>
              <Link
                href="/agentes?all=true"
                className="w-full block text-center py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-xl font-semibold hover:shadow-md transition"
              >
                Ativar Modo Completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para trabalhar mais inteligente?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de profissionais que já multiplicaram sua produtividade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Começar Gratuitamente
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold text-lg hover:bg-white/20 transition border-2 border-white/30">
              Assistir Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faRobot} className="text-white" />
                </div>
                <span className="text-xl font-bold">WorkMate AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Seu time de 5 agentes IA especializados em produtividade
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/agentes" className="hover:text-white transition">Agentes IA</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/" className="hover:text-white transition">Preços</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Sobre</Link></li>
                <li><Link href="/" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/" className="hover:text-white transition">Carreiras</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Ajuda</Link></li>
                <li><Link href="/" className="hover:text-white transition">Documentação</Link></li>
                <li><Link href="/" className="hover:text-white transition">Contato</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 WorkMate AI - FIAP Global Solution. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
