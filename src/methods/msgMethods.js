"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const mtproto_1 = __importDefault(require("../mtproto"));
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
class msgMethods {
    sendMessageToUser(user_id, message) {
        const params = {
            peer: {
                _: 'inputPeerUser',
                user_id,
                access_hash: 0
            },
            message,
            random_id: getRandomInt(1000000)
        };
        return mtproto_1.default.call('messages.sendMessage', params, {})
            .catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    sendMessageToChat(chat_id, message) {
        const params = {
            peer: {
                _: 'inputPeerChat',
                chat_id,
                access_hash: 0
            },
            message,
            random_id: getRandomInt(1000000)
        };
        return mtproto_1.default.call('messages.sendMessage', params, {})
            .catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    getAllChats() {
        return mtproto_1.default.call('messages.getAllChats', {
            except_ids: []
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    getDialogs() {
        return mtproto_1.default.call('messages.getDialogs', {
            exclude_pinned: false,
            folder_id: 0,
            offset_date: 0,
            offset_id: -1,
            offset_peer: {
                _: 'inputPeerEmpty'
            },
            limit: 100,
            hash: ""
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    getHistory(user_id) {
        return mtproto_1.default.call('messages.getHistory', {
            offset_date: 0,
            offset_id: -1,
            peer: {
                _: 'inputPeerUser',
                user_id
            }
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    sendReaction(user_id, msg_id, reaction) {
        return mtproto_1.default.call('messages.sendReaction', {
            peer: {
                _: 'inputPeerUser',
                user_id
            },
            msg_id,
            reaction
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
}
;
exports.default = new msgMethods();
