import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.routes';
import habitRoutes from './routes/habit.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

export default app;
