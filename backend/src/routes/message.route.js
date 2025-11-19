import express from "express"
import { getAllContacts, getMessagesByUserId } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute);
router.get('/contacts', getAllContacts);
//router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId);

export default router;