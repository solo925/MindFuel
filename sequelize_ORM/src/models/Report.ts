// src/models/Report.ts
import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

class Report extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public date!: Date;
    public mood!: number;
    public energy!: number;
}

Report.init(
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
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        mood: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        energy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Report',
        tableName: 'reports',
        timestamps: true,
    }
);

// Associations
Report.belongsTo(User, { foreignKey: 'userId' });

export default Report;
