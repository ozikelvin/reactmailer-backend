
 const bcrypt = require('bcrypt');
 const User = require('../user/user');
const { signJWT } = require("../utils/jwtHelpers")
const { updateUser, findUser } = require("../utils/user_utils/user")

exports.signUp = async(req, res)=>{

    const hash = await bcrypt.hash(req.body.password, 10);
    

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        expires: Date.now() + 60*60*60*60
    })

   await newUser.save()
    .then(done => {
        console.log('User Created')
      return  res.json({Message:'Successfully Created New User',success: true, user:done})
    })
    .catch(err =>{
        console.log('Something went wrong')
        res.status(401).json({Message:`Failed to register new User ${err}`, success: false})
    })

}

exports.login = async (req, res)=>{

    const {email, password } = req.body

    const { found, user } = await findUser({ email });

    if (!found) return res.status(401).json({ Message: 'Wrong Username or password', success: false })

    if (Number(user.expires) - Date.now() <= 0) return res.json({ Message: 'Recharge', success: false, expired: true })

    await bcrypt.compare(password, user.password).then((done) => {

        if (!done) return res.status(401).json({ Message: 'Wrong Username or password', success: false });

        signJWT(user.id, null, (error, token) => {

            if (error) return res.status(404).json({ Message: "Unauthorized access" });

            const { updated } = await updateUser({ _id: user.id }, { token });

            if (updated) return res.status(200).json({ Message: 'Successfully logged In', success: true, token });

            return res.status(404).json({ Message: "Problem occured with login" });

        });
    })
        .catch(err => {

            res.status(401).json({ Message: 'Wrong Username or password' + err, success: false })
        })
   
  }



exports.logout = async (req, res) => {
    const { userid } = req.locals;
    const { updated } = await updateUser({ _id: userid }, { token: null });
    if (!updated) return res.status(404).json({ message: "Logout error" });
    return res.status(200).json({ Message: 'Successfully logged Out', success: true });
}

