import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public notificationPreference!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notificationPreference: {
            type: DataTypes.STRING, // Example: "email", "push"
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
