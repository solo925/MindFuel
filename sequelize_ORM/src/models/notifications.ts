import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

class Notification extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public message!: string;
    public isRead!: boolean;
}

Notification.init(
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
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'Notification',
        tableName: 'notifications',
        timestamps: true,
    }
);

// Associations
Notification.belongsTo(User, { foreignKey: 'userId' });

export default Notification;
