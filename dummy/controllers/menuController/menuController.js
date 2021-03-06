/* eslint-disable valid-jsdoc */
import shortid from 'shortid';
import menuDb from '../../db/menu';
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


    const result = menuDb.filter(
      (Title) => Title.title === title.toLowerCase()
    );

    if (!result.length < 1) {
      return res.status(409).json({ message: 'Menu  already set' });
    }

    const data = {
      id: shortid.generate(),
      img,
      title: title.toLowerCase(),
      descrition: description.toLowerCase(),
      price
    };

    // PUSH DATA INTO DUMMY DATABASE

    menuDb.push(data);
    return res.status(201).json({
      status: 201,
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
