import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';


export const LogoutController = express.Router();
dotenv.config();


LogoutController.post('/', verifyToken, (req: Request, res: Response): void => {
    const token = req.cookies?.token;
    console.log(token)


    if (token) {
        res.clearCookie('token');

        res.status(200).json({ message: "user logged out successfully" })
    }
    res.status(500).json({ message: "invalid token" })
}
)


export default LogoutController;
