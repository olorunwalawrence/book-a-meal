/* eslint-disable require-jsdoc */

export default class RoleValidator {
  static isCaterer(role, res) {
 
    if (role !== 'caterer') {
      return res.status(404).json({
        status: 404,
        message: 'not a valid user, pls signup as a caterer'
      });
    }

  }


  static isUser(req, res, next) {
    const role = req.decoded;
    if (role !== 'caterer' || 'customer') {
      return res.status(404).json({
        status: 404,
        message: 'not a valid user, pls signup as a User'
      });
   
    }
    next()
  }
}
