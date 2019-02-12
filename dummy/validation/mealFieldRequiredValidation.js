const mealFieldRequiredValidation = (img, title, description, price, res) => {
  if (!img || !title || !description || !price) {
    return res.status(400).send({
      success: 'false',
      message: 'field required'
    });
  }
};

export default mealFieldRequiredValidation;
