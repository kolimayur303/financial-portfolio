import mongoose, { Document, Schema } from 'mongoose';

// Interface for TypeScript
export interface IUser extends Document {
  email: string;
  password: string;
}

// Schema definition
const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 15,
  },
});

// Create and export the model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
