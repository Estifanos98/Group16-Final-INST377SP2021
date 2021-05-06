/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Group 16 API!');
});


/// /////////////////////////////////
/// ///////TV Movie Endpoint///////
/// /////////////////////////////////

router.get('/tv_movie', async (req, res) => {
  try {
    const tv = await db.tv_movie.findAll();
    const reply = tv.length > 0 ? { data: tv} : { message: 'no results found' };
    res.json(reply);
    res.send('Got a GET request from /api/tv_movie');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/tv_movie/:catalogue_id', async (req, res) => {
  try {
    const tvm = await db.tv_movie.findAll({
      where: {
        catalogue_id: req.params.catalogue_id
      }
    });

    res.json(tvm);
    res.send('Got a GET request from /api/tv_movie');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ///////Custom SQL Endpoint///////
/// /////////////////////////////////

const movieQuery = `SELECT DISTINCT title, 
  year, duration, avg_star_rating, genre_name 
FROM tv_movie t
  JOIN categories 
  JOIN categories c ON t.category_id = c.catalogue_id
  JOIN genre g ON c.genre_id = g.genre_id
  WHERE episodes IS NULL`;
  router.get('/custom_movies', async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(movieQuery, {
        type: sequelize.QueryTypes.SELECT
      });
      res.json(result);
      res.send('Got a GET request from /api/custom_movies');
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
  });


/// /////////////////////////////////
/// ////Categories Endpoints/////////
/// /////////////////////////////////
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.categories.findAll();
    res.json(categories);
    res.send('Got a GET request from /api/categories');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/categories/:catalogue_id', async (req, res) => {
  try {
    const categories = await db.catagories.findAll({
      where: {
        catalogue_id: req.params.catalogue_id
      }
    });

    res.json(categories);
    res.send('Got a GET request from /api/categories');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/categories', async (req, res) => {
  const categories = await db.categories.findAll();
  const catalogueId = (await categories.length) + 1;
  try {
    const newCategory = await db.categories.create({
      catalogue_id: catalogueId,
      genre_id: req.body.genre_id
    });
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/categories/:catalogue_id', async (req, res) => {
  try {
    await db.categories.destroy({
      where: {
        catalogue_id: req.params.catalogue_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/categories', async (req, res) => {
  try {
    await db.categories.update(
      {
        genre_id: req.body.genre_id
      },
      {
        where: {
          catalogue_id: req.body.catalogue_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});


/// /////////////////////////////////
/// //// Genre Endpoints/////////////
/// /////////////////////////////////

router.get('/genre', async (req, res) => {
  try {
    const genre = await db.genre.findAll();
    const reply = genre.length > 0 ? { data: genre} : { message: 'no results found' };
    res.json(reply);
    res.send('Got a GET request from /api/genre');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/genre/:genre_id', async (req, res) => {
  try {
    const genres = await db.genre.findAll({
      where: {
        rating_id: req.params.genre_id
      }
    });
    res.json(genres);
    res.send('Got a GET request from /api/genre');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/genre', async (req, res) => {
  const genres = await db.genre.findAll();
  const genreId = (await genres.length) + 1;
  try {
    const newGenre = await db.genre.create({
      genre_id: genreId,
      genre_name: req.body.genre_name
    });
    res.json(newGenre);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/genre/:genre_id', async (req, res) => {
  try {
    await db.genre.destroy({
      where: {
        genre_id: req.params.genre_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/genre', async (req, res) => {
  try {
    await db.genre.update(
      {
        genre_name: req.body.genre_name
      },
      {
        where: {
          genre_id: req.body.genre_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;
