import { Router } from 'express';
import { createTransaction, getPortfolio, getPortfolioHistory } from '../controllers/transactionController';
import auth from '../middleware/auth';

const router = Router();

router.post('/transactions', auth, createTransaction);
router.get('/portfolio', auth, getPortfolio);
router.get('/portfolio/history', auth, getPortfolioHistory);

export default router;
