import mealDb from '../../db/meal';
import getAllMeals from '../../utils/helper';
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

export default class Meal {
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
