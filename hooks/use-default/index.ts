import { useCallback, useMemo, useState } from "react"

import type { Dispatch, SetStateAction } from "react"

/**
 * Manage state but automatically fallback to a default value when the state is `null` or `undefined`.
 *
 * @typeParam T - Type of the state value.
 *
 * @param defaultValue - Default value to use when `initialValue` is `null` or `undefined`.
 * @param initialValue - Initial state.
 * @returns A tuple containing the resolved `value` and a setter function to update the state.
 *
 * @example
 * ```tsx
 * function Profile({ user }: { user?: string | null }) {
 *   const { value: name, set: setName } = useDefault("Anonymous", user);
 *
 *   return (
 *     <div>
 *       <p>Hello, {name}!</p>
 *       <button onClick={() => setName(null)}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useDefault<T>(defaultValue: T, initialValue?: T | (() => T | null | undefined) | null | undefined) {
  const [value, setValue] = useState<T | null | undefined>(initialValue ?? defaultValue)

  const memoizedValue = useMemo<T>(() => {
    if (value === null || typeof value === "undefined") return defaultValue

    return value
  }, [defaultValue, value])
  const memoizedSetValue = useCallback<Dispatch<SetStateAction<T | null | undefined>>>(value => setValue(value), [])

  return [memoizedValue, memoizedSetValue] as const
}
