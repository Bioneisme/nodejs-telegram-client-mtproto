// @ts-ignore
import api from "../mtproto";

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

class msgMethods {
    sendMessageToUser(user_id: number, message: string) {
        const params = {
            peer: {
                _: 'inputPeerUser',
                user_id,
                access_hash: 0
            },
            message,
            random_id: getRandomInt(1000000)
        };

        return api.call('messages.sendMessage', params, {})
            .catch((e: { error_message: string; }) => {
                return {error: true, message: e.error_message}
            });
    };

    async sendMessageToPhone(phone: number, message: string) {
        const params = {
            contacts: [{
                _: 'inputPhoneContact',
                client_id: 0,
                phone: phone,
                first_name: phone.toString(),
            }],
        };

        const {users} = await api.call('contacts.importContacts', params, {})
            .catch((e: { error_message: string; }) => {
                return {error: true, message: e.error_message}
            });

        const user = users[0];

        if (user?.error) {
            throw new Error(user.message);
        }

        return this.sendMessageToUser(user.id, message);
    };

    sendMessageToChat(chat_id: number, message: string) {
        const params = {
            peer: {
                _: 'inputPeerChat',
                chat_id,
                access_hash: 0
            },
            message,
            random_id: getRandomInt(1000000)
        };

        return api.call('messages.sendMessage', params, {})
            .catch((e: { error_message: string; }) => {
                return {error: true, message: e.error_message}
            });
    };

    getAllChats() {
        return api.call('messages.getAllChats', {
            except_ids: []
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
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
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
    };

    getHistory(user_id: number) {
        return api.call('messages.getHistory', {
            offset_date: 0,
            offset_id: -1,
            peer: {
                _: 'inputPeerUser',
                user_id
            }
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
    };

    sendReaction(user_id: number, msg_id: number, reaction: string) {
        return api.call('messages.sendReaction', {
            peer: {
                _: 'inputPeerUser',
                user_id
            },
            msg_id,
            reaction
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
    };
};

export default new msgMethods();