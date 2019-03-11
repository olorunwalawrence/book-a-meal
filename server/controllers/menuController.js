
/* eslint-disable require-jsdoc */
import moment from 'moment';
import { Op } from 'sequelize';
import models from '../models';

import isCaterer from '../middlewares/role';


const { Menu, Meal } = models;
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
  static createMenu(req, res, next) {
  
    const { date , mealIds } = req.body;

    Menu.findOne({ where: { date } })
      .then((menu) => {
        if (menu) {
          return res.status(400).send({
            message: `Menu for ${moment(date).format('dddd, MMMM Do YYYY')} already exists`,
          });
        }
        Menu.create({ date })
          .then(newMenu => newMenu.addMeals(mealIds)
            .then(() => {
              Menu.findById(newMenu.id, {
                where: { date },
                include: [{
                  model: Meal,
                  attributes: ['id', 'name', 'price', 'description', 'imageurl'],
                }],
              })
                .then((createdMenu) => {
                  if (!createdMenu) {
                    return res.status(404).send({ message: 'Menu was not found' });
                  }
                  res.status(201).send({
                    message: `Successfully created a menu for ${moment(date).format('dddd, MMMM Do YYYY')}`,
                    menu: createdMenu,
                  });
                })
                .catch(error => next(error));
            })
            .catch(error => next(error)))
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }

    /**
   * Get menu for a particular day
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MenuController
   */

  static getAllMenu(req, res, next) {
    const todaysdate = new Date().toISOString();
    const date = req.query.date || todaysdate.substr(0, 10);
    Menu.findOne({
      where: { date },
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'price', 'description', 'imageurl'],
      }],
    }).then((menu) => {
      if (!menu) {
        return res.status(404).send({
           message: `Menu has not been set for ${moment(date).format('dddd, MMMM Do YYYY')}` });
      }
      res.status(200).json({ menu });
    }).catch(error => next(error));
  }

  static UpdateMenu(req, res, next) {
    /**
   * @description - Updates menu for a particular day
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MenuController
   */
    const menuId = req.params.id;
    const { mealIds } = req.body;


    Menu.findById(menuId)
      .then((menu) => {
        if (!menu) {
          return res.status(400).send({
            message: 'No menu found ',
          });
        }

        menu.setMeals(mealIds)
          .then(() => {
            Menu.findById(menu.id, {
              include: [{
                model: Meal,
                attributes: ['id', 'name', 'price', 'description', 'imageurl'],
              }],
            })
              .then((updatedMenu) => {
                if (!updatedMenu) {
                  return res.status(404).send({ message: 'Menu was not found' });
                }
                res.status(200).send({
                  message: `Successfully updated menu for ${moment(updatedMenu.date).format('dddd, MMMM Do YYYY')}`,
                  menu: updatedMenu,
                });
              })
              .catch(error => next(error));
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}
