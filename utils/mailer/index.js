const nodemailer = require("nodemailer");

const mailer = async (firstname, lastname, email, id) => {
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: "adetayoomotomiwa99@gmail.com",
    to: email,
    subject: "Email Confirmation",
    html: `
             <!DOCTYPE html>
             <html>
              <head>               
              </head>
               <body>
               <h1 style="color:orange;">Ticket Express </h1>
               <br>
               <h4> Hello ${firstname} ${lastname} </h4>
               <br>
               <p style="color:gray;"> Thank you for registering with us </p>
               <br>
               <p><a href="http://localhost/verify?id=${id}"> Click Here </a> To Complete Your Registration </p>
               </body>
             </html>
         `,
  };

  try {
    const response = await Transporter.sendMail(mailOptions);

    if (response) {
      console.log(response);
      return response;
    }
  } catch (err) {
    return false;
  }
};

module.exports = mailer;
