import express from 'express';
import dotenv from 'dotenv';
// Force restart
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config({ override: true });

connectDB();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://authusingmern.netlify.app', process.env.CLIENT_URL].filter(Boolean),
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
