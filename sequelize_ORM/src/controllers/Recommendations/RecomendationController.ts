import express, { Response } from 'express';
import { CustomRequest } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Goal from '../../models/Goal';
import Recommendation from '../../models/Recommendation';

export const RecommendationController = express.Router();

RecommendationController.post('/', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { goalId, message } = req.body;
        const userId = req.user!.id;


        const goal = await Goal.findOne({ where: { id: goalId, userId } });
        if (!goal) {
            res.status(404).json({ message: 'Goal not found for this user' });
            return;
        }

        const recommendation = await Recommendation.create({
            userId,
            goalId,
            message,
        });

        res.status(201).json({ message: 'Recommendation created successfully', data: recommendation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


RecommendationController.get('/', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;

        const recommendations = await Recommendation.findAll({ where: { userId } });
        if (recommendations.length > 0) {
            res.status(200).json(recommendations);
        } else {
            res.status(404).json({ message: 'No recommendations found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

RecommendationController.put('/:id', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const recommendationId = req.params.id;
        const { message } = req.body;
        const userId = req.user!.id;

        const recommendation = await Recommendation.findOne({ where: { id: recommendationId, userId } });

        if (!recommendation) {
            res.status(404).json({ message: 'Recommendation not found' });
            return;
        }

        recommendation.message = message || recommendation.message;

        await recommendation.save();
        res.json(recommendation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


RecommendationController.delete('/:id', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const recommendationId = req.params.id;
        const userId = req.user!.id;

        const recommendation = await Recommendation.findOne({ where: { id: recommendationId, userId } });

        if (!recommendation) {
            res.status(404).json({ message: 'Recommendation not found' });
            return;
        }

        await recommendation.destroy();
        res.json({ message: 'Recommendation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default RecommendationController;
