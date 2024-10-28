import app from './app';
import sequelize from './config/db';

const PORT = process.env.PORT || 3000;

// Database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error('Unable to connect to database:', error));
