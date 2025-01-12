import express, { Response, NextFunction } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Habit from '../../models/Habit';
import { asyncHandler } from '../../middlewares/errorHandler';


export const HabitController = express.Router();

/**
 * Utility function to calculate nextReminder.
 * @param frequency - The frequency value (e.g., 1, 2).
 * @param unit - The unit of time (e.g., 'minute', 'hourly', 'daily', 'weekly', 'monthly').
 * @returns The computed next reminder date.
 */
const calculateNextReminder = (frequency: number, unit: string): Date => {
    const now = new Date();
    switch (unit) {
        case 'minute':
            now.setMinutes(now.getMinutes() + frequency);
            break;
        case 'hourly':
            now.setHours(now.getHours() + frequency);
            break;
        case 'daily':
            now.setDate(now.getDate() + frequency);
            break;
        case 'weekly':
            now.setDate(now.getDate() + frequency * 7);
            break;
        case 'monthly':
            now.setMonth(now.getMonth() + frequency);
            break;
        default:
            throw new Error('Invalid unit');
    }
    return now;
};

HabitController.post('/', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, frequency, unit } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return next(new Error('User not authenticated')); 
    }

    const nextReminder = calculateNextReminder(frequency, unit);

    const habit = await Habit.create({
        userId,
        name,
        description,
        frequency,
        unit,
        nextReminder,
    });

    res.status(201).json(habit);
}));

HabitController.get('/', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user!.id!;
    if (!userId) {
        return next(new Error('User not authenticated')); 
    }

    const habits = await Habit.findAll({ where: { userId } });
    if (habits.length > 0) {
        res.status(200).json(habits);
    } else {
        return next(new Error('No habits found')); 
    }
}));

HabitController.get('/:id', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const habitId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
        return next(new Error('User not authenticated')); 
    }

    const habit = await Habit.findOne({ where: { id: habitId, userId } });

    if (!habit) {
        return next(new Error('Habit not found')); 
    }

    res.status(200).json(habit);
}));

HabitController.put('/:id', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const habitId = req.params.id!;
    const { name, description, frequency } = req.body;
    const userId = req.user!.id;

    const habit = await Habit.findOne({ where: { id: habitId, userId } });

    if (!habit) {
        return next(new Error('Habit not found')); 
    }

    habit.name = name || habit.name;
    habit.description = description || habit.description;
    habit.frequency = frequency || habit.frequency;

    await habit.save();
    res.json(habit);
}));

HabitController.delete('/:id', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const habitId = req.params.id!;
    const userId = req.user!.id;

    const habit = await Habit.findOne({ where: { id: habitId, userId } });

    if (!habit) {
        return next(new Error('Habit not found'));
    }

    await habit.destroy();
    res.json({ message: 'Habit deleted successfully' });
}));

export default HabitController;
