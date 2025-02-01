import express from "express";
import crypto from "crypto";
import User from "../Model/User.model.js";
import Otp from "../Model/Otp.model.js";
import nodemailer from "nodemailer";

const router = express.Router();


const sendOtpEmail = (email, otp) => {
    console.log(process.env.EMAIL)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465, 
      secure: true, 
      logger: true,
      debug: true, 
      auth: {
        user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP email:", error);
    } else {
      console.log("OTP email sent: " + info.response);
    }
  });
};


router.post("/generate-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); 
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

    const otpRecord = new Otp({
      userId: user._id,
      otp,
      otpExpiry,
    });

    await otpRecord.save();

    sendOtpEmail(user.email, otp);

    res.status(200).json({ message: "OTP generated and sent successfully" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otpRecord = await Otp.findOne({ userId: user._id }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found for this user" });
    }

    if (new Date() > otpRecord.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (otpRecord.otp === otp) {
      console.log(otpRecord.otp , otp)
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
