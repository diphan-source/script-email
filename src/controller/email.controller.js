
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    secure : false, // true for 465, false for other ports
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    },
    tls : {
        rejectUnauthorized : false
    }
});

const sendEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to : process.env.EMAIL_USER,
            subject : `Message from ${name} - ${email}`,
            Text: message
        };

        if (!name || !email || !message) {
            return res.status(400).json({ message : 'All fields are required' });
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message : 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message : 'Internal server error' });
    }
}

module.exports = { sendEmail };