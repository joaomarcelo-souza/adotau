# Adotau - Backend API

API backend para a plataforma Adotau, um sistema de adoção de animais de estimação que conecta doadores e adotantes.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação](#autenticação)
- [Tecnologias](#tecnologias)

## 🎯 Visão Geral

O Adotau é uma plataforma que facilita a adoção responsável de animais de estimação. Esta é a API backend que gerencia:

- **Usuários**: Cadastro, autenticação e gerenciamento de doadores e adotantes
- **Animais**: Listagem, criação e atualização de animais disponíveis para adoção
- **Avaliações**: Sistema de reviews para doadores e adotantes

## 📦 Requisitos

- Python 3.8+
- pip (gerenciador de pacotes Python)
- Docker (opcional)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/joaomarcelo-souza/adotau.git
cd backend
```

### 2. Crie um ambiente virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
POSTGRES_USER=xxx
POSTGRES_PASSWORD=xxx
POSTGRES_HOST=xxxx ou db (docker)
POSTGRES_PORT=xxxx
POSTGRES_DB=adotau
```

### Banco de Dados

A aplicação usa SQLAlchemy para ORM. Configure a conexão em [adotau_api/db/database_config.py](adotau_api/db/database_config.py).

## 📁 Estrutura do Projeto

```
adotau_api/
├── api/                    # Rotas da API
│   └── v1/                # Versão 1 da API
│       ├── animal_routes.py    # Rotas de animais
│       ├── user_routes.py      # Rotas de usuários
│       ├── review_routes.py    # Rotas de reviews
│       └── routes.py           # Agregador de rotas
├── core/                  # Configurações principais
│   └── auth.py           # Autenticação e criptografia
├── db/                    # Banco de dados
│   └── database_config.py # Configuração do banco
├── models/               # Modelos ORM do banco de dados
│   ├── animal.py        # Modelo de Animal
│   ├── user.py          # Modelo de Usuário
│   └── review.py        # Modelo de Review
├── schemas/             # Schemas de validação (Pydantic)
│   ├── animal.py       # Schema de Animal
│   ├── user.py         # Schema de Usuário
│   └── review.py       # Schema de Review
├── services/           # Lógica de negócio
│   ├── animal_service.py    # Serviço de animais
│   ├── user_service.py      # Serviço de usuários
│   └── review_service.py    # Serviço de reviews
├── main.py            # Arquivo principal da aplicação
└── __init__.py
```

## 💻 Como Usar

### Executar o servidor

```bash
uvicorn adotau_api.main:app --reload
```

A API estará disponível em `http://localhost:8000`

**Documentação interativa**: `http://localhost:8000/docs` (Swagger UI)

### Com Docker

```bash
docker build -t adotau-api .
docker run -p 8000:8000 adotau-api
```

## 🔌 Endpoints da API

### Usuários

| Método | Endpoint              | Descrição                |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/v1/users`       | Criar novo usuário       |
| GET    | `/api/v1/users`       | Listar todos os usuários |
| GET    | `/api/v1/users/{id}`  | Obter usuário por ID     |
| PUT    | `/api/v1/users/{id}`  | Atualizar usuário        |
| DELETE | `/api/v1/users/{id}`  | Deletar usuário          |
| POST   | `/api/v1/users/login` | Fazer login              |

### Animais

| Método | Endpoint               | Descrição               |
| ------ | ---------------------- | ----------------------- |
| POST   | `/api/v1/animals`      | Criar novo animal       |
| GET    | `/api/v1/animals`      | Listar todos os animais |
| GET    | `/api/v1/animals/{id}` | Obter animal por ID     |
| PUT    | `/api/v1/animals/{id}` | Atualizar animal        |
| DELETE | `/api/v1/animals/{id}` | Deletar animal          |

### Avaliações

| Método | Endpoint               | Descrição                  |
| ------ | ---------------------- | -------------------------- |
| POST   | `/api/v1/reviews`      | Criar nova avaliação       |
| GET    | `/api/v1/reviews`      | Listar todas as avaliações |
| GET    | `/api/v1/reviews/{id}` | Obter avaliação por ID     |
| PUT    | `/api/v1/reviews/{id}` | Atualizar avaliação        |
| DELETE | `/api/v1/reviews/{id}` | Deletar avaliação          |

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Veja [adotau_api/core/auth.py](adotau_api/core/auth.py) para mais detalhes.

### Fluxo de Login

1. Usuario faz login com suas credenciais
2. API retorna um `access_token`
3. Cliente inclui o token no header: `Authorization: Bearer {token}`
4. Token expira em 30 minutos (configurável)

### Exemplo de Request com Autenticação

```bash
curl -H "Authorization: Bearer seu_token_aqui" http://localhost:8000/api/v1/users
```

## 🛠️ Tecnologias

- **FastAPI**: Framework web moderno para construir APIs
- **SQLAlchemy**: ORM para banco de dados
- **Pydantic**: Validação de dados
- **JWT**: Autenticação
- **Uvicorn**: Servidor ASGI

## 📝 Exemplo de Uso

### Criar um usuário (Doador)

```bash
curl -X POST "http://localhost:8000/api/v1/users" \
  -H "Content-Type: application/json" \
  -d {
    "login": "joao_silva",
    "password": "senha123",
    "email": "joao@example.com",
    "type_user": "Doador"
  }
```

### Fazer Login

```bash
curl -X POST "http://localhost:8000/api/v1/users/login" \
  -H "Content-Type: application/json" \
  -d {
    "login": "joao_silva",
    "password": "senha123"
  }
```

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 👥 Contribuições

Contribuições são bem-vindas! Por favor, abra um Pull Request ou Issue para sugestões e melhorias.

---

**Desenvolvido com ❤️ para facilitar adoções responsáveis**
