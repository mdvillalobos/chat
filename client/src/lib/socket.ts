import { io, Socket  } from 'socket.io-client';

let socket : Socket;

export const getSocket = (): Socket  => {
    if(!socket) {
        socket = io('https://chat-goze.onrender.com', {
            withCredentials: true,
            autoConnect: false,
        })
    }

    return socket;
}

