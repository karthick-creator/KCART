const  nodemailer = require('nodemailer')

const sendEmail = async options => {
    const transport = {
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        auth : {
            user : process.env.SMTP_USER,
            pass : process.env.SMTP_PASS
        }
    }

    const transporter = nodemailer.createTransport(transport);

    const message = {
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to : options.email,
        subject : options.subject,
        text : options.text
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail;

// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "c079f3c90a2b67",
//       pass: "11f3e18430abda"
//     }
//   });