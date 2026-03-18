import './Conversation.css'
import { useState } from "react";
import { useDebounce} from "../../hooks/useDebounce.ts";
import { useConversation } from "../../hooks/useConversation.ts";
import { useUser } from "../../../context/userContext.tsx";
import { useChatContext } from "../../../context/chatContext.tsx";
import { formatUtil } from "../../utils/formatter.ts";

import { FaUser } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";

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
            {/*<div>*/}
            {/*    <p>Chat</p>*/}

            {/*    <button>*/}
            {/*        */}
            {/*    </button>*/}
            {/*</div>*/}
           <div className='search-input-container'>
               <span><RiSearch2Line/></span>
               <input
                   type='text'
                   placeholder='Search'
                   value={searchInput}
                   onChange={(e) => setSearchInput(e.target.value)}
               />
           </div>

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
                                    <div className={`profile-picture ${receivingUser.status === 'active' && 'active'}`}>
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
                                            <div className='profile-picture'>
                                                <FaUser/>
                                            </div>

                                            <div className='conversation-data'>
                                                <div className='name-container'>
                                                    {conversation.messageType === 'PRIVATE' && (
                                                        <p className='conversation-name'>{receiverData.userId.accountInfo?.fullName}</p>
                                                    )}

                                                    <p className='conversation-time'>{formatUtil.getTimeDifference(conversation.updatedAt)}</p>
                                                </div>

                                                <div className='text-message-container'>
                                                    <p className='conversation-message'>
                                                        {conversation.lastMessage.senderId === user?._id.toString() && 'You: '}
                                                        {conversation.lastMessage.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <>Start a message!</>
                    )}
                </div>
            )}
        </section>
    )
}

export default Conversations