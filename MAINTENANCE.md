# Maintenance Guide

## VAM VALTRIX Website Maintenance Documentation

This guide covers ongoing maintenance, updates, and troubleshooting.

---

## 📅 Regular Maintenance Schedule

### Daily Tasks
- [ ] Monitor Vercel deployment status
- [ ] Check error logs in Vercel dashboard
- [ ] Review contact form submissions
- [ ] Monitor website uptime

### Weekly Tasks
- [ ] Review analytics and performance metrics
- [ ] Check for security updates
- [ ] Test contact forms and newsletter signup
- [ ] Verify all links are working
- [ ] Check mobile responsiveness

### Monthly Tasks
- [ ] Update dependencies (`npm update`)
- [ ] Run security audit (`npm audit`)
- [ ] Review and update content
- [ ] Check SEO rankings
- [ ] Backup database (if applicable)
- [ ] Review and optimize images
- [ ] Check Core Web Vitals scores

### Quarterly Tasks
- [ ] Major dependency updates (Next.js, React)
- [ ] Comprehensive security review
- [ ] Performance optimization audit
- [ ] Content strategy review
- [ ] Competitor analysis
- [ ] Update documentation

---

## 🔧 Common Maintenance Tasks

### Adding New Pages

1. **Create Page File**
```typescript
// app/new-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
};

export default function NewPage() {
  return <div>Your content</div>;
}
```

2. **Add to Navigation**
Edit `components/navbar/navbar.tsx`:
```typescript
const navItems = [
  // ... existing items
  { label: 'New Page', href: '/new-page' },
];
```

3. **Update Sitemap**
Edit `app/sitemap.ts`:

```typescript
const staticRoutes = [
  // ... existing routes
  { route: '/new-page', priority: 0.8, changeFreq: 'monthly' as const },
];
```

4. **Test Locally**
```bash
npm run dev
# Visit http://localhost:3000/new-page
```

5. **Deploy**
```bash
git add .
git commit -m "feat: add new page"
git push origin main
```

---

### Updating Product Information

**Location**: `app/solutions/page.tsx`

1. **Edit Product Details**:
```typescript
const productDetails: Record<string, { overview: string; specs: string[]; applications: string[] }> = {
  'product-id': {
    overview: 'Product description...',
    specs: [
      'Specification 1',
      'Specification 2',
    ],
    applications: [
      'Application 1',
      'Application 2',
    ],
  },
};
```

2. **Update Product Images**:
- Add image to `/public/` folder
- Update `productImages` object:
```typescript
const productImages: Record<string, string> = {
  'product-id': '/your-image.png',
};
```

3. **Add Product to Solutions Data**:
Edit `data/solutions.ts`:
```typescript
export const solutions = [
  // ... existing products
  {
    id: 'product-id',
    title: 'Product Name',
    description: 'Brief description',
    icon: IconComponent,
    features: ['Feature 1', 'Feature 2'],
  },
];
```

---

### Managing Images

**Best Practices**:
- Use WebP or AVIF formats for best compression
- Optimize before uploading (max 2MB per image)
- Use descriptive filenames: `product-name-hero.png`
- Always provide descriptive alt text

**Image Sizes**:
- Hero images: 1920x1080 (Full HD)
- Product images: 800x600
- Thumbnails: 400x300
- Icons: 64x64 or SVG

**Optimization Tools**:

- TinyPNG (online): https://tinypng.com
- Squoosh (online): https://squoosh.app
- ImageOptim (Mac)
- GIMP (free, cross-platform)

**Adding Images**:
1. Optimize image file
2. Copy to `/public/` folder
3. Use in component:
```tsx
<Image
  src="/your-image.png"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

---

### Updating SEO Metadata

**Page-Specific Metadata**:
```typescript
// app/your-page/page.tsx
export const metadata: Metadata = {
  title: 'Page Title - VAM VALTRIX',
  description: 'Compelling description (150-160 characters)',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    title: 'OG Title for social sharing',
    description: 'OG description',
    images: ['/og-image.png'],
  },
};
```

**Root Metadata** (affects all pages):
Edit `app/layout.tsx` metadata object.

---

### Email Configuration

**SMTP Settings** (Gmail example):
1. Enable 2-factor authentication in Gmail
2. Generate app-specific password
3. Add to `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-specific-password
SMTP_FROM=your-email@gmail.com
```

**Testing Email**:
```bash
node test-email.js
```

**Email Endpoints**:
- Contact Form: `app/api/contact/route.ts`
- Newsletter: `app/api/newsletter/route.ts`
- Quote Requests: `app/api/quote/route.ts`

---

## 🐛 Troubleshooting Guide

### Issue: Forms Not Submitting

**Symptoms**: Form submission fails, no email received

**Solutions**:
1. Check SMTP credentials in Vercel environment variables
2. Verify reCAPTCHA keys are valid
3. Check email in spam folder
4. Review API route logs in Vercel
5. Test with `test-email.js` script

**Debug Steps**:
```bash
# Check environment variables
vercel env ls

# View function logs
vercel logs
```

---

### Issue: Slow Page Load

**Symptoms**: Pages take > 3 seconds to load

**Solutions**:
1. Check image sizes (should be < 500KB each)
2. Verify lazy loading is enabled
3. Clear browser cache
4. Check Vercel analytics for bottlenecks
5. Run Lighthouse audit

**Commands**:

```bash
# Analyze bundle size
npm run build
npm run analyze  # if configured

