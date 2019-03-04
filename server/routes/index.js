import express from 'express';
import authRoute from './authRoutes';

const apiRoute = express.Router();

apiRoute.use('/v1/auth', authRoute);

export default apiRoute;
