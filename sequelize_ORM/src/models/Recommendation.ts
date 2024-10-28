// src/models/Recommendation.ts
import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

class Recommendation extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public message!: string;
}

Recommendation.init(
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
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Recommendation',
        tableName: 'recommendations',
        timestamps: true,
    }
);

// Associations
Recommendation.belongsTo(User, { foreignKey: 'userId' });

export default Recommendation;
