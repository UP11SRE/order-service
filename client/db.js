const { Pool } = require('pg');
require('dotenv').config();


const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = pool;
