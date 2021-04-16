const { findUser } = require("../utils/user_utils/user")

const profile = async (req, res, next) => {
    const userid = req.locals;
    const { found, user } = await findUser({ _id: userid.username });
    if (!found) return res.status(404).json({ Message: 'Could not get user profile details', success: false });
    const userProfile = {
        username: user.name,
        email: user.email,
        created_at: user.created_at,
        expires: user.expires
    }

    return res.status(200).json({ Message: 'Successfully got profile details', success: true, userProfile });
}

module.exports = profile;