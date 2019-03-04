/* eslint-disable no-undef */
/**
 * Function to check if value already exist
 * @param {string} created

 * @return {(error|bool)} returns error or true
 */
 const alreadyExist = (created, res) => {
  if (!created) {
    return res.status(409).json({
      error: 409,
      message: 'email or already exist'
    });
  }
};

// export const bizExist = (value) => {
//   if (value.businessName) {
//     return res.status(409).json({
//       error: 409,
//       message: 'business name already exist'
//     });
//   }
// };

export default alreadyExist;

