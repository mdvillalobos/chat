import { Request, Response } from "express";
import { ConversationRepository } from "../repository/conversation.repository";

export class ConversationController {
    static async getUserConversationList(req: Request, res: Response) {
        const { id } = req.user;

        try {
            const userConversationList = await ConversationRepository.findUserConversationList(id)

            return res.status(200).json({
                message: 'Successfully fetch conversations',
                data: userConversationList
            })
        } catch(error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error. Please try again later',
            })
        }
    }

    static async getConversation(req: Request, res: Response) {
        const { senderUserId, receiverUserId } = req.body;

        try {
            const conversationData = await ConversationRepository.findUserConversation(senderUserId, receiverUserId);

            return res.status(200).json({
                message: 'Successfully fetch conversations',
                data: conversationData?._id
            })
        } catch(error) {
            console.error(error);

            res.status(500).json({
                message: 'Internal server error. Please try again later',
            })
        }
    }
}





