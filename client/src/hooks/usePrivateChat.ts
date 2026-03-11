import axiosInstance from "../utils/axiosUtil.ts";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./useSocket.ts";
import { useUser } from "../../context/userContext.tsx";
import { useChatContext } from "../../context/chatContext.tsx";

type Message = {
    _id: string;
    conversationId: string,
    senderId: string,
    text: string
    readBy: [{ id: string }],
    reactions: string[],
    updatedAt: Date,
};

type MessageResponse = {
    message: Message
    conversationId: string;
}

type MessagePayload = {
    recipientId: string,
    textMessage: string,
}

type TypingMap = Record<string, boolean>;

export const usePrivateChat = () => {
    const socket = useSocket();
    const { user } = useUser()
    const { selectedConversation, setSelectedConversation } = useChatContext();

    const currentUserId = user?._id;
    const currentConversationId = selectedConversation?.conversationId

    const [ messages, setMessages ] = useState<Message[]>([])
    const [ typingUsers, setTypingUsers ] = useState<TypingMap>({});

    useEffect(() => {
        if (!socket || !currentConversationId) return;

        socket.emit("join-conversation", currentConversationId);

        const fetchMessages = async () => {
            try {
                const { data } = await axiosInstance.post('/api/chat/fetch-conversation-messages', {
                    conversationId: currentConversationId
                })

                setMessages(data.data)
            } catch(err) {
                console.error("Fetch messages error:", err);
            }
        }

        fetchMessages();

        return () => {
            socket.emit("leave-conversation", currentConversationId);
        };
    }, [currentConversationId, currentUserId, socket]);

    useEffect(() => {
        socket.on('new-message', (data: MessageResponse) => {
            const { message } = data;

            setMessages(prev => [message, ...prev])
            setSelectedConversation((prev) =>
                prev
                    ? { ...prev, conversationId: message.conversationId }
                    : { conversationId:  message.conversationId }
            )
        })

        return () => {
            socket.off('new-message')
        }
    }, [currentUserId, socket]);

    useEffect(() => {
        socket.on('user-typing', ({ userId, isTyping }) => {
            setTypingUsers(prev => ({ ...prev, [userId]: isTyping }));
        })

        return () => {
            socket.off("user-typing")
        }
    }, [socket]);

    const sendMessage = useCallback(({ recipientId, textMessage }: MessagePayload) => {
        if(!currentUserId) return;

        socket.emit("send-message", {
            currentConversationId,
            senderId: currentUserId,
            recipientId,
            textMessage
        })
    }, [currentUserId, socket])

    const onInputFocusTyping = useCallback(() => {
        socket.emit("typing", {
            conversationId: currentConversationId,
            isTyping: true,
        });
    }, [currentConversationId, socket]);

    return { messages, typingUsers, sendMessage, onInputFocusTyping };
}
