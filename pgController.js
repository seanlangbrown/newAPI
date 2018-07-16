const pg = require('pg');

process.env.PGHOST = process.env.DATABASE_HOST || 'localhost';
process.env.PGPORT = process.env.DATABASE_PORT || '5432';
process.env.PGDATABASE = 'newsapi';

const db  = new pg.Client();

connect = async () => {
  await db.connect();
  console.log('connected to database', process.env.PGDATABASE);
}
connect();

disconnect = async () => {
  await db.connect();
  console.log('disconnected');
}

module.exports.latest = async (n) => {
  const query = await db.query('SELECT * FROM articles ORDER BY published LIMIT $1', [n])
  .then(res => {
    return res.rows;
  })
  .catch(e => {
    console.log(e.stack);
    return null;
  });

  return query;
}

