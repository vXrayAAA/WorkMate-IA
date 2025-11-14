# 🚀 Deploy na Vercel - WorkMate AI

Guia completo para fazer deploy do projeto WorkMate AI na Vercel.

---

## ✅ Pré-requisitos

Antes de fazer o deploy, certifique-se de que:

- [ ] O projeto está funcionando localmente (`npm run dev`)
- [ ] Todos os erros foram corrigidos
- [ ] Você tem uma conta no GitHub (para conectar com Vercel)
- [ ] Você tem uma conta na Vercel (gratuita)

---

## 📦 Passo 1: Preparar o Repositório Git

### 1.1 Inicializar Git (se ainda não foi feito)

```bash
cd "d:\00 - Estudos\02 - FIAP\GlobalSolution_v02\workmate-nextjs"
git init
```

### 1.2 Criar .gitignore

O arquivo `.gitignore` já existe, mas verifique se está correto:

```bash
# Visualizar o .gitignore
cat .gitignore
```

**Importante:** O arquivo `.env.local` NÃO deve ir para o Git (já está no .gitignore).

### 1.3 Fazer primeiro commit

```bash
git add .
git commit -m "Initial commit - WorkMate AI Next.js app"
```

---

## 🌐 Passo 2: Criar Repositório no GitHub

### 2.1 No GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `workmate-ai` (ou outro nome)
3. Descrição: "WorkMate AI - Agentes de IA para Produtividade"
4. Visibilidade: **Privado** (recomendado) ou Público
5. **NÃO** inicialize com README, .gitignore ou license
6. Clique em **"Create repository"**

### 2.2 Conectar repositório local ao GitHub

```bash
# Substitua SEU_USUARIO pelo seu usuário do GitHub
git remote add origin https://github.com/SEU_USUARIO/workmate-ai.git
git branch -M main
git push -u origin main
```

**Credenciais:** Use seu token do GitHub como senha (não a senha da conta).

---

## 🚀 Passo 3: Deploy na Vercel

### Opção A: Via Web (Recomendado para iniciantes)

#### 3.1 Acessar Vercel

1. Acesse: https://vercel.com/
2. Clique em **"Sign Up"** (se não tem conta) ou **"Log In"**
3. **Conecte com GitHub** (recomendado)

#### 3.2 Importar Projeto

1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Clique em **"Import Git Repository"**
3. Selecione o repositório **`workmate-ai`** (ou o nome que você deu)
4. Clique em **"Import"**

#### 3.3 Configurar Projeto

**Configure as seguintes opções:**

**Framework Preset:** `Next.js` (detecta automaticamente)

**Root Directory:** `./` (deixe padrão)

**Build Command:** 
```bash
npm run build
```

**Output Directory:** 
```bash
.next
```

**Install Command:**
```bash
npm install
```

#### 3.4 Configurar Variáveis de Ambiente

⚠️ **IMPORTANTE:** Configure as variáveis de ambiente antes do deploy!

Clique em **"Environment Variables"** e adicione:

```bash
# Se estiver usando modo mock (atual)
AI_PROVIDER=mock

# OU se configurou Groq (IA real)
# GROQ_API_KEY=gsk_sua_chave_aqui
# AI_PROVIDER=groq

# OU se configurou Google Gemini
# GOOGLE_API_KEY=AIza_sua_chave_aqui
# AI_PROVIDER=google
```

**Para cada variável:**
1. **Name:** Nome da variável (ex: `AI_PROVIDER`)
2. **Value:** Valor da variável (ex: `mock`)
3. **Environments:** Selecione **Production, Preview, Development**
4. Clique em **"Add"**

#### 3.5 Deploy

1. Revise as configurações
2. Clique em **"Deploy"**
3. Aguarde o build (2-3 minutos)
4. ✅ Deploy concluído!

---

### Opção B: Via CLI (Avançado)

```bash
# 1. Instalar Vercel CLI globalmente
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
cd "d:\00 - Estudos\02 - FIAP\GlobalSolution_v02\workmate-nextjs"
vercel

# Responda as perguntas:
# - Set up and deploy? → Y
# - Which scope? → Sua conta
# - Link to existing project? → N
# - Project name → workmate-ai
# - Directory → ./
# - Override settings? → N

# 4. Deploy para produção
vercel --prod
```

---

## 🎯 Passo 4: Configurar Variáveis de Ambiente (Se não fez no Passo 3.4)

### Via Dashboard da Vercel:

1. Acesse seu projeto: https://vercel.com/dashboard
2. Clique no projeto **workmate-ai**
3. Vá em **"Settings"** → **"Environment Variables"**
4. Adicione as variáveis:

```bash
AI_PROVIDER = mock
```

Se quiser usar IA real:
```bash
GROQ_API_KEY = gsk_sua_chave_aqui
AI_PROVIDER = groq
```

5. Clique em **"Save"**
6. **Redeploye o projeto:** Vá em "Deployments" → Clique nos 3 pontinhos do último deploy → "Redeploy"

---

## ✅ Passo 5: Testar o Deploy

### 5.1 Acessar a URL

Após o deploy, a Vercel fornece uma URL:

```
https://workmate-ai.vercel.app
```

Ou personalizada:
```
https://seu-nome-projeto-hash.vercel.app
```

