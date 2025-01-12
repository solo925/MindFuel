import express, { Response, NextFunction } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Goal from '../../models/Goal';
import { APIError, asyncHandler } from '../../middlewares/errorHandler';

export const GoalController = express.Router();

GoalController.post('/', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const { title, type } = req.body;
    const userId = req.user!.id;

    const goal = await Goal.create({
        userId,
        title,
        type
    });

    res.status(201).json({ message: 'Goal created successfully', data: goal });
}));

GoalController.get('/', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user!.id;

    const goals = await Goal.findAll({ where: { userId } });
    if (goals.length > 0) {
        res.status(200).json(goals);
    } else {
        next(new APIError('No goals found', 404));
    }
}));

GoalController.put('/:id', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const goalId = req.params.id;
    const { title, achieved, rating } = req.body;
    const userId = req.user!.id;

    const goal = await Goal.findOne({ where: { id: goalId, userId } });

    if (!goal) {
        next(new APIError('Goal not found', 404));
        return;
    }

    goal.title = title || goal.title;
    goal.achieved = achieved !== undefined ? achieved : goal.achieved;
    goal.rating = rating !== undefined ? rating : goal.rating;

    await goal.save();
    res.json(goal);
}));

GoalController.delete('/:id', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const goalId = req.params.id;
    const userId = req.user!.id;

    const goal = await Goal.findOne({ where: { id: goalId, userId } });

    if (!goal) {
        next(new APIError('Goal not found', 404));
        return;
    }

    await goal.destroy();
    res.json({ message: 'Goal deleted successfully' });
}));

export default GoalController;
