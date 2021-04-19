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
router.post('/sendMail',extractJWT, checkJWT,  sendMailController.sendMail);

// Send multiple sender
router.post('/multipleSend',extractJWT, checkJWT, uploads.single('file'), sendMailController.multipleMail);

/// LogOut
router.post('/logout', auth.logout);

/// Profile
router.get('/profile', extractJWT, checkJWT, profile);

/// Admin login
router.post('/admin.v1/login', admin.login);

/// Admin get coupons and users
router.get('/admin.v1/details',extractJWT, checkAdminJWT,  admin.getDetails);

/// Admin create coupon
router.get("/admin.v1/coupon/create", extractJWT, checkAdminJWT, coupon.createACoupon);

/// Adimin delete coupon
router.post("/admin.v1/coupon/delete", extractJWT, checkAdminJWT ,coupon.deleteACoupon);

/// Admin delete user
router.post("/admin.v1/user/delete",extractJWT, checkAdminJWT, admin.deleteAUser);

module.exports = router;
