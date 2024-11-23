import { DataTypes, ForeignKey, Model } from 'sequelize';
import sequelize from '../config/db';
import Goal from './Goal';
import Habit from './Habit';
import Recommendation from './Recommendation';
import User from './Users';

class Report extends Model {
    public id!: string;
    public userId!: ForeignKey<string>;
    public habitId!: ForeignKey<string>;
    public goalId!: ForeignKey<string>;
    public recommendationId!: ForeignKey<string>;
    public content!: string;
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
        habitId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        goalId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        recommendationId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
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


Report.belongsTo(User, { foreignKey: 'userId' });
Report.belongsTo(Habit, { foreignKey: 'habitId' });
Report.belongsTo(Goal, { foreignKey: 'goalId' });
Report.belongsTo(Recommendation, { foreignKey: 'recommendationId' });

export default Report;
