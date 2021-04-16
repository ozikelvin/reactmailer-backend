const jwt = require('jsonwebtoken');
const { findUser } = require("./user_utils/user");


const signJWT = (username, expires, callback) => {
    try {
        jwt.sign(
            {
                username: username,
            },
            process.env.JWT_TOKEN_SECRET,
            expires ? { expiresIn: expires } : { expiresIn: '20m' },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        callback(error, null);
    }
};



/// This should be its own function in a middleware folder
const extractJWT = (req, res, next) => {

    let authHeader = req.headers['authorization'];

    const userToken = authHeader && authHeader.split(' ')[1]
    
    if (!userToken) return res.status(404).json({ Message: "Unauthorized access" });


    jwt.verify(userToken, process.env.JWT_TOKEN_SECRET, (error, userID) => {
        if (error) return res.status(404).json({ Message: "Unauthorized access expired token" });
        req.locals = userID;
        req.token = userToken;
        next();

    });

}
/// This should also be its own function in a middleware folder
const checkJWT = async (req, res, next) => {
    console.log("here");
    try {
        const token = req.token;
        const userid = req.locals;
        const { found, user } = await findUser({ _id: userid.username });
        if (!found) return res.status(404).json({ message: "Unauthorized access" });
        if (user.token.trim().toString() !== token.trim().toString()) return res.status(404).json({ message: "Unauthorized access" });
        next();
    } catch {
        return res.status(404).json({ Message: "Unauthorized access" })
    }
}



module.exports = {
    signJWT,
    extractJWT,
    checkJWT
}