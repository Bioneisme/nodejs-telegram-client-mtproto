const api = require('../api')

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class msgMethods {
    async sendMessageToUser(user_id, message) {
        const params = {
            peer: {
                _: 'inputPeerUser',
                user_id,
                access_hash: '0'
            },
            message,
            random_id: getRandomInt(1000000)
        };

        return api.call('messages.sendMessage', params, {}).then((result) => {
            return result;
        }).catch(e => {
            console.error(JSON.stringify(e));
        });
    };
}

module.exports = new msgMethods();