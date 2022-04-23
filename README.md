<h1 align="center">
  Minha Vacina Backend
</h1>

<p align="center">
  <a href="#memo-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#scroll-scripts-disponíveis">Scripts disponíveis</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#earth_americas-rotas-da-api">Rotas da API</a>
</p>


## :memo: Requisitos

| Ferramenta| Versão  | Descrição                                    |
|-----------|---------|----------------------------------------------|
| [NodeJS](https://nodejs.org/en/)              | 16.14.0 | Ambiente de execução Javascript server-side  |
| [Yarn](https://yarnpkg.com/)                 | 1.22.17 | Gerenciador de pacotes                   |
| [Docker](https://www.docker.com/)           | 20.10.13 | |
| [Docker Compose](https://www.docker.com/)           | 1.29.2 | |
| [Git](https://git-scm.com/)           | | |


## :rocket: Tecnologias

Este projeto está sendo desenvolvido com as seguintes tecnologias:

-  Linguagem: [Typescript](https://www.typescriptlang.org/);
-  Framework: [Express](https://expressjs.com/);
-  ORM: [Prisma](https://www.prisma.io/);
-  Padronização: [EditorConfig](https://editorconfig.org/) + [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/);
-  Git Hook: [Husky](https://typicode.github.io/husky/#/) + [Lint-Staged](https://github.com/okonet/lint-staged) + [Commit lint](https://commitlint.js.org/#/);
-  Testes: [Jest](https://jestjs.io/) + [Supertest](https://github.com/visionmedia/supertest);
-  Documentação: [Swagger](https://swagger.io/);

## :information_source: Como usar

É necessário criar o ```.env``` seguindo o padrão das variáveis de ambiente do ```.env.example```

```bash
# Clonar este repositório
$ git clone https://github.com/Guilherme-Farias/vaccine-scheduler-backend
# Ir para o repositório
$ cd vaccine-scheduler-backend
# Instanciar imagens docker
$ docker-compose up -d
# Rodar as migrações
$ yarn prisma migrate dev
# Instalar as dependências
$ yarn install
# Rodar a aplicação em ambiente de desenvolvimento
$ yarn dev
```
## :scroll: Scripts disponíveis


- `build`: Build da aplicação utilizando Babel;
- `dev`: Inicia a aplicação em ambiente de desenvolvimento;
- `lint`:  Escaneia a aplicação verificando e consertando possíveis erros;
- `prepare`: Inicializa o Husky;
- `test`: Script básico de teste;
- `test:unit`: Script que roda apenas os testes unitários;
- `test:integration`: Script que roda apenas os testes de integração;
- `test:staged`: Script que roda apenas os testes relacionados ao que está no staged;
- `test:ci`: Script que roda todos os testes, gerando coverage report;

## :earth_americas: Rotas da API
- GET `/api-docs`: Rota para documentação da API;
- GET `/appointments`: API para listar agendamentos;
- GET `/appointments/:id`: API para buscar um agendamento por id;
- POST `/appointments`: API para criar um agendamento;
- PUT `/appointments/:id`: API para atualizar um agendamento;
- PATCH `/appointments/:id/vaccine`: API para vacinar/remover vacinação do usuário de um agendamento;

