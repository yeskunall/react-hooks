import { useState } from "react"

/**
 * Manage state but automatically falls back to a default value the state is `null` or `undefined`.
 *
 * @typeParam T - Type of the state value.
 *
 * @param defaultValue - Default value to use when state is `null` or `undefined`.
 * @param initial - Initial state.
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
export function useDefault<T>(defaultValue: T, initialValue?: T | (() => T) | null | undefined) {
  const [value, setValue] = useState<T | null | undefined>(initialValue ?? defaultValue)

  return [value, setValue] as const
}
