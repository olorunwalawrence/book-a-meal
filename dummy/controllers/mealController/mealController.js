import mealDb from '../../db/meal';
import getAllMeals from '../../utils/helper';
import mealFieldRequired from '../../validation/mealFieldRequiredValidation';
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

export default class Meal {
  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   * @param {*} json  THE  RETURN JSON
   */
  static createMeal(req, res) {
    const {
      img, title, description, price
    } = req.body;

    mealFieldRequired(img, title, description, price, res);

    const result = mealDb.filter(
      Title => Title.title === title.toLowerCase()
    );
    if (!result.length < 1) {
      return res.status(400).json({ message: 'Meal title already exist' });
    }
    const data = {
      id: mealDb.length + 1,
      img,
      title: title.toLowerCase(),
      descrition: description.toLowerCase(),
      price
    };

    // PUSH DATA INTO DUMMY DATABASE

    mealDb.push(data);
    return res.status(201).json({
      status: 201,
      data
    });
  }


  // Get all political party

  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   */
  static getAllMeal(req, res) {
    getAllMeals(res, mealDb);
  }
}
