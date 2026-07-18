import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDeviceType } from './useDeviceType';

describe('useDeviceType', () => {
  let matchMediaMock: any;

  beforeEach(() => {
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  it('should detect mobile device', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useDeviceType());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isMobileOrTablet).toBe(true);
    expect(result.current.isDesktopOrTablet).toBe(false);
  });

  it('should detect tablet device', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px) and (max-width: 1023px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useDeviceType());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isMobileOrTablet).toBe(true);
    expect(result.current.isDesktopOrTablet).toBe(true);
  });

  it('should detect desktop device', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1024px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useDeviceType());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobileOrTablet).toBe(false);
    expect(result.current.isDesktopOrTablet).toBe(true);
  });

  it('should provide convenience flags', () => {
    // Test mobile convenience flags
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result: mobileResult } = renderHook(() => useDeviceType());
    expect(mobileResult.current.isMobileOrTablet).toBe(true);
    expect(mobileResult.current.isDesktopOrTablet).toBe(false);

    // Test desktop convenience flags
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1024px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result: desktopResult } = renderHook(() => useDeviceType());
    expect(desktopResult.current.isMobileOrTablet).toBe(false);
    expect(desktopResult.current.isDesktopOrTablet).toBe(true);
  });
});
