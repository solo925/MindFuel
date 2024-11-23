import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

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

Goal.belongsTo(User, { foreignKey: 'userId' });

export default Goal;
