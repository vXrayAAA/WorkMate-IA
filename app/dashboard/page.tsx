'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFeatherAlt,
  faLightbulb,
  faTasks,
  faGraduationCap,
  faRobot,
  faCheck,
  faClock,
  faCheckCircle,
  faBell,
  faChartLine,
  faBolt,
  faBullseye,
  faHistory,
  faHome,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';

export default function Dashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current && typeof window !== 'undefined') {
      import('chart.js/auto').then((ChartModule) => {
        const ctx = chartRef.current;
        if (!ctx) return;

        // Destruir gráfico anterior se existir
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Criar novo gráfico
        chartInstanceRef.current = new ChartModule.default(ctx, {
          type: 'line',
          data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [
              {
                label: 'Tarefas Completadas',
                data: [8, 12, 10, 15, 12, 6, 4],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
              },
              {
                label: 'Horas Economizadas',
                data: [3, 5, 4, 6, 4.5, 2, 1.5],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  padding: 20,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    }

    // Cleanup: destruir gráfico quando componente desmontar
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-bg rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="text-white text-lg sm:text-xl" />
              </div>
              <span className="text-xl sm:text-2xl font-bold gradient-text">WorkMate AI</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
              <Link href="/dashboard" className="text-primary font-semibold">
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                Dashboard
              </Link>
              <Link href="/agentes" className="text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Agentes
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faBell} className="text-lg sm:text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center space-x-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900 text-right">João Silva</div>
                  <div className="text-xs text-gray-500 text-right">Premium Plan</div>
                </div>
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
              </div>
              <div className="sm:hidden w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-xs">
                JS
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, João! 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600">Aqui está o resumo da sua produtividade hoje</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                +35%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Tarefas Completadas</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faClock} className="text-blue-600 text-2xl" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Hoje
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.5h</div>
            <div className="text-sm text-gray-600">Tempo Economizado</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faBolt} className="text-purple-600 text-2xl" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
            <div className="text-sm text-gray-600">Produtividade</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faLightbulb} className="text-orange-600 text-2xl" />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Novo
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
            <div className="text-sm text-gray-600">Insights Gerados</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* AI Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faRobot} className="text-primary mr-2 sm:mr-3" />
                  <span className="hidden sm:inline">Atividade dos Agentes</span>
                  <span className="sm:hidden">Agentes</span>
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faChartBar} className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900">DataMate</h3>
                      <span className="text-xs text-gray-500">5 min atrás</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Tendência identificada:</strong> Suas vendas aumentaram 23% esta semana.
                    </p>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                      Ver Relatório →
                    </button>
                  </div>
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-100 rounded-xl hover:shadow-md transition cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faTasks} className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900">TaskMate</h3>
                      <span className="text-xs text-gray-500">15 min atrás</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Priorização sugerida:</strong> Bloqueei 2h para preparação da reunião.
                    </p>
                    <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition">
                      Aceitar ✓
                    </button>
                  </div>
                  <FontAwesomeIcon icon={faClock} className="text-orange-500 text-xl" />
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl hover:shadow-md transition cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faFeatherAlt} className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900">TextMate</h3>
                      <span className="text-xs text-gray-500">30 min atrás</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Email redigido:</strong> Resposta para cliente ABC pronta para revisão.
                    </p>
                    <button className="text-sm font-semibold text-green-600 hover:text-green-700 transition">
                      Revisar Email →
                    </button>
                  </div>
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <FontAwesomeIcon icon={faChartLine} className="text-primary mr-2 sm:mr-3" />
                <span className="hidden sm:inline">Produtividade da Semana</span>
                <span className="sm:hidden">Produtividade</span>
              </h2>
              <div className="h-64 sm:h-80">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Access */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faBolt} className="text-primary mr-2" />
                Acesso Rápido
              </h2>

              <div className="space-y-3">
                <Link
                  href="/agentes?agent=datamate"
                  className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faChartBar} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">DataMate</div>
                    <div className="text-xs text-gray-600">Análise de dados</div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                  href="/agentes?agent=textmate"
                  className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faFeatherAlt} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">TextMate</div>
                    <div className="text-xs text-gray-600">Comunicação</div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                  href="/agentes?agent=creativemate"
                  className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faLightbulb} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">CreativeMate</div>
                    <div className="text-xs text-gray-600">Criatividade</div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                  href="/agentes?agent=taskmate"
                  className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faTasks} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">TaskMate</div>
                    <div className="text-xs text-gray-600">Produtividade</div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                  href="/agentes?agent=coachmate"
                  className="flex items-center space-x-3 p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">CoachMate</div>
                    <div className="text-xs text-gray-600">Desenvolvimento</div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>
              </div>
            </div>

            {/* Goals Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faBullseye} className="text-primary mr-2" />
                Progresso de Metas
              </h2>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tarefas da Semana</span>
                    <span className="text-sm font-bold text-green-600">35/40</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: '87.5%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Projetos Q1</span>
                    <span className="text-sm font-bold text-blue-600">8/12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: '66.6%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Economia de Tempo</span>
                    <span className="text-sm font-bold text-orange-600">42h/50h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all"
                      style={{ width: '84%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faHistory} className="text-primary mr-2" />
                Atividade Recente
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 font-medium">DataMate gerou relatório</div>
                    <div className="text-xs text-gray-500">Há 5 minutos</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 font-medium">TextMate revisou documento</div>
                    <div className="text-xs text-gray-500">Há 15 minutos</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 font-medium">TaskMate completou 5 tarefas</div>
                    <div className="text-xs text-gray-500">Há 45 minutos</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 font-medium">CreativeMate sugeriu ideias</div>
                    <div className="text-xs text-gray-500">Há 1 hora</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
