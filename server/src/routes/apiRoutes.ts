import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { apiAuthMiddleware } from "../middleware/auth.middleware";
import {
    fetchConversationMessages,
    fetchUserConversation,
    fetchUserConversationList
} from "../controllers/chat.controller";
import {fetchUserData, searchUserAccount} from "../controllers/user.controller";

const router = Router()

router.post('/api/auth/login', AuthController.login)
router.post('/api/auth/signup', AuthController.register)
router.post('/api/auth/register-personal-info', apiAuthMiddleware, AuthController.registerPersonalInfo)

router.get('/api/user/fetch-user-data', apiAuthMiddleware, fetchUserData)

router.post('/api/chat/search-user', apiAuthMiddleware, searchUserAccount)

router.get('/api/chat/get-user-conversations-list', apiAuthMiddleware, fetchUserConversationList)

router.post('/api/chat/get-conversation', apiAuthMiddleware, fetchUserConversation)

router.post('/api/chat/fetch-conversation-messages', apiAuthMiddleware, fetchConversationMessages)


export default router;