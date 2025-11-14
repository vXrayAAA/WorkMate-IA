# 🚀 Vercel AI SDK - Guia de Configuração

O WorkMate AI agora usa o **Vercel AI SDK** para integração com múltiplos providers de IA!

---

## ✨ Vantagens do Vercel AI SDK

✅ **Streaming nativo** - Respostas em tempo real
✅ **Unified API** - Mesma interface para todos providers
✅ **Type-safe** - TypeScript first
✅ **Edge Ready** - Funciona em Edge Runtime
✅ **React Hooks** - `useChat()` integrado

---

## 🔌 Providers Suportados

### 1. OpenAI (GPT-4, GPT-3.5)

```env
AI_PROVIDER=openai
OPENAI_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-...
```

**Modelos disponíveis:**
- `gpt-4o` - Mais inteligente
- `gpt-4o-mini` - Rápido e econômico ⭐
- `gpt-3.5-turbo` - Mais barato

**Obter API Key:** https://platform.openai.com/api-keys

---

### 2. Anthropic (Claude)

```env
AI_PROVIDER=anthropic
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ANTHROPIC_API_KEY=sk-ant-...
```

**Modelos disponíveis:**
- `claude-3-5-sonnet-20241022` - Melhor qualidade ⭐
- `claude-3-haiku-20240307` - Mais rápido
- `claude-3-opus-20240229` - Máxima capacidade

**Obter API Key:** https://console.anthropic.com/

---

### 3. Google Gemini

```env
AI_PROVIDER=google
GOOGLE_MODEL=gemini-1.5-flash
GOOGLE_API_KEY=AIza...
```

**Modelos disponíveis:**
- `gemini-1.5-pro` - Melhor qualidade
- `gemini-1.5-flash` - Rápido ⭐
- `gemini-1.0-pro` - Estável

**Obter API Key:** https://makersuite.google.com/app/apikey

---

### 4. Modo Mock (Padrão)

```env
AI_PROVIDER=mock
```

**Funcionalidades:**
- ✅ Respostas inteligentes sem IA
- ✅ Não requer API keys
- ✅ Perfeito para demos
- ✅ Zero custo

---

## 🛠️ Como Funciona

### Arquivo: `app/api/chat/route.ts`

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Streaming de resposta
const result = await streamText({
  model: openai('gpt-4o-mini'),
  system: systemPrompt,
  messages: convertToCoreMessages(messages),
  temperature: 0.7,
});

// Retorna stream
return result.toTextStreamResponse();
```

### No Frontend (já implementado)

O chat consome a API normalmente via `fetch` e recebe as respostas em JSON.

Para streaming real, você pode usar o hook `useChat`:

```typescript
import { useChat } from 'ai/react';

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
});
```

---

## 📊 Comparação de Providers

| Provider | Custo | Velocidade | Qualidade | Limite Grátis |
|----------|-------|------------|-----------|---------------|
| **OpenAI** | $$$ | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | $5 crédito |
| **Anthropic** | $$$ | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | $5 crédito |
| **Google** | $$ | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Generoso |
| **Mock** | FREE | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | Ilimitado |

---

## 🚀 Deploy na Vercel

### Variáveis de Ambiente Necessárias:

**Mínimo (Mock):**
```
AI_PROVIDER=mock
```

**Com IA Real:**
```
AI_PROVIDER=openai
OPENAI_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-...
```

### Passo a Passo:

1. **Acesse:** https://vercel.com/vxrayaaas-projects/workmate-nextjs
2. **Settings → Environment Variables**
3. **Adicione as variáveis**
4. **Redeploy** (Deployments → ... → Redeploy)

---

## 💡 Dicas de Uso

### Para Desenvolvimento Local:

```bash
# .env.local
AI_PROVIDER=mock  # Rápido, sem custo
```

### Para Produção:

```bash
# Vercel Environment Variables
AI_PROVIDER=openai
OPENAI_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-...
```

### Custos Estimados:

**GPT-4o-mini:**
- $0.15 / 1M input tokens
- $0.60 / 1M output tokens
- ~1000 conversas = $1

**Claude 3.5 Sonnet:**
- $3 / 1M input tokens  
- $15 / 1M output tokens
- ~200 conversas = $1

**Gemini 1.5 Flash:**
- FREE até 15 req/min
- Após: $0.075 / 1M tokens
- Muito generoso!

---

## 🔧 Troubleshooting

### Erro: "API key not found"

```bash
# Verifique se as variáveis estão configuradas
echo $AI_PROVIDER
echo $OPENAI_API_KEY
```

### Erro: "Rate limit exceeded"

- **Google:** 15 req/min (free tier)
- **OpenAI:** 3500 req/min (tier 1)
- **Solução:** Adicione retry ou use outro provider

### Streaming não funciona

O código atual usa JSON response normal. Para streaming real:

```typescript
// No frontend, use:
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ agent, message }),
});

const reader = response.body.getReader();
// ... processar stream
```

---

## 📚 Documentação Oficial

- **Vercel AI SDK:** https://sdk.vercel.ai/docs
- **OpenAI:** https://platform.openai.com/docs
- **Anthropic:** https://docs.anthropic.com
- **Google AI:** https://ai.google.dev/docs

---

## ✅ Checklist Pré-Deploy

- [ ] Escolher provider (mock, openai, anthropic, google)
- [ ] Obter API key do provider
- [ ] Configurar variáveis de ambiente
- [ ] Testar localmente
- [ ] Deploy na Vercel
- [ ] Adicionar variáveis na Vercel
- [ ] Redeploy
- [ ] Testar em produção

---

**🎉 Pronto! Seu WorkMate AI está agora com IA de verdade!**

Para demonstrações sem custo, mantenha `AI_PROVIDER=mock` ✨
