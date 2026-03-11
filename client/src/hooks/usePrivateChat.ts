import axiosInstance from "../utils/axiosUtil.ts";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./useSocket.ts";
import { useUser } from "../../context/userContext.tsx";
import { useChatContext } from "../../context/chatContext.tsx";

type Message = {
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
    conversationId: string | undefined | null
}

export const usePrivateChat = () => {
    const { user } = useUser()
    const { selectedConversation, setSelectedConversation } = useChatContext()

    const currentUserId = user?._id;
    const socket = useSocket();

    const [ messages, setMessages ] = useState<Message[]>([])

    useEffect(() => {
        if (!selectedConversation?.conversationId) return;

        socket.emit("join-conversation", selectedConversation?.conversationId);

        const fetchConversationMessages = async () => {
            try {
                const { data } = await axiosInstance.post('/api/chat/fetch-conversation-messages', {
                    conversationId: selectedConversation?.conversationId
                })

                setMessages(data.data)
            } catch(err) {
                console.error(err);
            }
        }

        fetchConversationMessages();
    }, [selectedConversation?.conversationId, currentUserId, socket]);

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


    const sendMessage = useCallback(({ recipientId, textMessage, conversationId }: MessagePayload) => {
        if(!currentUserId) return;

        socket.emit("send-message", {
            conversationId,
            senderId: currentUserId,
            recipientId,
            textMessage
        })
    }, [currentUserId, socket])



    // const sendMessage = ({ recipientId, textMessage, conversationId }: MessagePayload) => {
    //     socket.emit("send-message", { conversationId, senderId: currentUserId, recipientId, textMessage });
    // };




    // useEffect(() => {
    //     const fetchConversationMessages = async () => {
    //         if(!selectedConversation.conversationId) return;
    //
    //         try {
    //             const data = await axiosInstance.post('/api/chat/fetch-conversation-messages', {
    //                 conversationId: conversationId
    //             })
    //         } catch(err) {
    //             console.error(err);
    //         }
    //     }
    //
    //     fetchConversationMessages()
    // }, [selectedConversation?.conversationId]);

    // useEffect(() => {
    //     socket.emit("join-conversation", conversationId);
    //
    //     socket.on('new-message', (data: MessageResponse) => {
    //         const { message, conversationId } = data
    //         console.log(data)
    //         setMessages((prev) => [...prev, message])
    //     })
    //
    //     // socket.on('online-users', (users: string[]) => {
    //     //     setOnlineUsers(users.filter((id) => id !== currentUserId))
    //     // })
    //
    //     return () => {
    //         socket.off("new-message");
    //         socket.off("online-users");
    //     };
    // }, [currentUserId, socket]);
    //
    // const sendMessage = ({ recipientId, textMessage, conversationId }: MessagePayload) => {
    //     socket.emit("send-message", { conversationId, senderId: currentUserId, recipientId, textMessage });
    // };
    //
    // const filterConversationMessages = (withUserId: string) =>
    //     messages.filter((m) =>
    //         (m.from === currentUserId && m.to === withUserId) ||
    //         (m.from === withUserId && m.to === currentUserId)
    //     );

    return { messages, sendMessage };
}
