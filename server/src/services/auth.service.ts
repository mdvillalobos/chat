import validator from 'validator'
import { UserRepository } from '../repository/user.repository'
import { comparePassword, generateAuthToken, hashPassword } from "../helpers/auth.helpers";


type RegisterBody = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}


export class AuthService {
    static async login(email: string, password: string) {
        const userData = await UserRepository.findUserByEmail(email);

        if (!userData || !(await comparePassword(password, userData.password))) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = generateAuthToken(userData._id.toString());
        return { token, user: userData };
    }

    static async register(data: RegisterBody) {
        const { firstName, lastName, email, password, confirmPassword } = data;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            throw new Error("MISSING_FIELDS");
        }

        if (!validator.isEmail(email)) {
            throw new Error("INVALID_EMAIL");
        }

        if (password !== confirmPassword) {
            throw new Error("PASSWORD_MISMATCH");
        }

        const existingUser = await UserRepository.findUserByEmail(email);

        if (existingUser) {
            throw new Error("EMAIL_EXISTS");
        }

        const hashedPassword = await hashPassword(password);

        const accountInfo = {
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
        };

        const newUser = await UserRepository.createUser(
            email,
            hashedPassword,
            accountInfo
        );

        const token = generateAuthToken(newUser._id.toString());

        return {
            user: newUser,
            token,
        };
    }
}