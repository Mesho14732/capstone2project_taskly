const nodemailer = require('nodemailer');
const { logger } = require('../utils/logger'); 

class EmailService {
    constructor() {
        // Create a transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, 
            port: process.env.EMAIL_PORT, 
            secure: process.env.EMAIL_SECURE === 'true', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });
    }

    /**
     * Send an email
     * @param {string} to 
     * @param {string} subject 
     * @param {string} text 
     * @param {string} html 
     */
    async sendEmail(to, subject, text, html = '') {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM, 
                to,
                subject,
                text,
                html, 
            };

            // Send email using the transporter object
            const info = await this.transporter.sendMail(mailOptions);

            // Log the message ID (optional)
            logger.info(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            // Log the error
            logger.error(`Failed to send email: ${error.message}`);
            throw new Error('Email sending failed');
        }
    }
}

module.exports = new EmailService();
