import express from 'express';
import UserControllers from '../controllers/userController';
import mealController from '../controllers/mealControllers';
import menuControlles from '../controllers/menuController';
import orderController from '../controllers/orderscontroller';
import verifyUser from '../middlewares/jwtAuth';
import authValidation from '../validation/formValidator';
import mealValidator from '../validation/mealValidator';
import emptyField from '../validation/empty';
import RoleValidator from '../middlewares/role';
import validateinput from '../middlewares/validateinput';

const {isCaterer, isUser} = RoleValidator;
const authRouter = express.Router();
const { validateField, validateLoginField } = authValidation;
const { registerUser, loginUser } = UserControllers;
const {
  createMeal, getAllmeal, mealUpdate, deleteMeal 
} = mealController;
const { createMenu, getAllMenu, UpdateMenu } = menuControlles;
const { createOrder, getAllOrder, orderUpdate } = orderController;
const { validateFields } = mealValidator;
const { UserEmptyField, checkFoodEmptyfield, checkLoginEmptyField } = emptyField;

authRouter.post('/auth/signup',validateField,UserEmptyField , registerUser);
authRouter.post('/auth/login',checkLoginEmptyField , validateLoginField,loginUser);

authRouter.post('/meals', verifyUser, createMeal);
authRouter.get('/meals', verifyUser,getAllmeal);
authRouter.put('/meals/:id',verifyUser, mealUpdate);
authRouter.delete('/meals/:id', verifyUser, deleteMeal);

authRouter.post('/menu', verifyUser, createMenu);
authRouter.get('/menu', verifyUser, getAllMenu);
authRouter.put('/menu/:id', validateFields, UpdateMenu)


authRouter.post('/orders', verifyUser, createOrder);
authRouter.get('/orders', verifyUser, getAllOrder);
authRouter.put('/orders/:id', verifyUser, orderUpdate);

export default authRouter;
