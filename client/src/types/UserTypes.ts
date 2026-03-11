

export type User = {
    _id: string,
    email: string,
    accountInfo: {
        firstName: string,
        lastName: string,
        fullName: string,
        accountNumber: string,
        profilePicture: string,
    }
    status: string
}