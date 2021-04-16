const nodemailer = require('nodemailer');

     exports.sendMail = async(req, res)=>{

         let transporter = nodemailer.createTransport({
        host: 'smtp.premium.orange.fr',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'jaspart.denis@wanadoo.fr', // generated ethereal user
          pass: 'Moulinette54', // generated ethereal password
        },
      });                
                //let rep = rp.split(',')[1]
                
                    const newMail = {
                        from: req.body.sender, 
                        to: req.body.receiver,
                        subject: req.body.subject,
                        replyTo: req.body.reply,
                        html: req.body.text
                      
                    }
                    console.log(newMail)
                    
                   transporter.sendMail(newMail, (err, done)=>{
                        if(err){
                            return res.status(400).json({Message:`Message not sent ${err}`, success:false})
                        }
                        return res.status(200).json({Message:'Message Sent Successfully', success:true})
                    })
          
       
           }
        
    



exports.multipleMail = async (req, res)=>{

    
    let transporter = nodemailer.createTransport({
        host: 'smtp.premium.orange.fr',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'jaspart.denis@wanadoo.fr', // generated ethereal user
          pass: 'Moulinette54', // generated ethereal password
        },
      });    

    const newMail = {
        from: req.body.sender, 
        to: req.body.receiver,
        subject: req.body.subject,
        replyTo: req.body.reply,
        text: req.body.text,
        attachments: [
                { path: req.file.path}
        ]
    }

    console.log(newMail)
            
    transporter.sendMail(newMail, (err, done)=>{
        if(err){
            return res.status(400).json({Message:`Message not sent ${err}`, success:false})
        }
        return res.status(200).json({Message:'Message Sent Successfully', success:true})
    })
    
}




