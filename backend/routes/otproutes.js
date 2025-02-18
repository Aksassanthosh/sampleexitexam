const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const OTP = require('../model/otp');

require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



router.post('/sendotp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    try {
        // Save OTP in database
        const result = await OTP.findOneAndUpdate(
            { email },
            { otp, createdAt: new Date() },
            { upsert: true, new: true }
        );
        console.log("OTP saved in database:", result); 

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
                return res.status(500).json({ error: 'Failed to send OTP', details: error.message });
            }
            console.log('Email sent successfully:', info.response);
            res.json({ message: 'OTP sent successfully!' });
        });
    } catch (error) {
        console.error('Error in OTP handling:', error);
        return res.status(500).json({ error: 'Error generating OTP', details: error.message });
    }
});

router.post('/verifyotp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    try {
        const record = await OTP.findOne({ email, otp });

        if (record) {
            const otpTime = new Date(record.createdAt);
            const currentTime = new Date();
            const timeDifference = (currentTime - otpTime) / 1000 / 60; // In minutes

            if (timeDifference <= 5) {
                return res.json({ success: true, message: 'OTP Verified!' });
            } else {
                return res.status(400).json({ success: false, message: 'OTP has expired' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Error verifying OTP', details: error.message });
    }
});

module.exports = router;
