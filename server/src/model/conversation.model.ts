import mongoose, {Schema} from "mongoose";

const ParticipantSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    lastRead: {
        type: Date,
        default: null,
    },
    nickname: {
        type: String,
        default: null,
    },
    isMuted: {
        type: Boolean,
        default: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { _id: false });

const LastMessageSchema = new Schema({
    messageId: {
        type: Schema.Types.ObjectId,
        ref: 'messages',
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    text: String,
}, { _id: false });

const ConversationSchema = new Schema({
    messageType: {
        type: String,
        enum: ['PRIVATE', 'GROUP'],
        required: true
    },
    participants: [ParticipantSchema],
    lastMessage: {
        type: LastMessageSchema,
        default: null
    },
    groupName: {
        type: String,
        default: null
    },
    groupAvatar: {
        type: String,
        default: null
    },
}, { timestamps: true })

ConversationSchema.index({ "participants.userId": 1, updatedAt: -1 })

const ConversationModel = mongoose.model('conversations', ConversationSchema);

export default ConversationModel