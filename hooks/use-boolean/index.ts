import { useCallback, useMemo, useState } from "react"

type UseBooleanReturn = {
  value: boolean
  setTrue: () => void
  setFalse: () => void
}

/**
 * Manage a boolean state, with additional convenience utility methods.
 *
 * @param `initialValue` - Initial value of the boolean state. If not provided, it defaults ot `false`.
 * @returns An object containing:
 * - `value`: The current boolean state
 * - `setFalse`: A function to set the boolean state to `false`
 * - `setTrue`: A function to set the boolean state to `true`
 *
 * @example
 * ```tsx
 * import { useBoolean } from "@yeskunall/react-hooks";
 *
 * function ModalDemo() {
 *   const { value: isOpen, setFalse: close, setTrue: open } = useBoolean(false);
 *
 *   return (
 *     <div>
 *       <button onClick={open}>Open Modal</button>
 *
 *       {isOpen && (
 *         <div className="modal">
 *           <p>This is a modal!</p>
 *           <button onClick={close}>Close</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(initialValue)

  const setFalse = useCallback(() => setValue(false), [])
  const setTrue = useCallback(() => setValue(true), [])

  return useMemo<UseBooleanReturn>(
    () => ({
      setFalse,
      setTrue,
      value,
    }),
    [setFalse, setTrue, value],
  )
}
