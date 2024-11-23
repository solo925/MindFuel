import express from 'express';
import sequelize from './config/db';
import './models/Goal';
import './models/Habit';
import './models/Recommendation';
import './models/Report';
import './models/Users';
import './models/associaetions';
import mainRoute from './routes/main';




const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Welcome to MindFuel!');
});

app.use('/api/v1', mainRoute)


sequelize.sync().then(() => {
    console.log('Database synced!');
});

export default app;
