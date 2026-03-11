import { Request, Response } from "express";
import { ConversationRepository } from "../repository/conversation.repository";
import { MessageRepository } from "../repository/message.repository";

export const fetchUserConversationList = async (req: Request, res: Response) => {
    const userId = req.user.id

    try {
        const userConversations = await ConversationRepository.findUserConversationList(userId)

        return res.status(200).json({
            message: 'Successfully fetch conversations',
            data: userConversations
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error. Please try again later',
        })
    }
}

export const fetchUserConversation = async (req: Request, res: Response) => {
    const { receiverUserId, senderUserId } = req.body;

    try {
        const conversationData = await ConversationRepository.findUserConversation(receiverUserId, senderUserId);

        return res.status(200).json({
            message: 'Successfully fetch conversations',
            data: conversationData
        })
    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Internal server error. Please try again later',
        })
    }
}

export const fetchConversationMessages = async (req: Request, res: Response) => {
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






