# Deployment Guide

## VAM VALTRIX Website Deployment Documentation

This guide covers deploying and maintaining the VAM VALTRIX website.

---

## 🚀 Quick Deploy

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account access
- Vercel account access

### Deploy to Production

1. **Commit Changes**
```bash
git add .
git commit -m "your commit message"
```

2. **Push to GitHub**
```bash
git push origin main
```

3. **Automatic Deployment**
- Vercel automatically deploys from the `main` branch
- Build time: ~2-5 minutes
- Production URL: https://vam-valtrix.vercel.app
- Custom Domain: https://vamvaltrix.com

---

## 📦 Environment Setup

### Local Development

1. **Clone Repository**
```bash
git clone https://github.com/kanubrd/VAM.git
cd VAL-PROJECT-main
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=your-email@gmail.com

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Optional: Backend API
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

4. **Run Development Server**
```bash
npm run dev
```

Visit http://localhost:3000

---

## 🔧 Build & Deploy

### Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

### Build Output
- Static pages: `.next/static/`
- Server components: `.next/server/`
- Standalone mode: `.next/standalone/`

---

## 🌐 Vercel Configuration

### Project Settings
- **Project Name**: vam-valtrix
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`


### Environment Variables (Vercel)

Add these in Vercel Dashboard → Settings → Environment Variables:

**Production Environment:**
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP port (587 for TLS)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASSWORD` - SMTP password (use app-specific password)
- `SMTP_FROM` - Sender email address
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Public reCAPTCHA key
- `RECAPTCHA_SECRET_KEY` - Secret reCAPTCHA key
- `NEXT_PUBLIC_API_URL` - Backend API URL (if applicable)

**Important**: Never commit `.env.local` to Git!

---

## 🔄 Deployment Workflow

### Automatic Deployments

**Main Branch** (Production):
1. Push to `main` branch
2. Vercel builds automatically
3. Deployed to https://vamvaltrix.com
4. Takes 2-5 minutes

**Preview Deployments**:
1. Create pull request
2. Vercel creates preview URL
3. Test changes before merging
4. URL format: `vam-valtrix-<branch>.vercel.app`

### Manual Deployment (Vercel CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📊 Monitoring & Analytics


### Check Deployment Status

**Vercel Dashboard**: https://vercel.com/dashboard
- Real-time build logs
- Deployment history
- Performance metrics
- Error tracking

**GitHub Actions**: Check `.github/workflows/` for CI/CD status

### Performance Monitoring

**Core Web Vitals**:
- Largest Contentful Paint (LCP): < 2.5s ✓
- First Input Delay (FID): < 100ms ✓
- Cumulative Layout Shift (CLS): < 0.1 ✓

**Tools**:
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- Lighthouse CI

---

## 🐛 Troubleshooting

### Build Failures

**Common Issues**:

1. **TypeScript Errors**
```bash
# Check for type errors
npm run build
```
Fix: Resolve TypeScript errors in code

2. **Missing Environment Variables**
```
Error: SMTP_HOST is not defined
```
Fix: Add missing variables in Vercel Dashboard

3. **Dependency Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Deployment Issues

**Issue**: Deployment hangs
- Check Vercel status page
- Review build logs in dashboard
- Verify GitHub integration

**Issue**: 404 on routes
- Check `next.config.mjs` redirects
- Verify page files exist in `app/` directory
- Clear browser cache

---

## 🔐 Security Checklist

Before deploying:
- [ ] All environment variables set in Vercel
- [ ] `.env.local` not committed to Git
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured (see `next.config.mjs`)
- [ ] reCAPTCHA keys valid and working
- [ ] SMTP credentials tested
- [ ] No hardcoded secrets in code

---

## 🚨 Emergency Rollback

If production has critical issues:

**Option 1: Vercel Dashboard**
1. Go to Deployments tab
2. Find last working deployment
3. Click "..." → "Promote to Production"

**Option 2: Git Revert**
```bash
# Find the commit to revert to
git log --oneline

# Revert to previous commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

---

## 📱 Domain Configuration

### Custom Domain Setup

**Current Domains**:
- Primary: `vamvaltrix.com`
- Vercel: `vam-valtrix.vercel.app`

**DNS Configuration**:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**SSL Certificate**: Automatic (Let's Encrypt via Vercel)

---

## 📈 Performance Optimization

### Image Optimization
- All images use Next.js `<Image>` component
- AVIF/WebP formats auto-generated
- Lazy loading enabled
- Proper `sizes` attributes set

### Caching Strategy
- Static assets: 1 year (immutable)
- Images: 1 day with stale-while-revalidate
- HTML: No cache (dynamic)

---

## 🔄 Update Procedures

### Dependency Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

---

## 📞 Support

**Technical Issues**:
- GitHub: https://github.com/kanubrd/VAM/issues
- Vercel Support: https://vercel.com/support

**Contact**:
- Email: info@valtrixmaterials.com
- Phone: +91 98981 23983

---

Last Updated: January 2025
