const mailer = require('../utils/sendMail');



exports.sendMail = async(req, res)=>{

                
                //let rep = rp.split(',')[1]
                        //console.log(req.file)
                    const newMail = {
                        from: req.body.sender, 
                        to: req.body.receiver,
                        subject: req.body.subject,
                        replyTo: req.body.reply,
                        html: req.body.text,
                        attachments: [
                                { path: req.file.path}
                        ]
                    }

                   await mailer.sendMail(newMail) .then((done)=> {
                    return res.status(200).json({Message: `Message Sent successfully`, Success:true})
                   })
                   .catch((err)=> res.status(4000).json({Message:'Message not sent'+ err}))
  
                    
            
                    

            }
        
    



exports.multipleMail = async (req, res)=>{
    req.body.receiver.map(email =>{
          mailer.sendMail({
            from: req.body.sender, 
            to: email,
            subject: req.body.subject,
            replyTo: req.body.reply,
            body: req.body.body
          })
          .then(done => res.json({Message: 'Message sent', success: true}))
          .catch(err => res.json({Message: `Message not sent ${err}`, success: false}))
    })
}




