import UserModel from "../model/user.model";

type AccountInfo = {
    firstName?: string,
    lastName?: string,
    fullName?: string
    profilePicture?: string
}

export class UserRepository {
    static async createUser(email: string, password: string, accountInfo: AccountInfo) {
        return UserModel.create({
            email: email,
            password: password,
            accountInfo: accountInfo,
        });
    }

    static async findUserByEmail(email: string) {
        return UserModel.findOne({ email: email });
    }

    static async findUserData (id: string) {
        return UserModel.findById(id)
    }

    static async findUserAndUpdateInfo(id: string, userInfo: AccountInfo) {
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




