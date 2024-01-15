const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendMail = async (data) => {
  try {
    let Options = {
      from: process.env.SMTP_MAIL,
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
