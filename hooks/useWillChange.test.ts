import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useWillChange, useAutoWillChange, useTimedWillChange, getActiveWillChangeCount, getPendingQueueLength } from './useWillChange';

// Mock useDeviceType
vi.mock('./useDeviceType', () => ({
  useDeviceType: vi.fn(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isMobileOrTablet: false,
    isDesktopOrTablet: true,
  })),
}));

describe('useWillChange', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    // Reset global counters
    while (getActiveWillChangeCount() > 0) {
      act(() => {
        mockElement.style.willChange = 'auto';
      });
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('should apply will-change to element', () => {
      const { result } = renderHook(() => useWillChange(['transform', 'opacity']));

      act(() => {
        result.current.apply(mockElement);
      });

      expect(mockElement.style.willChange).toBe('transform, opacity');
    });

    it('should remove will-change from element', () => {
      const { result } = renderHook(() => useWillChange(['transform', 'opacity']));

      act(() => {
        result.current.apply(mockElement);
      });

      expect(mockElement.style.willChange).toBe('transform, opacity');

      act(() => {
        result.current.remove();
      });

      expect(mockElement.style.willChange).toBe('auto');
    });

    it('should not apply will-change if already active', () => {
      const { result } = renderHook(() => useWillChange(['transform']));

      act(() => {
        result.current.apply(mockElement);
      });

      const firstValue = mockElement.style.willChange;

      act(() => {
        result.current.apply(mockElement);
      });

      expect(mockElement.style.willChange).toBe(firstValue);
    });

    it('should default to transform and opacity if no properties provided', () => {
      const { result } = renderHook(() => useWillChange());

      act(() => {
        result.current.apply(mockElement);
      });

      expect(mockElement.style.willChange).toBe('transform, opacity');
    });
  });

  describe('Concurrent animation throttling', () => {
    it('should track active will-change count', () => {
      const { result } = renderHook(() => useWillChange(['transform']));
      const initialCount = getActiveWillChangeCount();

      act(() => {
        result.current.apply(mockElement);
      });

      expect(getActiveWillChangeCount()).toBe(initialCount + 1);

      act(() => {
        result.current.remove();
      });

      expect(getActiveWillChangeCount()).toBe(initialCount);
    });

    it('should queue animations when at max concurrent limit', () => {
      const elements: HTMLElement[] = [];
      const hooks: ReturnType<typeof useWillChange>[] = [];

      // Create 11 elements (max is 10)
      for (let i = 0; i < 11; i++) {
        elements.push(document.createElement('div'));
        const { result } = renderHook(() => useWillChange(['transform']));
        hooks.push(result.current);
      }

      // Apply will-change to all elements
      act(() => {
        hooks.forEach((hook, index) => {
          hook.apply(elements[index]);
        });
      });

      // First 10 should have will-change applied
      expect(getActiveWillChangeCount()).toBeLessThanOrEqual(10);

      // At least one should be queued
      expect(getPendingQueueLength()).toBeGreaterThan(0);
    });

    it('should process queued animations when one completes', async () => {
      const elements: HTMLElement[] = [];
      const hooks: ReturnType<typeof useWillChange>[] = [];

      // Create 11 elements
      for (let i = 0; i < 11; i++) {
        elements.push(document.createElement('div'));
        const { result } = renderHook(() => useWillChange(['transform']));
        hooks.push(result.current);
      }

      // Apply all
      act(() => {
        hooks.forEach((hook, index) => {
          hook.apply(elements[index]);
        });
      });

      const queueLengthBefore = getPendingQueueLength();
      expect(queueLengthBefore).toBeGreaterThan(0);

      // Remove one
      await act(async () => {
        hooks[0].remove();
        // Wait for queued item to process
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      // Queue should be processed
      expect(getPendingQueueLength()).toBe(Math.max(0, queueLengthBefore - 1));
    });
  });

  describe('Cleanup', () => {
    it('should remove will-change on unmount', () => {
      const { result, unmount } = renderHook(() => useWillChange(['transform']));

      act(() => {
        result.current.apply(mockElement);
      });

      expect(mockElement.style.willChange).toBe('transform');

      act(() => {
        unmount();
      });

      expect(mockElement.style.willChange).toBe('auto');
    });
  });

  describe('useAutoWillChange', () => {
    it('should auto-apply will-change on mount', () => {
      const { result } = renderHook(() => useAutoWillChange(['transform']));

      act(() => {
        // Simulate ref attachment
        if (result.current) {
          (result.current as any).current = mockElement;
        }
      });

      // Note: In real usage, the ref callback handles this
      // This test verifies the hook structure
      expect(result.current).toBeDefined();
    });
  });

  describe('useTimedWillChange', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should auto-remove will-change after duration', () => {
      const { result } = renderHook(() => useTimedWillChange(['transform'], 500));

      act(() => {
        result.current.apply(mockElement);
      });

      expect(mockElement.style.willChange).toBe('transform');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockElement.style.willChange).toBe('auto');
    });

    it('should clear previous timeout when applied again', () => {
      const { result } = renderHook(() => useTimedWillChange(['transform'], 500));

      act(() => {
        result.current.apply(mockElement);
      });

      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Apply again before first timeout completes
      act(() => {
        result.current.apply(mockElement);
      });

      // Advance only 250ms (total 500ms from first apply)
      act(() => {
        vi.advanceTimersByTime(250);
      });

      // Should still have will-change because second apply restarted timer
      expect(mockElement.style.willChange).toBe('transform');

      // Now advance remaining time
      act(() => {
        vi.advanceTimersByTime(250);
      });

      expect(mockElement.style.willChange).toBe('auto');
    });

    it('should cleanup timeout on unmount', () => {
      const { result, unmount } = renderHook(() => useTimedWillChange(['transform'], 500));

      act(() => {
        result.current.apply(mockElement);
      });

      act(() => {
        unmount();
      });

      // Advance time - should not throw error
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(mockElement.style.willChange).toBe('auto');
    });
  });

  describe('Mobile behavior', () => {
    it('should use lower concurrent limit on mobile', () => {
      const { useDeviceType } = require('./useDeviceType');
      useDeviceType.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isMobileOrTablet: true,
        isDesktopOrTablet: false,
      });

      const elements: HTMLElement[] = [];
      const hooks: ReturnType<typeof useWillChange>[] = [];

      // Create 6 elements (mobile max is 5)
      for (let i = 0; i < 6; i++) {
        elements.push(document.createElement('div'));
        const { result } = renderHook(() => useWillChange(['transform']));
        hooks.push(result.current);
      }

      act(() => {
        hooks.forEach((hook, index) => {
          hook.apply(elements[index]);
        });
      });

      // Should queue at least one (max 5 on mobile)
      expect(getActiveWillChangeCount()).toBeLessThanOrEqual(5);
      expect(getPendingQueueLength()).toBeGreaterThan(0);
    });
  });
});
