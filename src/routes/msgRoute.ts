import express from "express";
import msgController from "../controllers/msgController";

const router = express.Router();

router.post('/sendMessageToUser', msgController.sendMessageToUser)

router.post('/sendMessageToPhone', msgController.sendMessageToPhone)

router.post('/sendMessageToChat', msgController.sendMessageToChat)

export default router;