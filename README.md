<h4 align="center">
 <h1 align="center">Finovia API 🤗</h1>
</h4>
<p align="center">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/ggonpereira/finovia-api" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/ggonpereira/finovia-api" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/ggonpereira/finovia-api" />
  <img alt="Github Star" src="https://img.shields.io/github/stars/ggonpereira/finovia-api?style=social" />
</p>

---

<h2>About 📝</h2>

<p align="center">The backend for the Finovia project, a solution for you to control your expenses easily. Created using NestJS, PrismaDB, TypeScript, PostgreSQL and Class Validator/Transformer! 👊🏼</p>

---

<h2>Technologies 🚀</h2>

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [PrismaDB](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Class Validator](https://github.com/typestack/class-validator)
- [Class Transformer](https://github.com/typestack/class-transformer)

---

<h2>Installation 👨‍💻</h2>

### Before you can start, you have to install these tools on your machine

- <b>[Git](https://git-scm.com)</b>
- <b>[NodeJS](https://nodejs.org/)</b>
- <b>[PostgreSQL](https://www.postgresql.org/)</b>
  or
- <b>[Docker](https://www.docker.com/)</b> (recommended)

### Setting up the database

#### Using Docker

```
- Open your terminal and type:
$ docker run --name <NAME_OF_THE_INSTANCE_OF_POSTGRESQL> -e POSTGRES_USER=<NAME_OF_YOUR_USER> -e POSTGRES_PASSWORD=<YOUR_PASSWORD> -p 5432:5432 -d postgres

- Example:
$ docker run --name postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

- Then:
$ docker start <NAME_OF_YOUR_DB>

- Access the bash of your database:
$ docker exec -it <NAME_OF_YOUR_DB> bash

- Access the Postgres user configuration
$ psql -U <NAME_OF_YOUR_USER

- Create your database
$ CREATE DATABASE <NAME_OF_YOUR_DB>;

- Now you are good to go. Just remember to always start Docker before
running the API
```

#### Using PostgreSQL desktop

https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database

### Running the project

```txt
- Clone the repository:
$ git clone https://github.com/ggonpereira/finovia-api.git

- Then access the directory:
$ cd finovia-api

- Now type

$ yarn install

- Copy .env.example to .env and add values there

- Should run a Postgres instance and add the URL to .env

- Example, for a DB Name 'Finovia', user 'root' and password 'root':
DATABASE_URL="postgresql://root:root@localhost:5432/finovia?schema=public"

- And finally:

$ yarn start:dev

(if you don't have Yarn installed, please install here "https://yarnpkg.com/")

- And finally, make your API calls to http://localhost:3000
```

### Insomnia endpoints colection

You can access the Insomnia endpoints collection [here](https://github.com/ggonpereira/finovia-api/blob/main/insomnia_finovia_collection.json). Just import this .json in your Insomnia and you will be good!

---

> This project was developed with the ❤️ by **[@Gabriel G. Pereira](https://www.linkedin.com/in/gabriel-gonçalves-pereira/)**
> If it was helpful for you or I could inspire you to create your own project, give me a ⭐! 😉
