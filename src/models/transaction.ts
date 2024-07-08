import { Schema, model, Document } from 'mongoose'; // Importing necessary modules from Mongoose

// Defining an interface for the Transaction document
export interface ITransaction extends Document {
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell'; // The type of transaction, which can be one of the specified values
  amount: number; // The amount of the transaction
  asset?: string; // The asset involved in the transaction (optional, depending on the type)
  price?: number; // The price of the asset (optional, depending on the type)
  date: Date; // The date of the transaction
}

// Defining the schema for the Transaction model
const transactionSchema = new Schema<ITransaction>({
  type: { type: String, required: true, enum: ['deposit', 'withdrawal', 'buy', 'sell'] }, // The type field, which is required and must be one of the specified values
  amount: { type: Number, required: true }, // The amount field, which is required
  asset: { type: String, required: function() { return this.type === 'buy' || this.type === 'sell'; } }, // The asset field, which is required if the type is 'buy' or 'sell'
  price: { type: Number, required: function() { return this.type === 'buy' || this.type === 'sell'; } }, // The price field, which is required if the type is 'buy' or 'sell'
  date: { type: Date, required: true } // The date field, which is required
});

// Creating the Transaction model based on the schema
const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction; // Exporting the Transaction model as the default export
