import Goal from './Goal';
import Habit from './Habit';
import Recommendation from './Recommendation';
import Report from './Report';
import User from './Users';


User.hasMany(Habit, { foreignKey: 'userId' });
User.hasMany(Goal, { foreignKey: 'userId' });
User.hasMany(Report, { foreignKey: 'userId' });
User.hasMany(Recommendation, { foreignKey: 'userId' });


Goal.belongsTo(User, { foreignKey: 'userId' });


Habit.belongsTo(User, { foreignKey: 'userId' });

Report.belongsTo(User, { foreignKey: 'userId' });


