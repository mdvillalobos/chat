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

type TypingMap = Record<string, { isTyping: boolean }>

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

    // useEffect(() => {
    //     socket.on("user-typing", ({ userId, isTyping }: TypingEvent) => {
    //         setTypingUsers((prev) => {
    //             if (isTyping) {
    //                 if (!prev.includes(userId)) return [...prev, userId];
    //             } else {
    //                 return prev.filter((id) => id !== userId);
    //             }
    //             return prev;
    //         });
    //     });
    //
    //     return () => {
    //         socket.off("user-typing")
    //     }
    // }, [socket]);

    const sendMessage = useCallback(({ recipientId, textMessage }: MessagePayload) => {
        socket.emit("send-message", {
            currentConversationId,
            recipientId,
            textMessage
        })
    }, [currentUserId, socket])

    const onInputFocusTyping = useCallback((isTyping: boolean) => {
        socket.emit("typing", {
            conversationId: currentConversationId,
            isTyping: isTyping,
        });
    }, [currentConversationId, socket]);

    return { messages, typingUsers, sendMessage, onInputFocusTyping };
}
