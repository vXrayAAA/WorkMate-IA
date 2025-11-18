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
  faBars,
  faPlus,
  faEllipsisV,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

export const dynamic = 'force-dynamic';

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

function AgentesContent() {
  const searchParams = useSearchParams();
  const agentParam = searchParams.get('agent') || 'datamate';
  const [selectedAgent, setSelectedAgent] = useState(agentParam);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const agent = agents[selectedAgent as keyof typeof agents];

  useEffect(() => {
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputText]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessageText = inputText;
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: selectedAgent,
          message: userMessageText,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) throw new Error(`Erro na resposta da API: ${response.status}`);
      
      const data = await response.json();

      if (!data.response) throw new Error('Resposta da API está vazia');

      const agentResponse: Message = {
        id: messages.length + 2,
        text: data.response,
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickSuggestions = {
    datamate: ['Analisar vendas', 'Criar relatório', 'Identificar tendências'],
    textmate: ['Redigir email', 'Revisar documento', 'Criar apresentação'],
    creativemate: ['Brainstorm ideias', 'Solução criativa', 'Nome para projeto'],
    taskmate: ['Organizar tarefas', 'Priorizar urgências', 'Planejar semana'],
    coachmate: ['Aprender skill', 'Plano de carreira', 'Melhorar produtividade'],
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - estilo ChatGPT */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out flex flex-col`}>
        {/* Header da Sidebar */}
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => setMessages([{ id: 1, text: agent.greeting, sender: 'agent', timestamp: new Date() }])}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition group"
          >
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
              <span className="font-medium">Nova conversa</span>
            </div>
          </button>
        </div>

        {/* Lista de Agentes */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-semibold text-gray-400 px-3 py-2">AGENTES DISPONÍVEIS</div>
          {Object.entries(agents).map(([key, agentData]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedAgent(key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                selectedAgent === key
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${agentData.color} rounded-lg flex items-center justify-center shrink-0`}>
                <FontAwesomeIcon icon={agentData.icon} className="text-white text-sm" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium text-sm truncate">{agentData.name}</div>
                <div className="text-xs text-gray-400 truncate">{agentData.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer da Sidebar */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800">
            <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-xs">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">João Silva</div>
              <div className="text-xs text-gray-400">Premium</div>
            </div>
            <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FontAwesomeIcon icon={faBars} className="text-gray-700" />
            </button>
            <div className={`w-10 h-10 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center`}>
              <FontAwesomeIcon icon={agent.icon} className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{agent.name}</h1>
              <p className="text-xs text-gray-500">{agent.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
              Dashboard
            </Link>
            <Link href="/" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
              Home
            </Link>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {messages.length === 1 ? (
            // Welcome Screen - estilo ChatGPT
            <div className="flex flex-col items-center justify-center h-full px-4 py-12">
              <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-2xl flex items-center justify-center mb-6`}>
                <FontAwesomeIcon icon={agent.icon} className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Como posso ajudar?</h2>
              <p className="text-gray-600 text-center max-w-2xl mb-8">{agent.greeting}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl">
                {quickSuggestions[selectedAgent as keyof typeof quickSuggestions].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(suggestion)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition border border-gray-200"
                  >
                    <div className="font-medium text-gray-900 mb-1">{suggestion}</div>
                    <div className="text-xs text-gray-500">Clique para usar</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages List
            <div className="max-w-3xl mx-auto py-8 px-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-8 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-4 max-w-full ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className="shrink-0">
                      {message.sender === 'agent' ? (
                        <div className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                          <FontAwesomeIcon icon={agent.icon} className="text-white text-sm" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          JS
                        </div>
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`${message.sender === 'user' ? 'text-right' : 'text-left'} mb-1`}>
                        <span className="text-xs font-medium text-gray-500">
                          {message.sender === 'user' ? 'Você' : agent.name}
                        </span>
                      </div>
                      <div className={`prose max-w-none ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-3`}>
                        <p className="text-sm leading-relaxed m-0 whitespace-pre-wrap">{message.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mb-8 flex justify-start">
                  <div className="flex gap-4">
                    <div className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <FontAwesomeIcon icon={agent.icon} className="text-white text-sm" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - estilo ChatGPT */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white border border-gray-300 rounded-2xl shadow-lg focus-within:border-gray-400 transition">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`Mensagem para ${agent.name}...`}
                rows={1}
                className="w-full px-4 py-3 pr-12 bg-transparent border-none focus:outline-none resize-none max-h-48 text-gray-900 placeholder-gray-400"
                style={{ minHeight: '24px' }}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`absolute right-2 bottom-2 w-8 h-8 rounded-lg flex items-center justify-center transition ${
                  inputText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              {agent.name} pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </div>

      {/* Overlay para fechar sidebar em mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default function Agentes() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
