import express from 'express';
import RecommendationController from '../controllers/Recommendations/RecomendationController';

const recommendationRouter = express.Router();
recommendationRouter.use('/', RecommendationController);

export default recommendationRouter