/* eslint-disable require-jsdoc */
import validator from 'validator';

export default class EmptyField {
  static UserEmptyField(req, res, next) {
    const { body } = req;
    const {
      role,
      firstname,
      lastname,
      password,
      businessName,
      email,
      phoneNo,
      address
    } = body;
    if (role === '') {
      return res.status(404).json({
        messgae: 'role cannot be empty'
      });
    }

    if (firstname === '') {
      return res.status(404).json({
        messgae: 'first name cannot be empty'
      });
    }
    if (lastname === '') {
      return res.status(404).json({
        messgae: 'last name cannot be empty'
      });
    }
    if (password === '') {
      return res.status(404).json({
        messgae: 'password cannot be empty'
      });
    }
    if (phoneNo === '') {
      return res.status(404).json({
        messgae: 'phnone number cannot be empty'
      });
    }
    if (businessName === '') {
      return res.status(404).json({
        messgae: 'business name cannot be empty'
      });
    }
    if (email === '') {
      return res.status(404).json({
        messgae: 'email cannot be empty'
      });
    }
    if (address === '') {
      return res.status(404).json({
        messgae: 'address cannot be empty'
      });
    }
    next();
  }

  static checkFoodEmptyfield(req, res, next) {
    const {
      title, imageUrl, price, description,

    } = req.body;

    if (title === '') {
      return res.status(404).json({
        messgae: 'title field cannot be empty'
      });
    }
    if (imageUrl === '') {
      return res.status(404).json({
        messgae: 'image Url field name cannot be empty'
      });
    }
    if (price === '') {
      return res.status(404).json({
        messgae: 'price field cannot be empty'
      });
    }
    if (description === '') {
      return res.status(404).json({
        messgae: 'description field cannot be empty'
      });
    }

    next();
  }

  static checkLoginEmptyField(req, res, next) {
    const { email, password } = req.body;
    if (password === '') {
      return res.status(404).json({
        messgae: 'password cannot be empty'
      });
    }
    if (email === '') {
      return res.status(404).json({
        messgae: 'email cannot be empty'
      });
    }
    next();
  }
}
