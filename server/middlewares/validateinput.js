import differenceInMinutes from 'date-fns/difference_in_minutes';
import moment from 'moment';
import { Order, Menu, Meal } from '../models';

/**
 * @description - deletes empty input fields
 *
 * @param {Object} object of user inputs
 *
 * @returns {Object} user input object with empty fields deleted
 */
const deleteEmptyFields = (object) => {
  const fields = Object.keys(object);
  fields.forEach((field) => {
    if (object[field] === (null || undefined || '')) {
      delete object[field];
    }
  });
  return object;
};
/**
 * @description - trims string values in object
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Object} calls the next middleware
 *
 * @returns {Object} object with string fields trimmed
 */
export const trimInputs = (req, res, next) => {
  const body = req.body;
  const fields = Object.keys(body);
  fields.forEach((field) => {
    if (typeof body[field] === 'string') {
      body[field] = body[field].trim();
    }
  });
  if (req.body.amount) req.body.amount = Number(req.body.amount);
  if (req.body.quantity) req.body.quantity = Number(req.body.quantity);
  req.body = deleteEmptyFields(body);
  next();
};

const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|z(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]),|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @description - Validates signup credentials
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const validateSignup = (req, res, next) => {
  delete req.body.id;
  delete req.body.isAdmin;
  const { firstname, lastname, username, email, password, confirmPassword } = req.body;
  if (!firstname || typeof firstname !== 'string') {
    return res.status(400).send({
      message: 'Firstname is required',
    });
  } else if (!lastname || typeof lastname !== 'string') {
    return res.status(400).send({
      message: 'Lastname is required',
    });
  } else if (!username || typeof username !== 'string') {
    return res.status(400).send({
      message: 'Username is required',
    });
  } else if (!password || typeof password !== 'string') {
    return res.status(400).send({
      message: 'Password is required',
    });
  } else if (!email) {
    return res.status(400).send({
      message: 'Email is required',
    });
  } else if (!isEmail.test(email)) {
    return res.status(400).send({
      message: 'Invalid email',
    });
  } else if (
    !(password === confirmPassword)
  ) {
    return res.status(400).send({
      message: 'Passwords do not match',
    });
  }
  next();
};

/**
 * @description - Validates signin credentials
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).send({
      message: 'Please fill in your password',
    });
  } else if (!email) {
    return res.status(400).send({
      message: 'Please fill in your email',
    });
  } else if (!isEmail.test(email)) {
    return res.status(400).send({
      message: 'Ooops...invalid email',
    });
  }
  next();
};

/**
 * @description - Validates new meal credentials
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const validateMealCreate = (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).send({
      message: 'Please fill in the meal name',
    });
  } else if (!req.file) {
    return res.status(400).send({
      message: 'Please upload the meal image',
    });
  } else if (!description) {
    return res.status(400).send({
      message: 'Please describe the meal',
    });
  } else if (!price || Number.isNaN(Number(price)) || price < 1) {
    return res.status(400).send({
      message: 'Please fill in the meal price',
    });
  }
  next();
};

/**
 * @description - Validates meal update credentials
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const validateMealUpdate = (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).send({
      message: 'Please fill in the meal name',
    });
  } else if (!description) {
    return res.status(400).send({
      message: 'Please describe the meal',
    });
  } else if (!price || Number.isNaN(Number(price)) || price < 1) {
    return res.status(400).send({
      message: 'Please fill in a valid meal price',
    });
  }
  return Meal.findOne({ where: { name: req.body.name } })
    .then((meal) => {
      if (meal && meal.id !== Number(req.params.id)) {
        return res.status(409).send({
          message: 'Meal name already exist. Use a different name.',
        });
      }
      return next();
    })
    .catch(error => next(error));
};

/**
 * @description - Validates user before orders route
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const authorizeOrders = (req, res, next) => {
  if (req.query.userId && Number(req.query.userId) === Number(req.user.id)) {
    return next();
  }
  if (!req.user.isAdmin) {
    return res.status(403).send({ message: 'You are not authorized' });
  }
  next();
};

/**
 * @description - Checks user before orders update
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const authorizeOrdersUpdate = (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  if (!req.user.isAdmin) {
    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order was not found' });
        }
        if (order.userId !== userId) {
          return res.status(401).send({ message: 'You can not modify this order' });
        }

        if ((differenceInMinutes(new Date(), new Date(order.createdAt))) >= 15) {
          return res.status(401).send({ message: 'You can not modify this order anymore' });
        }
      })
      .catch(error => next(error));
  }
  next();
};

/**
 * @description - Checks user before orders update
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Function} next calls next middleware
 *
 * @return {Function|Object} returns error or calls next middleware
 */
export const validateMealChange = (req, res, next) => {
  if (req.body.newMealId) {
    const todaysdate = new Date().toISOString().substr(0, 10);
    const newMealId = Number(req.body.newMealId);
    return Meal.findById(newMealId)
      .then((newMeal) => {
        if (!newMeal) {
          return res.status(400).send({
            message: 'New Meal does not exist',
          });
        }
        return Menu.findOne({ where: { date: todaysdate } })
          .then((menu) => {
            if (!menu) {
              return res.status(404).send({ message: `Menu has not been set for ${moment(todaysdate).format('dddd, MMMM Do YYYY')}` });
            }
            return menu.hasMeal(newMealId)
              .then((inMenu) => {
                if (!inMenu) {
                  return res.status(400).send({
                    message: "This meal is not in today's menu",
                  });
                }
                req.body = {
                  mealId: newMealId,
                  quantity: Number(req.body.quantity),
                  amount: Number(req.body.quantity) * newMeal.price,
                };

                return next();
              })
              .catch(error => next(error));
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
  return next();
};
