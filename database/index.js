const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    database: 'sdc_test',
    user: 'postgres',
    password: 'newPassword',
    port: 5432
});

db.connect()
.then(() => console.log(`Connected to database successfully `))
.catch((err) => console.log(`Error connecting to db: ${err}`));

module.exports = db;