import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import Habit from './Habit';
import User from './Users';

class Goal extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public habitId!: ForeignKey<string>;
    public title!: string;
    public achieved!: boolean;
    public type!: 'daily' | 'weekly' | 'monthly' | 'yearly';
    public rating!: number;
}

Goal.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        habitId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        achieved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        type: {
            type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 5,
            },
        },
    },
    {
        sequelize,
        modelName: 'Goal',
        tableName: 'goals',
        timestamps: true,
    }
);

// Define associations
Goal.belongsTo(User, { foreignKey: 'userId' });
Goal.belongsTo(Habit, { foreignKey: 'habitId' });

export default Goal;
