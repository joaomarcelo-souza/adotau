# Relatório de Atividades Desenvolvidas

**Projeto: Adotau!**  
**Dupla: João Souza e Davi de Carvalho**  
**Período: 02 de julho a 02 de outubro de 2025**

---

## Julho 2025

### 02/07

- **João Souza**
  - Template inicial do projeto Angular
  - Componente Navbar com Angular Material
  - Rotas para Home/About
  - Logo e ícone do site

### 03/07

- **João Souza**
  - Substituição de Home/About por página Animais
  - Página de Cadastro (Register)
- **Davi de Carvalho**
  - Componente de Login
  - Rota para página de Login

### 04/07

- **João Souza**
  - Serviços para animais (AnimalService, AbstractAnimalService)
  - Componente Animal Card
  - Lista de animais com grid responsivo

### 08/07

- **João Souza**
  - Componente Animal Profile (acesso por ID)
  - Função `getAnimalById`
  - Otimização com `trackById`

### 17/07

- **Davi de Carvalho**
  - Serviços para usuários (UserService, AbstractUserService)
  - Página User Profile
- **João Souza**
  - Refatoração do Animal Card com Material
  - Menu de opções por card

### 18/07

- **João Souza**: Ajustes visuais gerais

### 22/07

- **Davi de Carvalho**
  - Campos adicionais no User Profile (idade, contatos)
- **João Souza**
  - Campos no modelo de usuário (password, isActive)

### 23/07

- **João Souza**
  - Sistema de autenticação (AuthService + LocalStorage)
  - AuthenticatorGuard para rotas protegidas
  - Componente Animal Form
- **Davi de Carvalho**
  - Carregamento dinâmico de Animal Profile

### 24/07

- **João Souza**
  - Componente AnimalUserCard
  - Logo como link para home
- **Davi de Carvalho**: Correções de textos

### 25/07

- **João Souza**
  - Filtro de espécies na Navbar (Cães/Gatos)
  - Rotas específicas para cães/gatos
  - Fonte "Baloo 2" adicionada

### 28/07

- **Davi de Carvalho**: Reestruturação do User Profile

### 31/07

- **Davi de Carvalho**
  - Implementação da Search Bar
  - Lógica de filtragem e sugestões
- **João Souza**
  - Desenvolvimento do backend (modelos/schemas)
  - Correção de URL do banco

---

## Agosto 2025

### 01/08

- **João Souza**
  - Serviços de API (Animal/User)
  - Configuração do banco de dados

### 03/08

- **Davi de Carvalho**
  - CRUD completo para registro de usuários
  - Validação de formulário

### 04/08

- **João Souza**
  - Componente Breadcrumb
  - Integração com rotas
- **Davi de Carvalho**: Search Bar em páginas específicas

### 05/08

- **Davi de Carvalho**
  - Correção de rotas (cães/gatos)
  - Navegação para Animal Profile via Search

### 07/08

- **João Souza**
  - Ajustes visuais gerais
  - Criação das rotas dos CRUDS de animais e de usuários da api
- **Davi de Carvalho**
  - Ajustes de UI (cores, logo, espaçamentos)
  - Edição de perfil de usuário

### 09/08

- **João Souza**
  - Sistema de autenticação completo no backend
  - Tokens JWT e OAuth2
  - Rotas protegidas e middlewares
  - Atualização de modelos User e Animal

### 22/08

- **João Souza**
  - Criação do componente Home
  - Adição da Home nas rotas e navbar

### 25/08

- **João Souza**
  - Desenvolvimento do header da Home

### 28/08

- **João Souza**
  - Seção de animais em destaque na Home
  - Seção de como funciona (steps) na Home
  - Uso de Material Icons

### 29/08

- **João Souza**
  - Componente de avaliações (reviews) na Home
  - Componente de footer
  - Diálogo de contato no Animal Profile

---

## Setembro 2025

### 02/09

- **João Souza**
  - Diálogo de adoção no Animal Profile
  - Atualização de modelos (User, Animal) para incluir campo login e ajustes de nomes (isDonor, photoUrl)

### 03/09

- **João Souza**
  - Atualização de modelos (User, Animal) para melhor integração
  - Campo login adicionado para autenticação
  - Restrição de tipo de usuário para "Doador" ou "Adotante"

### 05/09

- **João Souza**
  - Integração completa do frontend com o backend
  - Ajustes de environment e middlewares
  - Login com backend

### 10/09

- **João Souza**
  - Uso de HttpClient para comunicação com backend

### 11/09

- **João Souza**
  - Criação do componente Footer (estrutura e estilos iniciais)

### 16/09

- **João Souza**
  - Finalização do componente Footer

---

## Outubro 2025

### 02/10

- **João Souza**
  - Migração para PostgreSQL
  - Uso de dotenv e psycopg para conexão com banco
  - Renomeação de tabelas e configurações
  - Reestruturação de pastas e rotas no backend

---

## Resumo de Contribuições

| Área              | João Souza                                                            | Davi de Carvalho                        |
| ----------------- | --------------------------------------------------------------------- | --------------------------------------- |
| **Backend**       | Serviços API, Banco, Autenticação, Migração para PostgreSQL, Modelos  |                                         |
| **Frontend**      | Componentes (Home, Footer, Reviews, Diálogos), Integração com backend | Componentes (Search Bar, User Profile)  |
| **UI Components** | Animal Card/Form, Breadcrumb, Home, Footer, Reviews                   | Search Bar, User Profile, CRUD Usuários |
| **Navegação**     | Rotas protegidas, Filtros, Home, Breadcrumb                           | Links dinâmicos                         |
| **UX/UI**         | Layouts responsivos, Material Design, Home, Footer                    | Ajustes visuais, Formulários            |
| **Autenticação**  | Sistema de autenticação no frontend e backend                         |                                         |

**Atualizado em: 02/10/2025**
