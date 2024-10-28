import Goal from './Goal';
import Habit from './Habit';
import Recommendation from './Recommendation';
import Report from './Report';
import User from './Users';

// User Associations
User.hasMany(Habit, { foreignKey: 'userId' });
User.hasMany(Goal, { foreignKey: 'userId' });
User.hasMany(Report, { foreignKey: 'userId' });
User.hasMany(Recommendation, { foreignKey: 'userId' });

// Goal Associations
Goal.belongsTo(User, { foreignKey: 'userId' });

// Habit Associations
Habit.belongsTo(User, { foreignKey: 'userId' });

Report.belongsTo(User, { foreignKey: 'userId' });

// Add other associations if needed
