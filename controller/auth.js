
 const bcrypt = require('bcrypt');
 const User = require('../user/user');
const { signJWT } = require("../utils/jwtHelpers")
const { updateUser, findUser } = require("../utils/user_utils/user");
const { updateCoupon, findCoupon } = require("../utils/coupon_utils/coupon");

// exports.getUsers = (req, res) =>{
//     User.findOne({nam})
// }

exports.signUp = async(req, res)=>{

    const { name, email, password, coupon } = req.body;
    if (!name || !email || !password || !coupon) return res.status(404).json({ Message: 'A required field is missing', success: false });

    const { found } = await findUser({ email });

    if (found) return res.status(404).json({ Message: 'This user already exists', success: false });

    const { foundCoupon, couponFound } = await findCoupon({ code: coupon });
    if (!foundCoupon) console.log("Coupon not found");
    if (!foundCoupon) return res.status(404).json({ Message: 'This coupon does not exist', success: false });

    if (couponFound.isUsed) return res.status(404).json({ Message: 'This coupon is no longer valid.', success: false });
    if (foundCoupon) console.log(foundCoupon);
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
        name: name,
        email: email,
        password: hash,
        registrationMonth: +(new Date().getMonth())
    })
     console.log("here")
    await newUser.save()
        .then(async () => {
            const { updated } = await updateCoupon({ code: coupon }, { isUsed: true });
            if (!updated) return res.status(404).json({ Message: 'There is an issue with your coupon', success: false });
            return res.status(200).json({ Message: 'Successfully Created New User', success: true })
        })
        .catch(err => {
            console.log('Something went wrong')
            res.status(401).json({ Message: `Failed to register new User ${err}`, success: false })
        })

}

exports.login = async (req, res)=>{

    const {email, password } = req.body
    if (!email || !password) return res.status(404).json({ Message: 'A required field is missing', success: false });
    const { found, user } = await findUser({ email });
     if (!found) return res.status(401).json({ Message: 'Wrong Username or password', success: false })

    if (+(new Date().getMonth()) - user.registrationMonth > 2) return res.status(404).json({ Message: 'Your coupon has expired.', success: false });

    if (Number(user.expires) - Date.now() <= 0) return res.json({ Message: 'Recharge', success: false, expired: true })

    await bcrypt.compare(password, user.password).then((done) => {

        if (!done) return res.status(401).json({ Message: 'Wrong Username or password', success: false });

        signJWT(user._id, null, async (error, token) => {

            if (error) return res.status(404).json({ Message: "Unauthorized access" });

            const { updated } = await updateUser({ _id: user._id }, { token: token });

            if (updated) return res.status(200).json({ Message: 'Successfully logged In', success: true, token });

            return res.status(404).json({ Message: "Problem occured with login" });

        });
    })
        .catch(err => {

            res.status(401).json({ Message: 'Wrong Username or password' + err, success: false })
        })

  }



exports.logout = async (req, res) => {
    const userid = req.locals;
    const { updated } = await updateUser({ _id: userid.username }, { token: null });
    if (!updated) return res.status(404).json({ message: "Logout error" });
    return res.status(200).json({ Message: 'Successfully logged Out', success: true });
}

