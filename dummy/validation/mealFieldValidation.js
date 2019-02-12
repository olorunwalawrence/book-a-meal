/* eslint-disable require-jsdoc */

export default class Validator {
  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @param {*} json
     * @param {*} message
     */

  // VALIDATE MEAL FORM FIELD
  static mealValidation(req, res, next) {
    const { img, title, description, price } = req.body;
    try {
      const regex = /^[a-zA-Z\s]*$/;
      if (img === '') {
        return res.status(400).json({ message: ' Image field cannot be empty' });
      }
      if (!regex.test(title)) {
        return res
          .status(400)
          .json({ message: 'Title name can only be letters' });
      }
      if (description.trim() === '') {
        return res.status(400).json({ message: 'Description cannot be empty' });
      }
      // if (!regex.test(description)) {
      //   return res
      //     .status(400)
      //     .json({ message: 'decription can only contain letter' });
      // }
      if (price.trim() === '') {
        return res
          .status(400)
          .json({ message: 'price cannot be empty' });
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'JSON object should contain { img, title, decription, price }'
      });
    }
  }
}

