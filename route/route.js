const express = require('express');

const router = express()
const sendMailController = require('../controller/mail');
const uploads = require('../utils/uploads')

// Send mail to someone
router.post('/sendMail', sendMailController.sendMail);

// Send multiple sender
router.post('/multipleSend',uploads.single('file'), sendMailController.multipleMail);


module.exports= router;