# Email Troubleshooting Guide

## Quick Diagnostic Steps

### Step 1: Check if SMTP is Working
```bash
node test-email.js
```

**Expected Output**:
```
✅ SMTP connection successful!
✅ Test email sent successfully!
```

**If this fails**: SMTP credentials are incorrect or network issues

---

### Step 2: Check if API is Working  
```bash
# Terminal 1: Make sure dev server is running
npm run dev

# Terminal 2: Run API test
node test-contact-api.js
```

**Expected Output**:
```
✅ SUCCESS! Contact form API is working!
📥 Response Status: 200 OK
```

**If this fails**: Check server logs for errors

---

### Step 3: Test in Browser
1. Open http://localhost:3000/contact
2. Open browser console (F12)
3. Fill and submit the form
4. Check for:
   - ✅ Success message on page
   - ✅ No errors in console
   - ✅ Network tab shows `/api/contact` with 200 status

---

## Common Issues & Solutions

### Issue: "SMTP authentication failed"

**Cause**: Invalid Gmail app password

**Solution**:
1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication if not already enabled
3. Create new app password:
   - Select "Mail"
   - Select "Other (Custom name)"
   - Name it "Valtrix Website"
4. Copy the 16-character password (no spaces)
5. Update `.env.local`:
   ```env
   SMTP_PASS=your-16-char-password-here
   ```
6. Restart dev server

---

### Issue: "Connection timeout" or "ECONNREFUSED"

**Cause**: Network or firewall blocking SMTP port

**Solution**:
1. Check internet connection
2. Try different network (mobile hotspot, etc.)
3. Check if firewall is blocking port 587
4. Try port 465 with secure:true:
   ```env
   SMTP_PORT=465
   ```
   And update `lib/email.ts`:
   ```typescript
   secure: true, // Change from false to true
   ```

---

### Issue: Form submits but no email received

**Diagnostic Steps**:

1. **Check browser console for errors**
   - Open DevTools (F12)
   - Look for red error messages
   - Check Network tab for failed requests

2. **Check server logs**
   - Look in terminal running `npm run dev`
   - Should see:
     ```
     📧 Attempting to send contact email...
     ✅ Contact email sent to company
     ✅ Auto-response sent to customer
     ```

3. **Check spam folder**
   - Emails might be in spam/junk folder
   - Add info@valtrixmaterials.com to safe senders

4. **Verify environment variables loaded**
   - Server should show: `Environments: .env.local` on startup
   - Run: `node test-email.js` to verify SMTP config

**Solutions**:
- If console shows errors → See error message details
- If server logs show errors → Check SMTP credentials
- If no errors but no email → Check spam folder
- If form shows "success" but server shows no logs → Frontend/backend mismatch

---

### Issue: 403 Forbidden error

**Cause**: Origin/CSRF validation failed

**Solution**:
- In production: Verify domain is in `ALLOWED_ORIGINS` list in `lib/server-validation.ts`
- In development: Should work automatically
- Check `middleware.ts` isn't blocking the request

---

### Issue: 429 Too Many Requests

**Cause**: Rate limiting triggered (3 requests per 15 minutes)

**Solution**:
- Wait 15 minutes
- Or restart dev server to clear rate limit cache
- In production: Normal security feature, prevents spam

---

### Issue: Form validation errors

**Cause**: Client-side validation failing

**Common Validations**:
- Name: 2-100 characters, letters only
- Email: Valid format, not disposable email
- Message: 10-5000 characters
- All fields: No HTML/script tags

**Solution**:
- Check error message shown on form
- Ensure all required fields filled
- Use real email address (not temporary/disposable)

---

## Environment Variables Checklist

In `.env.local`, verify these are set:

```env
# Required for email functionality
SMTP_HOST=smtp.gmail.com          ✓ Set
SMTP_PORT=587                     ✓ Set
SMTP_USER=info@valtrixmaterials.com  ✓ Set
SMTP_PASS=zyeykvyytpuzlzmw       ✓ Set

# Required for recipient
COMPANY_EMAIL=info@valtrixmaterials.com  ✓ Set

# Optional (for logo in emails)
NEXT_PUBLIC_SITE_URL=https://valtrixmaterials.com  ✓ Set

# Optional (for reCAPTCHA)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=   ⚠️ Not set (optional)
RECAPTCHA_SECRET_KEY=             ⚠️ Not set (optional)
```

---

## Browser Console Debugging

### Check for JavaScript errors

1. Open browser console (F12)
2. Go to Console tab
3. Look for errors (red text)

**Common errors**:

#### "Failed to fetch"
**Cause**: Server not running or CORS issue  
**Fix**: Ensure `npm run dev` is running

