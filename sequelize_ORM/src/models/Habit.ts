// src/models/Habit.ts
import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

class Habit extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public name!: string;
    public description?: string;
    public frequency!: number;
}

Habit.init(
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Habit',
        tableName: 'habits',
        timestamps: true,
    }
);

// Associations
Habit.belongsTo(User, { foreignKey: 'userId' });

export default Habit;
