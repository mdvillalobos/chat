import mongoose, {Schema} from "mongoose";

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'conversations',
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
    },
    attachment: [{
        type: String,
        default: null
    }],
    reactions: [{
        userId: String,
        emoji: String,
    }],
    readBy: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        readAt: Date
    }],
    isEdited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

MessageSchema.index({ conversationId: 1, createdAt: -1 })

const MessageModel = mongoose.model('messages', MessageSchema);

export default MessageModel;