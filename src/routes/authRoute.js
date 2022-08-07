"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.use(function (req, res, next) {
    res.locals.user = null;
    res.locals.error = null;
    res.locals.phone = null;
    res.locals.users = null;
    res.locals.channels = null;
    res.locals.chats = null;
    next();
});
router.get('/', authController_1.default.getUser);
router.get('/signin', (req, res) => {
    res.render('pages/signIn');
});
router.post('/signin', authController_1.default.sendCode);
router.post('/login', authController_1.default.login);
router.get('/logout', authController_1.default.logout);
exports.default = router;
