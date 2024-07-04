import { Request, Response } from 'express';
import User from '../models/user';
import generateToken from '../utils/auth';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await hashPassword(password);
    user = new User({ email, password: hashedPassword });
    await user.save();

    const token = generateToken(user.id.toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login an existing user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id.toString());
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
