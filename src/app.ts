import express from 'express';
import connectDB from './config/database';
import transactionRoutes from './routes/transactionRoutes';
import userRoutes from './routes/userRoutes';
import { PORT } from './config';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', transactionRoutes);

connectDB();

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});