import express from "express";
import profileRoute from "./profileroute";
import authRouter from "./userRoutes";

const mainRoute = express.Router();

mainRoute.use('/auth', authRouter)
mainRoute.use('/profile', profileRoute)

export default mainRoute;