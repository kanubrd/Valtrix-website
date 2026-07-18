import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.restoreAllMocks();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 300 });
    
    // Value should still be initial (debounced)
    expect(result.current).toBe('initial');

    // Fast-forward time by 300ms
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    // Now value should be updated
    expect(result.current).toBe('updated');
  });

  it('should reset timer on subsequent value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    // Update value
    rerender({ value: 'updated1', delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(150); // Only 150ms passed
    });

    // Update value again before timeout
    rerender({ value: 'updated2', delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(150); // Another 150ms
    });

    // Value should still be initial (timer was reset)
    expect(result.current).toBe('initial');

    // Complete the remaining time
    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    // Now value should be updated2 (the last value)
    expect(result.current).toBe('updated2');
  });

  it('should work with different delay values', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'updated', delay: 500 });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    // Should still be initial (500ms delay)
    expect(result.current).toBe('initial');

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('updated');
  });

  it('should work with different value types', async () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 300 } }
    );

    numberRerender({ value: 42, delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(numberResult.current).toBe(42);

    // Test with object
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: { count: 0 }, delay: 300 } }
    );

    objectRerender({ value: { count: 5 }, delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(objectResult.current).toEqual({ count: 5 });
  });

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderHook(() => useDebounce('value', 300));
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should handle rapid value changes correctly', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'v0', delay: 300 } }
    );

    // Simulate rapid typing
    rerender({ value: 'v1', delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'v2', delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'v3', delay: 300 });
    await act(async () => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'v4', delay: 300 });

    // Value should still be initial
    expect(result.current).toBe('v0');

    // Wait for full delay
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    // Should have the last value
    expect(result.current).toBe('v4');
  });
});
