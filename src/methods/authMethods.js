"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const mtproto_1 = __importDefault(require("../mtproto"));
class AuthMethods {
    getUser() {
        return mtproto_1.default.call('users.getFullUser', {
            id: {
                _: 'inputUserSelf',
            },
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    logout() {
        return mtproto_1.default.call('auth.logOut', {}).then((result) => {
            return result;
        });
    }
    ;
    sendCode(phone_number) {
        return mtproto_1.default.call('auth.sendCode', {
            phone_number,
            settings: {
                _: 'codeSettings',
            },
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    signIn(phone_code, phone_number, phone_code_hash) {
        return mtproto_1.default.call('auth.signIn', {
            phone_code,
            phone_number,
            phone_code_hash,
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    signUp(phone_number, phone_code_hash, first_name, last_name) {
        return mtproto_1.default.call('auth.signUp', {
            phone_number,
            phone_code_hash,
            first_name,
            last_name
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
    ;
    getPassword() {
        return mtproto_1.default.call('account.getPassword', {});
    }
    checkPassword(srp_id, A, M1) {
        return mtproto_1.default.call('auth.checkPassword', {
            password: {
                _: 'inputCheckPasswordSRP',
                srp_id,
                A,
                M1,
            },
        }).catch((e) => {
            return { error: true, message: e.error_message };
        });
    }
}
exports.default = new AuthMethods();
