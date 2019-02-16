/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import shortid from 'shortid';
import mealDb from '../../db/meal';
import getAllMeals from '../../utils/helper';
import mealFieldRequired from '../../validation/mealFieldRequiredValidation';


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
      return res.status(409).json({
        message: 'Meal title already exist'
      });
    }


    const data = {
      id: shortid.generate(),
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


  // Get all meals

  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   */
  static getAllMeal(req, res) {
    getAllMeals(res, mealDb);
  }

  // Update meal option

  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   * @param {*} json  THE  RETURN JSON
   */
  static updateMeal(req, res) {
    let updatedMeal = {};
    const { id } = req.params;
    mealDb.forEach((meals) => {
      if (meals.id === parseInt(id, 10)) {
        meals.img = req.body.img || meals.img;
        meals.desc = req.body.description || meals.desc;
        meals.title = req.body.title || meals.title;
        meals.price = req.body.price || meals.price;
        updatedMeal = meals;
      }
    });
    if (updatedMeal) {
      return res.status(200).json({
        status: 200,
        data: updatedMeal
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'meal not found'
    });
  }


  /**
   * deletemeal()
   * @desc deletes a meal
   * @param {*} req
   * @param {*} res
   * @returns {object} deletedmeal
   */
  static deleteMeal(req, res) {
    for (let i = 0; i < mealDb.length; i += 1) {
      if (mealDb[i].id === parseInt(req.params.id, 10)) {
        mealDb.splice(i, 1);
        return res.status(200).json({
          status: 200,
          message: 'seleted meal successfully deleted'
        });
      }
    }
    return res.status(404).send('404, meal not found');
  }
}
