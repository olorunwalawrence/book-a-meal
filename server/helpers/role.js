/* eslint-disable require-jsdoc */


const isCaterer = (role, res) => {
  if (role !== 'caterer') {
    return res.status(404).json({
      status: 404,
      message: 'not a valid user, pls signup as a caterer'
    });
  }
};


export const isUser = (role, res) => {
  if (role !== 'user' || 'caterer') {
    return res.status(404).json({
      status: 404,
      message: 'not a valid user, pls signup as a User'
    });
  }
};


export default isCaterer;

