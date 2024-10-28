import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users'; // Ensure the path is correct

class Goal extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public title!: string;
    public achieved!: boolean;
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        achieved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'Goal',
        tableName: 'goals',
        timestamps: true,
    }
);

// Move associations here
Goal.belongsTo(User, { foreignKey: 'userId' });

export default Goal;
