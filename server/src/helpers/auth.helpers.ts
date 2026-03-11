import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw err;
    }
};

export const comparePassword = (password: string, hashedPassword: string): Promise<Boolean> => {
    return bcrypt.compare(password, hashedPassword)
}

export const generateAuthToken = (userId: string) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET);
}