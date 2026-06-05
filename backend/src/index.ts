import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes'
import expenseRoutes from './routes/expense.routes'
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
}));
app.use(express.json()); // allow JSON body parsing
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes)

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})