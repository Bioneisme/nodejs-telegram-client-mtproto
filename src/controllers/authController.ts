// @ts-ignore
import api from "../mtproto";
// @ts-ignore
import localStorage from "localStorage";
import { NextFunction, Request, Response } from 'express';

import authMethods from "../methods/authMethods";
import msgMethods from "../methods/msgMethods";

class AuthController {
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authMethods.getUser()

            if (user.error) {
                return res.render('pages/index')
            }

            let userDialogs: { id: number; username: string; first_name: string; }[] = [];
            let channels: { id: number; title: string; }[] = [];
            let chats = []

            const Dialogs = await msgMethods.getDialogs()

            Dialogs.users.forEach((dialog: { id: number; username: string; first_name: string; }) => {
                userDialogs.push({id: dialog.id, username: dialog.username, first_name: dialog.first_name})
            })
            Dialogs.chats.forEach((channel: { id: number; title: string; }) => {
                channels.push({id: channel.id, title: channel.title})
            })

            const Chats = await msgMethods.getAllChats()
            if (Chats.error) {
                chats.push({title: Chats.message})
            } else {
                Chats.chats.forEach((chat: { id: number; title: string; }) => {
                    chats.push({id: chat.id, title: chat.title})
                })
            }

            res.render('pages/index', {user: user, users: userDialogs, channels: channels, chats: chats})
        } catch (e) {
            next(e)
        }
    }

    logout(req: Request, res: Response, next: NextFunction) {
        try {
            authMethods.logout().then(() => {
                return res.redirect('/')
            })
        } catch (e) {
            next(e)
        }
    }

    async sendCode(req: Request, res: Response, next: NextFunction) {
        try {
            const {phone} = req.body
            const code = await authMethods.sendCode(phone)
            if (code.error) {
                return res.render('pages/signIn', {error: code.message})
            } else {
                const {phone_code_hash} = code
                localStorage.setItem('phone_code_hash', phone_code_hash)
                res.render('pages/signIn', {phone: phone})
            }
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {phone, code, password} = req.body
            const phone_code_hash = localStorage.getItem('phone_code_hash')

            const signInResult = await authMethods.signIn(code, phone, phone_code_hash);

            if (signInResult.message === 'SESSION_PASSWORD_NEEDED') {
                const {srp_id, current_algo, srp_B} = await authMethods.getPassword();
                const {g, p, salt1, salt2} = current_algo;
                const {A, M1} = await api.mtProto.crypto.getSRPParams({
                    g,
                    p,
                    salt1,
                    salt2,
                    gB: srp_B,
                    password
                });

                const checkPasswordResult = await authMethods.checkPassword(srp_id, A, M1);
                if (checkPasswordResult.error)
                    return res.render('pages/signIn', {error: checkPasswordResult.message})
                return res.redirect('/')
            } else if (signInResult.error) {
                return res.render('pages/signIn', {error: signInResult.message})
            } else {
                return res.redirect('/')
            }
        } catch (e) {
            next(e)
        }
    }
}


export default new AuthController();