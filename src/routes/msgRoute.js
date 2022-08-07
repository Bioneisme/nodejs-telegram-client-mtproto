"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const msgController_1 = __importDefault(require("../controllers/msgController"));
const router = express_1.default.Router();
router.post('/sendMessageToUser', msgController_1.default.sendMessageToUser);
router.post('/sendMessageToChat', msgController_1.default.sendMessageToChat);
exports.default = router;
