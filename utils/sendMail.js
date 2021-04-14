const nodemailer = require('nodemailer');


exports.sendMail = (mail)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.premium.orange.fr',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'jaspart.denis@wanadoo.fr', // generated ethereal user
          pass: 'Moulinette54', // generated ethereal password
        },
      });

        transporter.sendMail(mail)
    
}