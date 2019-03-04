/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable require-jsdoc */
import { Op } from 'sequelize';
import models from '../models';
import errors from '../error/error.json';
import isCaterer from '../helpers/role';

const { Menu, User } = models;
/**
 * @exports
 * @class MealController
 */
export default class MenuControllers {
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
  static createMenu(req, res) {
    const { userId, role } = req.decoded;

    const {
      title, imageUrl, price, description,
    
    } = req.body;

    Menu.findOrCreate({
      where: { title: { [Op.iLike]: title }, userId },

      defaults: {
        title,
        imageUrl,
        description,
        price,
        userId
      },

      include: [{
        model: User, as: 'caterer'
      }]


    }).spread((newMeal, created) => {
      isCaterer(role, res);

      if (!created) {
        return res.status(409).json({
          status: 409,
          message: 'menu title already exist'
        });
      }

      return res.status(201).json({
        status: 201,
        message: 'menu successfully created',
        newMeal
      });
    }).catch((err) => {
      console.log(err.message);
    });
  }

  static getAllMenu(req, res) {
    Menu.findAll({

    }).then((menus) => {
      const { role } = req.decoded;
      isCaterer(role, res);

      res.status(200).json({
        status: 200,
        message: 'All menu retrieved successfully',
        data: menus
      });
    }).catch((err) => {
      console.log(err.message);
    });
  }
}
