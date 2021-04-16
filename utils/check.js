const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser')
exports.isLoggedIn = (req, res, next)=>{

if(req.cookies.user ){
    res.redirect('/sendMail')
}
res.redirect('/login')
next()
};