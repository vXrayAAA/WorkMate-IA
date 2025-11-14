import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { AGENT_PROMPTS } from '@/lib/ai-config';
import { generateMockResponse } from '@/lib/mock-responses';

// Configuração do provider
const AI_PROVIDER = process.env.AI_PROVIDER || 'mock';

// Função para obter o modelo configurado
function getAIModel() {
  switch (AI_PROVIDER) {
    case 'openai':
      if (!process.env.OPENAI_API_KEY) return null;
      return openai(process.env.OPENAI_MODEL || 'gpt-4o-mini');
    
    case 'anthropic':
      if (!process.env.ANTHROPIC_API_KEY) return null;
      return anthropic(process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022');
    
    case 'google':
      if (!process.env.GOOGLE_API_KEY) return null;
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

    // Modo com IA real (Vercel AI SDK)
    console.log(`🤖 AI Provider: ${AI_PROVIDER.toUpperCase()}`);

    // Prepara mensagens para o modelo
    const messages = conversationHistory
      .filter((msg: any) => msg && (msg.text || msg.content))
      .map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text || msg.content || ''
      }));

    messages.push({ role: 'user', content: message });

    console.log('📝 Mensagens:', messages.length);

    // Gera resposta (sem streaming para compatibilidade)
    const result = await generateText({
      model,
      system: systemPrompt,
      messages: messages as any,
      temperature: 0.7,
    });

    console.log('✅ Resposta gerada com sucesso');

    // Retorna JSON (compatível com frontend)
    return Response.json({ 
      response: result.text,
      provider: AI_PROVIDER 
    });

  } catch (error: any) {
    console.error('❌ Erro na API do chat:', error);
    console.error('Stack:', error.stack);
    
    // Fallback para mock em caso de erro
    try {
      const body = await request.clone().json();
      const mockResponse = generateMockResponse(body.agent, body.message);
      
      return Response.json({ 
        response: mockResponse,
        fallback: true,
        provider: 'mock',
        error: error.message 
      });
    } catch (fallbackError) {
      console.error('❌ Erro no fallback:', fallbackError);
      return Response.json(
        { error: 'Erro ao processar requisição', details: error.message },
        { status: 500 }
      );
    }
  }
}
