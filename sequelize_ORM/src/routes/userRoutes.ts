import { Router } from 'express';
import RegistrationController from '../controllers/Auth/RegisterController';
import LoginController from '../controllers/Auth/loginController';
import LogoutController from '../controllers/Auth/logoutController';

const authRouter = Router();

authRouter.use('/register', RegistrationController);
authRouter.use('/login', LoginController);
authRouter.use('/logout', LogoutController);

export default authRouter;
