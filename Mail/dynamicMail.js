const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});


async function otpSend(userMail,userName,otp){
    let htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #facc15; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="background: #facc15; padding: 20px; text-align: center; color: #000000;">
                <h1 style="margin: 0;">🍽️ Welcome to DineQ</h1>
            </div>

            <!-- Body -->
            <div style="padding: 20px; background: #fffde7;">
                <p style="font-size: 16px; color: #000;">
                Hello <b>${userName}</b>,<br><br>
                Thank you for choosing <b>DineQ</b> to book your restaurant seat.  
                Use the OTP below to complete your verification:
                </p>

                <!-- OTP Box -->
                <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background: #fffde7; padding: 15px 30px; border: 2px dashed #facc15; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #000000;">
                    ${otp}
                </div>
                </div>

                <p style="font-size: 14px; color: #000; text-align: center;">
                ⚠️ This OTP will expire in <b>10 minutes</b>. Please do not share it with anyone.
                </p>
            </div>

            <!-- Footer -->
            <div style="background: #000000; text-align: center; padding: 15px; font-size: 13px; color: #facc15;">
                &copy; 2025 DineQ. All rights reserved.
            </div>
        </div>
        `;

    const info = await transporter.sendMail({
    // from: 'arnabdutta8584@gmail.com',
    to: userMail,
    subject: "Welcome To DineQ",
    html: htmlContent, // HTML body
  });

  console.log("Message sent:", info.messageId);
}

module.exports=otpSend;