### 5.2 Testar Funcionalidades

Teste todas as páginas:

- ✅ **Landing Page:** `https://seu-projeto.vercel.app/`
- ✅ **Dashboard:** `https://seu-projeto.vercel.app/dashboard`
- ✅ **Chat IA:** `https://seu-projeto.vercel.app/agentes`
- ✅ **API Chat:** `https://seu-projeto.vercel.app/api/chat` (testa via chat)

---

## 🌐 Passo 6: Configurar Domínio Personalizado (Opcional)

### 6.1 Na Vercel

1. Vá em **"Settings"** → **"Domains"**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `workmate-ai.com`)
4. Siga as instruções para configurar DNS

### 6.2 Subdomínio Vercel (Gratuito)

Por padrão, você recebe:
```
https://workmate-ai.vercel.app
```

Pode personalizar em **Settings** → **Domains** → **Edit**.

---

## 🔄 Passo 7: Atualizações Automáticas

### 7.1 Deploy Automático

Após configurar, **toda vez que você fizer push no GitHub**, a Vercel automaticamente:

1. Detecta o push
2. Faz build do projeto
3. Faz deploy da nova versão
4. Atualiza o site em segundos!

### 7.2 Workflow de Atualização

```bash
# 1. Fazer alterações no código
# 2. Commit
git add .
git commit -m "Atualização: descrição da mudança"

# 3. Push para GitHub
git push origin main

# 4. Vercel faz deploy automaticamente! 🚀
```

### 7.3 Visualizar Deploy

- Acesse: https://vercel.com/dashboard
- Veja o status do deploy em tempo real
- Logs completos disponíveis

---

## 📊 Monitoramento

### Analytics da Vercel (Gratuito)

A Vercel fornece métricas gratuitas:

- 📈 Visitas por página
- ⚡ Performance (Core Web Vitals)
- 🌍 Distribuição geográfica
- 📱 Dispositivos (desktop/mobile)

**Acessar:** Dashboard → Seu projeto → **"Analytics"**

---

## ⚠️ Troubleshooting

### Erro: Build Failed

**Causa:** Erro de compilação no código.

**Solução:**
1. Veja os logs do build na Vercel
2. Corrija o erro localmente
3. Teste com `npm run build`
4. Push para GitHub novamente

### Erro: Environment Variable Not Set

**Causa:** Variável de ambiente não configurada.

**Solução:**
1. Vá em Settings → Environment Variables
2. Adicione as variáveis necessárias
3. Redeploy o projeto

### Erro: 404 nas rotas

**Causa:** Configuração de rotas incorreta.

**Solução:**
Já está configurado corretamente no `next.config.ts`. Se ainda ocorrer, verifique se todas as páginas estão na pasta `app/`.

### Site lento na primeira visita

**Causa:** Cold start (normal na versão gratuita).

**Solução:**
- Primeira visita pode levar 2-3 segundos
- Visitas seguintes são instantâneas
- Considere plano pago se precisar melhor performance

---

## 💰 Custos

### Plano Hobby (Gratuito)

✅ **Incluído:**
- Deploy ilimitados
- 100GB bandwidth/mês
- Domínios personalizados
- HTTPS automático
- Preview deploys
- Analytics básico

❌ **Limitações:**
- 1 membro da equipe
- Sem proteção DDoS avançada
- Sem suporte prioritário

### Plano Pro ($20/mês)

Se o projeto crescer, considere upgrade para:
- Performance melhorada
- Mais bandwidth
- Suporte prioritário
- Proteção avançada

**Para Global Solution, o plano gratuito é PERFEITO!** ✅

---

## 🎓 Para Apresentação da Global Solution

### Demonstração AO VIVO

1. **Mostre a URL pública:** 
   ```
   https://workmate-ai.vercel.app
   ```

2. **Destaque o deploy profissional:**
   - "Deploy em produção na Vercel"
   - "CI/CD automático com GitHub"
   - "Infraestrutura serverless escalável"

3. **Mostre funcionalidades:**
   - Landing page responsiva
   - Dashboard interativo com gráficos
   - Chat com 5 agentes IA
   - Integração com APIs de IA

4. **Mencione tecnologias:**
   - Next.js 15 (Framework moderno)
   - React 18 (Interface reativa)
   - Tailwind CSS (Design system)
   - Chart.js (Visualizações)
   - Vercel (Cloud hosting)

---

## 📝 Checklist Final

Antes da apresentação:

- [ ] Deploy funcionando na Vercel
- [ ] Todas as páginas acessíveis
- [ ] Chat respondendo (mock ou IA real)
- [ ] Dashboard com gráfico renderizando
- [ ] URL curta e memorável
- [ ] Screenshot das páginas (backup)
- [ ] Testado em mobile e desktop

---

## 🔗 Links Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentação Vercel:** https://vercel.com/docs
- **Status da Vercel:** https://www.vercel-status.com/
- **Suporte:** https://vercel.com/support

---

## 🎉 Pronto!

Seu projeto WorkMate AI está agora disponível publicamente na internet! 🌐

**Compartilhe a URL com professores, colegas e no portfólio!** 🚀

---

💡 **Dica Final:** Adicione a URL do projeto no README do GitHub e no relatório da Global Solution!
