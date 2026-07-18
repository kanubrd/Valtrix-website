'use client';

import { useEffect, useState } from 'react';

/**
 * Hook for input debouncing
 * Delays updating a value until after a specified delay has passed without changes
 * Used for optimizing expensive operations triggered by user input (search, scroll, resize)
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (150-300ms recommended for most use cases)
 * @returns Debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // This will only run 300ms after user stops typing
 *   performExpensiveSearch(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if value changes before delay expires
    // This is the debouncing mechanism
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
