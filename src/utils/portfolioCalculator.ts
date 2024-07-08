import { ITransaction } from '../models/transaction'; // Importing the ITransaction interface from the transaction model

// Interface representing a portfolio
interface Portfolio {
  totalValue: number; // Total value of the portfolio
  profitLoss: number; // Total profit or loss of the portfolio
  assetAllocation: { [key: string]: number }; // Allocation of assets in the portfolio
}

// Function to calculate the portfolio's total value, profit/loss, and asset allocation
export const calculatePortfolio = async (transactions: ITransaction[]): Promise<Portfolio> => {
  let totalValue = 0; // Initialize total value to zero
  let profitLoss = 0; // Initialize profit/loss to zero
  const assetAllocation: { [key: string]: number } = {}; // Initialize asset allocation as an empty object

  // Iterate over each transaction to calculate total value and asset allocation
  transactions.forEach(transaction => {
    if (transaction.type === 'buy' || transaction.type === 'sell') {
      const asset = transaction.asset!; // Retrieve the asset involved in the transaction
      const value = transaction.amount * transaction.price!; // Calculate the value of the transaction
      if (transaction.type === 'buy') {
        totalValue += value; // Add the value to the total value for buy transactions
        assetAllocation[asset] = (assetAllocation[asset] || 0) + transaction.amount; // Update the asset allocation
      } else if (transaction.type === 'sell') {
        totalValue -= value; // Subtract the value from the total value for sell transactions
        assetAllocation[asset] = (assetAllocation[asset] || 0) - transaction.amount; // Update the asset allocation
      }
    } else if (transaction.type === 'deposit') {
      totalValue += transaction.amount; // Add the amount to the total value for deposit transactions
    } else if (transaction.type === 'withdrawal') {
      totalValue -= transaction.amount; // Subtract the amount from the total value for withdrawal transactions
    }
  });

  // Calculate initial balance from deposit and withdrawal transactions
  const initialBalance = transactions.reduce((sum, transaction) => {
    if (transaction.type === 'deposit') return sum + transaction.amount; // Add deposit amounts to the sum
    if (transaction.type === 'withdrawal') return sum - transaction.amount; // Subtract withdrawal amounts from the sum
    return sum;
  }, 0);

  profitLoss = totalValue - initialBalance; // Calculate the profit or loss

  // Logging for debugging purposes
  console.log(initialBalance, "initialBalance");
  console.log(totalValue, "totalValue");
  console.log(profitLoss, "profitLoss");

  // Return the calculated portfolio
  return { totalValue, profitLoss, assetAllocation };
};
