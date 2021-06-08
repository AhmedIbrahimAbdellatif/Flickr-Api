
/**
 * Crypto npm module
 * @module
 */
const crypto = require('crypto')

/**
 * sendgrid npm module to send email
 * @module
 */
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  from: 'apiflickr2020@gmail.com', // Change to your verified sender
  subject: 'Reset Password Code',
  
  
}

/**
 * 
 * @param {string} email 
 * @returns {string} Reset Passwrod Code
 */
module.exports.sendResetPasswordEmail = async (email) => {

    const code = await crypto.randomBytes(6).toString('hex')
    msg.to = email;
    msg.text =  `Here Is the Password Code: `+ code;
    sgMail.send(msg).then(() => console.log('Email Sent'))
    return code
}