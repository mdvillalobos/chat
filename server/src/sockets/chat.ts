import { Server, Socket } from 'socket.io'
import { ConversationRepository } from "../repository/conversation.repository";
import { MessageRepository } from "../repository/message.repository";

export const chatHandler = (socket: Socket, io: Server) => {
    socket.on("join-conversation", (conversationId) => {
        socket.join(conversationId);
    });

    socket.on("send-message", async (data) => {
        const senderId = socket.data.user
        const { conversationId, recipientId, textMessage } = data;

        if (!textMessage?.trim()) {
            return socket.emit("message-error", { message: "Message cannot be empty" });
        }

        try {
            const conversation = conversationId
                ? await ConversationRepository.findUserConversationById(conversationId)
                : await ConversationRepository.findConversationOrCreate(senderId, recipientId);

            if(conversationId && !conversation) {
                return socket.emit("message-error", {
                    message: "You are not a member of this conversation",
                });
            }

            socket.join(conversation._id.toString());
            const message = await MessageRepository.createMessage(conversation._id.toString(), senderId, textMessage);

            conversation.lastMessage = {
                messageId: message._id,
                senderId,
                text: textMessage.trim(),
            };

            await conversation.save();

            io.to(conversation._id.toString()).emit("new-message", { message });
        } catch(err) {
          console.log(err);
        }
    })

    // socket.on("read-message", async ({ conversationId, messageIds }: { conversationId: string, messageIds: string[] }) => {
    //     try {
    //         const conversation = await findConversationById(conversationId);
    //
    //         if (!conversation) return;
    //
    //         if(conversation.messageType === 'GROUP') {
    //             await MessageModel.updateMany(
    //                 {
    //                     _id: { $in: messageIds.map(id => new mongoose.Types.ObjectId(id)) }
    //                 },
    //                 {
    //                     $addToSet: {
    //                         readBy: {
    //                             userId: socket.data.user,
    //                             readAt: new Date()
    //                         }
    //                     }
    //                 }
    //             );
    //         }
    //
    //         else {
    //             await ConversationModel.updateOne(
    //                 {
    //                     _id: conversationId,
    //                     "participants.userId": socket.data.user
    //                 },
    //                 {
    //                     $set: {
    //                         "participants.$.lastRead": new Date()
    //                     }
    //                 }
    //             );
    //         }
    //
    //         socket.to(conversationId).emit("message-read", {
    //             userId: socket.data.user,
    //             messageIds
    //         });
    //
    //     } catch(err) {
    //         console.error(err);
    //     }
    // })

    socket.on("typing", ({ conversationId, isTyping }: { conversationId: string; isTyping: boolean }) => {
        if (!conversationId) return;

        io.to(conversationId).emit("user-typing", {
            userId: socket.data.user,
            isTyping,
        });
    });

}