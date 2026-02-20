# Adotau 🐾

Uma plataforma completa de adoção de animais de estimação que conecta doadores responsáveis e adotantes amorosos. Desenvolvida com as tecnologias mais modernas para oferecer a melhor experiência possível.

## 🎯 Visão Geral

**Adotau** é uma aplicação full-stack que facilita o processo de adoção de animais de estimação. A plataforma permite que doadores cadastrem animais disponíveis para adoção e que adotantes em potencial encontrem seus novos companheiros digitalmente.

### 🌟 Funcionalidades Principais

- 🐕 **Catálogo de Animais**: Visualize cães e gatos disponíveis para adoção
- 👤 **Gerenciamento de Perfil**: Registro e edição de informações do usuário
- 📝 **Cadastro de Animais**: Doadores podem listar animais para adoção
- 🔐 **Autenticação**: Login seguro e gerenciamento de sessões

## 📋 Índice

- [Requisitos](#requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Tecnologias](#tecnologias)
- [Documentação](#documentação)
- [Contribuindo](#contribuindo)

## 📦 Requisitos

### Para Executar com Docker (Recomendado)

- **Docker** 20.10+
- **Docker Compose** 2.0+

### Para Desenvolvimento Local

**Backend:**

- Python 3.8+
- pip

**Frontend:**

- Node.js 20.x+
- npm 10.x+
- Angular CLI 20.0.5+

## 🏗️ Estrutura do Projeto

```
adotau/
├── frontend/                  # Aplicação Angular
│   ├── src/
│   │   ├── app/             # Módulos e componentes
│   │   ├── assets/          # Arquivos estáticos
│   │   ├── environments/    # Configurações de ambiente
│   │   └── styles.scss      # Estilos globais
│   ├── package.json         # Dependências Node
│   ├── angular.json         # Configuração Angular
│   ├── Dockerfile           # Container Frontend
│   └── README.md            # Documentação frontend
│
├── backend/                   # API FastAPI
│   ├── adotau_api/
│   │   ├── api/             # Rotas da API
│   │   ├── models/          # Modelos de dados
│   │   ├── schemas/         # Schemas Pydantic
│   │   ├── services/        # Lógica de negócio
│   │   ├── core/            # Configurações core
│   │   ├── db/              # Configurações DB
│   │   └── main.py          # Entrada da aplicação
│   ├── requirements.txt      # Dependências Python
│   ├── Dockerfile           # Container Backend
│   └── README.md            # Documentação backend
│
├── docker-compose.yml       # Orquestração de containers
└── README.md               # Este arquivo
```

## 🚀 Instalação e Execução

### Opção 1: Com Docker (Recomendado)

A forma mais fácil de executar o projeto é usando Docker Compose, que configura automaticamente o backend, frontend e todas as dependências.

#### Pré-requisitos

- Docker instalado
- Docker Compose instalado

#### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/joaomarcelo-souza/adotau.git
cd adotau
```

2. **Execute com Docker Compose**

```bash
docker compose up --build
```

Este comando irá:

- Construir as imagens Docker para frontend e backend
- Iniciar os containers em rede compartilhada
- Configurar automaticamente as variáveis de ambiente

3. **Acesse a aplicação**

- **Frontend**: http://localhost:4200
- **API Backend**: http://localhost:8000
- **Documentação API**: http://localhost:8000/docs

4. **Parar a aplicação**

```bash
docker compose down
```

### Opção 2: Desenvolvimento Local

#### Backend (FastAPI)

```bash
# Navegue até o diretório backend
cd backend

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
uvicorn adotau_api.main:app --reload --host 0.0.0.0 --port 8000
```

API estará disponível em `http://localhost:8000`

#### Frontend (Angular)

```bash
# Navegue até o diretório frontend
cd frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm start
```

Frontend estará disponível em `http://localhost:4200`

## 🛠️ Tecnologias

### Backend

- **FastAPI** 0.100+ - Framework web moderno e rápido
- **Python** 3.8+ - Linguagem de programação
- **Pydantic** - Validação de dados
- **SQLAlchemy** - ORM para banco de dados
- **JWT** - Autenticação segura
- **Docker** - Containerização

### Frontend

- **Angular** 20.0.0 - Framework web progressivo
- **TypeScript** - Tipagem forte para JavaScript
- **Angular Material** 20.0.4 - Componentes UI
- **RxJS** 7.8.0 - Programação reativa
- **SCSS** - Preprocessamento de CSS
- **Angular SSR** 20.0.5 - Server-side rendering
- **Docker** - Containerização

### DevOps

- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **ESLint** - Linting JavaScript/TypeScript
- **Karma & Jasmine** - Testes unitários Angular
- **Pytest** - Testes Python

## 📚 Documentação

Para documentações específicas de cada parte do projeto:

- **[Frontend Documentation](./frontend/README.md)** - Guia completo da aplicação Angular
- **[Backend Documentation](./backend/README.md)** - Documentação da API FastAPI

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 📞 Contato e Suporte

Para reportar bugs, sugestões ou dúvidas, abra uma [issue](https://github.com/joaomarcelo-souza/adotau/issues) no repositório.

---

Feito com ❤️ para a comunidade de adoção de animais.

**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026
