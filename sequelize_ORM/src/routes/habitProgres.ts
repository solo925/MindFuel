import express from 'express';
import HabitProgressController from '../controllers/Habits/HabitProgressController';

const habitprogresRoute = express.Router()

habitprogresRoute.use('/', HabitProgressController)

export default habitprogresRoute;