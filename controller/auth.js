const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const User = require('../user/user');
 const jwt = require('jsonwebtoken');
 

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

    const user = await User.findOne({email: email})
    if(!user){
        console.log('Wrong Username or password')
        return res.status(401).json({Message: 'Wrong Username or password', success:false})
  }else if(Number(user.expires)- Date.now() <= 0){
      console.log('Sub don finish')
    return res.json({Message:'Recharge', success:false, expired:true}) 
  }else{
    await bcrypt.compare(password, user.password)
    .then((done)=>{
        if(!done){
           console.log('Wrong Username or password')
         return res.status(401).json({Message: 'Wrong Username or password', success:false})  
        }
        else{
            console.log('Login Successful')
            let token = {
                id: user._id,
                counter: user.counter,
                name: user.name,
                email:user.email
            }
        
            res.cookie('token', token, {
                httpOnly:true,
                sameSite:false,
                secure: process.env.NODE_ENV === 'production' ? true: false
            });
            
            // console.log(res.cookie()
            res.status(200).json({Message: 'Successfully logged In', success:true})
            
        }
    })
    .catch(err =>{
        console.log('Something went wrong '+ err)
          res.status(401).json({Message: 'Wrong Username or password' + err, success:false})
    })
   
  }
            
}