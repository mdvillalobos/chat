import type { User } from "./UserTypes.ts";

export type SelectedChatTypes = {
    receiverUser?: User,
    conversationId: string | null,
}