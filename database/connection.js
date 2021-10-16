const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'api_colaborador'
  }
})
module.exports = knex