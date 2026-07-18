'use client';

import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark';
  hover?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  variant = 'light',
  hover = true,
  children,
  className,
  ...props
}: GlassCardProps) {
  const variants = {
    light: 'backdrop-blur-sm bg-white/10 border border-white/20',
    dark: 'backdrop-blur-md bg-black/30 border border-white/10',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        hover && 'hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
