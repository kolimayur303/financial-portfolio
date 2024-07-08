import { Request, Response, NextFunction } from 'express'; // Importing Request, Response, and NextFunction types from Express
import Joi from 'joi'; // Importing Joi for schema validation

// Defining a Joi schema for validating transaction objects
const transactionSchema = Joi.object({
  type: Joi.string().valid('deposit', 'withdrawal', 'buy', 'sell').required(), // The type of transaction, which must be one of the specified values and is required
  amount: Joi.number().required(), // The amount of the transaction, which must be a number and is required
  asset: Joi.string().when('type', { is: Joi.string().valid('buy', 'sell'), then: Joi.required() }), // The asset involved in the transaction, which is required if the type is 'buy' or 'sell'
  price: Joi.number().when('type', { is: Joi.string().valid('buy', 'sell'), then: Joi.required() }), // The price of the asset, which is required if the type is 'buy' or 'sell'
  date: Joi.date().required() // The date of the transaction, which must be a valid date and is required
});

// Middleware function to validate transaction requests
const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { error } = transactionSchema.validate(req.body); // Validate the request body against the transaction schema
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Return a 400 status and the validation error message if validation fails
  }
  next(); // Call the next middleware or route handler if validation succeeds
};

export default validateTransaction; // Export the validateTransaction middleware function as the default export
