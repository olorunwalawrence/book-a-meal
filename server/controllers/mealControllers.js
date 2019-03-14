/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable require-jsdoc */

import models from '../models';
import catererRoleValidator from "../middlewares/role";

const { Meal } = models;

/**
 * @exports
 * @class MealController
 */
export default class MealControllers {
  /**

   * @method createMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to today or given date
   */
  static createMeal(req, res, next) {
    const { name, description, imageurl } = req.body;
    const { role } = req.decoded;
    let { price } = req.body;
    price = Number(price);

    catererRoleValidator.isCaterer(role, res);

    Meal.findOne({ where: { name } })
      .then((meal) => {
        if (meal) {
          return res.status(409).send({
            message: 'Meal already exist',
          });
        }
        Meal.create({
          name,
          description,
          price,
          imageurl,
        })
          .then((newMeal) => {
            // function to check if the this user is a caterer or not
            catererRoleValidator.isCaterer(role, res);
            res.status(201).json({

              message: 'Successfully added a new meal',
              meal: newMeal,
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }


  static getAllmeal(req, res) {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);
    Meal.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    })
      .then((meals) => {
        const { role } = req.decoded;
        // function to check if the this user is a caterer or not
        catererRoleValidator.isCaterer(role, res);


        if (meals.count === 0) {
          return res.status(404).send({
            message: 'No meals found',
            meals: meals.rows,
          });
        }
        const pages = Math.ceil(meals.count / limit);
        return res.status(200).send({
          message: 'Meals successfully retrieved',
          meals,
          pages,
          count: meals.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  static mealUpdate(req, res, next) {
    const id = Number(req.params.id);
    delete req.body.id;
    const body = req.body;

    Meal.findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(422).send({
            message: 'Meal does not exist',
          });
        }
        meal.update(body)
          .then((updatedMeal) => {
            const { role } = req.decoded;
            // function to check if the this user is a caterer or not
            catererRoleValidator.isCaterer(role, res);

            res.status(200).send({
              message: 'Successfully updated meal',
              updatedMeal,
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }

  /**
   * Deletes an existing meal item
   * @method deleteMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   *
   *
   */

  static deleteMeal(req, res, next) {
    const mealId = Number(req.params.id);
    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal cannot be found',
          });
        }
        Meal.destroy({ where: { id: mealId } })

          .then(() => {
            const { role } = req.decoded;
            // function to check if the this user is a caterer or not
            catererRoleValidator.isCaterer(role, res);

            return res.status(200).send({

              message: 'Successfully deleted meal',
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}
