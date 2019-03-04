/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable require-jsdoc */
import { Op } from 'sequelize';
import models from '../models';
import errors from '../error/error.json';
import catererRoleValidator from '../helpers/role';

const { Meal, User } = models;
/**
 * @exports
 * @class MealController
 */
export default class MealControllers {
  /**
   * Creates a new meal item
   * @method createMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to today or given date
   */
  // only admin should be able to perform al this functionality
  static createMeal(req, res) {
    const { userId, role } = req.decoded;

    const {
      title, imageUrl, price, description
    } = req.body;


    Meal.findOrCreate({
      where: { title: { [Op.iLike]: title }, userId },

      defaults: {
        title: title.trim().toLowerCase(),
        imageUrl,
        description: description.trim().toLowerCase(),
        price,
        userId
      },

      include: [{
        model: User, as: 'caterer'
      }]


    }).spread((newMeal, created) => {
      catererRoleValidator(role, res);

      if (!created) {
        return res.status(409).json({
          status: 409,
          message: 'meal title already exist'
        });
      }

      return res.status(201).json({
        status: 201,
        message: 'meal successfully created',
        newMeal
      });
    }).catch((err) => {
      console.log(err.message);
    });
  }

  static getAllmeal(req, res) {
    Meal.findAll({

    }).then((meals) => {
      const { role } = req.decoded;
      // isCaterer(role, res);

      res.status(200).json({
        status: 200,
        message: 'meal retrieved successfully',
        data: meals
      });
    }).catch((err) => {
      console.log(err.message);
    });
  }

  static mealUpdate(req, res) {
    const id = Number(req.params.id);
    Meal.findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(404).json({
            status: 404,
            message: 'meal with the given id was not Found',
          });
        }
        return Meal
          .update({
            title: req.body.tile,
            imageUrl: req.body.size,
            price: req.body.price,
            description: req.body.description
          }).then(meal => res.status(200).json({
            status: 201,
            data: meal,
          }));
      });
  }

  /**
   * Deletes an existing meal item
   * @method deleteMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static deleteMeal(req, res) {
    const { userId, role } = req.decoded;
    const { params: { mealId } } = req;
    Meal.destroy({
      where: { mealId, userId }

    }).then((mealItem) => {
      isCaterer(role, res);
      if (!mealItem) {
        res.status(404).json({ error: errors[404] });
      }
      res.status(200).json({ message: 'Meal deleted successfully' });
    }).catch((err) => {
      res.status(500).send(err.message);
    });
  }
}
