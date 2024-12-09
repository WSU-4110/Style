import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

interface HelpFormValues {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message }: HelpFormValues = await req.json();
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.elasticemail.com', 
      port: parseInt(process.env.SMTP_PORT || '2525'), 
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'style.testing78@gmail.com',
      subject: 'Help Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
