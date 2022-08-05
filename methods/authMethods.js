const api = require('../api')

class AuthMethods {
    getUser() {
        return api.call('users.getFullUser', {
            id: {
                _: 'inputUserSelf',
            },
        }).catch(() => {
            return null;
        });
    }

    logout() {
        return api.call('auth.logOut', {
        }).then(result => {
            return result;
        });
    }

    sendCode(phone_number) {
        return api.call('auth.sendCode', {
            phone_number,
            settings: {
                _: 'codeSettings',
            },
        }).catch(e => {
            return {error: true, message: e.error_message};
        });
    }

    signIn(phone_code, phone_number, phone_code_hash) {
        return api.call('auth.signIn', {
            phone_code,
            phone_number,
            phone_code_hash,
        }).catch(e => {
            return {error: true, message: e.error_message}
        });
    }

    signUp(phone_number, phone_code_hash, first_name, last_name) {
        return api.call('auth.signUp', {
            phone_number,
            phone_code_hash,
            first_name,
            last_name
        }).catch(e => {
            return {error: true, message: e.error_message}
        });
    }

    getPassword() {
        return api.call('account.getPassword');
    }

    checkPassword(srp_id, A, M1) {
        return api.call('auth.checkPassword', {
            password: {
                _: 'inputCheckPasswordSRP',
                srp_id,
                A,
                M1,
            },
        }).catch(e => {
            return {error: true, message: e.error_message}
        });
    }
}

module.exports = new AuthMethods();