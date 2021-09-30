const { Client } = require('pg');

const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'sdc-test',
    password: 'password',
    port: 5432,
});

client.connect();
