import express, { Response } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Goal from '../../models/Goal';

export const GoalController = express.Router();

GoalController.post('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { title, type } = req.body;
        const userId = req.user!.id;

        const goal = await Goal.create({
            userId,
            title,
            type
        });

        res.status(201).json({ message: 'Goal created successfully', data: goal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


GoalController.get('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;

        const goals = await Goal.findAll({ where: { userId } });
        if (goals.length > 0) {
            res.status(200).json(goals);
        } else {
            res.status(404).json({ message: 'No goals found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


GoalController.put('/:id', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const goalId = req.params.id;
        const { title, achieved, rating } = req.body;
        const userId = req.user!.id;

        const goal = await Goal.findOne({ where: { id: goalId, userId } });

        if (!goal) {
            res.status(404).json({ message: 'Goal not found' });
            return;
        }

        goal.title = title || goal.title;
        goal.achieved = achieved !== undefined ? achieved : goal.achieved;
        goal.rating = rating !== undefined ? rating : goal.rating;

        await goal.save();
        res.json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


GoalController.delete('/:id', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const goalId = req.params.id;
        const userId = req.user!.id;

        const goal = await Goal.findOne({ where: { id: goalId, userId } });

        if (!goal) {
            res.status(404).json({ message: 'Goal not found' });
            return;
        }

        await goal.destroy();
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default GoalController;
