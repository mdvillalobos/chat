import './ChatBox.css'
import { useState } from "react";
import { usePrivateChat } from "../../hooks/usePrivateChat.ts";
import { useUser } from "../../../context/userContext.tsx";

import { FaInfoCircle, FaUser } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { RiImageCircleAiFill } from "react-icons/ri";
import { RiAttachment2 } from "react-icons/ri";
import { PiMicrophoneBold } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import {useChatContext} from "../../../context/chatContext.tsx";
import {formatUtil} from "../../utils/formatter.ts";

const ChatBox = () => {
    const { user } = useUser();
    const { selectedConversation } = useChatContext();
    const { sendMessage, messages } = usePrivateChat();

    const [ inputMessage, setInputMessage ] = useState("");

    const receiverUserData = selectedConversation?.receiverUser
    const conversationId = selectedConversation?.conversationId

    // const conversation = conversationId ? getConversation(conversationId) : [];

    const handleSend = () => {
        if (!inputMessage.trim()) return;
        sendMessage({
            recipientId: receiverUserData?._id.toString()!,
            textMessage: inputMessage,
            conversationId: conversationId
        });
        setInputMessage("");
    };

    return (
        <section className='chat-box-section'>
            {selectedConversation ? (
                <>
                    <div className='chat-box-header'>
                        <div className='user-info-container'>
                            <div className='user-profile'>
                                {receiverUserData?.accountInfo.profilePicture
                                    ? <img src={receiverUserData?.accountInfo.profilePicture} alt={'Profile Picture'} />
                                    : <FaUser/>
                                }
                            </div>

                            <div className='user-data'>
                                <p>{receiverUserData?.accountInfo.fullName}</p>
                                <span>{receiverUserData?.status}</span>
                            </div>
                        </div>

                        <div className='actions-container'>
                            <button>
                                <FaVideo/>
                            </button>

                            <button>
                                <PiPhoneCallFill/>
                            </button>

                            <button>
                                <RiImageCircleAiFill />
                            </button>

                            <button>
                                <FaInfoCircle/>
                            </button>
                        </div>
                    </div>

                    <div className={`chat-box-body ${messages?.length > 0 ? 'has-data' : ''}`}>
                        {messages?.length > 0 ?
                            messages?.map((message) => {
                                const isSendByCurrenUser = message.senderId === user?._id.toString()
                                return (
                                    <div className={`chat-message-container ${isSendByCurrenUser && 'self'}`}>
                                        <div className={`chat-message-item ${isSendByCurrenUser && 'self'}`}>
                                            {!isSendByCurrenUser && (
                                                <div className='user-profile'>
                                                    {receiverUserData?.accountInfo.profilePicture
                                                        ? <img src={receiverUserData?.accountInfo.profilePicture} alt={'Profile Picture'} />
                                                        : <FaUser/>
                                                    }
                                                </div>
                                            )}
                                            <div className={`text-message ${isSendByCurrenUser && 'self'}`}>
                                                <p>{message?.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        : (
                            <>Start Message</>
                        )}
                    </div>

                    <div className='chat-input-field-container'>
                        <input
                            type='text'
                            className='message-input-field'
                            placeholder='Type your message here.'
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />

                        <div className='chat-input-utils'>
                            <div className='chat-field-btn-grp'>
                                <button type='button'>
                                    <IoIosAdd/>
                                </button>

                                <button type='button'>
                                    <PiMicrophoneBold/>
                                </button>

                                <button type='button'>
                                    <RiAttachment2/>
                                </button>
                            </div>

                            <button
                                type='button'
                                className='send'
                                onClick={handleSend}
                            >
                                <IoSend/>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    start a conversation
                </>
            )}
        </section>
    )
}

export default ChatBox