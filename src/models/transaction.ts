import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell';
  amount: number;
  asset?: string;
  price?: number;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  type: { type: String, required: true, enum: ['deposit', 'withdrawal', 'buy', 'sell'] },
  amount: { type: Number, required: true },
  asset: { type: String, required: function() { return this.type === 'buy' || this.type === 'sell'; } },
  price: { type: Number, required: function() { return this.type === 'buy' || this.type === 'sell'; } },
  date: { type: Date, required: true }
});

const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;

