import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "../lib/socket.ts";

export const useSocket = () => {
    const socketRef = useRef<Socket>(getSocket())

    useEffect(() => {
        const socket = socketRef.current
        socket.connect()

        return () => {
            socket.disconnect()
        }
    }, []);

    return socketRef.current
}