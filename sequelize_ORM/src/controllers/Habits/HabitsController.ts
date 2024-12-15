import express, { Response } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Habit from '../../models/Habit';

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

HabitController.post('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { name, description, frequency, unit } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
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

        res.status(201).json(
            habit,
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



HabitController.get('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id!;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
        }

        const habits = await Habit.findAll({ where: { userId } });
        if (habits.length > 0) {
            res.status(200).json(habits);
        } else {
            res.status(404).json({ message: 'No habits found' });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
HabitController.get('/:id', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const habitId = req.params.id;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
        }

        const habit = await Habit.findOne({ where: { id: habitId, userId } });

        if (!habit) {
            res.status(404).json({ message: 'Habit not found' });
        }

        res.status(200).json(habit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


HabitController.put('/:id', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const habitId = req.params!.id!;
        const { name, description, frequency } = req.body;
        const userId = req.user!.id;

        const habit = await Habit.findOne({ where: { id: habitId, userId } });

        if (!habit) {
            res.status(404).json({ message: 'Habit not found' });
            return;
        }

        habit.name = name || habit.name;
        habit.description = description || habit.description;
        habit.frequency = frequency || habit.frequency;

        await habit.save();
        res.json(habit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


HabitController.delete('/:id', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const habitId = req.params.id!;
        const userId = req.user!.id;

        const habit = await Habit.findOne({ where: { id: habitId, userId } });

        if (!habit) {
            res.status(404).json({ message: 'Habit not found' });
            return;
        }

        await habit.destroy();
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default HabitController;
