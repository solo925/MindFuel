import express, { Response } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Habit from '../../models/Habit';

export const HabitController = express.Router();

// Create a new habit
HabitController.post('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { name, description, frequency } = req.body;
        const userId = req.user?.id; // Using the ID from the verified token

        const habit = await Habit.create({
            userId,
            name,
            description,
            frequency,
        });

        res.status(201).json({ message: 'Habit created successfully', data: habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve all habits for the authenticated user
HabitController.get('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id!;

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
        const habitId = req.params.id; // Get the habit ID from the route parameters
        const userId = req.user?.id; // Get the user ID from the authenticated user

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
        }

        // Find the habit by ID and ensure it belongs to the authenticated user
        const habit = await Habit.findOne({ where: { id: habitId, userId } });

        if (!habit) {
            res.status(404).json({ message: 'Habit not found' });
        }

        res.status(200).json(habit); // Return the found habit
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update an existing habit
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

// Delete a habit
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
