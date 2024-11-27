const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env


const sendResetEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Your Gmail address
            pass: process.env.EMAIL_PASS,  // Your App Password
        },
    });
    
    

    console.log('Transporter configured');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Here is your password reset token: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent');
};

module.exports = { sendResetEmail };


