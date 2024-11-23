import User from '../models/Users';

export const sendNotification = async (userId: string, message: string): Promise<void> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const { notificationPreference } = user;


    switch (notificationPreference) {
        case 'email':
            // Implement email sending logic here
            console.log(`Sending email to user ${userId}: ${message}`);
            break;

        case 'push':
            // Implement push notification logic here
            console.log(`Sending push notification to user ${userId}: ${message}`);
            break;

        // Add more cases as needed
        default:
            console.log(`No notification method set for user ${userId}`);
            break;
    }
};
