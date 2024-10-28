import sequelize from '../config/db';
import Post from './Post';
import User from './Users';

// Sync all models with database
const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Failed to synchronize database:", error);
    }
};

export { Post, User, syncModels };

