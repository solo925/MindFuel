import express from "express";
import HabitController from "../controllers/Habits/HabitsController";


const habitRouter = express.Router();

habitRouter.use('/', HabitController);

export default habitRouter;