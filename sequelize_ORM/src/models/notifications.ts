import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

// Define the attributes of the Notification model
export interface NotificationAttributes {
    id: string;
    userId: string;
    message: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define the creation attributes where "id", "read", and "createdAt" are optional
interface NotificationCreationAttributes extends Optional<NotificationAttributes, "id" | "read" | "createdAt" | "updatedAt"> { }

// Define the Notification class which extends Sequelize's Model class
class Notification extends Model<NotificationAttributes, NotificationCreationAttributes>
    implements NotificationAttributes {
    public id!: string;
    public userId!: string;
    public message!: string;
    public read!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// Initialize the model
Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, // Make id a primary key
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID, // Make sure this field is UUID as well
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false // Ensure that message is required
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false // Default the read status to false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // Set the default to the current timestamp
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Default the update timestamp to the current timestamp
            onUpdate: "CASCADE" // Automatically update the timestamp on row modification
        }
    },
    {
        sequelize,
        modelName: "Notification",
        timestamps: true // Ensure timestamps are handled by Sequelize
    }
);

export default Notification;
