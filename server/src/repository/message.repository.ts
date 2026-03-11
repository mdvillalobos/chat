import MessageModel from "../model/message.model";

export class MessageRepository {
    static async findConversationMessages (conversationId: string ) {
        return MessageModel
            .find({ conversationId: conversationId })
            .sort({ createdAt: -1 })
            .limit(20)
    }

    static async createMessage(conversationId: string, senderId: string, textMessage: string) {
        return MessageModel.create({
            conversationId: conversationId,
            senderId,
            text: textMessage.trim(),
            readBy: [{
                userId: senderId,
                readAt: new Date()
            }],
        });
    }
}
