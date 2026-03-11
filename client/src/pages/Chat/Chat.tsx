import './Chat.css'
import Conversations from "../../components/Conversations/Conversations.tsx";
import ChatBox from "../../components/ChatBox/ChatBox.tsx";
import ChatInfo from "../../components/ChatInfo/ChatInfo.tsx";

const ChatPage = () => {
    return (
        <main className='chat-main-page'>
            <Conversations />
            <ChatBox />
            <ChatInfo/>
        </main>
    )
}

export default ChatPage