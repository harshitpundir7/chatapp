import express from 'express'
import protect from "../middleware/protectMiddleware.js"
import {accessChat, fetchChats, createGroupChat, addToGroup, removeFromGroup, renameGroup} from '../controllers/chatControllers.js'

const router = express.Router();

router.get("/", protect, fetchChats);
router.post("/", protect, accessChat);
router.post("/group", protect, createGroupChat)
router.put("/rename", protect, renameGroup)
router.put("/groupadd", protect, addToGroup);
router.put("/groupremove", protect, removeFromGroup)

export default router;