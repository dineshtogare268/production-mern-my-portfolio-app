const nodemailer = require("nodemailer");

const sendEmailController = (req, res) => {
  const { name, email, msg } = req.body;
  try {
    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //email matter
    transporter.sendMail({
      to: process.env.EMAIL,
      from: process.env.EMAIL,
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><h3>Name : ${name}</h3></li>
          <li><h3>Email : ${email}</h3></li>
          <li><h2>Message : ${msg}</h2></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
