import { useCallback, useMemo, useState } from "react"

import type { Dispatch, SetStateAction } from "react"

interface UseCounterReturn {
  count: number
  decrement: (delta?: number) => void
  increment: (delta?: number) => void
  reset: () => void
  set: Dispatch<SetStateAction<number>>
}

/**
 * Manage a numeric counter with convenient utility methods.
 *
 * @param `initialValue` - Initial value of the counter state. If not provided, it defaults to 0.
 * @returns An object with the current count and helper methods to update it.
 *
 * @example
 * ```tsx
 * import { useCounter } from "@yeskunall/react-hooks";
 *
 * function Pagination() {
 *   const { count: page, decrement, increment, reset } = useCounter(1);
 *
 *   return (
 *     <div>
 *       <button onClick={() => decrement()} disabled={page <= 1}>
 *         Prev
 *       </button>
 *       <span>Page {page}</span>
 *       <button onClick={() => increment()}>Next</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCounter(initialValue: number = 0): UseCounterReturn {
  const [count, setCount] = useState(initialValue)

  const decrement = useCallback((delta = 1) => setCount(previous => previous - delta), [])
  const increment = useCallback((delta = 1) => setCount(previous => previous + delta), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return useMemo<UseCounterReturn>(
    () => ({
      count,
      decrement,
      increment,
      reset,
      set: setCount,
    }),
    [count, decrement, increment, reset],
  )
}
