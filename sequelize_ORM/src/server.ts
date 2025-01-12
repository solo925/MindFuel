import app from './app';
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('DB Config:', {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });
  