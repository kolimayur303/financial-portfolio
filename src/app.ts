import express from 'express'; // Importing the Express framework
import connectDB from './config/database'; // Importing the database connection function
import transactionRoutes from './routes/transactionRoutes'; // Importing the transaction routes
import userRoutes from './routes/userRoutes'; // Importing the user routes
import { PORT } from './config'; // Importing the port configuration

const app = express(); // Creating an instance of Express

app.use(express.json()); // Middleware to parse JSON bodies

// Mounting the user routes at /api/users
app.use('/api/users', userRoutes);

// Mounting the transaction routes at /api
app.use('/api', transactionRoutes);

connectDB(); // Connecting to the MongoDB database

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Logging that the server is running
});