#### "Network request failed"  
**Cause**: API route error or server crash  
**Fix**: Check server terminal for error messages

#### "Unexpected token" in response
**Cause**: API returned HTML error page instead of JSON  
**Fix**: Check server logs for actual error

---

## Network Tab Debugging

1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit form
4. Look for `/api/contact` request

**Good Response**:
```
Status: 200 OK
Response: {"success":true}
```

**Bad Responses**:

### 403 Forbidden
**Cause**: CSRF/origin check failed  
**Fix**: Check middleware.ts and server-validation.ts

### 422 Validation Error
**Cause**: Form data invalid  
**Fix**: Check response body for `errors` object with details

### 429 Too Many Requests
**Cause**: Rate limit exceeded  
**Fix**: Wait 15 minutes or restart server

### 500 Internal Server Error  
**Cause**: Server error (likely SMTP)  
**Fix**: Check server logs for error details

---

## Server Log Debugging

When form is submitted, server should log:

```
📧 Attempting to send contact email...
SMTP Config: {
  host: 'smtp.gmail.com',
  port: '587',
  user: 'info@valtrixmaterials.com',
  hasPass: true
}
✅ SMTP server is ready to send emails
✅ Contact email sent to company
✅ Auto-response sent successfully to test@example.com
✅ Auto-response sent to customer
POST /api/contact 200 in 6.9s
```

**If you see errors instead**:

### "SMTP configuration error"
**Fix**: Check SMTP credentials in `.env.local`

### "Invalid login"
**Fix**: Generate new Gmail app password

### "Connection timeout"
**Fix**: Check network/firewall, try different network

### "Email verification failed"
**Fix**: Check recipient email format is valid

---

## Testing Email Deliverability

### Test with Real Email

1. Use your personal email as test
2. Submit contact form
3. Check inbox AND spam folder
4. Time how long email takes to arrive

**Normal delivery time**: 5-30 seconds

### Check Email Headers

If email arrives but looks suspicious:

1. Open email
2. View email source/headers
3. Check for SPF, DKIM, DMARC records
4. Look for spam score

---

## Production Deployment Checklist

Before deploying to production:

### Vercel Environment Variables

Add to Vercel Dashboard → Settings → Environment Variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@valtrixmaterials.com
SMTP_PASS=your-app-password-here
COMPANY_EMAIL=info@valtrixmaterials.com
NEXT_PUBLIC_SITE_URL=https://vamvaltrix.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-key-here (if using)
RECAPTCHA_SECRET_KEY=your-secret-here (if using)
```

### Post-Deployment Tests

1. Test contact form on production URL
2. Verify emails received
3. Check no CORS errors in browser console
4. Test from different browsers/devices
5. Verify auto-response emails sent
6. Check email formatting looks correct

---

## Getting Help

### Check Logs First

**Local Development**:
- Browser console (F12)
- Server terminal running `npm run dev`

**Production (Vercel)**:
- Vercel Dashboard → Project → Logs
- Real-time function logs
- Error tracking

### Gather Information

When reporting an issue, include:

1. **Error message** (exact text)
2. **Server logs** (from terminal)
3. **Browser console** (screenshot)
4. **Network request** (from Network tab)
5. **Steps to reproduce**
6. **Environment** (local dev or production)

### Test Scripts

Always run test scripts first:

```bash
# Test SMTP connection
node test-email.js

# Test API endpoint
node test-contact-api.js
```

Paste results when asking for help.

---

## FAQ

### Q: Emails sent but customer auto-response fails?
**A**: This is normal. Auto-response failures don't affect main company notification. Check if customer email is valid.

### Q: Can I use a different email provider?
**A**: Yes! Update `SMTP_HOST`, `SMTP_PORT`, and credentials in `.env.local`. Common providers:
- Gmail: smtp.gmail.com:587
- Outlook: smtp-mail.outlook.com:587
- SendGrid: smtp.sendgrid.net:587
- AWS SES: email-smtp.region.amazonaws.com:587

### Q: How do I enable reCAPTCHA?
**A**: 
1. Get keys from https://www.google.com/recaptcha/admin
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```
3. Restart server
4. reCAPTCHA automatically loads on contact form

### Q: How do I monitor email delivery in production?
**A**: 
- Check Vercel function logs
- Set up error monitoring (Sentry, etc.)
- Use email delivery service with dashboard (SendGrid, AWS SES)
- Monitor inbox for test submissions

### Q: Rate limit too strict?
**A**: Edit limits in API routes:
```typescript
// app/api/contact/route.ts
const RATE_LIMIT = { 
  limit: 5,        // Change from 3 to 5
  windowMs: 15 * 60 * 1000  // Keep 15 minutes
};
```

---

**Last Updated**: January 2025  
**Version**: 1.0
