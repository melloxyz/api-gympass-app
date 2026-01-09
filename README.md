# API GymPass App (em desenvolvimento)

Back-end em Node.js para uma API de check-ins em academias, inspirado no modelo GymPass. Este projeto faz parte dos meus estudos em desenvolvimento de APIs modernas, aplicando princípios SOLID, testes automatizados e boas práticas de arquitetura.

## Estado Atual do Projeto

O projeto está em desenvolvimento ativo e já implementa funcionalidades essenciais de autenticação, check-ins e gerenciamento de academias. Está sendo construído de forma incremental, seguindo uma formação em Node.js que cobre desde conceitos básicos até deploy.

### Funcionalidades Implementadas

#### Autenticação e Usuários

- Cadastro de usuários com validação de e-mail único
- Autenticação via JWT
- Perfil do usuário logado (com senha oculta)

#### Check-ins

- Realização de check-in em academias (com validação de distância e limite diário)
- Validação de check-ins (até 20 minutos após criação)
- Histórico de check-ins do usuário (paginação)
- Métricas de check-ins (contagem total)

#### Academias

- Cadastro de academias (com coordenadas)
- Busca de academias por nome (paginação)
- Busca de academias próximas (até 10km)

### Regras de Negócio Aplicadas

- Usuário não pode se cadastrar com e-mail duplicado
- Limite de 1 check-in por dia por usuário
- Check-in só permitido se próximo à academia (100m)
- Validação de check-ins limitada a 20 minutos
- Listas paginadas com 20 itens por página

## O que Estou Aprendendo

Este projeto é uma oportunidade prática para aprofundar conhecimentos em:

- **Fastify e TypeScript**: Criação de APIs performáticas e tipadas.
- **Princípios SOLID**: Aplicação de responsabilidade única, inversão de dependência, etc., na arquitetura.
- **Padrões de Projeto**: Repository Pattern, Factory Pattern, Clean Architecture.
- **Prisma + PostgreSQL**: ORM para persistência de dados, migrações e queries otimizadas.
- **Segurança**: Criptografia de senhas com bcrypt e autenticação JWT.
- **Testes**: Testes unitários e de integração com Vitest, incluindo mocks e ambientes de teste isolados.
- **Docker**: Configuração de banco de dados PostgreSQL via Docker Compose.
- **Ferramentas de Desenvolvimento**: ESLint, Vite, TSX, e configurações de build com TSUP.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Fastify** para o servidor HTTP
- **Prisma** como ORM para PostgreSQL
- **Vitest** para testes (unitários e e2e)
- **bcryptjs** para hash de senhas
- **dayjs** para manipulação de datas
- **Zod** para validação de dados
- **Docker Compose** para banco de dados local

## Como Executar

### Pré-requisitos

- Node.js (versão 18+)
- Docker e Docker Compose

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/melloxyz/api-gympass-app.git
   cd api-gympass-app
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Configure o banco de dados:

   ```bash
   docker-compose up -d
   ```
4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3333`.

### Testes

- Testes unitários: `npm run test`
- Testes e2e: `npm run test:e2e`
- Cobertura: `npm run test:coverage`

## Estrutura do Projeto

- `src/`: Código fonte
  - `app.ts`: Configuração do Fastify
  - `server.ts`: Ponto de entrada
  - `services/`: Casos de uso (lógica de negócio)
  - `repositories/`: Interfaces e implementações de repositórios
  - `http/controllers/`: Controladores HTTP
  - `utils/`: Utilitários (ex: cálculo de distância)
- `prisma/`: Schema e migrações do banco
- `docs/`: Documentação (regras de negócio)

## Formação que Estou Seguindo

Este projeto acompanha a "Formação Node.js do zero ao deploy", que inclui:

- Conceitos fundamentais de Node.js
- APIs RESTful com Fastify
- Testes automatizados (unitários, integração, e2e)
- Padrões SOLID e DDD
- Deploy e boas práticas de produção

> Projeto em andamento — novas funcionalidades e refinamentos serão adicionados conforme avanço nos estudos.
