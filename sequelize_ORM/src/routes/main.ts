import express from "express";
import GoalRoute from "./goalroutes";
import habitRouter from "./habitsRoute";
import notificationRouter from "./notifications";
import profileRoute from "./profileroute";
import recommendationRouter from "./recommendationRoute";
import ReportRoute from "./reportsroute";
import authRouter from "./userRoutes";

const mainRoute = express.Router();

mainRoute.use('/auth', authRouter)
mainRoute.use('/profile', profileRoute)
mainRoute.use('/habits', habitRouter)
mainRoute.use('/notifications', notificationRouter)
mainRoute.use('/goals', GoalRoute)
mainRoute.use('/recommendations', recommendationRouter)
mainRoute.use('/reports', ReportRoute)

export default mainRoute;