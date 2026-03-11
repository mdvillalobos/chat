"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSockets = void 0;
const chat_socket_1 = require("./chat.socket");
const initSockets = (io) => {
    io.on("connection", (socket) => {
        (0, chat_socket_1.chatHandler)(socket, io);
    });
};
exports.initSockets = initSockets;
