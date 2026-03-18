import './ChatBox.css'
import { type ChangeEvent, useState } from "react";
import { useChatContext } from "../../../context/chatContext.tsx";
import { usePrivateChat } from "../../hooks/usePrivateChat.ts";
import { useUser } from "../../../context/userContext.tsx";
import { formatUtil } from "../../utils/formatter.ts";

import { FaInfoCircle, FaUser } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { RiImageCircleAiFill } from "react-icons/ri";
import { RiAttachment2 } from "react-icons/ri";
import { PiMicrophoneBold } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const ChatBox = () => {
    const { user } = useUser();
    const { selectedConversation } = useChatContext();
    const { messages, typingUsers, sendMessage, onInputFocusTyping } = usePrivateChat();

    const [ inputMessage, setInputMessage ] = useState("");
    const [ isTyping, setTypingMessage ] = useState(false);

    const receiverUserData = selectedConversation?.receiverUser
    const currentUserId = user?._id

    const handleSend = () => {
        if (!inputMessage.trim()) return;
        sendMessage({
            recipientId: receiverUserData?._id.toString()!,
            textMessage: inputMessage,
        });
        setInputMessage("");
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputMessage(inputValue);

        const isUserTyping = typingUsers[user?._id.toString()!];

        if(inputValue && !isUserTyping.isTyping) {
            console.log('running')
            onInputFocusTyping(true);
        }
        else if (!inputValue && isUserTyping.isTyping) {
            console.log('runningg')
            onInputFocusTyping(false);
        }
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
                        {messages?.length > 0 ? (
                            <>
                                {messages?.map((message) => {
                                    const isSendByCurrenUser = message.senderId === user?._id.toString()
                                    return (
                                        <div
                                            key={message._id}
                                            className={`chat-message-container ${isSendByCurrenUser && 'self'}`}
                                        >
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
                                            {/*{typingUserIds.length > 0&& (*/}
                                            {/*    <>*/}
                                            {/*        .................*/}
                                            {/*    </>*/}
                                            {/*)}*/}
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <p>Start Message</p>
                        )}
                    </div>

                    <div className='chat-input-field-container'>
                        <input
                            type='text'
                            className='message-input-field'
                            placeholder='Type your message here.'
                            value={inputMessage}
                            onChange={(e) => onChange(e)}
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
                <p className='start-conversation-message'>
                    Start a conversation
                </p>
            )}
        </section>
    )
}

export default ChatBox