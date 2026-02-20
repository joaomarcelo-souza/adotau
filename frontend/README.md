# Adotau - Frontend

❤️ Interface moderna para a plataforma Adotau - um sistema de adoção de animais de estimação que conecta doadores e adotantes.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias](#tecnologias)

## 🎯 Visão Geral

O Adotau Frontend é uma aplicação Angular moderna que funciona como interface para a plataforma de adoção de animais. Oferece uma experiência intuitiva e responsiva para:

- **Visualização de Animais**: Browsing de cães e gatos disponíveis para adoção
- **Gerenciamento de Conta**: Registro, login e perfil do usuário
- **Registro de Animais**: Doadores podem cadastrar animais para adoção
- **Sistema de Avaliações**: Reviews sobre doadores e adotantes
- **Perfil de Usuário**: Visualização e edição de dados do usuário

## 📦 Requisitos

- **Node.js** 20.x ou superior
- **npm** 10.x ou superior
- **Angular CLI** 20.0.5

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/joaomarcelo-souza/adotau.git
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

## ▶️ Como Executar

### Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local:

```bash
npm start
```

ou

```bash
ng serve
```

O aplicativo estará disponível em `http://localhost:4200/`. A página recarregará automaticamente quando você modificar qualquer arquivo fonte.

### Build para Produção

Para criar um build otimizado para produção:

```bash
npm run build
```

Os artefatos serão armazenados no diretório `dist/`.

### Com SSR (Server-Side Rendering)

Para servir a aplicação com SSR:

```bash
npm run serve:ssr:adotau
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── animals/                    # Módulo de Animais
│   │   ├── animal-cards/          # Componentes de exibição de animais
│   │   ├── animal-form/           # Formulário para cadastro de animais
│   │   ├── animal-lists/          # Listas de animais (cães, gatos, destaques)
│   │   ├── models/                # Modelo de dados Animal
│   │   └── services/              # Serviços de animals (API, mock)
│   ├── components/                 # Componentes compartilhados
│   │   ├── breadcrumb/            # Navegação breadcrumb
│   │   ├── contact-dialog/        # Dialog de contato
│   │   ├── footer/                # Rodapé
│   │   ├── navbar/                # Barra de navegação
│   │   └── search/                # Componente de busca
│   ├── models/                     # Modelos de dados compartilhados
│   ├── pages/                      # Páginas da aplicação
│   │   ├── animal-profile/        # Perfil detalhado do animal
│   │   ├── animals/               # Página de listagem de animais
│   │   ├── home/                  # Página inicial
│   │   ├── login/                 # Página de login
│   │   ├── register/              # Página de registro
│   │   ├── register-animals/      # Página de registro de animais
│   │   └── user-profile/          # Perfil do usuário
│   ├── services/                   # Serviços globais
│   │   ├── auth/                  # Autenticação
│   │   └── feedback/              # Sistema de feedback
│   └── users/                      # Módulo de Usuários
│       ├── login-form/            # Formulário de login
│       ├── user-form/             # Formulário de usuário
│       └── service/               # Serviços de usuário
├── assets/                         # Arquivos estáticos
├── environments/                   # Configurações de ambiente
└── styles.scss                     # Estilos globais
```

## ✨ Funcionalidades Principais

### Para Adotantes

- 🐕 Visualizar cães disponíveis
- 🐈 Visualizar gatos disponíveis
- 💬 Enviar mensagens para doadores
- ⭐ Avaliar doadores
- 👤 Gerenciar perfil

### Para Doadores

- 📝 Cadastrar animais para adoção
- 📋 Gerenciar listagem de animais
- 💬 Receber mensagens de interessados
- ⭐ Avaliar adotantes
- 👤 Gerenciar perfil

## 🛠️ Tecnologias

- **Angular** 20.0.0 - Framework de aplicação
- **Angular Material** 20.0.4 - Componentes UI
- **Angular CDK** 20.0.4 - Utilities
- **TypeScript** - Linguagem de programação
- **RxJS** 7.8.0 - Programação reativa
- **Angular SSR** 20.0.5 - Server-side rendering
- **ESLint** - Linting
- **Karma & Jasmine** - Testes unitários
- **SCSS** - Preprocessamento de CSS

## 🧪 Desenvolvimento

## 🔗 Integração com Backend

O Frontend se comunica com a API Backend através de serviços compartilhados. Configure a URL da API no arquivo:

```
src/environments/environments.ts
```

Desenvolvido com ❤️ para a comunidade de adoção de animais.
