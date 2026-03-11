"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const sockets_1 = require("./sockets");
const auth_middleware_1 = require("./middleware/auth.middleware");
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    connectionStateRecovery: {},
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', apiRoutes_1.default);
io.use(auth_middleware_1.socketAuthMiddleware);
(0, sockets_1.initSockets)(io);
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(`Cannot connect to DB: ${err}`));
httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
