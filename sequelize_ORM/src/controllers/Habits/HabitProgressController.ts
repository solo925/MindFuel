import express, { Response } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import HabitProgress from '../../models/Habitprogress.';
import Notification from '../../models/notifications';

export const HabitProgressController = express.Router();

HabitProgressController.post('/', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { habitId, completed } = req.body;
        const userId = req.user!.id!;

        const progressLog = await HabitProgress.create({
            habitId,
            userId,
            date: new Date(),
            completed,
        });

        if (completed) {
            await Notification.create({
                userId,
                message: `You have completed the habit: ${habitId}`,
            });
        }

        res.status(201).json({ message: 'Progress logged successfully', data: progressLog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


HabitProgressController.get('/:habitId', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const habitId = req.params.habitId;
        const userId = req.user!.id!;

        const progressLogs = await HabitProgress.findAll({ where: { habitId, userId } });

        if (progressLogs.length > 0) {
            res.status(200).json(progressLogs);
        } else {
            res.status(404).json({ message: 'No progress found for this habit' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default HabitProgressController;
