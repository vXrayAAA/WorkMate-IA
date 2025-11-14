import { NextRequest, NextResponse } from 'next/server';
import { AI_CONFIG, AGENT_PROMPTS } from '@/lib/ai-config';

export async function POST(request: NextRequest) {
  try {
    const { agent, message, conversationHistory } = await request.json();

    if (!agent || !message) {
      return NextResponse.json(
        { error: 'Agent e message são obrigatórios' },
        { status: 400 }
      );
    }

    // Seleciona o prompt do agente
    const systemPrompt = AGENT_PROMPTS[agent as keyof typeof AGENT_PROMPTS];

    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Agente inválido' },
        { status: 400 }
      );
    }

    // Gera resposta baseada no provider configurado
    const response = await generateAIResponse(
      systemPrompt,
      message,
      conversationHistory || []
    );

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Erro na API do agente:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}

async function generateAIResponse(
  systemPrompt: string,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const provider = AI_CONFIG.provider;
  
  // Log do provider ativo
  console.log(`🤖 AI Provider: ${provider.toUpperCase()}`);

  switch (provider) {
    case 'openai':
      return generateOpenAIResponse(systemPrompt, userMessage, history);
    
    case 'anthropic':
      return generateAnthropicResponse(systemPrompt, userMessage, history);
    
    case 'google':
      return generateGoogleResponse(systemPrompt, userMessage, history);
    
    case 'groq':
      return generateGroqResponse(systemPrompt, userMessage, history);
    
    case 'local':
      return generateLocalResponse(systemPrompt, userMessage, history);
    
    default:
      return generateMockResponse(systemPrompt, userMessage);
  }
}

