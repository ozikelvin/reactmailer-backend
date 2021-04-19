
const { signJWT } = require("../utils/jwtHelpers")
const { getAllUsers, deleteUser } = require("../utils/user_utils/user");
const { getAllCoupons } = require("../utils/coupon_utils/coupon");





const login = async(req, res, next) => {
    const { adminName, password } = req.body;
    console.log(adminName)
    if (!adminName || !password) return res.status(404).json({ Message: 'A required field is missing', success: false });
    if (adminName !== process.env.ADMIN_NAME || password !== process.env.ADMIN_PASS) return res.status(404).json({ Message: 'Failed to authenticate you as admin.', success: false });

    signJWT(adminName,null, (error, token) => {
        if (error) return res.status(404).json({ Message: 'Something went wrong', success: false });
        res.status(200).json({ Message: "Signed in admin successfully", success: true, token });
    });
}

const getDetails = async (req, res, next) => {

    const { foundUsers, users } = await getAllUsers();
    if (foundUsers) {
        const { found, coupons } = await getAllCoupons();

        const details = {
            coupons,
            users
        }
        
        if (found) return res.status(200).json({ Message: "Got details", success: true, details });
        res.status(404).json({ Message: 'Could not get details', success: false });
    }

}

const deleteAUser = async(req, res, next) => {
    const { userID } = req.body;
    const { deleted } = await deleteUser({ _id: userID });
    if (!deleted) return res.status(404).json({ Message: 'Something went wrong', success: false });
    res.status(200).json({ Message: 'User deleted', success: true });
}

module.exports = {
    login,
    getDetails,
    deleteAUser
}
