import orderDb from '../../db/order';
import mealFieldRequired from '../../validation/mealFieldRequiredValidation';
import order from '../../db/order';
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

  // Update Order option

  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   * @param {*} json  THE  RETURN JSON
   */
  static updateOrder(req, res) {
    let updatedOrder = {};
    const { id } = req.params;
    orderDb.forEach((orders) => {
      if (orders.id === parseInt(id, 10) ) {
        orders.img = req.body.img || orders.img;
        orders.desc = req.body.description || orders.desc;
        orders.title = req.body.title || orders.title;
        orders.price = req.body.price || orders.price;
        updatedOrder = orders;
      }
    });
    if (updatedOrder === '') {
      return res.status(200).json({
        status: 200,
        message:'order updated successfully'
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'Order not found'
    });
  }
}
