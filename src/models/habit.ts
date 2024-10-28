import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Habit extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public frequency!: string;
    public userId!: number;
}

Habit.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
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

export default Habit;
