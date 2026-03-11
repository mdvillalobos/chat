import {type ReactNode, createContext, useContext, useState, type Dispatch, type SetStateAction} from "react";
import type { User } from "../src/types/UserTypes";

type Props = {
    children: ReactNode
}

type Conversation = {
    receiverUser?: User,
    conversationId: string | null,
}

type ConversationContextType = {
    selectedConversation: Conversation | null
    setSelectedConversation: Dispatch<SetStateAction<Conversation | null>>
}

export const ChatContext = createContext<ConversationContextType | undefined>(undefined)

export const ChatContextProvider = ({ children }: Props) => {
    const [ selectedConversation, setSelectedConversation ] = useState<Conversation | null>(null);

    return (
        <ChatContext.Provider value={{ selectedConversation, setSelectedConversation }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    const context = useContext(ChatContext);

    if(!context){
        throw new Error("useUser must be used within a UserContextProvider");
    }

    return context;
}