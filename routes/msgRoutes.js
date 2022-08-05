const router = require('express').Router();
const msgController = require('../controllers/msgController');

router.post('/sendMessageToUser', msgController.sendMessageToUser)

module.exports = router