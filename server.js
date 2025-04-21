import pkgExpress from 'express';
import pkgCors from 'cors';
import pkgBodyParser from 'body-parser';
import db from './database.js';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.REACT_APP_API_BACKEND); 


const express = pkgExpress;
const cors = pkgCors;
const { json } = pkgBodyParser;


const app = express();
app.use(cors());
app.use(json());

app.get('/api/movies', (req, res) => {
  db.all('SELECT * FROM movies', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post('/api/movies', (req, res) => {
  const { title, poster_path, vote_average, release_date, overview } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  db.get("SELECT * FROM movies WHERE title = ?", [title], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row) {
      return res.status(409).json({ error: 'Movie already exists' });
    }

    db.run(
      'INSERT INTO movies (title, poster_path, vote_average, release_date, overview) VALUES (?, ?, ?, ?, ?)',
      [title, poster_path, vote_average, release_date, overview],
      function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send({
            id: this.lastID,
            title,
            poster_path,
            vote_average,
            release_date,
            overview,
          });
        }
      }
    );
  });
});

app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM movies WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ message: 'Movie deleted successfully' });
    }
  });
});

app.delete('/api/movies', (req, res) => {
  db.run('DELETE FROM movies', function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ message: 'All movies deleted successfully' });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});