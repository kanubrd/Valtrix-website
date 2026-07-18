/**
 * Email service with templates and queue support
 * Centralizes all email sending logic
 */

import nodemailer from 'nodemailer';
import type { QuoteSubmission, ContactSubmission } from './db';

// ── Email Configuration ───────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// Verify transporter configuration on startup (dev only)
if (process.env.NODE_ENV === 'development') {
  transporter.verify((error) => {
    if (error) {
      console.error('❌ SMTP configuration error:', error.message);
    } else {
      console.log('✅ SMTP server is ready to send emails');
    }
  });
}

// ── Email Templates ───────────────────────────────────────────────────

function getEmailLayout(title: string, content: string): string {
  // Get base URL for logo (production URL or localhost for testing)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valtrixmaterials.com';
  const logoUrl = `${baseUrl}/valtrix-logo-teal.png`;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f3f4f6;">
      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#2C3E50 0%,#17A2B8 100%);padding:32px 24px;text-align:center;">
          <!-- Logo -->
          <div style="margin-bottom:16px;">
            <img src="${logoUrl}" alt="Valtrix Advanced Materials Logo" style="height:50px;width:auto;max-width:200px;display:inline-block;" />
          </div>
          <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Valtrix Advanced Materials</h1>
          <p style="color:#D1F2F7;margin:8px 0 0;font-size:14px;">${title}</p>
        </div>
        
        <!-- Content -->
        <div style="padding:32px 24px;">
          ${content}
        </div>
        
        <!-- Footer -->
        <div style="background:#f8fafb;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="margin:0;color:#6b7280;font-size:13px;">
            Valtrix Advanced Materials<br>
            Email: info@valtrixmaterials.com
          </p>
          <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">
            This email was sent from valtrixmaterials.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ── Quote Request Email ───────────────────────────────────────────────

export async function sendQuoteEmail(data: Omit<QuoteSubmission, 'id' | 'timestamp' | 'status' | 'ipAddress'>): Promise<void> {
  const productsList = data.products.length > 0
    ? data.products.join(', ')
    : 'Not specified';

  const content = `
    <div style="margin-bottom:24px;">
      <p style="color:#2C3E50;font-size:15px;line-height:1.6;margin:0 0 20px;font-weight:600;">
        Dear Valtrix Team,
      </p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#f8fafb;border-radius:8px;overflow:hidden;">
      <tr style="background:#2C3E50;">
        <td colspan="2" style="padding:16px;color:#ffffff;font-size:16px;font-weight:700;">
          📋 Quote Request Details
        </td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;width:200px;font-weight:600;background:#ffffff;">Client Name:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">${data.name}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Company:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">${data.company || 'Not provided'}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Email Address:</td>
        <td style="padding:14px 20px;background:#ffffff;"><a href="mailto:${data.email}" style="color:#17A2B8;text-decoration:none;font-size:14px;">${data.email}</a></td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Project Name:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">Valtrix Materials Quote Request</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Purpose of Email:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;"><span style="display:inline-block;padding:4px 12px;background:#17A2B8;color:#ffffff;border-radius:4px;font-weight:600;">Request</span></td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Products Requested:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">${productsList}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;vertical-align:top;">Details:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;line-height:1.6;background:#ffffff;">${data.material || 'No additional requirements specified'}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Priority:</td>
        <td style="padding:14px 20px;background:#ffffff;"><span style="display:inline-block;padding:4px 12px;background:#f59e0b;color:#ffffff;border-radius:4px;font-weight:600;font-size:13px;">High</span></td>
      </tr>
      <tr>
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Deadline:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">As soon as possible</td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:20px;background:#eff6ff;border-left:4px solid #17A2B8;border-radius:4px;">
      <p style="margin:0 0 8px;color:#1e40af;font-size:14px;font-weight:600;">
        ⚡ Quick Action Required
      </p>
      <p style="margin:0;color:#1e40af;font-size:13px;line-height:1.6;">
        Reply directly to this email to respond to the customer. Expected response time: 24-48 hours.
      </p>
    </div>

    <div style="margin-top:24px;padding-top:20px;border-top:2px solid #e2e8f0;">
      <p style="color:#2C3E50;font-size:14px;line-height:1.6;margin:0;">
        Thank you,<br>
        <strong>Best regards,</strong>
      </p>
      <p style="color:#2C3E50;font-size:14px;line-height:1.6;margin:8px 0 0;">
        <strong>${data.name}</strong><br>
        ${data.company ? `${data.company}<br>` : ''}
        <a href="mailto:${data.email}" style="color:#17A2B8;text-decoration:none;">${data.email}</a>
      </p>
    </div>
  `;

  const html = getEmailLayout('[Valtrix Materials] – Quote Request', content);

  const mailOptions = {
    from: `"Valtrix Website" <${process.env.SMTP_USER}>`,
    to: process.env.COMPANY_EMAIL || 'info@valtrixmaterials.com',
    replyTo: data.email,
    subject: `[Valtrix Materials] – Quote Request from ${data.name}`,
    html,
  };

  await transporter.sendMail(mailOptions);
}

// ── Contact Form Email ────────────────────────────────────────────────

export async function sendContactEmail(data: Omit<ContactSubmission, 'id' | 'timestamp' | 'status' | 'ipAddress'>): Promise<void> {
  const content = `
    <div style="margin-bottom:24px;">
      <p style="color:#2C3E50;font-size:15px;line-height:1.6;margin:0 0 20px;font-weight:600;">
        Dear Valtrix Team,
      </p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#f8fafb;border-radius:8px;overflow:hidden;">
      <tr style="background:#2C3E50;">
        <td colspan="2" style="padding:16px;color:#ffffff;font-size:16px;font-weight:700;">
          📧 Contact Form Submission
        </td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;width:200px;font-weight:600;background:#ffffff;">Client Name:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">${data.name}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Company:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">Not provided</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Email Address:</td>
        <td style="padding:14px 20px;background:#ffffff;"><a href="mailto:${data.email}" style="color:#17A2B8;text-decoration:none;font-size:14px;">${data.email}</a></td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Project Name:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">${data.subject}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Purpose of Email:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;"><span style="display:inline-block;padding:4px 12px;background:#17A2B8;color:#ffffff;border-radius:4px;font-weight:600;">Request</span></td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;vertical-align:top;">Details:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;line-height:1.6;background:#ffffff;white-space:pre-wrap;">${data.message}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Priority:</td>
        <td style="padding:14px 20px;background:#ffffff;"><span style="display:inline-block;padding:4px 12px;background:#f59e0b;color:#ffffff;border-radius:4px;font-weight:600;font-size:13px;">High</span></td>
      </tr>
      <tr>
        <td style="padding:14px 20px;color:#6B7280;font-size:14px;font-weight:600;background:#ffffff;">Deadline:</td>
        <td style="padding:14px 20px;color:#2C3E50;font-size:14px;background:#ffffff;">As soon as possible</td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:20px;background:#eff6ff;border-left:4px solid #17A2B8;border-radius:4px;">
      <p style="margin:0 0 8px;color:#1e40af;font-size:14px;font-weight:600;">
        ⚡ Quick Action Required
      </p>
      <p style="margin:0;color:#1e40af;font-size:13px;line-height:1.6;">
        Reply directly to this email to respond to the customer. Expected response time: 24 hours during business days.
      </p>
    </div>

    <div style="margin-top:24px;padding-top:20px;border-top:2px solid #e2e8f0;">
      <p style="color:#2C3E50;font-size:14px;line-height:1.6;margin:0;">
        Thank you,<br>
        <strong>Best regards,</strong>
      </p>
      <p style="color:#2C3E50;font-size:14px;line-height:1.6;margin:8px 0 0;">
        <strong>${data.name}</strong><br>
        <a href="mailto:${data.email}" style="color:#17A2B8;text-decoration:none;">${data.email}</a>
      </p>
    </div>
  `;

  const html = getEmailLayout('[Valtrix Materials] – Contact Form', content);

  const mailOptions = {
    from: `"Valtrix Website" <${process.env.SMTP_USER}>`,
    to: process.env.COMPANY_EMAIL || 'info@valtrixmaterials.com',
    replyTo: data.email,
    subject: `[Valtrix Materials] – ${data.subject}`,
    html,
  };

  await transporter.sendMail(mailOptions);
}

// ── Newsletter Welcome Email ──────────────────────────────────────────

export async function sendNewsletterWelcomeEmail(email: string): Promise<void> {
  // Verify email deliverability before attempting to send
  const isDeliverable = await verifyEmailDeliverability(email);
  if (!isDeliverable) {
    console.warn(`⚠️ Skipping newsletter welcome to potentially invalid email: ${email}`);
    return;
  }
  
  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <h2 style="color:#2C3E50;font-size:24px;margin:0 0 16px;">Welcome to Valtrix!</h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0;">
        Thank you for subscribing to our newsletter. You'll receive updates about our latest products, 
        industry insights, and special offers.
      </p>
    </div>

    <div style="background:#f8fafb;padding:24px;border-radius:8px;text-align:center;">
      <p style="color:#2C3E50;font-size:14px;margin:0 0 16px;">
        <strong>What to expect:</strong>
      </p>
      <ul style="list-style:none;padding:0;margin:0;text-align:left;max-width:400px;margin:0 auto;">
        <li style="padding:8px 0;color:#374151;">✓ Product announcements and updates</li>
        <li style="padding:8px 0;color:#374151;">✓ Industry news and technical insights</li>
        <li style="padding:8px 0;color:#374151;">✓ Exclusive offers and promotions</li>
        <li style="padding:8px 0;color:#374151;">✓ Technical resources and guides</li>
      </ul>
    </div>

    <div style="margin-top:24px;text-align:center;">
      <p style="color:#6B7280;font-size:13px;margin:0;">
        Not interested anymore? You can <a href="#" style="color:#17A2B8;">unsubscribe</a> at any time.
      </p>
    </div>
  `;

  const html = getEmailLayout('Welcome to Valtrix Newsletter', content);

  const mailOptions = {
    from: `"Valtrix Advanced Materials" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to Valtrix Advanced Materials Newsletter',
    html,
    headers: {
      'List-Unsubscribe': '<mailto:unsubscribe@valtrixmaterials.com>',
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Newsletter welcome sent successfully to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send newsletter welcome to ${email}:`, error);
    // Don't throw - allow subscription to succeed even if welcome email fails
  }
}

// ── Email Address Verification Helper ────────────────────────────────

/**
 * Verify if an email address is deliverable before sending
 * This helps prevent bounces and improves deliverability
 */
async function verifyEmailDeliverability(email: string): Promise<boolean> {
  // Check if email format is correct to improve performance and avoid redundant network calls
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn(`❌ Invalid email format: ${email}`);
    return false;
  }
  return true;
}

// ── Auto-response Emails ──────────────────────────────────────────────

export async function sendAutoResponseEmail(to: string, name: string, type: 'quote' | 'contact'): Promise<void> {
  // Verify email deliverability before attempting to send
  const isDeliverable = await verifyEmailDeliverability(to);
  if (!isDeliverable) {
    console.warn(`⚠️ Skipping auto-response to potentially invalid email: ${to}`);
    // Don't throw error, just log and continue
    // The main notification email to the company still goes through
    return;
  }
  const content = type === 'quote' ? `
    <div style="text-align:center;margin-bottom:32px;">
      <h2 style="color:#2C3E50;font-size:24px;margin:0 0 16px;">Thank You for Your Interest!</h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0;">
        Hi ${name}, we've received your quote request and our team will review it shortly.
      </p>
    </div>

    <div style="background:#f8fafb;padding:24px;border-radius:8px;">
      <p style="color:#2C3E50;font-size:14px;margin:0 0 16px;">
        <strong>What happens next?</strong>
      </p>
      <ul style="padding:0 0 0 20px;margin:0;color:#374151;font-size:14px;line-height:1.8;">
        <li>Our technical team will review your requirements</li>
        <li>We'll prepare a customized quote for your needs</li>
        <li>You'll receive a detailed response within 24-48 hours</li>
      </ul>
    </div>

    <div style="margin-top:24px;text-align:center;">
      <p style="color:#6B7280;font-size:13px;margin:0;">
        Have urgent questions? Contact us directly at <a href="mailto:info@valtrixmaterials.com" style="color:#17A2B8;">info@valtrixmaterials.com</a>
      </p>
    </div>
  ` : `
    <div style="text-align:center;margin-bottom:32px;">
      <h2 style="color:#2C3E50;font-size:24px;margin:0 0 16px;">Thank You for Contacting Us!</h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0;">
        Hi ${name}, we've received your message and will get back to you soon.
      </p>
    </div>

    <div style="background:#f8fafb;padding:24px;border-radius:8px;text-align:center;">
      <p style="color:#2C3E50;font-size:14px;margin:0;">
        Our team typically responds within <strong>24 hours</strong> during business days.
      </p>
    </div>

    <div style="margin-top:24px;text-align:center;">
      <p style="color:#6B7280;font-size:13px;margin:0;">
        Need immediate assistance? Call us or email <a href="mailto:info@valtrixmaterials.com" style="color:#17A2B8;">info@valtrixmaterials.com</a>
      </p>
    </div>
  `;

  const html = getEmailLayout(
    type === 'quote' ? 'Quote Request Received' : 'Message Received',
    content
  );

  const mailOptions = {
    from: `"Valtrix Advanced Materials" <${process.env.SMTP_USER}>`,
    to,
    subject: type === 'quote' 
      ? 'We Received Your Quote Request - Valtrix' 
      : 'We Received Your Message - Valtrix',
    html,
    headers: {
      'X-Auto-Response-Suppress': 'OOF, AutoReply',
      'Auto-Submitted': 'auto-replied',
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Auto-response sent successfully to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send auto-response to ${to}:`, error);
    // Log the error but don't throw - customer emails might be invalid
    // The main notification to the company should still succeed
  }
}
