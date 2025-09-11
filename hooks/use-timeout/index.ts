import { useEffect, useRef } from "react"

/**
 * Invoke a callback function after a specified delay.
 *
 * The latest version of the callback is always invoked, even if it changes between renders. If the delay changes, the previous timeout is cancelled and a new one is scheduled. If `delay` is `null` or `undefined`, the timeout is paused.
 *
 * @param `callback` - Function to call after the timeout
 * @param `delay` - Delay in milliseconds before invoking the callback. If `null` or `undefined`, the timeout is paused.
 *
 * @example
 * ```tsx
 * function Component() {
 *   const [count, setCount] = useState(0)
 *
 *   useTimeout(() => {
 *     console.log("Timeout fired! Count:", count)
 *   }, 1000)
 *
 *   return (
 *     <button onClick={() => setCount(c => c + 1)}>
 *       Increment count
 *     </button>
 *   )
 * }
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null | undefined) {
  const ref = useRef(callback)
  ref.current = callback

  useEffect(() => {
    if (delay === null || delay === undefined) return

    const id = setTimeout(() => {
      ref.current()
    }, delay)

    return () => clearTimeout(id)
  }, [delay])
}
