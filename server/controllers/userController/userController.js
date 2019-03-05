/* eslint-disable require-jsdoc */
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import models from '../../models';
import passwordVerification from '../../helpers/userobj';

const { User } = models;
const { verifyPassword } = passwordVerification;
config();
const secret = process.env.SECRET;

/**
 * @exportdefault
 * @class UserController
 */
export default class UserController {
  /**
   * Register a new user
   * @method register
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */

  static registerUser(req, res) {
    const {
      role,
      firstname,
      lastname,
      password,
      businessName,
      email,
      phoneNo,
      address
    } = req.body;



    User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        firstname: firstname.trim().toLowerCase(),
        lastname: lastname.trim().toLowerCase(),
        email: email.trim(),
        password: password.trim(),
        role: role.trim().toLowerCase(),
        businessName: businessName.trim().toLowerCase(),
        address: address.trim(),
        phoneNo: phoneNo.trim(),
      }
     
    })
      .spread((newUser, created) => {
        
        if (!created) {
          return res.status(409).json({
            error: 409,
            message: 'email already exist'
          });
        }

        const { userId } = newUser.dataValues;

        const token = jwt.sign({ userId, role }, secret, { expiresIn: '10h' });
        return res.status(200).send({
          msg: 'user created successfully',
          newUser,
          token
        });
      })
      .catch(err => res.send(err.message));
  }

  static loginUser(req, res) {
    const { email } = req.body;
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
      const userid = authUser.userId;
      const token = jwt.sign({ userid, email }, secret, { expiresIn: '10h' });
      return res.status(201).json({
        message: `${authUser.email}  is successfully logged in`,
        authUser,
        token
      });
    }).catch(() => {
      res.status(422).json({
        error: 422,
        message: 'password or email field is required'
      });
    });
  }
}
