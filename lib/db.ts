/**
 * Database abstraction layer
 * Uses file-based storage for serverless compatibility
 * In production, replace with Supabase, PlanetScale, or MongoDB Atlas
 */

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export interface QuoteSubmission {
  id: string;
  timestamp: string;
  name: string;
  company: string;
  email: string;
  products: string[];
  material: string;
  ipAddress: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
}

export interface NewsletterSubscription {
  id: string;
  timestamp: string;
  email: string;
  ipAddress: string;
  status: 'active' | 'unsubscribed';
}

export interface ContactSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ipAddress: string;
  status: 'new' | 'responded' | 'archived';
}

// ── Quote Submissions ─────────────────────────────────────────────────

export async function saveQuoteSubmission(data: Omit<QuoteSubmission, 'id' | 'timestamp' | 'status'>): Promise<QuoteSubmission> {
  await ensureDataDir();
  
  const submission: QuoteSubmission = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'new',
    ...data,
  };

  const filePath = path.join(DATA_DIR, 'quotes.json');
  
  try {
    const existing = await fs.readFile(filePath, 'utf-8');
    const quotes = JSON.parse(existing) as QuoteSubmission[];
    quotes.push(submission);
    await fs.writeFile(filePath, JSON.stringify(quotes, null, 2));
  } catch {
    // File doesn't exist, create new
    await fs.writeFile(filePath, JSON.stringify([submission], null, 2));
  }

  return submission;
}

export async function getQuoteSubmissions(): Promise<QuoteSubmission[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, 'quotes.json');
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as QuoteSubmission[];
  } catch {
    return [];
  }
}

// ── Newsletter Subscriptions ──────────────────────────────────────────

export async function saveNewsletterSubscription(data: Omit<NewsletterSubscription, 'id' | 'timestamp' | 'status'>): Promise<NewsletterSubscription> {
  await ensureDataDir();
  
  const subscription: NewsletterSubscription = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'active',
    ...data,
  };

  const filePath = path.join(DATA_DIR, 'newsletter.json');
  
  try {
    const existing = await fs.readFile(filePath, 'utf-8');
    const subs = JSON.parse(existing) as NewsletterSubscription[];
    
    // Check for duplicate email
    if (subs.some((s) => s.email === subscription.email && s.status === 'active')) {
      return subscription; // Already subscribed
    }
    
    subs.push(subscription);
    await fs.writeFile(filePath, JSON.stringify(subs, null, 2));
  } catch {
    await fs.writeFile(filePath, JSON.stringify([subscription], null, 2));
  }

  return subscription;
}

export async function getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, 'newsletter.json');
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as NewsletterSubscription[];
  } catch {
    return [];
  }
}

// ── Contact Submissions ───────────────────────────────────────────────

export async function saveContactSubmission(data: Omit<ContactSubmission, 'id' | 'timestamp' | 'status'>): Promise<ContactSubmission> {
  await ensureDataDir();
  
  const submission: ContactSubmission = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'new',
    ...data,
  };

  const filePath = path.join(DATA_DIR, 'contacts.json');
  
  try {
    const existing = await fs.readFile(filePath, 'utf-8');
    const contacts = JSON.parse(existing) as ContactSubmission[];
    contacts.push(submission);
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  } catch {
    await fs.writeFile(filePath, JSON.stringify([submission], null, 2));
  }

  return submission;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, 'contacts.json');
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as ContactSubmission[];
  } catch {
    return [];
  }
}

// ── Utilities ─────────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ── Update Status ─────────────────────────────────────────────────────

export async function updateQuoteStatus(id: string, status: QuoteSubmission['status']): Promise<boolean> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, 'quotes.json');
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const quotes = JSON.parse(data) as QuoteSubmission[];
    const quote = quotes.find((q) => q.id === id);
    
    if (!quote) return false;
    
    quote.status = status;
    await fs.writeFile(filePath, JSON.stringify(quotes, null, 2));
    return true;
  } catch {
    return false;
  }
}

export async function updateContactStatus(id: string, status: ContactSubmission['status']): Promise<boolean> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, 'contacts.json');
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const contacts = JSON.parse(data) as ContactSubmission[];
    const contact = contacts.find((c) => c.id === id);
    
    if (!contact) return false;
    
    contact.status = status;
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return true;
  } catch {
    return false;
  }
}
