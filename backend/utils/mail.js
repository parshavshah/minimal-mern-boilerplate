const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_EMAIL_ID,
    pass: process.env.GMAIL_EMAIL_PASSWORD,
  },
});

exports.sendMail = async (data) => {
  try {
    let Options = {
      from: process.env.FROM_EMAIL,
      to: data["to"],
      subject: data["subject"],
      text: data["text"],
    };
    let resultData = await transporter.sendMail(Options).catch((error) => {
      throw error;
    });
    console.log(resultData);
  } catch (error) {
    throw error;
  }
};
