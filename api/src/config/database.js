// pake pool karena sering transaksi dengan database

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.geolayerdb,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;