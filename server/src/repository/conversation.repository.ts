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
            .limit(20)
            .lean();
    }

    static async findUserConversationById(conversationId: string) {
        return ConversationModel.findById(conversationId);
    }

    static async findUserConversation(senderId: string, receiverId: string) {
        return ConversationModel.findOne({
            participants: {
                $all: [
                    { $elemMatch: { userId: new Types.ObjectId(senderId) } },
                    { $elemMatch: { userId: new Types.ObjectId(receiverId) } },
                ]
            }
        })
    }

    static async findConversationOrCreate(senderId: string, recipientId: string) {
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