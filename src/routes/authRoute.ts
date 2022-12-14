import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.use(function (req, res, next) {
    res.locals.user = null;
    res.locals.error = null;
    res.locals.phone = null;
    res.locals.users = null;
    res.locals.channels = null;
    res.locals.chats = null;
    next();
});

router.get('/', authController.getUser);

router.get('/signin', (req, res) => {
    res.render('pages/signIn')
});

router.post('/signin', authController.sendCode)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

export default router;