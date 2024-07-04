import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for the given user ID.
 *
 * @param userId - The user ID to include in the token.
 * @returns The generated JWT token.
 */
const generateToken = (userId: string): string => {
  const payload = { userId };
  const secret = process.env.JWT_SECRET!;
  const options = { expiresIn: '1h' }; // Token expiration time

  return jwt.sign(payload, secret, options);
};

export default generateToken;
