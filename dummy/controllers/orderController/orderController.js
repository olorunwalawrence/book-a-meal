import orderDb from '../../db/order';
import mealFieldRequired from '../../validation/mealFieldRequiredValidation';
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

export default class Order {
  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   * @param {*} json  THE  RETURN JSON
   */
  static makeOrder(req, res) {
    const {
      img, title, description, price
    } = req.body;

    mealFieldRequired(img, title, description, price, res);

    const data = {
      id: orderDb.length + 1,
      img,
      title: title.toLowerCase(),
      descrition: description.toLowerCase(),
      price
    };

    // PUSH DATA INTO DUMMY DATABASE

    orderDb.push(data);
    return res.status(201).json({
      status: 201,
      data
    });
  }
}
