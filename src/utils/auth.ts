import jwt from 'jsonwebtoken'; // Importing the jsonwebtoken library

/**
 * Generates a JWT token for the given user ID.
 *
 * @param userId - The user ID to include in the token.
 * @returns The generated JWT token.
 */
const generateToken = (userId: string): string => {
  const payload = { userId }; // Creating the payload with the user ID
  const secret = process.env.JWT_SECRET!; // Retrieving the JWT secret from environment variables
  const options = { expiresIn: '1h' }; // Setting the token expiration time to 1 hour

  return jwt.sign(payload, secret, options); // Generating and returning the JWT token
};

export default generateToken; // Exporting the generateToken function as the default export
