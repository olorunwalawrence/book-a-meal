import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @description - Hashes the password of a given user
 *
 * @param {Object} user object
 *
 * @returns {Object} user object with password hashed
 */
export const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return user;
};

// /**
//  * @description - makes a token using credentials provided
//  * @param {Object} object of key values to sign jsonwebtoken
//  * @param {String} expiration time
//  *
//  * @returns {String} jsonwebtoken
//  */
// export const getJWT = (options, expiresIn = '24h') =>{
//   jwt.sign( options , process.env.SECRET, { expiresIn });
// }
