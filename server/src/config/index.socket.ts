import { Server } from 'socket.io';
import { chatHandler } from "../sockets/chat";

export const initSockets = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.data.user);

        chatHandler(socket, io);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}