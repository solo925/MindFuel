import express, { Response, NextFunction } from "express";
import { CustomRequest, verifyToken } from "../../middlewares/Authmidlewares/IsAuthenticated";
import Notification from "../../models/notifications";
import { asyncHandler } from "../../middlewares/errorHandler";


export const NotificationController = express.Router();

NotificationController.get("/", verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        return next(new Error("User ID is missing")); 
    }

    const notifications = await Notification.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
    });

    if (notifications.length > 0) {
        res.status(200).json(notifications);
    } else {
        return next(new Error("No notifications found")); 
    }
}));


NotificationController.post("/", verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id;
    const { message } = req.body;

    if (!userId) {
        return next(new Error("User ID is missing")); 
    }

    if (!message) {
        return next(new Error("Message is required")); 
    }

    const notification = await Notification.create({
        userId,
        message,
        read: false
    });

    res.status(201).json({ data: notification, message: "Notification created successfully" });
}));


NotificationController.patch("/:id/read", verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
        return next(new Error("Notification not found")); 
    }

    notification.read = true;
    await notification.save();
    res.json(notification);
}));

export default NotificationController;
