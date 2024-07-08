import bcrypt from 'bcryptjs'; // Importing the bcryptjs library for password hashing and comparison

// Function to hash the password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the generated salt
  return hashedPassword; // Return the hashed password
};

// Function to compare passwords
export const comparePassword = async (candidatePassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, hashedPassword); // Compare the candidate password with the hashed password and return the result
};
