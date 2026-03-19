import { Request, Response } from 'express';
import { MessageRepository } from "../repository/message.repository";

export class MessagesController {
    static async getConversationMessages(req: Request, res: Response) {
        const { conversationId } = req.body;

        try {
            const conversationMessages = await MessageRepository.findConversationMessages(conversationId)

            return res.status(200).json({
                message: 'Successfully fetch conversation messages',
                data: conversationMessages
            })
        } catch(error) {
            console.error(error);

            res.status(500).json({
                message: 'Internal server error. Please try again later',
            })
        }
    }
}