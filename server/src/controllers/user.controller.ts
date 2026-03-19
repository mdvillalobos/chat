import { Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";


export class UserController {
    static async getUserData(req: Request, res: Response) {
        const { id } = req.user

        try {
            const userData = await UserRepository.findUserData(id);

            return res.status(200).json({
                message: 'User found',
                data: userData
            });
        } catch(error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Internal server error. Please try again later',
            })
        }
    }

    static async searchUserAccount(req: Request, res: Response) {
        const { id } = req.user
        const { userName } = req.body;

        try {
            const searchResult = await UserRepository.searchUserByName(id, userName)

            res.status(200).json({
                message: 'Successfully searching user',
                data: searchResult
            });
        } catch(error) {

        }
    }
}