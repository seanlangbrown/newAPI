const pg = require('pg');

process.env.PGHOST = process.env.DATABASE_HOST || 'localhost';
process.env.PGPORT = process.env.DATABASE_PORT || '5432';
process.env.PGDATABASE = 'newsapi';

const db  = new pg.Client();

connect = async () => {
  await db.connect((err) => {
    if (err) {
      console.log('db connection error:', err);
    }
  });
  console.log('connected to database', process.env.PGDATABASE);
}
connect();

module.exports.latest = async (n) => {
  const query = await db.query('SELECT * FROM articles ORDER BY published DESC LIMIT $1', [n])
  .then(res => {
    db.end();
    return res.rows.map((article) => {
      return {
        id: article.article_id,
        title: article.title,
        publication: article.publication,
        author: article.author,
        date: article.published.getDate(),
        month: article.published.getMonth(),
        year: article.published.getUTCFullYear()
      }
    });
  })
  .catch(e => {
    console.log(e.stack);
    return null;
  });

  return query;
}

