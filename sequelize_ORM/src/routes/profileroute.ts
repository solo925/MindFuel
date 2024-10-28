import express from "express";
import ProfileController from "../controllers/userProfile/ProfileController";

const profileRoute = express.Router();

profileRoute.use('/', ProfileController);

export default profileRoute;