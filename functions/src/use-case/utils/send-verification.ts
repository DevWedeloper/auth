import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendVerificationCode = async (
  toEmail: string,
  verificationCode: string,
) => {
  await transport.sendMail({
    from: process.env.SMTP_SENDER,
    to: toEmail,
    subject: 'Your verification code:',
    html: `<p>${verificationCode}</p>`,
  });
};

export const sendResetPasswordTokenAndUrl = async (
  toEmail: string,
  token: string,
  baseUrl: string,
) => {
  const resetUrl = `${baseUrl}/?token=${token}`;
  await transport.sendMail({
    from: process.env.SMTP_SENDER,
    to: toEmail,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};
