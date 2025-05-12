import epxress from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages, getConversations, getChatUsers } from "../controllers/message.controller.js";

const router = epxress.Router();

router.post("/send/:id", protectRoute ,sendMessage);
router.get("/getConversations", protectRoute, getConversations);
router.get("/getChatUsers", protectRoute, getChatUsers);
router.get("/:id", protectRoute, getMessages);

export default router;