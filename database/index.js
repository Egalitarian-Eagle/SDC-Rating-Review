const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'ratingsreviewstest2',
    user: 'postgres',
    password: 'password',
    port: 5432
});

connect()
.then(() => console.log(`Connected to database `))
.catch((err) => console.log(`Error connecting to db: ${err}`));

module.exports = pool;