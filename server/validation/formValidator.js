/* eslint-disable require-jsdoc */


// signup field  validation
export default class Validator {
  static validateField(req, res, next) {
    const {
      role,
      username,
      password,
      email,
      firstname,
      lastname
    } = req.body;
    try {
      if (!role) {
        return res.status(422).json({ message: 'Role field is not specified ' });
      }
      if (!firstname) {
        return res.status(422).json({ message: 'first name field is not specified ' });
      }
      if (!lastname) {
        return res.status(422).json({ message: 'last name field is not specified ' });
      }
      if (!username) {
        return res.status(422).json({ message: 'username name field is not specified ' });
      } if (!email) {
        return res.status(422).json({ message: 'email field is not specified ' });
      }

      if (!password) {
        return res.status(422).json({ message: 'password field is not specified  ' });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'The specified fields are all needed e.g role, username, password,  phoneNo, address,   email'
      });
    }
  }

  static validateLoginField(req, res, next) {
    const { role, email, password } = req.body;
    try {
      if (!role) {
        return res.status(422).json({ message: 'Role field is not specified ' });
      }

      if (!email) {
        return res.status(422).json({ message: 'email field is not specified ' });
      }

      if (!password) {
        return res.status(422).json({ message: 'password field is not specified  ' });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'the specified fields are needed e.g email, role, password'
      });
    }
  }


  static validateLoginField(req, res, next) {
    const { role, email, password } = req.body;
    try {
      if (!role) {
        return res.status(422).json({ message: 'Role field is not specified ' });
      }

      if (!email) {
        return res.status(422).json({ message: 'email field is not specified ' });
      }

      if (!password) {
        return res.status(422).json({ message: 'password field is not specified  ' });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'the specified fields are needed e.g email, role, password'
      });
    }
  }


  static validateMealField(req, res, next) {
    const {
      name,
      description,
      imageurl,
      price
    } = req.body;
    try {
      if (!name) {
        return res.status(422).json({ message: 'name field is not specified ' });
      }
      if (!description) {
        return res.status(422).json({ message: 'description field is not specified ' });
      }
      if (!imageurl) {
        return res.status(422).json({ message: 'imageurl field is not specified ' });
      }
      if (!price) {
        return res.status(422).json({ message: 'price name field is not specified ' });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'The specified fields are all needed e.g name, price, imageurl,  description'
      });
    }
  }

  static validateMenuField(req, res, next) {
    const {
     date,
     mealIds
    } = req.body;
    try {
      if (!date) {
        return res.status(422).json({ message: 'date field is not specified ' });
      }
    
      if (!mealIds) {
        return res.status(422).json({ message: 'meal Id field is not specified ' });
      }
    
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'The specified fields are all needed e.g date and mealIds need to be supplied'
      });
    }
  }

}
