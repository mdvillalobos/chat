import dotenv from "dotenv"
import validator from 'validator'

dotenv.config()

import { Request, Response } from 'express';
import { comparePassword, generateAuthToken, hashPassword } from "../helpers/auth.helpers";
import { UserRepository } from "../repository/user.repository";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const userData = await UserRepository.findUserByEmail(email);

            if (!userData || !(await comparePassword(password, userData.password))) {
                return res.status(400).json({
                    message: "Incorrect email or password",
                });
            }

            const token = generateAuthToken(userData._id.toString());

            return res
                .status(200)
                .cookie("token", token, { httpOnly: true, secure: true })
                .json({ message: "Login successfully", data: userData });
        } catch (error) {
            console.error(`Login error: ${error}`);
            return res.status(500).json({
                message: "Internal server error. Please try again later",
            });
        }
    }

    static async register(req: Request, res: Response) {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        try {
            const hashedPassword = await hashPassword(password);

            const newUser = await UserRepository.createUser(email, hashedPassword)

            const token = generateAuthToken(newUser._id.toString());

            return res
                .status(201)
                .cookie("token", token, { httpOnly: true, secure: true })
                .json({ message: "Registered successfully", data: newUser });
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(409).json({ message: "Email already exists" });
            }
            console.error(`Register error: ${error}`);
            return res.status(500).json({
                message: "Internal server error. Please try again later",
            });
        }
    }

    static async registerPersonalInfo(req: Request, res: Response) {
        const { firstName, lastName, contactNumber } = req.body;
        const { id } = req.user

        if (!firstName || !lastName || !contactNumber) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        try {
            const userInfo = {
                firstName,
                lastName,
                contactNumber,
            }

            const updatedUser = await UserRepository.findUserAndUpdateInfo(id, userInfo)

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
