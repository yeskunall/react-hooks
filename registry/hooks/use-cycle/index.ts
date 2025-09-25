import { useState } from "react"

/**
 * Cycle through a sequence of values each time a function is called.
 *
 * @param values - A non-empty array of values to cycle through.
 * @returns A tuple containing the following:
 * - The current value
 * - A function that changes the current value to the next one in the sequence, or the first one if the current value is the last in the sequence.
 *
 * @example
 * ```tsx
 * import { useCycle } from "@yeskunall/react-hooks";
 *
 * function ThemeSwitcher() {
 *   const { value: theme, cycle } = useCycle("light", "dark", "system");
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={cycle}>Switch Theme</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCycle<T>(...args: T[]) {
  const [index, setIndex] = useState(0)
  const value = args[index]

  const cycle = () => {
    setIndex(previous => (previous + 1) % args.length)
  }

  return [value, cycle] as const
}
