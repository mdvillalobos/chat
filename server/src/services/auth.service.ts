import { UserRepository } from '../repository/user.repository'
import { comparePassword, generateAuthToken } from "../helpers/auth.helpers";

export class AuthService {
    static async login(email: string, password: string) {
        const user = await UserRepository.findUserByEmail(email);

        if (!user || !(await comparePassword(password, user.password))) {
            throw new Error("Incorrect email or password");
        }

        const token = generateAuthToken(user._id.toString());
        return { user, token };
    }
}