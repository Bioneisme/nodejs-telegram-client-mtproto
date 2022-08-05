const api = require('../api')

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class msgMethods {
    sendMessageToUser(user_id, message) {
        const params = {
            peer: {
                _: 'inputPeerUser',
                user_id,
                access_hash: '0'
            },
            message,
            random_id: getRandomInt(1000000)
        };

        return api.call('messages.sendMessage', params, {})
        .catch(e => {
            console.error(JSON.stringify(e));
        });
    };

    getAllChats() {
        return api.call('messages.getAllChats', {
            except_ids: []
        }).catch(e => {
            return {error: true, message: e.error_message}
        })
    };

    getDialogs() {
        return api.call('messages.getDialogs', {
            exclude_pinned: false,
            folder_id: 0,
            offset_date: 0,
            offset_id: -1,
            offset_peer: {
                _: 'inputPeerEmpty'
            },
            limit: 100,
            hash: ""
        }).catch(e => {
            return {error: true, message: e.error_message}
        })
    }

    getHistory(user_id) {
        return api.call('messages.getHistory', {
            offset_date: 0,
            offset_id: -1,
            peer: {
                _: 'inputPeerUser',
                user_id
            }
        }).catch(e => {
            return {error: true, message: e.error_message}
        })
    }

    sendReaction(user_id, msg_id, reaction) {
        return api.call('messages.sendReaction', {
            peer: {
                _: 'inputPeerUser',
                user_id
            },
            msg_id,
            reaction
        }).catch(e => {
            return {error: true, message: e.error_message}
        })
    }
}

module.exports = new msgMethods();