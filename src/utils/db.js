const Knex = require('knex');

const knex = Knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'bankdb',
    },
    pool: { min: 0, max: 7 },
});

module.exports = knex;
