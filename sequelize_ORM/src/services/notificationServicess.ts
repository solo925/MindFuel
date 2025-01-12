import User from '../models/Users';

export const sendNotification = async (userId: string, message: string): Promise<void> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const { notificationPreference } = user;


    switch (notificationPreference) {
        case 'email':
            console.log(`Sending email to user ${userId}: ${message}`);
            break;

        case 'push':
            console.log(`Sending push notification to user ${userId}: ${message}`);
            break;
        default:
            console.log(`No notification method set for user ${userId}`);
            break;
    }
};
