/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable valid-jsdoc */

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import models from '../models';
import passwordVerification from '../helpers/userobj';

const { verifyPassword } = passwordVerification;
const { User } = models;
config();
const secret = process.env.SECRET;
/**
 * @description - It contains utility methods for users
 *
 * @class UserController
 */
class UserController {
  /**
   * @description - Register a new user
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof UserController
   */
  static registerUser(req, res) {
    const {
      firstname, username, email, role
    } = req.body;


    return User.find({
      where: { $or: [{ username }, { email }] },
    }).then((existingUser) => {
      if (existingUser && existingUser.username === username) {
        return res.status(409).json({
          message: 'username is taken',
        });
      }
      if (existingUser && existingUser.email === email) {
        return res.status(409).json({
          message: 'email is associated with an account',
        });
      }
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
      })
        .then((user) => {
          const { id } = user.dataValues;

          const token = jwt.sign({ id, role }, secret, { expiresIn: '10h' });
          return res.status(201).json({
            token,
            id,
            data: user,
            message: `Welcome ${firstname}. Enjoy your meal`,
          });
        })
        .catch((error) => {
      console.log(error);
          res.status(422).json({
            error: 422,
            message: `${role} is an invalid input and also check the specified fields`
          });
        });
    });
  }

  /**
   * @description - Logs in a new user
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof UserController
   */
  
  static loginUser(req, res) {
    const { email,role } = req.body;
    User.findOne({ where: { email } }).then((authUser) => {
      if (!authUser) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid email Credentials'
        });
      }

      const isPasswordValid = verifyPassword(
        req.body.password,
        authUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid password Credentials'
        });
      }
      const userid = authUser.id;
      const token = jwt.sign({ userid, role }, secret, { expiresIn: '10h' });
      return res.status(201).json({
        message: `${authUser.username}  is successfully logged in`,
        authUser,
        token
      });
    }).catch((err) => {

      res.status(422).json({
        error: 422,
        message: 'password,email or role field is required'
      });
    });
  }
}

export default UserController;
