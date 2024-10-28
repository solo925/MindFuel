import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './Users';

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
    }
);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export default Post;
