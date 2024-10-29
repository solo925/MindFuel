import express, { Response } from 'express';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Notification from '../../models/notifications';
import User from '../../models/Users';

export const NotificationController = express.Router();

// Create a new notification
NotificationController.post('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        const userId = req.user?.id; // Using the ID from the verified token

        const notification = await Notification.create({
            userId,
            message,
        });

        res.status(201).json({ message: 'Notification created successfully', data: notification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve notifications for the authenticated user
NotificationController.get('/', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id!;
        const notifications = await Notification.findAll({ where: { userId } });

        if (notifications.length > 0) {
            res.status(200).json(notifications);
        } else {
            res.status(404).json({ message: 'No notifications found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark notification as read
NotificationController.put('/:id/read', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const notificationId = req.params.id;
        const userId = req.user!.id!;

        const notification = await Notification.findOne({ where: { id: notificationId, userId } });

        if (!notification) {
            res.status(404).json({ message: 'Notification not found' });
            return;
        }

        notification.isRead = true;
        await notification.save();

        res.json({ message: 'Notification marked as read', data: notification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a notification
NotificationController.delete('/:id', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const notificationId = req.params.id;
        const userId = req.user!.id!;

        const notification = await Notification.findOne({ where: { id: notificationId, userId } });

        if (!notification) {
            res.status(404).json({ message: 'Notification not found' });
            return;
        }

        await notification.destroy();
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// src/controllers/Users/NotificationSettingsController.tsdlewares/IsAuthenticated';
// Update notification preferences
NotificationController.put('/settings', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { notificationPreference } = req.body;
        const userId = req.user!.id;

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.notificationPreference = notificationPreference;
        await user.save();

        res.json({ message: 'Notification preferences updated successfully', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});




export default NotificationController;
