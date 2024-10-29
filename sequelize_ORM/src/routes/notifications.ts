import express from 'express';
import NotificationController from '../controllers/notification/notificationController';

const notificationRouter = express.Router();
notificationRouter.use('/', NotificationController);

export default notificationRouter;