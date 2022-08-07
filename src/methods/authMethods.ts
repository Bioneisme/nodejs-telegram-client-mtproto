// @ts-ignore
import api from "../mtproto";

class AuthMethods {
    getUser() {
        return api.call('users.getFullUser', {
            id: {
                _: 'inputUserSelf',
            },
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message};
        });
    };

    logout() {
        return api.call('auth.logOut', {
        }).then((result: string) => {
            return result;
        });
    };

    sendCode(phone_number: string) {
        return api.call('auth.sendCode', {
            phone_number,
            settings: {
                _: 'codeSettings',
            },
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message};
        });
    };

    signIn(phone_code: number, phone_number: string, phone_code_hash: string | null) {
        return api.call('auth.signIn', {
            phone_code,
            phone_number,
            phone_code_hash,
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
    };

    signUp(phone_number: string, phone_code_hash: string, first_name: string, last_name: string) {
        return api.call('auth.signUp', {
            phone_number,
            phone_code_hash,
            first_name,
            last_name
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
    };

    getPassword() {
        return api.call('account.getPassword', {});
    }

    checkPassword(srp_id: bigint, A: Uint8Array, M1: Uint8Array) {
        return api.call('auth.checkPassword', {
            password: {
                _: 'inputCheckPasswordSRP',
                srp_id,
                A,
                M1,
            },
        }).catch((e: { error_message: string; }) => {
            return {error: true, message: e.error_message}
        });
    }
}

export default new AuthMethods();