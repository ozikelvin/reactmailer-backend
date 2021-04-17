const nodemailer = require('nodemailer');

/// If you need access to the current authorized userID,
/// You can get it through ->  const { username } = req.locals;
/// The username id the userid
/// You can use this to query mongoose;

exports.sendMail = async (req, res) => {
    const {name, sender, receiver, subject, reply, text } = req.body;
    if (!name || !sender || !receiver || !subject || !reply || !text) return res.status(404).json({ Message: 'A required field is missing', success: false });


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
      from: {
          name: name,
          address: sender
      },
      to: receiver,
      subject: subject,
      replyTo: reply,
      html: text

  }

 transporter.sendMail(newMail, (err, done)=>{
       if(err){
           return res.status(400).json({Message:`Message not sent ${err}`, success:false})
        }
             return res.status(200).json({Message:'Message Sent Successfully', success:true})
 })
 }





exports.multipleMail = async (req, res)=>{

    const { sender, receiver, subject, reply, text } = req.body;
    if (!sender || !receiver || !subject || !reply || !text) return res.status(404).json({ Message: 'A required field is missing', success: false });
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
        from: sender,
        to: receiver,
        subject: subject,
        replyTo: reply,
        text: text,
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




