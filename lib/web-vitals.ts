/**
 * Web Vitals Tracking Module
 * 
 * Tracks Core Web Vitals metrics and other performance indicators:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay) / INP (Interaction to Next Paint): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Initial render speed
 * - TTFB (Time to First Byte): Server response time
 * 
 * In development: logs to console
 * In production: can send to analytics endpoint
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Formats metric value based on its unit
 */
function formatMetricValue(metric: Metric): string {
  const value = metric.value;
  const unit = metric.rating === 'good' ? '✓' : metric.rating === 'needs-improvement' ? '⚠' : '✗';
  
  // Format time-based metrics in milliseconds or seconds
  if (metric.name === 'CLS') {
    return `${value.toFixed(3)} ${unit}`;
  }
  
  if (value < 1000) {
    return `${Math.round(value)}ms ${unit}`;
  }
  
  return `${(value / 1000).toFixed(2)}s ${unit}`;
}

/**
 * Handles metric reporting
 */
function handleMetric(metric: Metric): void {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // Log to console in development with color coding
    const colors: Record<string, string> = {
      good: 'color: #0CCE6B',
      'needs-improvement': 'color: #FFA400',
      poor: 'color: #FF4E42',
    };
    
    console.log(
      `%c${metric.name}: ${formatMetricValue(metric)}`,
      colors[metric.rating] || 'color: #666',
      {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        navigationType: metric.navigationType,
      }
    );
  } else {
    // In production, send to analytics endpoint
    // This is a placeholder - integrate with your analytics service
    sendToAnalytics(metric);
  }
}

/**
 * Sends metrics to analytics service
 * Replace with your actual analytics implementation (e.g., Google Analytics, Vercel Analytics)
 */
function sendToAnalytics(metric: Metric): void {
  // Example: Send to custom analytics endpoint
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });
  
  // Use sendBeacon for reliability (doesn't block page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', body);
  } else {
    // Fallback to fetch with keepalive
    fetch('/api/analytics', {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(console.error);
  }
}

/**
 * Initializes Web Vitals tracking
 * Call this once when the app loads (typically in root layout)
 */
export function reportWebVitals(): void {
  // Track Core Web Vitals
  onLCP(handleMetric); // Largest Contentful Paint - target < 2.5s
  onINP(handleMetric); // Interaction to Next Paint (replaces FID) - target < 200ms
  onCLS(handleMetric); // Cumulative Layout Shift - target < 0.1
  
  // Track additional performance metrics
  onFCP(handleMetric); // First Contentful Paint - target < 1.8s
  onTTFB(handleMetric); // Time to First Byte - target < 800ms
}

/**
 * Thresholds for Core Web Vitals (for reference)
 * 
 * LCP (Largest Contentful Paint):
 * - Good: ≤ 2.5s
 * - Needs Improvement: 2.5s - 4.0s
 * - Poor: > 4.0s
 * 
 * INP (Interaction to Next Paint):
 * - Good: ≤ 200ms
 * - Needs Improvement: 200ms - 500ms
 * - Poor: > 500ms
 * 
 * CLS (Cumulative Layout Shift):
 * - Good: ≤ 0.1
 * - Needs Improvement: 0.1 - 0.25
 * - Poor: > 0.25
 * 
 * FCP (First Contentful Paint):
 * - Good: ≤ 1.8s
 * - Needs Improvement: 1.8s - 3.0s
 * - Poor: > 3.0s
 * 
 * TTFB (Time to First Byte):
 * - Good: ≤ 800ms
 * - Needs Improvement: 800ms - 1800ms
 * - Poor: > 1800ms
 */
