import express from 'express'; // Importing Express
import { register, login } from '../controllers/authController'; // Importing the register and login controller functions

const router = express.Router(); // Creating a new router instance

// User registration route
// This route handles POST requests to /register and calls the register controller function
router.post('/register', register);

// User login route
// This route handles POST requests to /login and calls the login controller function
router.post('/login', login);

export default router; // Exporting the router as the default export
