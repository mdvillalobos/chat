import {Socket} from "socket.io";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type JwtPayload = {
    userId: string
}

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.headers.cookie

    if (!token) {
        return next(new Error("Unauthorized: No token provided"));
    }

    try {
        const { userId } = jwt.verify(token.split("token=")[1], process.env.JWT_SECRET) as JwtPayload;
        socket.data.user = userId;
        next();
    } catch (err) {
        return next(new Error("Unauthorized: Invalid token"));
    }
};

export const apiAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        req.user = { id: userId };
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: "Invalid token" });
    }
}