const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "190540107102@darshan.ac.in",
        pass: "ru752790"
    },
});

const sendEmail = (req, res) => {
    const { sendTo, subject, messages } = req.body;

    if (!sendTo) {
        res.status(404).json({error:"Please enter the sender's email address"});
    } 
    else if (!subject) {
        res.status(400).json({error:"Please enter the subject"});
    } 
    else if (!messages) {
        res.status(400).json({error:"Please enter the message"});
    } 
    else {
        const mailOptions = {
            from: "1906540107102@darshan.ac.in",
            to: sendTo,
            subject: subject,
            text: messages
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(404).json({error:"Error in sending mail!!!"});
            } else {
                res.status(200).json({success:`Email sent successfully to ${sendTo}`});
            }
        });
    }
};

module.exports = {
    sendEmail
};
