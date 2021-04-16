
 const bcrypt = require('bcrypt');
 const User = require('../user/user');
const { signJWT } = require("../utils/jwtHelpers")
const { updateUser, findUser } = require("../utils/user_utils/user")

exports.signUp = async(req, res)=>{

    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(404).json({ Message: 'A required field is missing', success: false });

    const { found } = await findUser({ email });
    if (found) return res.status(404).json({ Message: 'This user already exists', success: false });

    const hash = await bcrypt.hash(password, 10);


    const newUser = new User({
        name: name,
        email: email,
        password: hash,
        expires: Date.now() + 60 * 60 * 60 * 60
    })

    await newUser.save()
        .then(done => {
            console.log('User Created')
            return res.json({ Message: 'Successfully Created New User', success: true })
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
    console.log(user._id);
    if (!found) return res.status(401).json({ Message: 'Wrong Username or password', success: false })

    if (Number(user.expires) - Date.now() <= 0) return res.json({ Message: 'Recharge', success: false, expired: true })

    await bcrypt.compare(password, user.password).then((done) => {

        if (!done) return res.status(401).json({ Message: 'Wrong Username or password', success: false });

        signJWT(user._id, null, async (error, token) => {
            if (error) console.log(error.message);
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

