import express from 'express';
import mealController from '../controllers/mealController/mealController';

const router = express.Router();

const { getAllMeal } = mealController;

router.get('/meals', getAllMeal);

export default router;
