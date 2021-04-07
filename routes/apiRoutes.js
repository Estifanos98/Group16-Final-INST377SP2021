/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the UMD Dining API!');
});

/// /////////////////////////////////
/// ////Dining Hall Endpoints////////
/// /////////////////////////////////
router.get('/dining', async (req, res) => {
  try {
    const halls = await db.DiningHall.findAll();
    const reply = halls.length > 0 ? { data: halls } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/dining/:hall_id', async (req, res) => {
  try {
    const hall = await db.DiningHall.findAll({
      where: {
        hall_id: req.params.hall_id
      }
    });

    res.json(hall);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/dining', async (req, res) => {
  const halls = await db.DiningHall.findAll();
  const currentId = (await halls.length) + 1;
  try {
    const newDining = await db.DiningHall.create({
      hall_id: currentId,
      hall_name: req.body.hall_name,
      hall_address: req.body.hall_address,
      hall_lat: req.body.hall_lat,
      hall_long: req.body.hall_long
    });
    res.json(newDining);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/dining/:hall_id', async (req, res) => {
  try {
    await db.DiningHall.destroy({
      where: {
        hall_id: req.params.hall_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/dining', async (req, res) => {
  try {
    await db.DiningHall.update(
      {
        hall_name: req.body.hall_name,
        hall_location: req.body.hall_location
      },
      {
        where: {
          hall_id: req.body.hall_id
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
/// ////////Meals Endpoints//////////
/// /////////////////////////////////
router.get('/meals', async (req, res) => {
  try {
    const meals = await db.Meals.findAll();
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/meals/:meal_id', async (req, res) => {
  try {
    const meals = await db.Meals.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/meals', async (req, res) => {
  try {
    await db.Meals.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Meal Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Macros Endpoints/////////
/// /////////////////////////////////
router.get('/macros', async (req, res) => {
  try {
    const macros = await db.Macros.findAll();
    res.send(macros);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/macros/:meal_id', async (req, res) => {
  try {
    const meals = await db.Macros.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/macros', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Macros.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category,
        calories: req.body.calories,
        serving_size: req.body.serving_size,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        carbs: req.body.carbs,
        protein: req.body.protein,
        fat: req.body.fat
      },
      {
        where: {
          meal_id: req.body.meal_id
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
/// Dietary Restrictions Endpoints///
/// /////////////////////////////////
router.get('/restrictions', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll();
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restrictions/:restriction_id', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll({
      where: {
        restriction_id: req.params.restriction_id
      }
    });
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// //////////////////////////////////
/// ///////Custom SQL Endpoint////////
/// /////////////////////////////////
const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
router.get('/table/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(macrosCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

const mealMapCustom = `SELECT hall_name,
  hall_address,
  hall_lat,
  hall_long,
  meal_name
FROM
  Meals m
INNER JOIN Meals_Locations ml 
  ON m.meal_id = ml.meal_id
INNER JOIN Dining_Hall d
ON d.hall_id = ml.hall_id;`;
router.get('/map/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(mealMapCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/custom', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(req.body.query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////Approved Audience Endpoints//
/// /////////////////////////////////
router.get('/approved_audience', async (req, res) => {
  try {
    const audience = await db.approved_audience.findAll();
    const reply = audience.length > 0 ? { data: audience } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/approved_audience/:rating_id', async (req, res) => {
  try {
    const rating = await db.approved_audience.findAll({
      where: {
        rating_id: req.params.rating_id
      }
    });

    res.json(rating);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/approved_audience', async (req, res) => {
  const audience = await db.approved_audience.findAll();
  const ratingId = (await audience.length) + 1;
  try {
    const newAudience = await db.approved_audience.create({
      rating_id: ratingId,
      rating_description: req.body.rating_description
    });
    res.json(newAudience);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/approved_audience/:rating_id', async (req, res) => {
  try {
    await db.approved_audience.destroy({
      where: {
        rating_id: req.params.rating_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/approved_audience', async (req, res) => {
  try {
    await db.approved_audience.update(
      {
        rating_description: req.body.rating_description
      },
      {
        where: {
          rating_id: req.body.rating_id
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
/// //// Customer Endpoints//
/// /////////////////////////////////

router.get('/customer', async (req, res) => {
  try {
    const customer = await db.approved_audience.findAll();
    const reply = customer.length > 0 ? { data: customer} : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/customer/:customer_id', async (req, res) => {
  try {
    const customers = await db.customer.findAll({
      where: {
        rating_id: req.params.customer_id
      }
    });

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/customer', async (req, res) => {
  const customers = await db.customer.findAll();
  const customerId = (await customers.length) + 1;
  try {
    const newCustomer = await db.customer.create({
      customer_id: customerId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      customer_address: req.body.customer_address,
      customer_city: req.body.customer_city,
      customer_state: req.body.customer_state,
      customer_zip: req.body.customer_zip,
      customer_age: req.body.customer_age,
      credit_card_num: req.body.credit_card_num,
      customer_email: req.body.customer_email
    });
    res.json(newCustomer);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/customer/:customer_id', async (req, res) => {
  try {
    await db.customer.destroy({
      where: {
        customer_id: req.params.customer_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/customer', async (req, res) => {
  try {
    await db.customer.update(
      {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      customer_address: req.body.customer_address,
      customer_city: req.body.customer_city,
      customer_state: req.body.customer_state,
      customer_zip: req.body.customer_zip,
      customer_age: req.body.customer_age,
      credit_card_num: req.body.credit_card_num,
      customer_email: req.body.customer_email
      },
      {
        where: {
          customer_id: req.body.customer_id
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
/// //// Genre Endpoints//
/// /////////////////////////////////

router.get('/genre', async (req, res) => {
  try {
    const genre = await db.genre.findAll();
    const reply = genre.length > 0 ? { data: genre} : { message: 'no results found' };
    res.json(reply);
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
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.post('/genre', async (req, res) => {
  const genres_ = await db.genre.findAll();
  const genreId = (await genres_.length) + 1;
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
