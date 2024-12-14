import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

class Habit extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public name!: string;
    public description?: string;
    public frequency!: number;
    public unit!: string
    public nextReminder?: Date;
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
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nextReminder: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Habit',
        tableName: 'habits',
        timestamps: true,
    }
);


Habit.belongsTo(User, { foreignKey: 'userId' });

export default Habit;
