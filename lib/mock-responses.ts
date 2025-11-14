// Mock Responses - Respostas inteligentes sem necessidade de IA real

export function generateMockResponse(agent: string, message: string): string {
  const lowerMessage = message.toLowerCase();

  // DataMate - Análise de Dados
  if (agent === 'datamate') {
    if (lowerMessage.includes('venda') || lowerMessage.includes('vendas')) {
      return `📊 **Análise de Vendas**\n\nIdentifiquei os seguintes insights:\n\n**Performance Atual:**\n- Vendas: R$ 1.245.890 (+18%)\n- Ticket médio: R$ 487,50\n- Conversão: 3,2%\n\n**Recomendações:**\n- Focar em produtos premium\n- Otimizar funil de vendas\n- Investir em upsell`;
    }
    
    if (lowerMessage.includes('produtividade')) {
      return `⚡ **Análise de Produtividade**\n\nMétricas identificadas:\n\n- Tempo/tarefa: 2h 15min\n- Taxa conclusão: 87%\n- Horas produtivas: 6,5h/dia\n\n**Insights:**\n✅ Manhãs 34% mais produtivas\n✅ Blocos de 90min = melhores resultados`;
    }
    
    return `📊 Olá! Posso analisar dados de vendas, produtividade, tendências e criar relatórios com insights acionáveis. Sobre o que você gostaria de saber?`;
  }

  // TextMate - Redação
  if (agent === 'textmate') {
    if (lowerMessage.includes('email')) {
      return `✍️ **Template de Email Profissional**\n\n**Assunto:** [Claro e específico]\n\nOlá [Nome],\n\n[Abertura contextual]\n\n[Corpo principal - 3 parágrafos]\n\n[Call-to-action]\n\nAtenciosamente,\n[Nome]\n\n💡 **Dicas:** Máximo 150 palavras, uma ideia por parágrafo.`;
    }
    
    if (lowerMessage.includes('relatório')) {
      return `📄 **Estrutura de Relatório**\n\n1. **Sumário Executivo**\n2. **Objetivos**\n3. **Metodologia**\n4. **Descobertas**\n5. **Recomendações**\n6. **Próximos Passos**\n\nExecutivos leem apenas o sumário - garanta que seja auto-suficiente!`;
    }
    
    return `✍️ Posso te ajudar com emails, relatórios, apresentações e documentos profissionais. Que tipo de texto você precisa criar?`;
  }

  // CreativeMate - Criatividade  
  if (agent === 'creativemate') {
    if (lowerMessage.includes('campanha') || lowerMessage.includes('ideia')) {
      return `💡 **5 Conceitos Criativos**\n\n1. **"Segundas Reimaginadas"** - Transformar o dia mais odiado\n2. **"O Cliente Secreto"** - Reality show autêntico\n3. **"Micro-Momentos"** - UGC celebrando vitórias\n4. **"Behind the Fails"** - Bastidores humanizados\n5. **"24h Challenge"** - Time-lapse de transformações\n\n💎 Recomendação: Teste conceitos 1 e 3 (baixo risco, alto potencial)`;
    }
    
    return `💡 Posso ajudar com brainstorming, naming, campanhas criativas e soluções inovadoras. Qual desafio criativo você quer resolver?`;
  }

  // TaskMate - Produtividade
  if (agent === 'taskmate') {
    if (lowerMessage.includes('organizar') || lowerMessage.includes('tarefa')) {
      return `✅ **Sistema GTD Simplificado**\n\n1. **Capturar:** Inbox para tudo\n2. **Esclarecer:** É acionável? <2min? Delegável?\n3. **Organizar:** Próximas ações, calendário, aguardando\n4. **Refletir:** Revisão semanal\n5. **Engajar:** Executar por contexto\n\n⚡ Quick Start: Liste tudo, processe, faça tarefas de 2min agora!`;
    }
    
    if (lowerMessage.includes('priorizar')) {
      return `🎯 **Matriz de Eisenhower**\n\n1️⃣ Urgente + Importante → Fazer JÁ\n2️⃣ Importante → Agendar\n3️⃣ Urgente → Delegar\n4️⃣ Nem urgente nem importante → Eliminar\n\n💡 Se tudo é prioridade, nada é prioridade. Limite-se a 3/dia.`;
    }
    
    return `✅ Posso te ajudar com organização (GTD), priorização, gestão de tempo e produtividade. O que você quer otimizar?`;
  }

  // CoachMate - Desenvolvimento
  if (agent === 'coachmate') {
    if (lowerMessage.includes('aprender') || lowerMessage.includes('carreira')) {
      return `🎓 **Plano de Aprendizado Acelerado**\n\n**Fase 1 (1-2 sem):** Foundation - Visão geral\n**Fase 2 (3-6 sem):** Deep Dive - Prática deliberada  \n**Fase 3 (7-12 sem):** Mastery - Projeto real\n\n🔁 **Revisão Espaçada:** Dias 1, 2, 7, 30, 90\n\n💡 1h/dia = 365h/ano = Nível avançado em 1 ano!`;
    }
    
    if (lowerMessage.includes('motivação')) {
      return `🔥 **Sistema Anti-Procrastinação**\n\n1. **2 Minutos:** Comece só 2 min\n2. **Temptation Bundling:** Tarefa chata + prazer\n3. **Accountability:** Compromisso público\n4. **Recompensas:** Immediate gratification\n\n💡 Motivação é RESULTADO da ação, não a causa!`;
    }
    
    return `🎓 Posso te ajudar com desenvolvimento de carreira, aprendizado, motivação e crescimento profissional. Em que área você quer evoluir?`;
  }

  // Resposta genérica
  return `Olá! Sou o ${agent}. Como posso ajudar você hoje? Me conte mais sobre o que você precisa!`;
}
