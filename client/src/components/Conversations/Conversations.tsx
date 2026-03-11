import './Conversation.css'
import { useState } from "react";
import { useDebounce} from "../../hooks/useDebounce.ts";
import { useConversation } from "../../hooks/useConversation.ts";
import { useUser } from "../../../context/userContext.tsx";
import { useChatContext } from "../../../context/chatContext.tsx";

import { FaUser } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const Conversations = () => {
    const { user } = useUser();
    const { selectedConversation, setSelectedConversation } = useChatContext();

    const [ searchInput, setSearchInput ] = useState<string>('');
    const debouncedSearch = useDebounce(searchInput, 300);

    const { searchUserAccount, fetchUserConversationList, fetchUserConversation } = useConversation();
    const { conversationList } = fetchUserConversationList();
    const { userAccountList } = searchUserAccount(debouncedSearch);

    return (
        <section className='conversations-section'>
            <div className='conversations-header'>
                <p>Chats</p>

                <button type='button'>
                    <RiSearchFill/>
                </button>
            </div>

            <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='bg-white text-black'
            />

            {searchInput ? (
                <div className='conversation-list'>
                    {userAccountList.length > 0 ? (
                        userAccountList.map((receivingUser) => (
                            <button
                                className='conversation-item active'
                                key={receivingUser._id.toString()}
                                onClick={() => {
                                    fetchUserConversation(receivingUser, user?._id!, setSelectedConversation)
                                    setSearchInput('')
                                }}
                            >
                                <div className='item-left'>
                                    <div className='profile-picture'>
                                        <FaUser/>
                                    </div>

                                    <div className='conversation-data'>
                                        <p>{receivingUser.accountInfo.fullName}</p>
                                        <span>{receivingUser.status}</span>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div>
                            No user found!
                        </div>
                    )}
                </div>
            ) : (
                <div className='conversations-container'>
                    {conversationList.length > 0 ? (
                        <>
                            <button className='header-dropdown'>
                                <p>Last Messages</p>
                                <span><IoIosArrowDown/></span>
                            </button>

                            {conversationList.map((conversation: any) => {
                                const senderData = conversation.participants.find((participant: any) => participant.userId._id.toString() === user?._id.toString());
                                const receiverData = conversation.participants.find((participant: any) => participant.userId._id.toString() !== user?._id.toString());

                                return (
                                    <div
                                        className='conversation-list'
                                        key={conversation._id.toString()}
                                    >
                                        <button
                                            className={`conversation-item ${selectedConversation?.conversationId === conversation._id && 'active'}`}
                                            onClick={() => setSelectedConversation({ receiverUser: receiverData.userId, conversationId: conversation._id })}
                                        >
                                            <div className='item-left'>
                                                <div className='profile-picture'>
                                                    <FaUser/>
                                                </div>

                                                <div className='conversation-data'>
                                                    {conversation.messageType === 'PRIVATE' &&
                                                        <p>{receiverData.userId.accountInfo?.fullName}</p>
                                                    }

                                                    <span>
                                                        {conversation.lastMessage.senderId === user?._id.toString() && 'You: '}
                                                        {conversation.lastMessage.text}
                                                    </span>

                                                </div>
                                            </div>

                                            {(!senderData?.lastRead || senderData?.lastRead < conversation.updatedAt) && (
                                                <div className='notification-dot'></div>
                                            )}
                                        </button>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <>Start a message!</>
                    )}
                </div>
                // <>
                //     <div className='conversations-container'>
                //         <button className='header-dropdown'>
                //             <p>New Messages</p>
                //
                //             <span>
                //                 <IoIosArrowDown/>
                //             </span>
                //         </button>
                //
                //         <div className='conversation-list'>
                //             <div className='conversation-item active'>
                //                 <div className='item-left'>
                //                     <div className='profile-picture'>
                //                         <FaUser/>
                //                     </div>
                //
                //                     <div className='conversation-data'>
                //                         <p>Name</p>
                //                         <span>sadsadssdadad</span>
                //                     </div>
                //                 </div>
                //
                //                 <div className='notification-dot'></div>
                //             </div>
                //         </div>
                //     </div>
                // </>
            )}
        </section>
    )
}

export default Conversations