const express = require('express');

const router = express()
const sendMailController = require('../controller/mail');
const uploads = require('../utils/uploads')
const auth = require('../controller/auth');
const admin = require('../controller/admin');
const profile = require('../controller/profile');
const { extractJWT, checkJWT, checkAdminJWT } = require("../utils/jwtHelpers");
const coupon = require("../controller/coupon");

/// Create a new User
router.post('/reg', auth.signUp)
// Login User
router.post('/login', auth.login)
// Send mail to someone
router.post('/sendMail',  sendMailController.sendMail);

// Send multiple sender
router.post('/multipleSend', uploads.single('file'), sendMailController.multipleMail);

/// LogOut
router.post('/logout', extractJWT, auth.logout);

/// Profile
router.get('/profile', extractJWT, checkJWT, profile);

/// Admin login
router.post('/admin.v1/login', admin.login);

/// Admin get coupons and users
router.get('/admin.v1/details',  admin.getDetails);

/// Admin create coupon
router.post("/admin.v1/coupon/create",  coupon.createACoupon);

/// Adimin delete coupon
router.post("/admin.v1/coupon/delete",  coupon.deleteACoupon);

/// Admin delete user
router.post("/admin.v1/user/delete", admin.deleteAUser); 

module.exports = router;
