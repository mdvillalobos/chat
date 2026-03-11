import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserContextProvider } from "../context/userContext.tsx";
import { BrowserRouter } from 'react-router-dom'
import './assets/css/index.css'
import App from './App.tsx'
import {ChatContextProvider} from "../context/chatContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserContextProvider>
            <ChatContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ChatContextProvider>
        </UserContextProvider>
    </StrictMode>
)
