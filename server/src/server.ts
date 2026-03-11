import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { initSockets } from "./sockets";
import { socketAuthMiddleware } from "./middleware/auth.middleware";
import apiRoutes from './routes/apiRoutes'

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    connectionStateRecovery: {},
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

io.use(socketAuthMiddleware)
initSockets(io)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(`Cannot connect to DB: ${err}`))

httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
