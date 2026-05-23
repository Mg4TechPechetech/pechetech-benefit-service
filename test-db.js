const { Client } = require('pg');

const client = new Client({
  user: 'mg4',
  host: 'localhost',
  database: 'pechetech',
  password: 'ameth200',
  port: 5432,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    const res = await client.query('SELECT 1 as val');
    console.log('Query result:', res.rows[0]);
  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    await client.end();
  }
}
run();
