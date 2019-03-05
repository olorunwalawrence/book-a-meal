/* eslint-disable require-jsdoc */

// signup field  validation
export default class Validator {
  static validateFields(req, res, next) {
    const {
      title,
      imageUrl,
      description,
      price
    } = req.body;
    try {
      if (!title) {
        return res.status(422).json({ message: 'title field is not specified ' });
      }
      if (!imageUrl) {
        return res.status(422).json({ message: 'image field is not specified ' });
      }
      if (!description) {
        return res.status(422).json({ message: 'description field is not specified ' });
      }
      if (!price) {
        return res.status(422).json({ message: ' field is not specified ' });
      } if (!price) {
        return res.status(422).json({ message: 'email field is not specified ' });
      }


      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'The specified fields are all needed e.g title,imageUrl,desciption , price'
      });
    }
  }
}
