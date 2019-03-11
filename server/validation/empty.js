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
     username,
      email,
    } = body;
    if (role.trim() === '') {
      return res.status(404).json({
        messgae: 'role cannot be empty'
      });
    }

    if (firstname.trim() === '') {
      return res.status(404).json({
        messgae: 'first name cannot be empty'
      });
    }
    if (lastname.trim() === '') {
      return res.status(404).json({
        messgae: 'last name cannot be empty'
      });
    }
    if (password.trim() === '') {
      return res.status(404).json({
        messgae: 'password cannot be empty'
      });
    }

    if (username.trim() === '') {
      return res.status(404).json({
        messgae: 'business name cannot be empty'
      });
    }
    if (email.trim() === '') {
      return res.status(404).json({
        messgae: 'email cannot be empty'
      });
    }

    next();
  }

  static checkFoodEmptyfield(req, res, next) {
    const {
      name, imageurl, price, description,

    } = req.body;

    if (name === '') {
      return res.status(404).json({
        messgae: 'title field cannot be empty'
      });
    }
    if (imageurl === '') {
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
    const { email, password, role } = req.body;
    if (password.trim() === '') {
      return res.status(404).json({
        messgae: 'password cannot be empty'
      });
    }
    if (email.trim() === '') {
      return res.status(404).json({
        messgae: 'email cannot be empty'
      });
    }
    if (role.trim() === '') {
      return res.status(404).json({
        messgae: 'role cannot be empty'
      });
    }
    next();
  }
}
