import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/Users';
import { asyncHandler } from '../../middlewares/errorHandler';


export const LoginController = express.Router();

type user = {
    id: string;
    name: string;
    email: string;
    password: string;
} | null;

LoginController.post('/', asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const user: user = await User.findOne({ where: { email } });
    if (!user || user === null || user === undefined) {
        next(new Error('Invalid email or password')); 
        return;
    }

    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
        next(new Error('Invalid email or password')); 
        return;
    }

    const token = jwt.sign({ id: user!.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.cookie('token', token, {
        maxAge: 3600 * 1000,
    });

    res.status(200).json({ user, token });
}));

export default LoginController;
