import { useCallback, useRef, useState } from "react"

export interface UseSetReturn<T> {
  set: Readonly<Set<T>>
  add: (key: T) => void
  clear: () => void
  remove: (key: T) => void
  reset: () => void
  toggle: (key: T) => void
}

/**
 * Manage a JavaScript `Set` of items with additional utility methods.
 *
 * @typeParam T - Type of values stored in the `Set`
 *
 * @param `initialState` - Optional iterable used to initialize the `Set`. If omitted, the set starts empty.
 * @returns An object with the following properties:
 * - `set`: Current set of items
 * - `add`: Function that adds an item to the set
 * - `clear`: Function that removes all items from the set
 * - `remove`: Function that removes an from the set
 * - `reset`: Function that resets the set back to `initialState`
 * - `toggle`: Adds the item if it doesn’t exist, or removes it if it does
 *
 * @example
 * ```tsx
 * function TagsSelector() {
 *   const { set, add, remove, toggle, reset, clear } = useSet<string>(["react", "typescript"])
 *
 *   return (
 *     <div>
 *       <button onClick={() => toggle("react")}>Toggle React</button>
 *       <button onClick={() => toggle("vue")}>Toggle Vue</button>
 *       <button onClick={reset}>Reset</button>
 *       <button onClick={clear}>Clear</button>
 *
 *       <ul>
 *         {[...set].map(tag => <li key={tag}>{tag}</li>)}
 *       </ul>
 *     </div>
 *   )
 * }
 * ```
 */
export function useSet<T>(
  initialState = new Set<T>(),
): UseSetReturn<T> {
  const ref = useRef(initialState)
  const [set, setSet] = useState<Set<T>>(ref.current)

  const add = useCallback((item: T) => {
    setSet(prev => new Set(prev).add(item))
  }, [])

  const clear = useCallback(() => {
    setSet(new Set())
  }, [])

  const remove = useCallback((item: T) => {
    setSet((prev) => {
      const next = new Set(prev)
      next.delete(item)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setSet(ref.current)
  }, [])

  const toggle = useCallback((item: T) => {
    setSet((prev) => {
      const next = new Set(prev)
      if (next.has(item)) {
        next.delete(item)
      }
      else {
        next.add(item)
      }

      return next
    })
  }, [])

  return {
    set,
    add,
    clear,
    remove,
    reset,
    toggle,
  }
}
