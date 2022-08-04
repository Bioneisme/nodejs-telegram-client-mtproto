const localStorage = require('localStorage')
const api = require('../api')
const authMethods = require('../methods/authMethods')
const auth = require("../methods/authMethods");

class AuthController {
    async getUser(req, res, next) {
        try {
            const user = await authMethods.getUser()
            res.render('pages/index', {user: user})
        } catch (e) {
            next(e)
        }
    }

    logout(req, res, next) {
        try {
            authMethods.logout().then(() => {
                return res.redirect('/')
            })
        } catch (e) {
            next(e)
        }
    }

    async sendCode(req, res, next) {
        try {
            const {phone} = req.body
            const code = await authMethods.sendCode(phone)
            if (code.error) {
                return res.render('pages/signIn', {error: code.message})
            } else {
                const {phone_code_hash} = code
                localStorage.setItem('phone_code_hash', phone_code_hash)
                res.render('pages/signIn', {phone: phone})
            }
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {phone, code, password} = req.body
            const phone_code_hash = localStorage.getItem('phone_code_hash')

            const signInResult = await authMethods.signIn(code, phone, phone_code_hash);

            if (signInResult.message === 'SESSION_PASSWORD_NEEDED') {
                const {srp_id, current_algo, srp_B} = await auth.getPassword();
                const {g, p, salt1, salt2} = current_algo;
                const {A, M1} = await api.mtproto.crypto.getSRPParams({
                    g,
                    p,
                    salt1,
                    salt2,
                    gB: srp_B,
                    password
                });

                const checkPasswordResult = await auth.checkPassword(srp_id, A, M1);
                if (checkPasswordResult.error)
                    return res.render('pages/signIn', {error: checkPasswordResult.message})
                return res.redirect('/')
            } else if (signInResult.error) {
                return res.render('pages/signIn', {error: signInResult.message})
            } else {
                return res.redirect('/')
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()