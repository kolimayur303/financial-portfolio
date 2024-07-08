import { Request, Response, NextFunction } from 'express'; // Importing Request, Response, and NextFunction types from Express
import jwt, { JwtPayload } from 'jsonwebtoken'; // Importing jwt and JwtPayload types from jsonwebtoken

// Extending the Request interface to include an optional user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

// Middleware function to authenticate requests
const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' }); // Return an error if no token is provided
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' }); // Return an error if the token is invalid
  }
};

export default auth; // Export the auth middleware function as the default export
