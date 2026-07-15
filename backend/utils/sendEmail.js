import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML body
 */
const sendEmail = async (options) => {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: options.to,
            subject: options.subject,
            html: options.html,
        });

        if (error) {
            console.error('Resend Error:', error);
            throw new Error('Email could not be sent');
        }

        return data;
    } catch (error) {
        console.error('Send Email Error:', error);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
