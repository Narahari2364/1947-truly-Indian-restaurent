const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Generate random token for email verification or password reset
 * @returns {string} Random token
 */
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Send email verification email
 * @param {string} email - User email
 * @param {string} token - Verification token
 * @param {string} firstName - User first name
 */
const sendVerificationEmail = async (email, token, firstName) => {
  const verificationUrl = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"1947 Truly Indian" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify Your Email - 1947 Truly Indian',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Welcome to 1947 Truly Indian!</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #ff6b35; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">© 2024 1947 Truly Indian. All rights reserved.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @param {string} token - Reset token
 * @param {string} firstName - User first name
 */
const sendPasswordResetEmail = async (email, token, firstName) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"1947 Truly Indian" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request - 1947 Truly Indian',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Password Reset Request</h2>
        <p>Hi ${firstName},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #ff6b35; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">© 2024 1947 Truly Indian. All rights reserved.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = {
  generateToken,
  sendVerificationEmail,
  sendPasswordResetEmail
};

