import mongoose from 'mongoose'; // Importing mongoose to interact with MongoDB

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected'); // Log a success message if the connection is established
  } catch (error) {
    console.error('MongoDB connection error:', error); // Log any errors that occur during connection
    process.exit(1); // Exit the process with a failure code if the connection fails
  }
};

export default connectDB; // Export the connectDB function as the default export
