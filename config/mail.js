const nodemailer = require("nodemailer");
const credential = require('./credentials');

async function main() {
  let transporter = nodemailer.createTransport({
    host: 'kapecom.ddhub.org.ng',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@kapecom.ddhub.org.ng', // generated ethereal user
      pass: 'Password@Kapecom', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Kapecom", // sender address
    to: "usmanabubakar0014@yahoo.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world? Am working subject not running</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
