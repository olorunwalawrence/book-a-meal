/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable require-jsdoc */
import { Op } from 'sequelize';
import models from '../models';


const { Order } = models;
/**
 * @exports
 * @class OrderController
 */
export default class MealControllers {
  /**
   * Creates a new meal item
   * @method createOrder
   * @memberof orderController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to today or given date
   */
  // only admin should be able to perform al this functionality
  static createOrder(req, res) {
    const { userId } = req.decoded;

    const {
      title, imageUrl, price, description,
      vegetarian
    } = req.body;


    Order.findOrCreate({
      where: { title: { [Op.iLike]: title }, userId },

      defaults: {
        title,
        imageUrl,
        description,
        vegetarian,
        price,
        userId
      },

    }).spread((order, created) => {
      if (!created) {
        return res.status(409).json({
          status: 409,
          message: 'order title already exist'
        });
      }

      return res.status(201).json({
        status: 201,
        message: 'Order successfully created',
        order
      });
    }).catch((err) => {
      console.log(err.message);
    });
  }

  static getAllOrder(req, res) {
    Order.findAll({

    }).then((order) => {
      res.status(200).json({
        status: 200,
        message: 'order retrieved successfully',
        data: order
      });
    }).catch((err) => {
      console.log(err.message);
    });
  }

}
