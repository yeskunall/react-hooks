import { useCallback, useMemo, useRef, useState } from "react"

import type { ChangeEvent, FocusEvent } from "react"

interface UseInputValueReturn {
  different: boolean
  dirty: boolean
  touched: boolean
  value: string
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  reset: () => void
}

const DEFAULT_DIRTY_STATE = false
const DEFAULT_TOUCHED_STATE = false

/**
 * Manage a controlled input value and track additional form input states like
 *
 * @param initialValue - Initial value of the input
 * @returns An object with the following properties:
 *  - `different`: Whether the value is different from the initial value
 *  - `dirty`: Whether the input has been modified at least once
 *  - `touched`: Whether the input was focused and blurred
 *  - `value`: Current value of the input
 *  - `handleBlur`: Function to be called when the input is blurred
 *  - `handleChange`: Function that updates the value of the input
 *  - `reset` Function to reset the initial value as well as the value of all states
 *
 * @example
 * ```tsx
 * function FormComponent() {
 *   const {
 *     different,
 *     dirty,
 *     touched,
 *     value,
 *     handleBlur,
 *     handleChange,
 *     reset
 *   } = useInputControl("John")
 *
 *   return (
 *     <form>
 *      <fieldset>
 *        <input
 *          value={value}
 *          onChange={handleChange}
 *          onBlur={handleBlur}
 *        />
 *      </fieldset>
 *      <p>Dirty: {dirty.toString()}</p>
 *      <p>Touched: {touched.toString()}</p>
 *      <p>Different: {different.toString()}</p>
 *      <button onClick={reset}>Reset</button>
 *     </form>
 *   )
 * }
 */
export function useInputControl(
  initialValue: string,
): UseInputValueReturn {
  const ref = useRef(initialValue)
  const [value, setValue] = useState(initialValue)
  const [dirty, setDirty] = useState(DEFAULT_DIRTY_STATE)
  const [touched, setTouched] = useState(DEFAULT_TOUCHED_STATE)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setTouched(true)
  }, [])
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDirty(true)
    setValue(event.currentTarget.value)
  }, [])
  const reset = useCallback(() => {
    setDirty(DEFAULT_DIRTY_STATE)
    setTouched(DEFAULT_TOUCHED_STATE)
    setValue(initialValue)
  }, [])

  const different = ref.current !== value

  return useMemo(
    () => ({
      different,
      dirty,
      touched,
      value,
      handleBlur,
      handleChange,
      reset,
    }),
    [dirty, dirty, touched, value, handleBlur, handleChange, reset],
  )
}
