import express from 'express';
import GoalController from '../controllers/Goals/GoalsController';


const GoalRoute = express.Router();

GoalRoute.use('/', GoalController);

export default GoalRoute;