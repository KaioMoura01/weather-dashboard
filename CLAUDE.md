# CLAUDE.md

## Guia de Desenvolvimento

Este documento define a arquitetura obrigatória do projeto.

## Stack

-   Svelte 5 (Runes)
-   SvelteKit
-   TypeScript
-   Tailwind CSS v4+
-   shadcn-svelte
-   Lucide Icons
-   Zod
-   ESLint
-   Prettier

## Filosofia

-   Código pequeno, reutilizável e testável.
-   Componentização obrigatória.
-   Sem duplicação.
-   Arquivos .svelte com no máximo 150 linhas.

## Estrutura

``` text
src/
  components/
    assets/
    composes/
    sections/
      common/
  packages/
    package-name/
      constants/
      gateway/
      module/
      service/
      toast/
      types/
      validators/
```

Pages apenas montam Sections e consomem Modules.

Gateway: HTTP e toast. Service: regras de negócio. Module: fachada.
Toast: mensagens. Validators: Zod. Types: DTOs e interfaces.

## Fluxo da aplicação

``` text
Page → Section → Compose → Module → Service → Gateway → API
API → Gateway → Service → Module → Section → Page
```

Nenhum componente acessa Service ou Gateway diretamente.

## Tailwind

Utilizar apenas classes canônicas.

## Tipografia

Fonte Inter usando: - title-sm/md/lg/xl - paragraph-sm/md/lg/xl -
label-sm/md/lg/xl

## Princípios de Engenharia

Seguir rigorosamente SOLID e Object Calisthenics.

### SOLID

-   SRP
-   OCP
-   LSP
-   ISP
-   DIP

### Object Calisthenics

1.  Um nível de indentação.
2.  Evitar else.
3.  Encapsular primitivos.
4.  Encapsular coleções.
5.  Um ponto por linha.
6.  Nomes descritivos.
7.  Classes pequenas.
8.  Poucas variáveis de instância.
9.  Evitar getters/setters desnecessários.

### Regras adicionais

-   Preferir composição.
-   Injeção de dependências.
-   Métodos curtos.
-   Código testável.
-   Sem duplicação.

## Objetivo Final

Pages → Sections → Composes → Assets. Toda regra no Service. Toda
comunicação externa no Gateway. Module é a única interface entre UI e
domínio.