# Check lighthouse score
npx lighthouse https://vamvaltrix.com --view
```

---

### Issue: Mobile Layout Broken

**Symptoms**: Content overlaps or doesn't fit on mobile

**Solutions**:
1. Check responsive breakpoints (sm:, md:, lg:)
2. Test on multiple devices/viewports
3. Verify touch targets are 44px minimum
4. Check for fixed widths without responsive variants

**Testing**:
- Chrome DevTools: Toggle device toolbar (Ctrl+Shift+M)
- Test on real devices
- Use responsive design mode in browser

---

### Issue: SEO Rankings Dropped

**Symptoms**: Lower Google rankings, less organic traffic

**Solutions**:
1. Check Google Search Console for issues
2. Verify sitemap is accessible: `https://vamvaltrix.com/sitemap.xml`
3. Check robots.txt: `https://vamvaltrix.com/robots.txt`
4. Ensure metadata is present on all pages
5. Check for broken links
6. Verify page load speed

**Tools**:
- Google Search Console: https://search.google.com/search-console
- Google PageSpeed Insights: https://pagespeed.web.dev
- Ahrefs or SEMrush for comprehensive SEO audit

---

## 📊 Analytics & Monitoring

### Vercel Analytics

**Access**: Vercel Dashboard → Your Project → Analytics

**Metrics to Monitor**:
- Page views and unique visitors
- Top pages and traffic sources
- Device and browser breakdown
- Geographic distribution
- Core Web Vitals scores

### Google Search Console

**Setup**:
1. Add property: `https://vamvaltrix.com`
2. Verify ownership (automatic with Vercel)
3. Submit sitemap

**Monitor**:
- Search queries driving traffic
- Indexing status
- Mobile usability issues
- Core Web Vitals
- Manual actions/penalties

---

## 🔒 Security Maintenance

### Security Headers

**Verify Headers**:
```bash
curl -I https://vamvaltrix.com
```

**Expected Headers**:
- `Strict-Transport-Security`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy`

**Configuration**: See `next.config.mjs`

### SSL Certificate

- **Provider**: Let's Encrypt (via Vercel)
- **Renewal**: Automatic
- **Expiry**: Check in browser (click padlock icon)

### Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix

# Review manually
npm audit fix --force  # use with caution
```

---

## 📝 Content Updates

### Editing Text Content

**Industry Pages**: `app/industries/[industry]/page.tsx`
**About Page**: `app/about/about-content.tsx`
**Home Page**: `app/page.tsx`

**Process**:
1. Edit content in component file
2. Test locally: `npm run dev`
3. Commit and push to deploy

### Adding Blog Posts (Future)

Structure for blog functionality:

```
app/
  blog/
    page.tsx          # Blog listing
    [slug]/
      page.tsx        # Individual blog post
  api/
    blog/
      route.ts        # Blog API endpoint
```

---

## 🚀 Performance Optimization

### Regular Optimization Tasks

1. **Image Audit**
```bash
# Find large images
find public -type f -size +500k
```

2. **Unused Code Removal**
- Remove unused imports
- Delete unused components
- Clean up commented code

3. **Bundle Size Check**
```bash
npm run build
# Review .next/build-manifest.json
```

4. **Lighthouse Audit**
```bash
npx lighthouse https://vamvaltrix.com \
  --output html \
  --output-path ./lighthouse-report.html \
  --view
```

**Target Scores**:
- Performance: > 90
- Accessibility: 100
- Best Practices: > 95
- SEO: 100

---

## 📱 Testing Checklist

### Before Each Deployment

**Functionality**:
- [ ] All forms submit successfully
- [ ] Contact form sends emails
- [ ] Newsletter signup works
- [ ] All links navigate correctly
- [ ] Search (if applicable) returns results

**Visual**:
- [ ] No layout shifts or broken layouts
- [ ] Images load correctly
- [ ] Animations work smoothly
- [ ] Text is readable on all backgrounds
- [ ] No console errors

**Responsive**:
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1920px - Full HD)
- [ ] Ultra-wide (2560px+)

**Browsers**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Performance**:
- [ ] Page load < 3 seconds
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

---

## 🔄 Backup & Recovery

### Backup Strategy

**Git Repository**:
- Primary backup: GitHub
- All code versioned and recoverable
- Commit history preserved

**Vercel Deployments**:
- Last 100 deployments stored
- Can rollback to any previous deployment
- Automatic backups

**Manual Backup**:
```bash
# Create archive of entire project
tar -czf vam-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  .
```

### Recovery Procedure

**If production is down**:
1. Check Vercel status page
2. Review deployment logs
3. Rollback to last working deployment
4. Contact Vercel support if needed

**If data is lost**:
1. Restore from Git repository
2. Redeploy from GitHub
3. Reconfigure environment variables

---

## 📞 Support & Resources

**Documentation**:
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- React: https://react.dev

**Community**:
- Next.js Discord: https://nextjs.org/discord
- GitHub Issues: https://github.com/kanubrd/VAM/issues

**Emergency Contacts**:
- Technical Lead: info@valtrixmaterials.com
- Vercel Support: https://vercel.com/support

---

## 📋 Maintenance Log Template

Keep a log of all maintenance activities:

```
Date: YYYY-MM-DD
Task: [Brief description]
Changes: [What was changed]
Result: [Success/Issues]
Next Steps: [If any]
Performed By: [Name]
```

---

Last Updated: January 2025
Version: 1.0.0
