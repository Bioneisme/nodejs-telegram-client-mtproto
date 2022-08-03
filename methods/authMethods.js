const api = require('../api')

class AuthMethods {
    getUser() {
        return api.call('users.getFullUser', {
            id: {
                _: 'inputUserSelf',
            },
        }).then(result => {
            return result;
        }).catch(e => {
            console.error(JSON.stringify(e));
            return null;
        });
    };

    sendCode(phone_number) {
        return api.call('auth.sendCode', {
            phone_number,
            settings: {
                _: 'codeSettings',
            },
        }).then(result => {
            return result;
        }).catch(e => {
            console.error(JSON.stringify(e));
        });
    };

    signIn({phone_code, phone_number, phone_code_hash}) {
        return api.call('auth.signIn', {
            phone_code,
            phone_number,
            phone_code_hash,
        }).then(result => {
            return result;
        }).catch(e => {
            console.error(JSON.stringify(e));
        });
    }

    signUp({phone, phone_code_hash}) {
        return api.call('auth.signUp', {
            phone_number: phone,
            phone_code_hash: phone_code_hash,
            first_name: 'MTProto',
            last_name: 'Core',
        }).then(result => {
            return result;
        }).catch(e => {
            console.error(JSON.stringify(e));
        })
    }

    getPassword() {
        return api.call('account.getPassword');
    }

    checkPassword({srp_id, A, M1}) {
        return api.call('auth.checkPassword', {
            password: {
                _: 'inputCheckPasswordSRP',
                srp_id,
                A,
                M1,
            },
        });
    }
}

module.exports = new AuthMethods()