"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiAuthMiddleware = exports.socketAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log(token);
    if (!token) {
        return next(new Error("Unauthorized: No token provided"));
    }
    try {
        socket.data.user = token;
        next();
    }
    catch (err) {
        return next(new Error("Unauthorized: Invalid token"));
    }
};
exports.socketAuthMiddleware = socketAuthMiddleware;
const apiAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const { email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { email };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.apiAuthMiddleware = apiAuthMiddleware;
