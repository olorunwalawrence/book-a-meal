import express from 'express';
import mealController from '../controllers/mealController/mealController';
import menuController from  '../controllers/menuController/menuController';
import validation from '../validation/mealFieldValidation';

const router = express.Router();
const {setMenu} = menuController
const { getAllMeal, createMeal,deleteMeal , updateMeal } = mealController;
const { mealValidation } = validation;

router.post('/meals', mealValidation, createMeal);
router.get('/meals', getAllMeal);
router.delete('/meal/:id', deleteMeal);
router.put('/meal/:id', updateMeal);
router.post('/menu', setMenu);

export default router;
