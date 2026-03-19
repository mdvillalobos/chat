import { useEffect, useState } from "react";
import { sileo } from "sileo";
import axiosInstance from "../utils/axiosUtil.ts";
import type { User } from "../types/UserTypes.ts";
import {useChatContext} from "../../context/chatContext.tsx";

export const useConversation = () => {
    const { selectedConversation, setSelectedConversation } = useChatContext();

    const searchUserAccount = (userName: string) => {
        const [ userAccountList, setUserAccountList ] = useState<User[]>([])

        useEffect(() => {
            if (!userName.trim()) {
                setUserAccountList([]);
                return;
            }

            const searchUser = async () => {
                try {
                    const { data } = await axiosInstance.post('/api/chat/search-user', {
                        userName: userName
                    });

                    setUserAccountList(data.data);
                } catch(error: any) {
                    const message = error.response?.data?.message || "Something went wrong";

                    sileo.error({
                        title: "Error fetching users",
                        description: message,
                    });
                }
            }

            searchUser()
        }, [userName]);

        return { userAccountList }
    }


    const fetchUserConversationList = () => {
        const [ conversationList, setConversationList ] = useState([])

        useEffect(() => {
            const fetchList = async () => {
                try {
                    const { data } = await axiosInstance.get('/api/chat/get-user-conversations-list');

                    setConversationList(data.data);
                } catch(error: any) {
                    const message = error.response?.data?.message || "Something went wrong";

                    sileo.error({
                        title: "Error fetching conversations",
                        description: message,
                    });
                }
            }

            fetchList()
        }, []);

        return { conversationList }
    }

    const fetchUserConversation = async (receiverUser: User, senderUserId: string) => {
        try {
            const { data } = await axiosInstance.post('/api/chat/get-conversation', {
                senderUserId: senderUserId,
                receiverUserId: receiverUser._id,
            });

            console.log(data.data)

            setSelectedConversation({
                receiverUser: receiverUser,
                conversationId: data.data
            })
        } catch(error: any) {
            const message = error.response?.data?.message || "Something went wrong";

            sileo.error({
                title: "Error fetching conversation messages",
                description: message,
            });

            setSelectedConversation({
                receiverUser: receiverUser,
                conversationId: null
            })
        }
    }

    return { fetchUserConversationList, searchUserAccount, fetchUserConversation };
}