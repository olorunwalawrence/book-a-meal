/* eslint-disable valid-jsdoc */
import menuDb from '../../db/menu';
import fieldValidation from '../../validation/mealFieldRequiredValidation';
import getmenus from '../../utils/helper';
// const { mealFieldRequiredValidation } = Validation;

// eslint-disable-next-line require-jsdoc
export default class Menu {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   * @param {*} json  THE  RETURN JSON
   */
  static setMenu(req, res) {
    const {
      img, title, description, price
    } = req.body;
    fieldValidation(img, title, description, price, res);

    const result = menuDb.filter(
      (Title) => Title.title === title.toLowerCase()
    );

    if (!result.length < 1) {
      return res.status(400).json({ message: 'Menu  already set' });
    }

    const data = {
      id: menuDb.length + 1,
      img,
      title: title.toLowerCase(),
      descrition: description.toLowerCase(),
      price
    };

    // PUSH DATA INTO DUMMY DATABASE

    menuDb.push(data);
    return res.status(200).json({
      status: 200,
      message: 'menu set successfully'
    });
  }

 // Get all menu
  /**
   *
   * @param {*} req  THE REQUEST OBJECT
   * @param {*} res   THE RESPONSE OBJECT
   */
  static getAllMenu(req, res) {
    getmenus(res, menuDb);
  }

  

}