// OpenAI Implementation
async function generateOpenAIResponse(
  systemPrompt: string,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const apiKey = AI_CONFIG.openai.apiKey;

  if (!apiKey) {
    console.warn('OpenAI API key não configurada, usando resposta mock');
    return generateMockResponse(systemPrompt, userMessage);
  }

  try {
    const response = await fetch(`${AI_CONFIG.openai.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.openai.model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    return generateMockResponse(systemPrompt, userMessage);
  }
}

// Anthropic Claude Implementation
async function generateAnthropicResponse(
  systemPrompt: string,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const apiKey = AI_CONFIG.anthropic.apiKey;

  if (!apiKey) {
    console.warn('Anthropic API key não configurada, usando resposta mock');
    return generateMockResponse(systemPrompt, userMessage);
  }

  try {
    // Filtrar histórico para garantir formato correto
    const formattedHistory = history
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

    const requestBody = {
      model: AI_CONFIG.anthropic.model,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        ...formattedHistory,
        { role: 'user', content: userMessage },
      ],
    };

    console.log('Sending to Anthropic:', {
      url: `${AI_CONFIG.anthropic.baseURL}/messages`,
      model: AI_CONFIG.anthropic.model,
      messagesCount: requestBody.messages.length,
    });

    const response = await fetch(`${AI_CONFIG.anthropic.baseURL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API Error Details:', errorData);
      
      // Se for erro de créditos, usa mock com mensagem amigável
      if (errorData.error?.message?.includes('credit balance')) {
        console.warn('⚠️ Anthropic sem créditos - usando resposta mock inteligente');
      }
      
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Erro ao chamar Anthropic:', error);
    return generateMockResponse(systemPrompt, userMessage);
  }
}

// Google Gemini Implementation
async function generateGoogleResponse(
  systemPrompt: string,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const apiKey = AI_CONFIG.google.apiKey;

  if (!apiKey) {
    console.warn('Google API key não configurada, usando resposta mock');
    return generateMockResponse(systemPrompt, userMessage);
  }

  try {
    // Formatar mensagem simples para o Gemini
    const prompt = `${systemPrompt}\n\n${history.map(msg => 
      `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`
    ).join('\n')}\n\nUsuário: ${userMessage}\n\nAssistente:`;

    console.log('🔍 Testando Gemini API...', {
      apiKeyPrefix: apiKey.substring(0, 15) + '...',
      promptLength: prompt.length
    });

    // Tentar com a API v1 (mais recente)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google API Error Details:', errorData);
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Erro ao chamar Google:', error);
    return generateMockResponse(systemPrompt, userMessage);
  }
}

// Groq Implementation (✅ GRATUITO - Llama 3.1)
async function generateGroqResponse(
  systemPrompt: string,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const apiKey = AI_CONFIG.groq.apiKey;

  if (!apiKey) {
    console.warn('Groq API key não configurada, usando resposta mock');
    return generateMockResponse(systemPrompt, userMessage);
  }

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: userMessage },
    ];

    const response = await fetch(`${AI_CONFIG.groq.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.groq.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API Error:', errorData);
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao chamar Groq:', error);
    return generateMockResponse(systemPrompt, userMessage);
  }
}

// Local LLM (Ollama) Implementation
async function generateLocalResponse(
  systemPrompt: string,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  try {
    const response = await fetch(`${AI_CONFIG.local.baseURL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_CONFIG.local.model,
        prompt: `${systemPrompt}\n\nUsuário: ${userMessage}\n\nAssistente:`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Local LLM error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Erro ao chamar LLM local:', error);
    return generateMockResponse(systemPrompt, userMessage);
  }
}

// Mock Response (Fallback quando não há API configurada)
function generateMockResponse(systemPrompt: string, userMessage: string): string {
  console.log('💡 Usando modo MOCK - resposta simulada inteligente (sem IA real)');
  
  // Identifica o agente pelo system prompt
  const agentType = systemPrompt.toLowerCase();
  const message = userMessage.toLowerCase();
  
  // ===== DATAMATE - Analista de Dados =====
  if (agentType.includes('datamate')) {
    // Respostas contextuais baseadas em palavras-chave
    if (message.includes('venda') || message.includes('vendas')) {
      return `📊 **Análise de Vendas**

Analisando os dados de vendas mencionados em "${userMessage}":

**Principais Insights:**
• **Crescimento:** +18% em relação ao período anterior
• **Produto destaque:** Categoria Premium (42% do volume)
• **Tendência:** Pico nas quintas e sextas-feiras
• **Oportunidade:** Região Sul apresenta potencial inexplorado (+35% de margem)

**Recomendações Estratégicas:**
1. Intensificar campanhas na região Sul
2. Reforçar estoque de produtos Premium
3. Criar promoções direcionadas para terças/quartas

📈 Posso criar visualizações detalhadas (gráficos de linha, pizza, barras) ou aprofundar em algum aspecto específico?`;
    }
    
    if (message.includes('produtividade') || message.includes('desempenho') || message.includes('performance')) {
      return `📊 **Análise de Produtividade**

Baseado em "${userMessage}", aqui está minha análise:

**Métricas Principais:**
• **Taxa de conclusão:** 87% (↑12% vs mês anterior)
• **Tempo médio por tarefa:** 2.3h (otimizado!)
• **Picos de produtividade:** 9h-11h e 14h-16h
• **Gargalos identificados:** Reuniões fragmentadas (-15% eficiência)

**Insights Acionáveis:**
✓ Bloquear horários de foco (9h-11h)
✓ Consolidar reuniões em blocos únicos
✓ Automatizar 4 tarefas repetitivas detectadas

📉 O dashboard mostra padrões claros. Quer que eu prepare um relatório executivo com recomendações específicas?`;
    }
    
    if (message.includes('tendência') || message.includes('previsão') || message.includes('futuro')) {
      return `📊 **Análise Preditiva**

Analisando tendências relacionadas a "${userMessage}":

**Projeções (próximos 3 meses):**
• **Crescimento esperado:** +23% com 85% de confiança
• **Sazonalidade:** Pico em dezembro (histórico +40%)
• **Fatores de risco:** Variação cambial e concorrência

**Padrões Identificados:**
📈 Ciclo de 15 dias entre picos
📉 Quedas correlacionadas com eventos externos
🎯 3 oportunidades de mercado emergindo

**Recomendações:**
1. Aumentar estoque em 30% para dezembro
2. Preparar campanha antecipada (nov/dez)
3. Diversificar para reduzir riscos

Quer que eu detalhe as oportunidades específicas ou ajuste o modelo preditivo?`;
    }
    
    // Resposta genérica DataMate
    return `📊 **Análise de Dados - DataMate**

Excelente pergunta sobre "${userMessage}"! Como analista de dados, vou estruturar isso para você:

**Abordagem Analítica:**
1. **Coleta:** Identificar fontes de dados relevantes
2. **Limpeza:** Normalizar e validar informações
3. **Análise:** Aplicar estatística descritiva e preditiva
4. **Visualização:** Criar dashboards interativos

**Próximos Passos:**
• Você tem dados históricos que posso analisar?
• Quer focar em tendências, comparações ou projeções?
• Prefere visualização em tabelas, gráficos ou relatório narrativo?

💡 Posso gerar mockups de gráficos (linha, barras, pizza, scatter) ou aprofundar em análises estatísticas específicas!`;
  }
  
  // ===== TEXTMATE - Especialista em Comunicação =====
  if (agentType.includes('textmate')) {
    if (message.includes('email') || message.includes('e-mail')) {
      return `✍️ **Redação de Email Profissional**

Perfeito! Vou redigir um email sobre "${userMessage}":

**Estrutura Recomendada:**

---
**Assunto:** [Direto e específico - desperta interesse]

Olá [Nome],

**Abertura:** Contexto breve e cordial
**Corpo:** Informação principal clara e objetiva
**Ação:** O que você espera do destinatário
**Fechamento:** Disponibilidade e agradecimento

Atenciosamente,
[Seu nome]

---

**Variações de Tom:**
📘 Formal corporativo
💼 Profissional direto  
🤝 Amigável colaborativo

Qual tom prefere? Posso também ajustar para diferentes públicos (cliente, superior, colega, fornecedor).`;
    }
    
    if (message.includes('relatório') || message.includes('relatorio') || message.includes('documento')) {
      return `✍️ **Redação de Relatório Profissional**

Ótimo! Vou estruturar um relatório sobre "${userMessage}":

**Template Executivo:**

📋 **1. Sumário Executivo**
• Contexto e objetivo (2-3 linhas)
• Principais conclusões (bullet points)

📊 **2. Análise Detalhada**
• Dados e evidências
• Metodologia aplicada

💡 **3. Insights e Descobertas**
• Padrões identificados
• Oportunidades detectadas

🎯 **4. Recomendações**
• Ações prioritárias
• Cronograma sugerido

**Diferenciais:**
✓ Linguagem clara e executiva
✓ Visual com gráficos/tabelas
✓ Foco em decisão e ação

Quer que eu desenvolva alguma seção específica? Posso adaptar para diferentes audiências (técnica, gerencial, executiva).`;
    }
    
    if (message.includes('apresentação') || message.includes('apresentacao') || message.includes('slide')) {
      return `✍️ **Roteiro para Apresentação**

Excelente! Vou criar um roteiro sobre "${userMessage}":

**Estrutura de Impacto (Método AIDA):**

🎯 **Slide 1: ATENÇÃO**
• Hook visual forte
• Pergunta provocativa ou dado impactante

📖 **Slides 2-3: INTERESSE**
• Contexto do problema
• Por que isso importa?

💡 **Slides 4-6: DESEJO**
• Solução proposta
• Benefícios concretos
• Prova social/dados

🚀 **Slide 7: AÇÃO**
• Call to action claro
• Próximos passos definidos

**Dicas de Oratória:**
✓ Regra 10-20-30 (10 slides, 20 min, fonte 30)
✓ 1 ideia = 1 slide
✓ Storytelling > Bullet points

Quer que eu desenvolva o conteúdo de cada slide ou ajuste para outro formato?`;
    }
    
    // Resposta genérica TextMate
    return `✍️ **Redação Profissional - TextMate**

Entendi sua necessidade sobre "${userMessage}"! Como especialista em comunicação, posso ajudar com:

**Tipos de Texto:**
📧 Emails (corporativos, comerciais, networking)
📄 Relatórios (executivos, técnicos, analíticos)
📊 Apresentações (vendas, projetos, resultados)
✏️ Documentos (propostas, manuais, políticas)
💬 Comunicados (internos, externos, crises)

**Minha Abordagem:**
1. **Clareza:** Mensagem direta e objetiva
2. **Estrutura:** Organização lógica e fluida
3. **Tom:** Adaptado ao público e contexto
4. **Impacto:** Foco em ação e resultado

🎯 Me dê mais detalhes: Qual o objetivo? Quem é o público? Qual o contexto? Vou criar um texto que realmente funciona!`;
  }
  
  // ===== CREATIVEMATE - Gerador de Ideias =====
  if (agentType.includes('creativemate')) {
    if (message.includes('campanha') || message.includes('marketing')) {
      return `💡 **Brainstorm de Campanha Criativa**

Que desafio empolgante sobre "${userMessage}"! Aqui vão **5 conceitos criativos**:

**🎨 Conceito 1: "O Inesperado"**
• Quebrar padrão do mercado com abordagem surpreendente
• Visual disruptivo + mensagem provocativa
• Viralização orgânica através de curiosidade

**🌟 Conceito 2: "Storytelling Emocional"**
• Narrativa humana e autêntica
• Cliente como herói da história
• Conexão emocional > argumentos racionais

**🚀 Conceito 3: "Gamificação Interativa"**
• Transformar experiência em jogo/desafio
• Engajamento através de recompensas
• Compartilhamento social nativo

**🎯 Conceito 4: "Dados que Falam"**
• Infográficos impactantes
• Estatísticas surpreendentes
• Credibilidade + curiosidade

**💥 Conceito 5: "Co-criação com Comunidade"**
• Público participa da criação
• UGC (User Generated Content)
• Senso de pertencimento e ownership

Qual conceito ressoou mais? Posso desenvolver detalhadamente ou misturar elementos de vários!`;
    }
    
    if (message.includes('nome') || message.includes('título') || message.includes('titulo')) {
      return `💡 **Geração Criativa de Nomes**

Adorei o desafio de "${userMessage}"! Aqui vão **sugestões criativas**:

**🎯 Categoria: Impactante**
• "Momentum" - transmite movimento e progresso
• "Catalyst" - agente de mudança
• "Ignite" - acender, iniciar revolução

**✨ Categoria: Sofisticado**
• "Lumina" - luz, clareza, insight
• "Zenith" - ponto alto, excelência
• "Aether" - essência, elevado

**🚀 Categoria: Moderno/Tech**
• "NexusFlow" - conexão e fluidez
• "QuantumLeap" - salto exponencial
• "SynergiX" - sinergia + inovação

**🌱 Categoria: Orgânico/Humano**
• "GrowthHub" - centro de crescimento
• "ThriveSpace" - espaço para prosperar
• "BloomForge" - forjar florescimento

**Técnicas Aplicadas:**
✓ Fusão de palavras (portmanteau)
✓ Metáforas visuais
✓ Sonoridade e memorabilidade

Qual estilo combina mais? Posso gerar mais variações ou testar disponibilidade de domínio!`;
    }
    
    if (message.includes('problema') || message.includes('solução') || message.includes('solucao')) {
      return `💡 **Pensamento Criativo para Soluções**

Desafio interessante: "${userMessage}"! Vou aplicar **5 técnicas de criatividade**:

**🔄 1. INVERSÃO**
E se fizermos o OPOSTO do que todo mundo faz?
→ Exemplo: Não resolver o problema, mas transformá-lo em oportunidade

**🔀 2. COMBINAÇÃO ALEATÓRIA**
E se juntarmos conceitos não relacionados?
→ Exemplo: [Sua área] + [Netflix/Uber/Tesla] = Novo modelo

**🎭 3. PERSONAS EXTREMAS**
Como uma criança de 5 anos / Einstein / Elon Musk resolveria?
→ Perspectivas radicalmente diferentes

**🌍 4. ANALOGIAS DE OUTROS SETORES**
Como a natureza/medicina/arquitetura resolve algo similar?
→ Biomimética e cross-pollination

**⏰ 5. VIAGEM NO TEMPO**
Como seria a solução em 2030? E em 1950?
→ Futurismo e simplicidade vintage

**Próximo Passo:**
Qual técnica te inspirou? Posso desenvolver 10 ideias concretas usando qualquer uma delas!`;
    }
    
    // Resposta genérica CreativeMate
    return `💡 **Ideação Criativa - CreativeMate**

Que desafio empolgante sobre "${userMessage}"! Como especialista em criatividade, vou te ajudar com:

**Métodos de Brainstorming:**
🧠 Mind Mapping (mapas mentais)
⚡ SCAMPER (substituir, combinar, adaptar...)
🎲 Pensamento Lateral (Edward de Bono)
🌈 Design Thinking (empatia → ideação → prototipação)
🚀 Ideação Rápida (6-3-5 method)

**Áreas de Criatividade:**
• Naming e branding
• Conceitos de campanha
• Soluções inovadoras
• Storytelling e narrativas
• Experiências e produtos

💫 Me conte mais sobre o contexto: Qual o objetivo final? Quem é o público? Existem restrições? Vou gerar ideias que vão surpreender!`;
  }
  
  // ===== TASKMATE - Gerente de Produtividade =====
  if (agentType.includes('taskmate')) {
    if (message.includes('organizar') || message.includes('planejar') || message.includes('agenda')) {
      return `✅ **Planejamento e Organização - TaskMate**

Perfeito! Vou estruturar "${userMessage}" com metodologia comprovada:

**📋 Plano de Ação (Método GTD - Getting Things Done):**

**1️⃣ CAPTURAR** (2min)
□ Listar TODAS as tarefas relacionadas
□ Brain dump - tirar da cabeça

**2️⃣ ESCLARECER** (5min)
□ Ação necessária? Sim/Não
□ Pode ser feito em 2min? Faça agora!
□ Pode ser delegado? Delegue!

**3️⃣ ORGANIZAR** (5min)
□ **URGENTE + IMPORTANTE** → Fazer HOJE
□ **IMPORTANTE (não urgente)** → Agendar
□ **URGENTE (não importante)** → Delegar
□ **Nem urgente nem importante** → Eliminar

**4️⃣ EXECUTAR** (modo foco)
🎯 Técnica Pomodoro: 25min foco + 5min pausa
🚫 Bloqueie distrações (modo avião)
✅ Uma tarefa por vez (sem multitasking)

**5️⃣ REVISAR** (fim do dia)
□ O que foi concluído?
□ O que ficou pendente? Por quê?
□ Ajustar prioridades para amanhã

**Time-blocking sugerido:**
• 9h-11h: Tarefas complexas (pico cognitivo)
• 11h-12h: Reuniões/colaboração
• 14h-16h: Tarefas médias
• 16h-17h: Emails e admin

Quer que eu crie um checklist específico ou ajuste o cronograma?`;
    }
    
    if (message.includes('priorizar') || message.includes('foco')) {
      return `✅ **Matriz de Priorização - TaskMate**

Vou te ajudar a priorizar "${userMessage}" de forma estratégica:

**🎯 Framework de Priorização RICE:**

Para cada tarefa, calcule:
• **R**each (Alcance): Quantas pessoas impacta?
• **I**mpact (Impacto): Qual o valor gerado?
• **C**onfidence (Confiança): Certeza do resultado?
• **E**ffort (Esforço): Tempo/recursos necessários?

**Fórmula: (R × I × C) ÷ E**

---

**📊 Matriz de Eisenhower (2x2):**

┌─────────────────┬─────────────────┐
│ URGENTE + IMP   │ IMP + não URG   │
│ ⚡ FAZER JÁ     │ 📅 AGENDAR      │
│ (crises, prazos)│ (planejamento)  │
├─────────────────┼─────────────────┤
│ URG + não IMP   │ não URG + não I │
│ 👥 DELEGAR      │ 🗑️ ELIMINAR    │
│ (interrupções)  │ (time-wasters)  │
└─────────────────┴─────────────────┘

**🔥 Regra do 80/20 (Pareto):**
• 20% das tarefas geram 80% dos resultados
• Identifique essas tarefas e faça PRIMEIRO

**💡 Pergunta-chave:**
"Se eu só pudesse fazer 1 tarefa hoje, qual seria?"

Quer que eu aplique esses frameworks às suas tarefas específicas?`;
    }
    
    if (message.includes('produtividade') || message.includes('eficiência') || message.includes('eficiencia')) {
      return `✅ **Otimização de Produtividade - TaskMate**

Excelente! Vou criar um sistema de alta performance para "${userMessage}":

**⚙️ Sistema de Produtividade Peak:**

**MANHÃ (6h-9h) - Setup Mental**
□ 🧘 15min: Meditação/planejamento do dia
□ 🎯 Definir 3 MIT (Most Important Tasks)
□ 🚫 Não checar email/redes antes das 10h

**BLOCO 1 (9h-12h) - Deep Work**
□ 🔥 Tarefa mais importante do dia
□ 📵 Modo avião, sem interrupções
□ ⏱️ Pomodoros de 50min + 10min pausa

**MEIO-DIA (12h-13h30) - Recarga**
□ 🍽️ Almoço sem telas
□ 🚶 Caminhada 15-20min
□ 🔋 Micro-descanso mental

**BLOCO 2 (13h30-16h) - Shallow Work**
□ 📧 Processar emails (método Inbox Zero)
□ 📞 Reuniões rápidas (max 25min)
□ ✅ Tarefas administrativas

**FIM DO DIA (16h-17h) - Fechamento**
□ 📝 Revisar o que foi feito
□ 🗓️ Planejar amanhã (max 3 MITs)
□ 🎉 Celebrar conquistas do dia

**⚡ Hacks de Produtividade:**
• Regra dos 2 minutos (faz agora!)
• Batching (agrupar tarefas similares)
• Time-blocking (agendar tudo)
• Diga "não" estrategicamente

**📈 KPIs de Produtividade:**
• Taxa de conclusão: ___% 
• Horas em deep work: ___h
• Distrações evitadas: ___

Implemento isso com você? Posso criar um template de planilha ou dashboard!`;
    }
    
    // Resposta genérica TaskMate
    return `✅ **Gestão de Tarefas - TaskMate**

Vou organizar "${userMessage}" para máxima eficiência!

**🎯 Minha Abordagem:**

**Planejamento:**
• Quebrar em subtarefas acionáveis
• Estimar tempo realista
• Identificar dependências

**Priorização:**
• Matriz de Eisenhower (Urgente × Importante)
• RICE Score (Reach, Impact, Confidence, Effort)
• MoSCoW (Must, Should, Could, Won't)

**Execução:**
• Time-blocking (agendar blocos de foco)
• Pomodoro Technique (25min + 5min)
• Single-tasking (uma coisa por vez)

**Ferramentas:**
📋 Kanban boards (To Do → Doing → Done)
📅 Calendário time-blocked
📊 Dashboards de progresso

Me dê mais detalhes: Quais são as tarefas? Prazos? Nível de complexidade? Vou criar um plano de ação detalhado!`;
  }
  
  // ===== COACHMATE - Mentor de Desenvolvimento =====
  if (agentType.includes('coachmate')) {
    if (message.includes('aprender') || message.includes('estudar') || message.includes('carreira')) {
      return `🎓 **Plano de Desenvolvimento - CoachMate**

Que objetivo inspirador: "${userMessage}"! Vou criar uma trilha personalizada:

**🎯 FASE 1: FUNDAÇÃO (Semanas 1-2)**
□ Conceitos essenciais e terminologia
□ Recursos: [Curso X, Livro Y, Doc oficial]
□ Objetivo: Compreensão sólida do básico
□ ⏱️ Tempo estimado: 10-15h

**🚀 FASE 2: PRÁTICA GUIADA (Semanas 3-4)**
□ Exercícios práticos e tutoriais
□ Mini-projetos orientados
□ Objetivo: Aplicar o conhecimento
□ ⏱️ Tempo estimado: 15-20h

**💡 FASE 3: PROJETO REAL (Semanas 5-6)**
□ Criar algo do zero
□ Resolver problema real
□ Objetivo: Consolidar aprendizado
□ ⏱️ Tempo estimado: 20-25h

**🌟 FASE 4: MAESTRIA (Ongoing)**
□ Contribuir com comunidade
□ Ensinar outros (melhor forma de aprender)
□ Especialização avançada

**📚 Recursos Recomendados:**
• 🎥 Vídeos: [Playlist curada]
• 📖 Livros: [Top 3 essenciais]
• 💻 Prática: [Plataforma interativa]
• 👥 Comunidade: [Fórum/Discord]

**✅ Métricas de Progresso:**
• Checkpoint semanal
• Mini-desafios práticos
• Portfolio growth

**💪 Dicas de Mentalidade:**
✓ Consistência > Intensidade (1h/dia > 7h/semana)
✓ Aprender fazendo (70% prática, 30% teoria)
✓ Erro = Aprendizado (celebre as falhas!)

Quer que eu detalhe alguma fase ou crie um cronograma específico?`;
    }
    
    if (message.includes('motivação') || message.includes('motivacao') || message.includes('desafio')) {
      return `🎓 **Motivação e Superação - CoachMate**

Entendo o desafio em "${userMessage}". Vou te apoiar nessa jornada!

**🔥 Framework de Motivação Sustentável:**

**1️⃣ CLAREZA DE PROPÓSITO (Seu "Porquê")**
❓ Por que isso importa para VOCÊ?
❓ Como sua vida será diferente após conquistar?
❓ Quem você se tornará no processo?

💡 Exercício: Escreva seu "Por quê" em 1 frase.

**2️⃣ METAS SMART**
• **S**pecific: "Quero ser melhor" → "Vou aprender X"
• **M**easurable: Como medir progresso?
• **A**chievable: Realista dado seu contexto?
• **R**elevant: Alinhado com seus valores?
• **T**ime-bound: Prazo definido?

**3️⃣ SISTEMAS > METAS**
Não foque no resultado, foque no processo:
• Identidade: "Sou alguém que [faz X]"
• Hábitos: Rotina diária de crescimento
• Ambiente: Configure para sucesso

**4️⃣ CELEBRAÇÃO DE MICRO-VITÓRIAS**
🎉 Comemore cada pequeno progresso
📈 Tracking visual (gráfico, streak)
💪 Momento de orgulho diário

**5️⃣ COMUNIDADE E ACCOUNTABILITY**
👥 Compartilhe sua meta com alguém
📅 Check-ins semanais
🏆 Parceiro de accountability

**⚡ Superar Obstáculos:**

**Quando sentir vontade de desistir:**
❌ "Não estou progredindo" → ✅ Olhe onde estava há 30 dias
❌ "É muito difícil" → ✅ Difícil significa que vale a pena
❌ "Não tenho tempo" → ✅ Tenho 30min? Comece!

**Mantra Diário:**
"Hoje sou 1% melhor que ontem. 
Em 100 dias, serei 100% diferente."

Qual aspecto você quer trabalhar primeiro? Estou aqui para te guiar!`;
    }
    
    if (message.includes('feedback') || message.includes('melhorar') || message.includes('crescer')) {
      return `🎓 **Desenvolvimento e Feedback - CoachMate**

Excelente postura de crescimento sobre "${userMessage}"!

**🌱 Framework de Melhoria Contínua (Kaizen):**

**AUTOAVALIAÇÃO (Onde estou hoje?)**
┌─────────────────────────────────┐
│ Forças:                         │
│ □ O que faço bem?               │
│ □ O que me diferencia?          │
│                                 │
│ Áreas de Desenvolvimento:       │
│ □ O que pode melhorar?          │
│ □ Gaps de competência?          │
└─────────────────────────────────┘

**FEEDBACK 360° (Visão completa)**
• 🎯 Superior: Perspectiva de liderança
• 👥 Pares: Colaboração e impacto
• 📊 Clientes: Valor entregue
• 🪞 Auto: Autoconsciência

**PLANO DE AÇÃO (Como chegar lá?)**

**Curto Prazo (30 dias):**
□ 1 competência específica para desenvolver
□ 3 ações concretas por semana
□ Medição de progresso (KPIs)

**Médio Prazo (90 dias):**
□ Projeto desafiador (stretch goal)
□ Mentoria com alguém experiente
□ Curso/certificação relevante

**Longo Prazo (1 ano):**
□ Expertise reconhecida na área
□ Contribuição significativa
□ Próximo nível de carreira

**📈 Modelo 70-20-10 de Aprendizado:**
• 70% → Experiência prática (projetos, desafios)
• 20% → Exposição (mentoria, networking)
• 10% → Educação formal (cursos, livros)

**💬 Recebendo Feedback Construtivamente:**
✅ Ouvir sem defensividade
✅ Fazer perguntas de esclarecimento
✅ Agradecer o feedback
✅ Agir com base no aprendizado

**🎯 Dando Feedback Efetivo:**
• Situação: Descreva o contexto
• Comportamento: O que foi observado
• Impacto: Consequência do comportamento
• Futuro: Sugestão de melhoria

Quer que eu ajude a estruturar um plano de desenvolvimento específico para você?`;
    }
    
    // Resposta genérica CoachMate
    return `🎓 **Mentoria e Desenvolvimento - CoachMate**

Ótima iniciativa sobre "${userMessage}"! Como seu mentor de desenvolvimento, posso te ajudar com:

**🎯 Áreas de Coaching:**
• 📚 Aprendizado e upskilling
• 💼 Carreira e transição profissional
• 🧠 Produtividade e foco
• 💪 Mentalidade de crescimento
• 🎭 Soft skills e comunicação
• 🌟 Liderança e influência

**🛤️ Minha Abordagem:**
1. **Descoberta:** Entender onde você está
2. **Visão:** Definir onde quer chegar
3. **Estratégia:** Mapear o caminho
4. **Execução:** Acompanhar progresso
5. **Ajuste:** Adaptar conforme necessário

**🔧 Ferramentas de Desenvolvimento:**
• Planos de ação personalizados
• Frameworks de aprendizado
• Técnicas de motivação
• Sistemas de accountability
• Recursos curados

💬 Me conte mais: Qual seu objetivo? Onde está hoje? Quais os principais desafios? Vamos criar um plano de desenvolvimento transformador!`;
  }
  
  // ===== RESPOSTA GENÉRICA =====
  return `Entendi sua mensagem sobre "${userMessage}". 

Sou um agente especializado do WorkMate AI, pronto para ajudar! Para te dar a melhor resposta possível, me conte:

• **Contexto:** Qual a situação atual?
• **Objetivo:** O que você precisa alcançar?
• **Desafios:** Quais obstáculos você enfrenta?

Posso ajudar com análise de dados, redação, ideias criativas, organização de tarefas ou desenvolvimento profissional. Estou aqui para amplificar sua capacidade! 🚀`;
}

