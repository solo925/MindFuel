import cron from "node-cron";
import Habit from "./models/Habit";
import Notification from "./models/notifications";
import { io } from "./socket";



const checkForNotifications = async (): Promise<void> => {
    try {
        const now = new Date();

        // Fetch habits where the nextReminder is due or past
        const habits = await Habit.findAll({
            where: {
                frequency: "minute",
                nextReminder: { $lte: now },
            },
        });

        for (const habit of habits) {
            const notification = await Notification.create({
                userId: habit.userId,
                message: `It's time to work on your habit: ${habit.name}`,
                createdAt: new Date(),
            });


            io.to(`user_${habit.userId}`).emit("new_notification", notification);


            habit.nextReminder = new Date(now.getTime() + 60 * 1000);
            await habit.save();
        }
    } catch (error) {
        console.error("Error checking notifications:", error);
    }
};

cron.schedule("* * * * *", checkForNotifications);
