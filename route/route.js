const express = require('express');

const router = express()
const sendMailController = require('../controller/mail');
const uploads = require('../utils/uploads')
const auth = require('../controller/auth');
const logCheck = require('../utils/check');

//Create a new User
router.post('/reg', auth.signUp)
// Login User
router.post('/login', auth.login)
// Send mail to someone
router.post('/sendMail', sendMailController.sendMail);

// Send multiple sender
router.post('/multipleSend',uploads.single('file'), sendMailController.multipleMail);


module.exports= router;