import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { streamText, convertToCoreMessages } from 'ai';
import { AGENT_PROMPTS } from '@/lib/ai-config';
import { generateMockResponse } from '@/lib/mock-responses';

// Configuração do provider
const AI_PROVIDER = process.env.AI_PROVIDER || 'mock';

// Função para obter o modelo configurado
function getAIModel() {
  switch (AI_PROVIDER) {
    case 'openai':
      return openai(process.env.OPENAI_MODEL || 'gpt-4o-mini');
    
    case 'anthropic':
      return anthropic(process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022');
    
    case 'google':
      return google(process.env.GOOGLE_MODEL || 'gemini-1.5-flash');
    
    default:
      return null; // Mock mode
  }
}

export async function POST(request: Request) {
  try {
    const { agent, message, conversationHistory = [] } = await request.json();

    if (!agent || !message) {
      return Response.json(
        { error: 'Agent e message são obrigatórios' },
        { status: 400 }
      );
    }

    // Seleciona o prompt do agente
    const systemPrompt = AGENT_PROMPTS[agent as keyof typeof AGENT_PROMPTS];

    if (!systemPrompt) {
      return Response.json(
        { error: 'Agente inválido' },
        { status: 400 }
      );
    }

    const model = getAIModel();

    // Mock mode (sem IA real)
    if (!model || AI_PROVIDER === 'mock') {
      console.log('💡 Usando modo MOCK');
      const mockResponse = generateMockResponse(agent, message);
      return Response.json({ response: mockResponse });
    }

    // Modo streaming com Vercel AI SDK
    console.log(` AI Provider: ${AI_PROVIDER.toUpperCase()}`);

    // Prepara mensagens para o modelo
    const messages = [
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text || msg.content || ''
      })),
      { role: 'user', content: message }
    ];

    console.log(' Mensagens preparadas:', messages.length);

    // Gera resposta com streaming
    const result = await streamText({
      model,
      system: systemPrompt,
      messages: convertToCoreMessages(messages),
      temperature: 0.7,
    });

    // Retorna o stream
    return result.toTextStreamResponse();

  } catch (error: any) {
    console.error('❌ Erro na API do chat:', error);
    
    // Fallback para mock em caso de erro
    try {
      const { agent, message } = await request.json();
      const mockResponse = generateMockResponse(agent, message);
      
      return Response.json({ 
        response: mockResponse,
        fallback: true,
        error: error.message 
      });
    } catch {
      return Response.json(
        { error: 'Erro ao processar requisição' },
        { status: 500 }
      );
    }
  }
}
