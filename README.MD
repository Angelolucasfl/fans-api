# Fã Catalogue

## 🔥 Introdução

Esse projeto se trata de um serviço de catálogo de seguidores pra determinados artistas.

### ⚙️ Pré-requisitos

Tendo o node/npm e o git installados, siga os passos abaixo para ter acesso a API localmente ou acesse este link: [(https://drive.google.com/file/d/1kxMXaqxBrQ3-PrAinbCaslcR40_M6vqz/view?usp=sharing)] para uma demonstração em video das funcionalidades da API. 

Alternativamente, após ver as funcionalidades no video, acesse [https://fanapi.vercel.app/] usando algum client como postman ou insomnia e teste as funcionalidades da API em produção.



### 🔨 Guia de instalação

Começe clonando o repositório.

```
git clone https://github.com/Angelolucasfl/fans-api.git
```


Navegue até o diretório do projeto:

```
cd fans-api
```


Instale as dependências:

```
npm install
```


Inicie o servidor de desenvolvimento:

```
npm run dev
```


Acesse o projeto em seu navegador:

```
http://127.0.0.1:8000
```

## 🛠️ Executando os testes


```
npm run test
```

## 📦 Tecnologias usadas:

A API é escrito em typescript e usa o express para facilitar o roteamento. O knex é o query builder escolhido para interagir com o banco e persistir os dados no postgreSQL em produção, localmente é usado o sqlite para testes por sua praticidade e levesa comparado ao postgreSQL. O jest é usado no projeto para contruir a estrutura de testes de integração, e o supertest para fazer as requisições ao server de testes. Cabe acressentar o uso do yup para a validação de inputs do usuario, o bcrypt para criptografia de senhas e jsonweb token para autenticação.

* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

* ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

* ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

* ![Eslint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## 👷 Autores

* **Angelo Lucas** - *Dev BackEnd* - [@Angelolucasfl](https://github.com/Angelolucasfl)


## 📞  Contato

[@Linkedin](https://www.linkedin.com/in/angelo-lucas-7129b7268/)