"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const mtproto_1 = __importDefault(require("../mtproto"));
// @ts-ignore
const localStorage_1 = __importDefault(require("localStorage"));
const authMethods_1 = __importDefault(require("../methods/authMethods"));
const msgMethods_1 = __importDefault(require("../methods/msgMethods"));
class AuthController {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authMethods_1.default.getUser();
                if (user.error) {
                    return res.render('pages/index');
                }
                let userDialogs = [];
                let channels = [];
                let chats = [];
                const Dialogs = yield msgMethods_1.default.getDialogs();
                Dialogs.users.forEach((dialog) => {
                    userDialogs.push({ id: dialog.id, username: dialog.username, first_name: dialog.first_name });
                });
                Dialogs.chats.forEach((channel) => {
                    channels.push({ id: channel.id, title: channel.title });
                });
                const Chats = yield msgMethods_1.default.getAllChats();
                if (Chats.error) {
                    chats.push({ title: Chats.message });
                }
                else {
                    Chats.chats.forEach((chat) => {
                        chats.push({ id: chat.id, title: chat.title });
                    });
                }
                res.render('pages/index', { user: user, users: userDialogs, channels: channels, chats: chats });
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        try {
            authMethods_1.default.logout().then(() => {
                return res.redirect('/');
            });
        }
        catch (e) {
            next(e);
        }
    }
    sendCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone } = req.body;
                const code = yield authMethods_1.default.sendCode(phone);
                if (code.error) {
                    return res.render('pages/signIn', { error: code.message });
                }
                else {
                    const { phone_code_hash } = code;
                    localStorage_1.default.setItem('phone_code_hash', phone_code_hash);
                    res.render('pages/signIn', { phone: phone });
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone, code, password } = req.body;
                const phone_code_hash = localStorage_1.default.getItem('phone_code_hash');
                const signInResult = yield authMethods_1.default.signIn(code, phone, phone_code_hash);
                if (signInResult.message === 'SESSION_PASSWORD_NEEDED') {
                    const { srp_id, current_algo, srp_B } = yield authMethods_1.default.getPassword();
                    const { g, p, salt1, salt2 } = current_algo;
                    const { A, M1 } = yield mtproto_1.default.mtproto.crypto.getSRPParams({
                        g,
                        p,
                        salt1,
                        salt2,
                        gB: srp_B,
                        password
                    });
                    const checkPasswordResult = yield authMethods_1.default.checkPassword(srp_id, A, M1);
                    if (checkPasswordResult.error)
                        return res.render('pages/signIn', { error: checkPasswordResult.message });
                    return res.redirect('/');
                }
                else if (signInResult.error) {
                    return res.render('pages/signIn', { error: signInResult.message });
                }
                else {
                    return res.redirect('/');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new AuthController();
