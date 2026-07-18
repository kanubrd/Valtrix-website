import { NextRequest, NextResponse } from 'next/server';
import {
  getQuoteSubmissions,
  getContactSubmissions,
  getNewsletterSubscriptions,
} from '@/lib/db';

// Simple authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-in-production';

function authenticate(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Bearer') return false;

  return credentials === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const quotes = await getQuoteSubmissions();
    const contacts = await getContactSubmissions();
    const newsletter = await getNewsletterSubscriptions();

    // Calculate statistics
    const now = Date.now();
    const last7Days = now - 7 * 24 * 60 * 60 * 1000;
    const last30Days = now - 30 * 24 * 60 * 60 * 1000;

    const analytics = {
      overview: {
        totalQuotes: quotes.length,
        totalContacts: contacts.length,
        totalNewsletterSubs: newsletter.filter((s) => s.status === 'active').length,
        newQuotesLast7Days: quotes.filter((q) => new Date(q.timestamp).getTime() > last7Days).length,
        newContactsLast7Days: contacts.filter((c) => new Date(c.timestamp).getTime() > last7Days).length,
      },
      quotes: {
        byStatus: {
          new: quotes.filter((q) => q.status === 'new').length,
          contacted: quotes.filter((q) => q.status === 'contacted').length,
          converted: quotes.filter((q) => q.status === 'converted').length,
          archived: quotes.filter((q) => q.status === 'archived').length,
        },
        topProducts: getTopProducts(quotes),
        recent: quotes.slice(-5).reverse(),
      },
      contacts: {
        byStatus: {
          new: contacts.filter((c) => c.status === 'new').length,
          responded: contacts.filter((c) => c.status === 'responded').length,
          archived: contacts.filter((c) => c.status === 'archived').length,
        },
        recent: contacts.slice(-5).reverse(),
      },
      newsletter: {
        active: newsletter.filter((s) => s.status === 'active').length,
        unsubscribed: newsletter.filter((s) => s.status === 'unsubscribed').length,
        newLast30Days: newsletter.filter(
          (s) => new Date(s.timestamp).getTime() > last30Days
        ).length,
        recent: newsletter.slice(-5).reverse(),
      },
      timeline: generateTimeline(quotes, contacts, newsletter),
    };

    return NextResponse.json({ success: true, analytics });
  } catch (err) {
    console.error('Analytics error:', err);
    return NextResponse.json({ error: 'Failed to generate analytics' }, { status: 500 });
  }
}

function getTopProducts(quotes: any[]): { name: string; count: number }[] {
  const productCounts = new Map<string, number>();

  quotes.forEach((quote) => {
    quote.products?.forEach((product: string) => {
      productCounts.set(product, (productCounts.get(product) || 0) + 1);
    });
  });

  return Array.from(productCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function generateTimeline(quotes: any[], contacts: any[], newsletter: any[]): any[] {
  const last30Days = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const timeline: Map<string, { date: string; quotes: number; contacts: number; newsletter: number }> = new Map();

  // Initialize last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    timeline.set(date, { date, quotes: 0, contacts: 0, newsletter: 0 });
  }

  // Count submissions per day
  quotes.forEach((q) => {
    const date = new Date(q.timestamp).toISOString().split('T')[0];
    const entry = timeline.get(date);
    if (entry) entry.quotes++;
  });

  contacts.forEach((c) => {
    const date = new Date(c.timestamp).toISOString().split('T')[0];
    const entry = timeline.get(date);
    if (entry) entry.contacts++;
  });

  newsletter.forEach((n) => {
    const date = new Date(n.timestamp).toISOString().split('T')[0];
    const entry = timeline.get(date);
    if (entry) entry.newsletter++;
  });

  return Array.from(timeline.values());
}
