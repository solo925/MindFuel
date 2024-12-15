import express from "express";
import { CustomRequest, verifyToken } from "../../middlewares/Authmidlewares/IsAuthenticated";
import Notification from "../../models/notifications";

export const NotificationController = express.Router();

// Fetch notifications for the logged-in user
NotificationController.get("/", verifyToken, async (req: CustomRequest, res): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(400).json({ error: "User ID is missing" });
        return
    }

    try {
        const notifications = await Notification.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
        if (notifications.length > 0) {
            res.status(200).json(notifications);
        } else {
            res.status(404).json({ message: "No notifications found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching notifications", error2: error });
    }
});

// Create a new notification
NotificationController.post("/", verifyToken, async (req: CustomRequest, res): Promise<void> => {
    const userId = req.user?.id;
    const { message } = req.body;

    if (!userId) {
        res.status(400).json({ error: "User ID is missing" });
        return
    }

    if (!message) {
        res.status(400).json({ error: "Message is required" });
        return
    }

    try {
        const notification = await Notification.create({
            userId,
            message,
            read: false
        });

        res.status(201).json({ data: notification, message: "Notification created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating notification", error2: error });
    }
});

// Mark a notification as read
NotificationController.patch("/:id/read", verifyToken, async (req, res): Promise<void> => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByPk(id);

        if (!notification) {
            res.status(404).json({ error: "Notification not found" });
            return
        } else {
            notification.read = true;
            await notification.save();
            res.json(notification);
        }
    } catch (error) {
        res.status(500).json({ error: "Error marking notification as read" });
    }
});

export default NotificationController;
