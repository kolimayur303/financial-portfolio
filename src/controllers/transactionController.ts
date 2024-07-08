import { Request, Response } from 'express'; // Importing Request and Response types from Express
import Transaction from '../models/transaction'; // Importing the Transaction model
import { calculatePortfolio } from '../utils/portfolioCalculator'; // Importing the portfolio calculation utility function

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    // Create a new transaction with the data from the request body
    const transaction = new Transaction(req.body);
    await transaction.save(); // Save the transaction to the database
    res.status(201).json(transaction); // Return the created transaction in the response
  } catch (error) {
    if (error instanceof Error) 
      res.status(400).json({ error: error.message }); // Return a client error if something goes wrong
  }
};

// Get the current portfolio
export const getPortfolio = async (req: Request, res: Response) => {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();
    // Calculate the portfolio based on the retrieved transactions
    const portfolio = await calculatePortfolio(transactions);
    res.json(portfolio); // Return the calculated portfolio in the response
  } catch (error) {
    if (error instanceof Error) 
      res.status(400).json({ error: error.message }); // Return a client error if something goes wrong
  }
};

// Get the portfolio history
export const getPortfolioHistory = async (req: Request, res: Response) => {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();
    res.json(transactions); // Return the transactions in the response
  } catch (error) {
    if (error instanceof Error) 
      res.status(400).json({ error: error.message }); // Return a client error if something goes wrong
  }
};
