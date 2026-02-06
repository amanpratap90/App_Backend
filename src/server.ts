import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import habitRoutes from './routes/habitRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send('HabitFlow Backend is running');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
