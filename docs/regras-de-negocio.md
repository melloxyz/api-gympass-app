# API Node.js SOLID - GymPass Style App

Uma aplicação completa de academia estilo GymPass desenvolvida com Node.js seguindo os princípios SOLID.

---

## Requisitos Funcionais

### Autenticação e Usuário

- [ ] **RF01** - Deve ser possível se cadastrar
- [ ] **RF02** - Deve ser possível se autenticar
- [ ] **RF03** - Deve ser possível obter o perfil de um usuário logado

### Check-ins

- [ ] **RF04** - Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] **RF05** - Deve ser possível o usuário obter o seu histórico de check-ins
- [ ] **RF06** - Deve ser possível o usuário realizar check-in em uma academia
- [ ] **RF07** - Deve ser possível validar o check-in de um usuário

### Academias

- [ ] **RF08** - Deve ser possível o usuário buscar academias próximas (até 10km)
- [ ] **RF09** - Debe ser possível o usuário buscar academias pelo nome
- [ ] **RF10** - Deve ser possível cadastrar uma academia

---

## Regras de Negócio

### Usuários

- [ ] **RN01** - O usuário não deve poder se cadastrar com um e-mail duplicado

### Check-ins

- [ ] **RN02** - O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] **RN03** - O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] **RN04** - O check-in só pode ser validado até 20 minutos após ser criado
- [ ] **RN05** - O check-in só pode ser validado por administradores

### Academias

- [ ] **RN06** - A academia só pode ser cadastrada por administradores

---

## Requisitos Não-Funcionais

### Segurança

- [ ] **RNF01** - A senha do usuário precisa estar criptografada
- [ ] **RNF02** - O usuário deve ser identificado por um JWT (JSON Web Token)

### Banco de Dados

- [ ] **RNF03** - Os dados da aplicação precisam estar persistidos em um banco PostgreSQL

### Performance e Usabilidade

- [ ] **RNF04** - Todas listas de dados precisam estar paginadas com 20 itens por página

---

## Notas de Implementação

- Aplicar princípios SOLID na arquitetura
- Utilizar TypeScript para tipagem estática
- Implementar testes unitários e de integração
- Seguir padrões de Clean Architecture
