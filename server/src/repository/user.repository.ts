import UserModel from "../model/user.model";
import { Types } from "mongoose";

type UserInfo = {
    firstName?: string,
    lastName?: string,
    contactNumber?: string,
    profilePicture?: string
}

export class UserRepository {
    static async createUser(email: string, password: string) {
        return UserModel.create({
            email,
            password: password,
        });
    }

    static async findUserData (id: string) {
        return UserModel.findById(id)
    }

    static async findUserAndUpdateInfo(id: string, userInfo: UserInfo) {
        return UserModel.findByIdAndUpdate(
            { id },
            {
                $set: {
                    accountInfo: userInfo
                },
            },
            { new: true, fields: { password: 0 } }
        );
    }

    static async findUserByEmail(email: string) {
        return UserModel.findOne({ email: email });
    }

    static async searchUserByName(currentUserId: string, userName: string) {
        return UserModel.find(
            {
                'accountInfo.fullName': {$regex: userName, $options: "i"},
                _id: { $ne: Object(currentUserId) }
            },
            { _id: 1, email: 1, "accountInfo.fullName": 1, "accountInfo.profilePicture": 1, status: 1 }
        )
    }
}




