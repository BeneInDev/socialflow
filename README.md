# SocialFlow

SocialFlow é uma plataforma própria para organizar, agendar e — futuramente —
publicar conteúdo em redes sociais. A ideia é reunir num só lugar a criação
de conteúdo (imagens, vídeos, título, legenda, hashtags), a escolha de quais
redes recebem cada publicação, o agendamento de datas e horários, o
acompanhamento do status de cada post e um calendário de conteúdos — com
apoio de IA para criação/adaptação de conteúdo em uma etapa futura.

As integrações previstas são **Instagram, Facebook, YouTube e TikTok**.
Nenhuma delas está implementada ainda — veja [Roadmap](#roadmap).

## Status deste marco — Marco 1: Fundação

Este marco entrega apenas a fundação técnica do projeto: uma aplicação React
limpa, organizada, responsiva e compilando sem erros, com uma tela inicial
simples confirmando que o sistema está de pé. Não há login, banco de dados,
upload de arquivos, agendamento, integrações externas ou IA neste marco —
essas funcionalidades chegam em marcos posteriores.

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build e dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — estilização utilitária, via o
  plugin oficial `@tailwindcss/vite` (sem arquivo `tailwind.config` separado;
  os tokens de design vivem em `src/index.css`)

## Estrutura do projeto

```
socialflow/
├── src/
│   ├── components/  # Componentes reutilizáveis (Logo, StatusCard, ...)
│   ├── layouts/     # Estruturas de layout compartilhadas (MainLayout)
│   ├── pages/       # Páginas (Home)
│   ├── hooks/       # Hooks personalizados (vazio por enquanto)
│   ├── lib/         # Configurações e clientes de bibliotecas (vazio por enquanto)
│   ├── services/    # Comunicação com APIs/serviços externos (vazio por enquanto)
│   ├── types/       # Tipos TypeScript compartilhados (vazio por enquanto)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css    # Tokens de design (cores, tipografia) + estilos base
├── public/
│   └── favicon.svg
├── .env.example     # Documenta variáveis futuras (Supabase) — sem valores reais
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

As pastas `hooks/`, `lib/`, `services/` e `types/` já existem para receber
código futuro (chamadas ao Supabase, integrações com redes sociais, tipos
compartilhados), mas estão vazias neste marco — não há implementações falsas
de API nem simulações de publicação.

## Como instalar

```bash
npm install
```

## Como executar em desenvolvimento

```bash
npm run dev
```

Abre o servidor de desenvolvimento (por padrão em `http://localhost:5173`).
O `vite.config.ts` já está configurado com `host: true`, então também é
possível acessar pela rede local (útil para testar no celular ou em ambientes
como GitHub Codespaces).

## Como gerar o build de produção

```bash
npm run build
```

Gera os arquivos otimizados em `dist/`. Para conferir o resultado localmente:

```bash
npm run preview
```

## Variáveis de ambiente

Nenhuma variável é usada neste marco. `.env.example` documenta o que será
necessário quando o Supabase for integrado (`VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`). Nunca commite um arquivo `.env` real — ele já está
listado no `.gitignore`.

## Roadmap

O projeto avança por marcos. Este README será atualizado a cada um.

- ✅ **Marco 1 — Fundação**: estrutura do projeto, tela inicial, build limpo.
- ⏳ **Marco 2 (sugestão)**: autenticação e Supabase (definição do schema
  inicial de usuários).

Funcionalidades como upload de mídia, agendamento, calendário funcional,
publicação automática, integrações com Instagram/Facebook/YouTube/TikTok, IA
e notificações serão tratadas em marcos futuros e definidas antes de cada
implementação.
