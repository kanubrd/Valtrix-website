'use client';

import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Section({
  children,
  className,
  fullWidth = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'section-padding',
        !fullWidth && 'mx-auto max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div className={cn('mb-12 text-center', className)} {...props}>
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-600">
          {subtitle}
        </p>
      )}
      <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}
