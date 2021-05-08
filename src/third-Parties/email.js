const nodemailer = require('nodemailer');
const crypto = require('crypto')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass:  process.env.GMAIL_PASS
    }
  });
module.exports.sendResetPasswordEmail = async (email) => {

    const code = await crypto.randomBytes(6).toString('hex')


    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'Reset Password Code',
        text: `Here Is the Password Code: `+ code,
      };

    transporter.sendMail(mailOptions,(error)=> {
        if(error){
            console.log(error)
        }else{
            console.log('Mail Sent')
        }
    })
    return code
}