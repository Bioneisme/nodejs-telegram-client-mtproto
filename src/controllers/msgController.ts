import { NextFunction, Request, Response } from 'express';

import msgMethods from "../methods/msgMethods";

async function delay(ms: number) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

class MsgController {
    async sendMessageToUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {user_id, message, count, interval} = req.body;
            for (let i = 0; i < count; i++) {
                await delay(interval);
                const result = await msgMethods.sendMessageToUser(user_id, message);
                if (result.error) {
                    return res.render('pages/index', {error: result.message});
                }
            }
        } catch (e) {
            next(e)
        }
    };

    async sendMessageToPhone(req: Request, res: Response, next: NextFunction) {
        try {
            const {phone, message} = req.body;
                const result = await msgMethods.sendMessageToPhone(phone, message);
                if (result.error) {
                    return res.render('pages/index', {error: result.message});
                }

                return res.send(result);
        } catch (e) {
            next(e)
        }
    };

    async sendMessageToChat(req: Request, res: Response, next: NextFunction) {
        try {
            const {chat_id, message, count, interval} = req.body;
            for (let i = 0; i < count; i++) {
                await delay(interval);
                const result = await msgMethods.sendMessageToChat(chat_id, message);
                if (result.error) {
                    return res.render('pages/index', {error: result.message});
                }
            }
        } catch (e) {
            next(e)
        }
    };
}

export default new MsgController();