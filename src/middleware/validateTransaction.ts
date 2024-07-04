import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const transactionSchema = Joi.object({
  type: Joi.string().valid('deposit', 'withdrawal', 'buy', 'sell').required(),
  amount: Joi.number().required(),
  asset: Joi.string().when('type', { is: Joi.string().valid('buy', 'sell'), then: Joi.required() }),
  price: Joi.number().when('type', { is: Joi.string().valid('buy', 'sell'), then: Joi.required() }),
  date: Joi.date().required()
});

const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export default validateTransaction;
