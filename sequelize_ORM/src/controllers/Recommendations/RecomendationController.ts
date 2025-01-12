import express, { Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Goal from '../../models/Goal';
import Recommendation from '../../models/Recommendation';
import { asyncHandler } from '../../middlewares/errorHandler';


export const RecommendationController = express.Router();

RecommendationController.post('/', asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const { goalId, message } = req.body;
    const userId = req.user!.id;

    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
        return next(new Error('Goal not found for this user')); 
    }

    const recommendation = await Recommendation.create({
        userId,
        goalId,
        message,
    });

    res.status(201).json({ message: 'Recommendation created successfully', data: recommendation });
}));

RecommendationController.get('/', asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user!.id;

    const recommendations = await Recommendation.findAll({ where: { userId } });
    if (recommendations.length > 0) {
        res.status(200).json(recommendations);
    } else {
        return next(new Error('No recommendations found')); 
    }
}));

RecommendationController.put('/:id', asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const recommendationId = req.params.id;
    const { message } = req.body;
    const userId = req.user!.id;

    const recommendation = await Recommendation.findOne({ where: { id: recommendationId, userId } });

    if (!recommendation) {
        return next(new Error('Recommendation not found')); 
    }

    recommendation.message = message || recommendation.message;

    await recommendation.save();
    res.json(recommendation);
}));

RecommendationController.delete('/:id', asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const recommendationId = req.params.id;
    const userId = req.user!.id;

    const recommendation = await Recommendation.findOne({ where: { id: recommendationId, userId } });

    if (!recommendation) {
        return next(new Error('Recommendation not found')); 
    }

    await recommendation.destroy();
    res.json({ message: 'Recommendation deleted successfully' });
}));

export default RecommendationController;
