# SocialFlow

Aplicação React, TypeScript, Vite e Tailwind CSS. O marco atual oferece cadastro, login, recuperação de senha, sessão persistente e um dashboard protegido usando Supabase Auth e uma tabela de perfis. A página inicial continua pública.

## Execução local

```bash
npm install
```

Copie `.env.example` para `.env` e preencha os valores públicos do projeto no painel Supabase (Connect ou Settings > API Keys):

```dotenv
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Uma chave `anon` legada pode ser fornecida em `VITE_SUPABASE_ANON_KEY` no lugar da publishable key. Variáveis `VITE_` ficam visíveis no navegador: nunca use `service_role`, `sb_secret_` ou senha do banco nelas. O `.env` é ignorado pelo Git.

```bash
npm run dev
npm run build
npm run lint
```

Se as variáveis estiverem ausentes, a interface mostra uma mensagem de configuração pendente. O Vite precisa ser reiniciado após alterar `.env`.

## Configuração do Supabase

1. Revise e execute `supabase/migrations/20260928000000_create_profiles.sql` no SQL Editor do projeto (ou aplique a migration pelo Supabase CLI). **Não execute a mesma migration duas vezes.** Ela cria a tabela `profiles`, políticas RLS e gatilhos para criar o perfil após o cadastro e atualizar `updated_at`. Ela não preenche usuários que já existiam antes da execução.
2. Em Authentication > Providers > Email, habilite cadastro por email. A confirmação de email pode ficar ativada; nesse caso, o cadastro aguarda confirmação antes do primeiro login.
3. Em Authentication > URL Configuration, defina a Site URL para a URL pública do Netlify. Inclua em Redirect URLs os destinos de recuperação `https://SEU-SITE.netlify.app/reset-password` e, para desenvolvimento, `http://localhost:5173/reset-password`. Se usar domínio próprio, adicione também a URL correspondente. Adicione a origem local usada para confirmação de cadastro quando necessário.
4. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` nas variáveis de ambiente do site no Netlify e publique uma nova versão. São valores públicos do cliente, mas mantenha qualquer chave administrativa fora do site.

O arquivo `public/_redirects` é copiado para `dist/` e faz URLs como `/login`, `/reset-password` e `/dashboard` carregarem a aplicação ao abrir diretamente ou atualizar a página no Netlify. O dashboard consulta somente o perfil do usuário autenticado; a proteção efetiva dos dados é feita pelo RLS no banco.

## Rotas

- `/`: apresentação pública.
- `/login`, `/signup`, `/forgot-password`: autenticação.
- `/reset-password`: definição de nova senha após o link por email.
- `/dashboard`: área protegida com email, nome do perfil e logout.

Integrações com redes sociais, conteúdo, agendamento, calendário, publicação, analytics e IA ainda não estão implementados.
