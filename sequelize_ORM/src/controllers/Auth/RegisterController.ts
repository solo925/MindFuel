import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/Users';
import { asyncHandler } from '../../middlewares/errorHandler';


dotenv.config();

export const RegistrationController = express.Router();

RegistrationController.post('/', asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password, confirmpassword } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        next(new Error('User already exists')); 
        return;
    }

    if (password !== confirmpassword) {
        next(new Error('Passwords do not match')); 
        return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'strict',
        maxAge: 3600 * 1000,
    });

    res.status(201).json({ message: "User registered successfully", user, token });
}));

export default RegistrationController;
