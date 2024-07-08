import dotenv from 'dotenv'; // Importing dotenv to load environment variables from a .env file
dotenv.config(); // Load environment variables from the .env file into process.env

// Export the PORT variable, which is either the value from the environment variable or 3000 if not defined
export const PORT = process.env.PORT || 3000;

// Export the MONGODB_URI variable, which is required and should be defined in the environment variables
export const MONGODB_URI = process.env.MONGODB_URI!;

// Export the JWT_SECRET variable, which is required and should be defined in the environment variables
export const JWT_SECRET = process.env.JWT_SECRET!;
