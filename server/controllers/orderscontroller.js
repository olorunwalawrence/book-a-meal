/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import models from '../models';

const {
  Order, User, Meal, Menu
} = models;

/**
 * @description - It contains utility methods for orders
 *
 * @class OrderController
 */
export default class MealControllers {
  /**
   * @description - Place an order for a particular meal
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
  static createOrder(req, res, next) {
    const userId = req.decoded.id;
    const { mealId } = req.body;
    const quantity = Number(req.body.quantity);
    const date = new Date().toISOString().substr(0, 10);

    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal does not exist' });
        }
        User.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'Please signup to proceed' });
            }
            return Menu.findOne({ where: { date } })
              .then((menu) => {
                if (!menu) {
                  return res.status(404).send({ message: `Menu has not been set for ${moment(todaysdate).format('dddd, MMMM Do YYYY')}` });
                }
                return menu.hasMeal(mealId)
                  .then((inMenu) => {
                    if (!inMenu) {
                      return res.status(400).send({
                        message: "This meal is not in today's menu",
                      });
                    }
                    Order.create({
                      date,
                      amount: meal.price * quantity,
                      quantity,
                      userId,
                      mealId,
                    })
                      .then(order => res.status(201)
                        .send({
                          message: `${meal.name} has been ordered.`,
                          order,
                        }))
                      .catch(error => next(error));
                  })
                  .catch(error => next(error));
              })
              .catch(error => next(error));
          })
          .catch(error => next(error));
      });
  }

  static getAllOrder(req, res, next) {
    const query = {};
    if (req.query.date) query.date = req.query.date;
    if (req.query.userId) query.userId = req.query.userId;

    Order.findAll({
      where: query,
      include: [{
        model: User,
        attributes: ['id', 'firstname', 'lastname'],
      }, {
        model: Meal,
        attributes: ['id', 'name', 'price'],
      }],
    })
      .then((orders) => {
        if (orders.length < 1) {
          return res.status(404).send({
            message: 'No orders found',
          });
        }
        res.status(200).send({
          message: 'Orders retrieved successfully',
          orders,
        });
      })
      .catch(error => next(error));
  }

  /**
   * @description - Update a particlar order
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
  static orderUpdate(req, res, next) {
    const originalOrderId = req.params.id;
    Order.findById(originalOrderId)
      .then((order) => {
        if (!order) {
          return res.status(400).send({
            message: 'Order does not exist',
          });
        }

        order.update(req.body)
          .then(updatedOrder => res.status(200).send({
            message: 'Your order has been updated',
            order: updatedOrder,
          }))
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}
