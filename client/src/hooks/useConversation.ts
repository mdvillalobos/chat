import { useEffect, useState } from "react";
import { sileo } from "sileo";
import axiosInstance from "../utils/axiosUtil.ts";
import type { User } from "../types/UserTypes.ts";

export const useConversation = () => {
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

    const fetchUserConversation = async (receiverUser: User, senderUserId: string, setSelectedChat: any) => {
        try {
            const { data } = await axiosInstance.post('/api/chat/get-conversation', {
                receiverUserId: receiverUser._id,
                senderUserId: senderUserId,
            });

            setSelectedChat({
                receiverUser: receiverUser,
                conversation: data.data
            })
        } catch(error: any) {
            const message = error.response?.data?.message || "Something went wrong";

            sileo.error({
                title: "Error fetching conversation messages",
                description: message,
            });

            setSelectedChat({
                receiverUser: receiverUser,
                conversation: null
            })
        }
    }

    return { fetchUserConversationList, searchUserAccount, fetchUserConversation };
}