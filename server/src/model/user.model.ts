import mongoose, { Schema } from "mongoose";

const UserInfoSchema = new Schema({
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    fullName: {
        type: String,
        default: null,
    },
    profilePicture: {
        type: String,
        default: null
    }
})

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    accountInfo: UserInfoSchema,
    status: {
        type: String,
        enum: ['active', 'offline'],
        default: 'active'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

UserInfoSchema.index({ fullName: "text" });

const AccountModel = mongoose.model('users', UserSchema)

export default AccountModel