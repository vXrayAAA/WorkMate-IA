'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faFeatherAlt,
  faLightbulb,
  faTasks,
  faGraduationCap,
  faRobot,
  faPaperPlane,
  faHome,
  faChartLine,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const agents = {
  datamate: {
    name: 'DataMate',
    icon: faChartBar,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Especialista em análise de dados',
    greeting: 'Olá! Sou o DataMate. Posso ajudar você a analisar dados, criar relatórios e identificar tendências. Como posso ajudar hoje?',
  },
  textmate: {
    name: 'TextMate',
    icon: faFeatherAlt,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    description: 'Especialista em redação',
    greeting: 'Olá! Sou o TextMate. Posso redigir emails, documentos, revisar textos e muito mais. O que você precisa escrever hoje?',
  },
  creativemate: {
    name: 'CreativeMate',
    icon: faLightbulb,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    description: 'Especialista em criatividade',
    greeting: 'Olá! Sou o CreativeMate. Posso ajudar com brainstorming, ideias criativas e soluções inovadoras. Qual desafio vamos resolver?',
  },
  taskmate: {
    name: 'TaskMate',
    icon: faTasks,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    description: 'Especialista em produtividade',
    greeting: 'Olá! Sou o TaskMate. Posso organizar suas tarefas, priorizar atividades e otimizar seu tempo. Como posso te ajudar a ser mais produtivo?',
  },
  coachmate: {
    name: 'CoachMate',
    icon: faGraduationCap,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    description: 'Especialista em desenvolvimento',
    greeting: 'Olá! Sou o CoachMate. Posso te ajudar no desenvolvimento profissional, aprendizado e trilha de carreira. O que você quer aprender hoje?',
  },
};

// Componente interno que usa useSearchParams
function AgentesContent() {
  const searchParams = useSearchParams();
  const agentParam = searchParams.get('agent') || 'datamate';
  const [selectedAgent, setSelectedAgent] = useState(agentParam);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agent = agents[selectedAgent as keyof typeof agents];

  useEffect(() => {
    // Mensagem inicial do agente
    setMessages([
      {
        id: 1,
        text: agent.greeting,
        sender: 'agent',
        timestamp: new Date(),
      },
    ]);
  }, [selectedAgent, agent.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessageText = inputText;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: messages.length + 1,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Chama API real do agente
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: selectedAgent,
          message: userMessageText,
          conversationHistory: messages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json();

      const agentResponse: Message = {
        id: messages.length + 2,
        text: data.response,
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Fallback para resposta mock em caso de erro
      const agentResponse: Message = {
        id: messages.length + 2,
        text: getAgentResponse(selectedAgent, userMessageText),
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const getAgentResponse = (agentKey: string, userInput: string): string => {
    const responses: Record<string, string[]> = {
      datamate: [
        'Entendi! Vou analisar esses dados para você. Com base na sua consulta, identifiquei alguns padrões interessantes...',
        'Excelente pergunta! Deixe-me processar esses números e gerar um relatório detalhado.',
        'Baseado na análise, vejo uma tendência crescente de 23% no último período. Vou preparar uma visualização para você.',
      ],
      textmate: [
        'Perfeito! Vou redigir esse texto para você com um tom profissional e claro.',
        'Entendido! Estou criando o documento com as informações que você forneceu.',
        'Ótimo! Revisei o texto e fiz algumas sugestões de melhoria para torná-lo mais impactante.',
      ],
      creativemate: [
        'Que desafio interessante! Aqui estão 5 ideias criativas para resolver isso...',
        'Adorei! Vou fazer um brainstorming e trazer conceitos inovadores para você.',
        'Perfeito! Pensando fora da caixa, sugiro explorar estas abordagens criativas...',
      ],
      taskmate: [
        'Entendi suas prioridades! Vou organizar essas tarefas por urgência e importância.',
        'Ótimo! Criei um plano de ação com prazos realistas para você completar tudo com eficiência.',
        'Perfeito! Bloqueei tempo na sua agenda e priorizei as atividades mais críticas.',
      ],
      coachmate: [
        'Excelente objetivo! Vou criar um plano de desenvolvimento personalizado para você.',
        'Ótima escolha de habilidade! Tenho alguns recursos e exercícios práticos para acelerar seu aprendizado.',
        'Perfeito! Baseado no seu perfil, recomendo estas trilhas de aprendizado...',
      ],
    };

    const agentResponses = responses[agentKey] || responses.datamate;
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  const quickSuggestions = {
    datamate: ['Analisar vendas', 'Criar relatório', 'Identificar tendências'],
    textmate: ['Redigir email', 'Revisar documento', 'Criar apresentação'],
    creativemate: ['Brainstorm ideias', 'Solução criativa', 'Nome para projeto'],
    taskmate: ['Organizar tarefas', 'Priorizar urgências', 'Planejar semana'],
    coachmate: ['Aprender skill', 'Plano de carreira', 'Melhorar produtividade'],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold gradient-text">WorkMate AI</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                Dashboard
              </Link>
              <Link href="/agentes" className="text-primary font-semibold">
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Agentes
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <div>
                <div className="text-sm font-semibold text-gray-900 text-right">João Silva</div>
                <div className="text-xs text-gray-500 text-right">Premium Plan</div>
              </div>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          {/* Agents Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Selecione o Agente</h2>

            <div className="space-y-3">
              {Object.entries(agents).map(([key, agentData]) => (
                <button
                  key={key}
                  onClick={() => setSelectedAgent(key)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl transition ${
                    selectedAgent === key
                      ? `${agentData.bgColor} border-2 border-${agentData.color.split('-')[1]}-500`
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${agentData.color} rounded-xl flex items-center justify-center`}>
                    <FontAwesomeIcon icon={agentData.icon} className="text-white text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-gray-900">{agentData.name}</div>
                    <div className="text-xs text-gray-600">{agentData.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg flex flex-col">
            {/* Chat Header */}
            <div className={`${agent.bgColor} border-b border-gray-200 p-6 rounded-t-2xl`}>
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-2xl flex items-center justify-center`}>
                  <FontAwesomeIcon icon={agent.icon} className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
                  <p className="text-sm text-gray-600">{agent.description}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : `${agent.bgColor} text-gray-900`
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span
                      className={`text-xs mt-2 block ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className={`${agent.bgColor} p-4 rounded-2xl`}>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-6 pb-4">
              <div className="flex gap-2 flex-wrap">
                {quickSuggestions[selectedAgent as keyof typeof quickSuggestions].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(suggestion)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-lg transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Pergunte algo para o ${agent.name}...`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="px-6 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principal com Suspense
export default function Agentes() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando agentes...</p>
        </div>
      </div>
    }>
      <AgentesContent />
    </Suspense>
  );
}
