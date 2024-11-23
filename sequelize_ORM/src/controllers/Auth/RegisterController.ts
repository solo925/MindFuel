import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/Users';

dotenv.config();



export const RegistrationController = express.Router();

RegistrationController.post('/', async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, confirmpassword } = req.body;

    try {

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }


        const hashedPassword: string = (await bcrypt.hash(password, 10)).toString();


        if (password !== confirmpassword) {
            res.status(400).json({ message: 'Passwords do not match' });
        }


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

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default RegistrationController;
