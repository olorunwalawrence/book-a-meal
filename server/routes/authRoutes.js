import express from 'express';
import UserControllers from '../controllers/userController/userController';
import mealController from '../controllers/mealControllers';
import menuControlles from '../controllers/menuController';
import orderController from '../controllers/orderscontroller';
import verifyUser from '../middlewares/jwtAuth';
import authValidation from '../validation/formValidator';
import mealValidator from '../validation/mealValidator';
import emptyField from '../validation/empty';

const authRouter = express.Router();
const { validateField } = authValidation;
const { registerUser, loginUser } = UserControllers;
const {
  createMeal, getAllmeal, mealUpdate, deleteMeal 
} = mealController;
const { createMenu, getAllMenu } = menuControlles;
const { createOrder, getAllOrder, orderUpdate } = orderController;
const { validateFields } = mealValidator;
const { UserEmptyField, checkFoodEmptyfield, checkLoginEmptyField } = emptyField;

authRouter.post('/auth/signup', UserEmptyField, validateField, registerUser);
authRouter.post('/auth/login', checkLoginEmptyField, verifyUser, loginUser);

authRouter.post('/meals', checkFoodEmptyfield, validateFields, verifyUser, createMeal);
authRouter.put('/meals/:id', checkFoodEmptyfield, validateFields, mealUpdate);
authRouter.delete('/meals/:id', verifyUser, deleteMeal);

authRouter.post('/menu', checkFoodEmptyfield, validateFields, verifyUser, createMenu);
authRouter.get('/menu', verifyUser, getAllMenu);
authRouter.get('/meals', verifyUser, getAllmeal);

authRouter.post('/orders', checkFoodEmptyfield, validateFields, verifyUser, createOrder);
authRouter.get('/orders', verifyUser, getAllOrder);
// authRouter.put('/orders/:mealId', checkFoodEmptyfield, validateFields, verifyUser, orderUpdate);

export default authRouter;
