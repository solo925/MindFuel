import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import sequelize from './config/db';
import './models/Goal';
import './models/Habit';
import './models/Recommendation';
import './models/Report';
import './models/Users';
import './models/associaetions';
import mainRoute from './routes/main';
import { globalErrorHandler } from './middlewares/errorHandler';
import configureCors from './config/corsConfig';
import urlVersioning from './middlewares/apiVersion/apiversionMiddleware';
import { addTimeStamp, requestLogger } from './middlewares/customeMidlleware';

const app = express();

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors())
app.use(urlVersioning("v1"))
app.use(express.json());
app.use(cookieParser());
app.use(globalErrorHandler);


// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// }));



app.get('/', (req, res) => {
    res.send('Welcome to MindFuel!');
});

app.use('/api/v1', mainRoute)


sequelize.sync().then(() => {
    console.log('Database synced!');
});

export default app;
