import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import Habit from './Habit';
import User from './Users';

class HabitProgress extends Model {
    public id!: string;
    public habitId!: ForeignKey<string>;
    public userId!: ForeignKey<string>;
    public date!: Date;
    public completed!: boolean;
}

HabitProgress.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        habitId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'HabitProgress',
        tableName: 'habit_progress',
        timestamps: true,
    }
);

// Associations
HabitProgress.belongsTo(Habit, { foreignKey: 'habitId' });
HabitProgress.belongsTo(User, { foreignKey: 'userId' });

export default HabitProgress;
