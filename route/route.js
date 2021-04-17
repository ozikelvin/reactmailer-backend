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
router.post('/sendMail', extractJWT, checkJWT, sendMailController.sendMail);

// Send multiple sender
router.post('/multipleSend', extractJWT, checkJWT, uploads.single('file'), sendMailController.multipleMail);

/// LogOut 
router.post('/logout', extractJWT, auth.logout);

/// Profile
router.get('/profile', extractJWT, checkJWT, profile);

/// Admin login
router.post('/adminLogin', admin.login);

/// Admin get coupons and users
router.get('/details', extractJWT, checkAdminJWT, admin.getDetails);

/// Admin create coupon
router.get("/coupon/create", extractJWT, checkAdminJWT, coupon.createACoupon);

/// Adimin delete coupon
router.post("/coupon/delete", extractJWT, checkAdminJWT, coupon.deleteACoupon);

/// Admin delete user
router.post("/user/delete", extractJWT, checkAdminJWT, admin.deleteAUser);

module.exports = router;