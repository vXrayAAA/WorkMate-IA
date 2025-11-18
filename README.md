# 🤖 WorkMate AI

**WorkMate AI** é uma plataforma inovadora de agentes de IA especializados para aumentar a produtividade no ambiente de trabalho. Desenvolvido como parte da **Global Solution 2025 - FIAP**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vXrayAAA/WorkMate-IA)

---

## 🚀 Demo ao Vivo

**[🌐 Acesse a aplicação](https://workmate-nextjs-9eu46w8y9-vxrayaaas-projects.vercel.app)**

---

## ✨ Funcionalidades

### 🤖 5 Agentes Especializados

- **📊 DataMate** - Análise de dados, relatórios e identificação de tendências
- **✍️ TextMate** - Redação de emails, documentos e revisão de textos
- **💡 CreativeMate** - Brainstorming, ideias criativas e soluções inovadoras
- **✅ TaskMate** - Organização de tarefas, priorização e produtividade
- **🎓 CoachMate** - Desenvolvimento profissional e trilha de carreira

### 🎨 Interface Moderna

- Design responsivo com Tailwind CSS
- Gradientes e animações suaves
- Chat interativo em tempo real
- Dashboard com gráficos e métricas

### 🔌 Integração com IAs

Powered by **Vercel AI SDK** com suporte para múltiplas APIs:
- OpenAI (GPT-4, GPT-4o-mini)
- Anthropic (Claude 3.5 Sonnet)
- Google Gemini (1.5 Flash, 1.5 Pro)
- Modo Mock (demonstração sem API)

**Streaming nativo** para respostas em tempo real! ⚡

📖 Veja [VERCEL_AI_SDK.md](./VERCEL_AI_SDK.md) para guia completo de configuração.

---

## 🛠️ Tecnologias

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4
- **Gráficos:** Chart.js + react-chartjs-2
- **Ícones:** Font Awesome 6
- **Deploy:** Vercel

---

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/vXrayAAA/WorkMate-IA.git
cd WorkMate-IA

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Edite .env.local e adicione:
# AI_PROVIDER=mock  (ou configure uma API de IA real)

# Execute o projeto
npm run dev

# Acesse em http://localhost:3000
```

---

## 🔐 Configuração de IA

### Modo Mock (Padrão - Não requer API)

```env
AI_PROVIDER=mock
```

### OpenAI

```env
OPENAI_API_KEY=sk-...
AI_PROVIDER=openai
```

### Groq (Gratuito e Rápido!)

```env
GROQ_API_KEY=gsk_...
AI_PROVIDER=groq
```

Obtenha sua chave em: https://console.groq.com/keys

### Google Gemini

```env
GOOGLE_API_KEY=AIza...
AI_PROVIDER=google
```

---



## 📁 Estrutura do Projeto

```
workmate-nextjs/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard com métricas
│   ├── agentes/
│   │   └── page.tsx          # Chat com agentes IA
│   └── api/
│       └── chat/
│           └── route.ts      # API de chat (multi-provider)
├── lib/
│   └── ai-config.ts          # Configuração dos agentes
├── public/                   # Arquivos estáticos
└── docs/                     # Documentação adicional
```

---

## 🎯 Uso

### Landing Page

Apresenta os 5 agentes especializados com descrições e CTAs.

### Dashboard

- Métricas de produtividade
- Gráfico de atividades da semana
- Estatísticas de uso dos agentes

### Chat com Agentes

1. Selecione um agente especializado
2. Digite sua pergunta ou solicitação
3. Receba resposta contextualizada
4. Use as sugestões rápidas para começar

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da **Global Solution 2025 - FIAP**.

---

## 👥 Autores

**Equipe WorkMate AI**
- Desenvolvido para FIAP - Global Solution 2025
- GitHub: [@vXrayAAA](https://github.com/vXrayAAA)

---

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

- 🐛 [Abra uma Issue](https://github.com/vXrayAAA/WorkMate-IA/issues)
- 💬 [Discussões](https://github.com/vXrayAAA/WorkMate-IA/discussions)

---

## 🎓 Global Solution 2025 - FIAP

Este projeto foi desenvolvido como solução para o desafio da Global Solution 2024, focando em:

- ✅ Inovação tecnológica com IA
- ✅ Experiência do usuário (UX)
- ✅ Arquitetura escalável
- ✅ Deploy em produção
- ✅ Código limpo e documentado





