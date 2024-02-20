const pgp = require("pg-promise")();

require('dotenv').config();

const cn = {
    databaseURL: process.env.DATABASE_URL,
    host: process.env.PG_HOST, 
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
};

const db = pgp(cn);

module.exports = db;