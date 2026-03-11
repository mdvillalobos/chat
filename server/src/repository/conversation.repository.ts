import ConversationModel from "../model/conversation.model";
import { Types } from "mongoose";

export class ConversationRepository {
    static async findUserConversationList(userId: string) {
        return ConversationModel.find({
            "participants.userId": userId
        })
            .sort({ updatedAt: -1 })
            .populate({
                path: "participants.userId",
                select: "accountInfo.fullName accountInfo.profilePicture status"
            })
            .lean();
    }

    static async findUserConversation(conversationId: string, userId: string) {
        return ConversationModel.findOne({
            _id: conversationId,
            "participants.userId": userId
        });
    }

    static async findConversationAndUpdate(senderId: string, recipientId: string) {
        return ConversationModel.findOneAndUpdate(
            {
                messageType: "PRIVATE",
                participants: {
                    $all: [
                        { $elemMatch: { userId: new Types.ObjectId(senderId) } },
                        { $elemMatch: { userId: new Types.ObjectId(recipientId) } },
                    ],
                },
            },
            {
                $setOnInsert: {
                    messageType: "PRIVATE",
                    participants: [
                        { userId: senderId },
                        { userId: recipientId },
                    ],
                },
            },
            { upsert: true, new: true }
        );
    }
}