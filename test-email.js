/**
 * Email SMTP Connection Test Utility
 * Run this script to test if SMTP credentials are working
 * 
 * Usage: node test-email.js
 */

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSMTPConnection() {
  console.log('\n🔍 Testing SMTP Configuration...\n');
  
  console.log('Configuration:');
  console.log('- SMTP Host:', process.env.SMTP_HOST || 'smtp.gmail.com');
  console.log('- SMTP Port:', process.env.SMTP_PORT || '587');
  console.log('- SMTP User:', process.env.SMTP_USER || 'NOT SET');
  console.log('- SMTP Pass:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('- Company Email:', process.env.COMPANY_EMAIL || 'NOT SET');
  console.log('');

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ ERROR: SMTP_USER or SMTP_PASS not configured in .env.local');
    console.log('\n📝 TO FIX:');
    console.log('1. Open .env.local file');
    console.log('2. Set SMTP_USER to your Gmail address');
    console.log('3. Generate a Gmail App Password:');
    console.log('   - Go to https://myaccount.google.com/apppasswords');
    console.log('   - Select "Mail" and "Other (Custom name)"');
    console.log('   - Name it "Valtrix Website"');
    console.log('   - Copy the generated 16-character password');
    console.log('4. Set SMTP_PASS to the app password (no spaces)');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  try {
    console.log('⏳ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Try sending a test email
    console.log('⏳ Sending test email...');
    const info = await transporter.sendMail({
      from: `"Valtrix Test" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.SMTP_USER,
      subject: 'Test Email from Valtrix Website',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #17A2B8;">✅ Email Configuration Test</h2>
          <p>This is a test email from your Valtrix website.</p>
          <p><strong>If you received this email, your SMTP configuration is working correctly!</strong></p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Sent at: ${new Date().toLocaleString()}<br>
            From: ${process.env.SMTP_USER}<br>
            To: ${process.env.COMPANY_EMAIL || process.env.SMTP_USER}
          </p>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('\n✨ Email system is working properly!');
    console.log('Check your inbox at:', process.env.COMPANY_EMAIL || process.env.SMTP_USER);
    
  } catch (error) {
    console.error('\n❌ SMTP Connection Error:', error.message);
    console.log('\n📝 TROUBLESHOOTING STEPS:\n');
    
    if (error.message.includes('Invalid login')) {
      console.log('❌ Authentication Failed - Invalid credentials');
      console.log('\n🔧 SOLUTION:');
      console.log('1. Verify SMTP_USER is correct');
      console.log('2. Generate a NEW Gmail App Password:');
      console.log('   - Go to: https://myaccount.google.com/apppasswords');
      console.log('   - You may need to enable 2-Factor Authentication first');
      console.log('   - Select "Mail" and "Other (Custom name)"');
      console.log('   - Copy the 16-character password (no spaces)');
      console.log('3. Update SMTP_PASS in .env.local with the new app password');
      console.log('4. Restart your development server');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('❌ Connection Refused - Cannot reach SMTP server');
      console.log('\n🔧 SOLUTION:');
      console.log('1. Check your internet connection');
      console.log('2. Verify firewall is not blocking port 587');
      console.log('3. Try changing SMTP_PORT to 465 and set secure: true');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('❌ Connection Timeout - SMTP server not responding');
      console.log('\n🔧 SOLUTION:');
      console.log('1. Check your internet connection');
      console.log('2. Try using a different network');
      console.log('3. Contact your ISP if port 587 is blocked');
    } else {
      console.log('❌ Unknown Error');
      console.log('\n🔧 GENERAL SOLUTIONS:');
      console.log('1. Check .env.local file exists and has correct values');
      console.log('2. Restart development server after changing .env.local');
      console.log('3. Verify Gmail account has "Less secure app access" disabled');
      console.log('4. Use App Password instead of regular password');
      console.log('5. Check Gmail account is not locked or suspended');
    }
    
    console.log('\n📧 Need help? Email configuration docs:');
    console.log('https://nodemailer.com/usage/using-gmail/');
  }
}

// Run the test
testSMTPConnection().catch(console.error);
