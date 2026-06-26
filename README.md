# Dashboard de Clima

Projeto 1 da lista Front-End Júnior. Dashboard de clima com busca de cidade,
temperatura atual, previsão de 5 dias, dados de marés para cidades costeiras,
tema claro/escuro e histórico de buscas.

A arquitetura segue rigorosamente o [`CLAUDE.md`](./CLAUDE.md) (camadas
Page → Section → Compose → Module → Service → Gateway → API).

## Stack

Svelte 5 (Runes) · SvelteKit · TypeScript · Tailwind CSS v4 · Lucide · Zod · ESLint · Prettier

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode em desenvolvimento:

   ```bash
   npm run dev
   ```

> **Sem chave de API.** Todos os dados vêm da [Open-Meteo](https://open-meteo.com/):
> geocoding (busca de cidade), forecast (clima atual + 5 dias) e marine (marés).
> Cidades sem dados marítimos simplesmente não exibem o painel de marés.
> Ícones de clima são do Lucide, mapeados a partir do código WMO retornado pela API.

## Scripts

| Comando            | Descrição                          |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento        |
| `npm run build`    | Build de produção                  |
| `npm run preview`  | Pré-visualiza o build              |
| `npm run check`    | Verificação de tipos (svelte-check)|
| `npm run lint`     | Prettier + ESLint                  |
| `npm run format`   | Formata o código                   |

## Arquitetura

```text
src/
  routes/                     Pages (apenas montam Sections)
  components/
    composes/                 Átomos reutilizáveis (recebem props, sem domínio)
    sections/                 Consomem Modules
      common/                 Header, ThemeToggle, Toasts
  packages/
    weather/                  Domínio: clima + previsão + marés
      constants/ gateway/ module/ service/ toast/ types/ validators/
    history/                  Histórico de buscas (LocalStorage)
    theme/                    Tema claro/escuro
    notifications/            Toasts
```

Fluxo: `Page → Section → Compose → Module → Service → Gateway → API`.
Nenhum componente acessa Service ou Gateway diretamente — o **Module** é a única
interface entre UI e domínio.
