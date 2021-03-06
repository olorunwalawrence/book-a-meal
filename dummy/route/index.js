import express from 'express';
import mealController from '../controllers/mealController/mealController';
import menuController from '../controllers/menuController/menuController';
import orderController from '../controllers/orderController/orderController';
import validation from '../validation/mealFieldValidation';

const router = express.Router();
const { makeOrder, updateOrder, getOrders } = orderController;
const { setMenu, getAllMenu } = menuController;
const {
  getAllMeal, createMeal, deleteMeal, updateMeal
} = mealController;
const { mealValidation } = validation;

router.post('/meals', mealValidation, createMeal);
router.post('/menu', mealValidation, setMenu);
router.post('/orders', mealValidation, makeOrder);
router.get('/meals', getAllMeal);
router.get('/menu', getAllMenu);
router.get('/orders', getOrders);
router.delete('/meal/:id', deleteMeal);
router.put('/meal/:id', updateMeal);
router.put('/orders/:id', updateOrder);

export default router;
