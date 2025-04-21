import pkgSqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = pkgSqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(path.join(__dirname, 'movieers.db'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      poster_path TEXT,
      vote_average REAL,
      release_date TEXT,
      overview TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Movies table is ready.');
    }
  });

});

export default db;