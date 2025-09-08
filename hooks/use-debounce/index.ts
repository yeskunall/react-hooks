import { useEffect, useState } from "react"

/**
 * Delay state updates until a specified `delay` has passed without any further changes to the provided `value`.
 *
 * @typeParam T - Type of the input value being debounced.
 *
 * @param value - Input value to debounce.
 * @param delay - Debounce delay in milliseconds.
 * @returns Debounced value.
 *
 * @example
 * ```tsx
 * import { useDebounce } from "@yeskunall/react-hooks";
 *
 * function SearchInput() {
 *   const [query, setQuery] = useState("");
 *   const debouncedQuery = useDebounce(query, 500);
 *
 *   useEffect(() => {
 *     if (debouncedQuery) {
 *       // Trigger API request with debounced query
 *       fetch(`/api/search?q=${debouncedQuery}`);
 *     }
 *   }, [debouncedQuery]);
 *
 *   return (
 *     <input
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *       placeholder="Type to search..."
 *     />
 *   );
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(id)
  }, [delay, value])

  return debounced
}
