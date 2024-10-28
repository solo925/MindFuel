import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/Users';

dotenv.config();



export const RegistrationController = express.Router();
// Adjust the import path according to your structure

RegistrationController.post('/', async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, confirmpassword } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword: string = (await bcrypt.hash(password, 10)).toString();

        // Check if passwords match
        if (password !== confirmpassword) {
            res.status(400).json({ message: 'Passwords do not match' });
        }

        // Create a new user    
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        // Return the new user and token
        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default RegistrationController;
