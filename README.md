# todos rest api

- Get all todos: send **get** request to **_/api/v1/todos_**
- Get todo: send **get** request to **_/api/v1/todos/id_**
- Update todo: send **put** request with **_{title, status} to /api/v1/todos/id_**
- Add todo: send **post** request with title to **_/api/v1/todos_**
- Delete todo: send **delete** request to **_/api/v1/todos/id_**
- Update several todos: send **patch** request with array of todos to **_/api/v1/todos?action=update_**
- Delete several todos: send **patch** request with array of ids of todos to **_/api/v1/todos?action=delete_**

## [DEMO](https://todos-api-xi.vercel.app/)

### how to run on a your computer

1. Download code
2. Install the [Postgresql](https://www.postgresql.org/) and create database server
3. Replace the password in the .env file with the password of your database server
4. Run `npm install`
5. Run `npm run start`

#### stack

`express.js`, `postgresql`, `sequelize`
