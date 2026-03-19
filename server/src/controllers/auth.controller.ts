import dotenv from "dotenv"

dotenv.config()

import { Request, Response } from 'express';
import { UserRepository } from "../repository/user.repository";
import {AuthService} from "../services/auth.service";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const { token, user } = await AuthService.login(email, password);

            return res
                .status(200)
                .cookie("token", token, { httpOnly: true, secure: true })
                .json({ message: "Login successfully", data: user });

        } catch (error) {
            if (error.message === "INVALID_CREDENTIALS") {
                return res.status(400).json({
                    message: "Incorrect email or password",
                });
            }

            console.error(`Login error: ${error}`);
            return res.status(500).json({
                message: "Internal server error. Please try again later",
            });
        }
    }

    static async register(req: Request, res: Response) {
        try {
            const { token, user } = await AuthService.register(req.body);

            return res
                .status(201)
                .cookie("token", token, { httpOnly: true, secure: true })
                .json({ message: "Registered successfully", data: user });

        } catch (error: any) {
            switch (error.message) {
                case "MISSING_FIELDS":
                    return res.status(400).json({ message: "All fields are required!" });

                case "INVALID_EMAIL":
                    return res.status(400).json({ message: "Invalid email format!" });

                case "PASSWORD_MISMATCH":
                    return res.status(400).json({ message: "Passwords don't match" });

                case "EMAIL_EXISTS":
                    return res.status(409).json({ message: "Email already exists" });

                default:
                    console.error(`Register error: ${error}`);
                    return res.status(500).json({
                        message: "Internal server error. Please try again later",
                    });
            }
        }
    }

    static async registerPersonalInfo(req: Request, res: Response) {
        const { firstName, lastName, contactNumber } = req.body;
        const { id } = req.user

        if (!firstName || !lastName || !contactNumber) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        try {
            const userData = {
                firstName,
                lastName,
                contactNumber,
            }

            const updatedUser = await UserRepository.findUserAndUpdateInfo(id, userData)

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({
                message: "Account information registered successfully",
                data: updatedUser,
            });
        } catch (error) {
            console.error(`Profile registration error: ${error}`);
            return res.status(500).json({
                message: "Internal server error. Please try again later",
            });
        }
    }
}
