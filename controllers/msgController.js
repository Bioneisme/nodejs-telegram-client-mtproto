const msgMethods = require('../methods/msgMethods')

async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

class MsgController {
    async sendMessageToUser(req, res, next) {
        try {
            const {user_id, message, count, interval} = req.body;
            for (let i = 0; i < count; i++) {
                await delay(interval)
                const result = await msgMethods.sendMessageToUser(user_id, message);
                if (result.error) {
                    return res.render('pages/index', {error: result.message})
                }
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MsgController()