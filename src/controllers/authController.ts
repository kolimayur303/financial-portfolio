import { Request, Response } from 'express'; // Importing Request and Response types from Express
import User from '../models/user'; // Importing the User model
import generateToken from '../utils/auth'; // Importing the function to generate JWT tokens
import { hashPassword, comparePassword } from '../utils/passwordUtils'; // Importing password utility functions

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Extract email and password from the request body

  try {
    // Check if a user with the given email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already exists' }); // Return error if email already exists
    }

    // Hash the password and create a new user
    const hashedPassword = await hashPassword(password);
    user = new User({ email, password: hashedPassword });
    await user.save(); // Save the new user to the database

    const token = generateToken(user.id.toString()); // Generate a JWT token for the user
    res.status(201).json({ token }); // Return the token in the response
  } catch (error) {
    res.status(500).json({ error: 'Server error' }); // Return a server error if something goes wrong
  }
};

// Login an existing user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Extract email and password from the request body

  try {
    // Find the user with the given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' }); // Return error if user is not found
    }

    // Compare the given password with the hashed password in the database
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' }); // Return error if passwords do not match
    }

    const token = generateToken(user.id.toString()); // Generate a JWT token for the user
    res.json({ token }); // Return the token in the response
  } catch (error) {
    res.status(500).json({ error: 'Server error' }); // Return a server error if something goes wrong
  }
};
