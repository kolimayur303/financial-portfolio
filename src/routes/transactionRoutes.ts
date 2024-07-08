import { Router } from 'express'; // Importing Router from Express
import { createTransaction, getPortfolio, getPortfolioHistory } from '../controllers/transactionController'; // Importing transaction-related controller functions
import auth from '../middleware/auth'; // Importing the authentication middleware

const router = Router(); // Creating a new router instance

// Define a route for creating a transaction
// This route is protected by the auth middleware
router.post('/transactions', auth, createTransaction);

// Define a route for getting the current portfolio
// This route is protected by the auth middleware
router.get('/portfolio', auth, getPortfolio);

// Define a route for getting the portfolio history
// This route is protected by the auth middleware
router.get('/portfolio/history', auth, getPortfolioHistory);

export default router; // Export the router as the default export
