import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import { calculatePortfolio } from '../utils/portfolioCalculator';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    if (error instanceof Error) 
    res.status(400).json({ error: error.message });
  }
};

export const getPortfolio = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    const portfolio = await calculatePortfolio(transactions);
    res.json(portfolio);
  } catch (error) {
    if (error instanceof Error) 
    res.status(400).json({ error: error.message });
  }
};

export const getPortfolioHistory = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    if (error instanceof Error) 
    res.status(400).json({ error: error.message });
  }
};
