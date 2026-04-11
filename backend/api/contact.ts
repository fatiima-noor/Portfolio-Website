import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 3;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // Rate limiting
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const rateItem = rateLimitMap.get(ip);

    if (rateItem) {
        if (now - rateItem.lastRequest < LIMIT_WINDOW) {
            if (rateItem.count >= MAX_REQUESTS) {
                return res.status(429).json({ error: 'Too many requests. Please wait 15 minutes before trying again.' });
            }
            rateItem.count++;
        } else {
            rateItem.count = 1;
            rateItem.lastRequest = now;
        }
    } else {
        rateLimitMap.set(ip, { count: 1, lastRequest: now });
    }

    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ error: 'Name must be at least 2 characters long.' });
        }

        if (!email || !validateEmail(email)) {
            return res.status(400).json({ error: 'Please provide a valid email address.' });
        }

        if (!message || message.trim().length < 10) {
            return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Server Configuration Error: Missing email credentials');
            return res.status(500).json({ error: 'Server is not configured to send emails.' });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const timestamp = new Date().toISOString();
        const year = new Date().getFullYear();

        // Email to Fatima (owner)
        const ownerHtml = [
            '<div style="background-color: #050a0f; color: #f0f0f0; font-family: monospace; padding: 40px; border: 1px solid #0e2a3a;">',
            '<div style="border-left: 3px solid #06b6d4; padding-left: 20px; margin-bottom: 30px;">',
            '<span style="color: #06b6d4; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;">// new message received</span>',
            '<h2 style="margin: 5px 0 0 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; color: #fff;">Portfolio <span style="color: #06b6d4;">Contact Form</span></h2>',
            '</div>',
            '<div style="background: #0a1520; border: 1px solid #0e2a3a; padding: 25px; border-radius: 4px;">',
            '<p style="margin: 0 0 15px 0;"><strong style="color: #06b6d4; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Name:</strong><br><span style="color: #e0e0e0;">' + name + '</span></p>',
            '<p style="margin: 0 0 15px 0;"><strong style="color: #06b6d4; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Email:</strong><br><span style="color: #e0e0e0;">' + email + '</span></p>',
            '<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #0e2a3a;">',
            '<strong style="color: #06b6d4; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Message:</strong>',
            '<p style="margin: 10px 0 0 0; line-height: 1.7; color: #a0b4c0; white-space: pre-wrap;">' + message + '</p>',
            '</div>',
            '</div>',
            '<div style="margin-top: 25px; font-size: 10px; color: #1a3a4a; text-align: right; letter-spacing: 2px;">// timestamp: ' + timestamp + '</div>',
            '</div>',
        ].join('');

        // Confirmation email to sender
        const clientHtml = [
            '<div style="background-color: #050a0f; color: #f0f0f0; font-family: monospace; padding: 50px 40px; border: 1px solid #0e2a3a; text-align: center;">',
            '<div style="max-width: 500px; margin: 0 auto;">',
            '<h1 style="font-size: 28px; text-transform: uppercase; letter-spacing: 6px; margin-bottom: 5px; font-weight: bold; color: #fff;">Noor.</h1>',
            '<p style="color: #06b6d4; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px;">// message received</p>',
            '<div style="text-align: left; background: #0a1520; border: 1px solid #0e2a3a; padding: 35px; border-radius: 4px; line-height: 1.8;">',
            '<p style="margin-top: 0; font-size: 15px;">Hello <strong style="color: #fff;">' + name + '</strong>,</p>',
            '<p style="color: #a0b4c0;">Thanks for reaching out. Your message has been received and I\'ll get back to you as soon as I can.</p>',
            '<div style="background: rgba(6, 182, 212, 0.05); border-left: 2px solid #06b6d4; padding: 18px; margin: 25px 0;">',
            '<span style="color: #06b6d4; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">// expected response time</span><br>',
            '<strong style="font-size: 16px; color: #fff;">Within 24–48 Hours</strong>',
            '</div>',
            '<p style="margin-bottom: 0; color: #a0b4c0;">In the meantime, feel free to check out my work on <a href="https://github.com/fatiima-noor" style="color: #06b6d4;">GitHub</a> or connect on <a href="https://www.linkedin.com/in/fatimanooor/" style="color: #06b6d4;">LinkedIn</a>.</p>',
            '</div>',
            '<div style="margin-top: 40px; border-top: 1px solid #0e2a3a; padding-top: 25px;">',
            '<p style="color: #1a3a4a; font-size: 11px; letter-spacing: 1px;">© ' + year + ' Fatima Noor · fatimanoor.se22@gmail.com</p>',
            '</div>',
            '</div>',
            '</div>',
        ].join('');

        const mailToOwner = {
            from: '"Portfolio Contact" <' + process.env.EMAIL_USER + '>',
            to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: 'New Message from ' + name,
            text: 'NEW MESSAGE\n\nName: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message,
            html: ownerHtml,
        };

        const mailToClient = {
            from: '"Fatima Noor" <' + process.env.EMAIL_USER + '>',
            to: email,
            subject: 'Got your message!',
            text: 'Hi ' + name + ',\n\nThanks for reaching out! I\'ve received your message and will get back to you within 24–48 hours.\n\nBest,\nFatima Noor',
            html: clientHtml,
        };

        await Promise.all([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(mailToClient),
        ]);

        return res.status(200).json({ success: true, message: 'Message sent successfully.' });

    } catch (error: unknown) {
        console.error('Email Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to send message.';
        return res.status(500).json({ error: errorMessage });
    }
}