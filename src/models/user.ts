import mongoose, { Document, Schema } from 'mongoose'; // Importing necessary modules from Mongoose

// Interface for TypeScript, representing a User document
export interface IUser extends Document {
  email: string; // The user's email
  password: string; // The user's password
}

// Schema definition for the User model
const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String, // Email is of type String
    required: true, // Email is required
    unique: true, // Email must be unique
    lowercase: true, // Email will be stored in lowercase
    trim: true, // Trim whitespace from email
  },
  password: {
    type: String, // Password is of type String
    required: true, // Password is required
    minlength: 15, // Password must have at least 15 characters
  },
});

// Create and export the User model based on the schema
const User = mongoose.model<IUser>('User', UserSchema);
export default User; // Exporting the User model as the default export
