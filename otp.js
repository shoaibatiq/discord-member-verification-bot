const dotenv = require("dotenv")
const nodemailer = require('nodemailer');

dotenv.config()

function generateOTP() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const sendOTP = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const otp = generateOTP()

    await transporter.sendMail({
        from: {
          name: 'Your Name',
          address: process.env.USER_EMAIL
      },
        to: email,
        subject: "Here's your Discord verification code",
        html: `<h3><div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee"></div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Use the following one-time password to complete your verification. This password is valid for only 10 minutes.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">See you soon,<br /><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">&nbsp;&nbsp;&nbsp;&nbsp;Your Name</a></p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          </div>
        </div>
      </div></h3>`
    });

    return otp
}

module.exports = {sendOTP}