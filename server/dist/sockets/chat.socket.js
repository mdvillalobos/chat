"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = void 0;
const connectedUsers = new Map();
const chatHandler = (socket, io) => {
    socket.on("register", (userId) => {
        connectedUsers.set(userId, socket.id);
        socket.data.userId = userId;
        io.emit("online-users", Array.from(connectedUsers.keys()));
    });
    socket.on("private-message", ({ toUserId, message }) => {
        const fromUserId = socket.data.userId;
        const targetUserId = connectedUsers.get(toUserId);
        const payload = {
            from: fromUserId,
            to: toUserId,
            message,
            timestamp: new Date().toISOString(),
        };
        if (targetUserId) {
            io.to(targetUserId).emit("private-message", payload);
            socket.emit("private-message", payload);
        }
        else {
            socket.emit("user-offline", { toUserId });
        }
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
};
exports.chatHandler = chatHandler;
