import { ITransaction } from '../models/transaction';

interface Portfolio {
  totalValue: number;
  profitLoss: number;
  assetAllocation: { [key: string]: number };
}

export const calculatePortfolio = async (transactions: ITransaction[]): Promise<Portfolio> => {
  let totalValue = 0;
  let profitLoss = 0;
  const assetAllocation: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    if (transaction.type === 'buy' || transaction.type === 'sell') {
      const asset = transaction.asset!;
      const value = transaction.amount * transaction.price!;
      if (transaction.type === 'buy') {
        totalValue += value;
        assetAllocation[asset] = (assetAllocation[asset] || 0) + transaction.amount;
      } else if (transaction.type === 'sell') {
        totalValue -= value;
        assetAllocation[asset] = (assetAllocation[asset] || 0) - transaction.amount;
      }
    } else if (transaction.type === 'deposit') {
      totalValue += transaction.amount;
    } else if (transaction.type === 'withdrawal') {
      totalValue -= transaction.amount;
    }
  });

  // Calculate profit/loss
  const initialBalance = transactions.reduce((sum, transaction) => {
    if (transaction.type === 'deposit') return sum + transaction.amount;
    if (transaction.type === 'withdrawal') return sum - transaction.amount;
    return sum;
  }, 0);
  profitLoss = totalValue - initialBalance;

  return { totalValue, profitLoss, assetAllocation };
};
