import { Router } from "express";
import { apiAuthMiddleware } from "../middleware/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { ConversationController } from "../controllers/conversation.controller";
import { MessagesController } from "../controllers/messages.controller";

const router = Router()

//auth routes
router.post('/api/auth/login', AuthController.login)
router.post('/api/auth/signup', AuthController.register)
router.post('/api/auth/register-personal-info', apiAuthMiddleware, AuthController.registerPersonalInfo)

//user routes
router.get('/api/user/fetch-user-data', apiAuthMiddleware, UserController.getUserData)
router.post('/api/chat/search-user', apiAuthMiddleware, UserController.searchUserAccount)

//conversation routes
router.get('/api/chat/get-user-conversations-list', apiAuthMiddleware, ConversationController.getUserConversationList)
router.post('/api/chat/get-conversation', apiAuthMiddleware, ConversationController.getConversation)

//messages routes
router.post('/api/chat/fetch-conversation-messages', apiAuthMiddleware, MessagesController.getConversationMessages)


export default router;