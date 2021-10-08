const { Pool } = require('pg');

const db = new Pool({
    host: 'ec2-3-19-229-80.us-east-2.compute.amazonaws.com',
    database: 'SDC_ec2',
    user: 'ubuntu',
    password: 'password',
    port: 5432
});

db.connect()
.then(() => console.log(`Connected to database successfully `))
.catch((err) => console.log(`Error connecting to db: ${err}`));

module.exports = db;