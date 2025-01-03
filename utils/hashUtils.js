import User from '../models/User.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password) => {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      throw new Error('Error hashing password: ' + error.message);
    }
  };

export const checkHash = async (plainText, hash) => {
    try {
        const result = await bcrypt.compare(plainText, hash);
        return result;
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
};