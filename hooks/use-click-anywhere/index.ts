import { useEffect } from "react"

/**
 * A React hook that handles click events anywhere on the window.
 *
 * @param handler - The function to be called when a click event is detected anywhere on the window.
 *
 * @example
 * ```tsx
 * import { useClickAnywhere } from "@yeskunall/react-hooks"
 *
 * function Component() {
 *   useClickAnywhere((event) => {
 *     console.log("User interaction:", event.type, event.target);
 *   });
 *
 *   return <button>Click or tap me (or anywhere else)</button>;
 * }
 * ```
 */
export function useClickAnywhere(handler: (event: MouseEvent) => void) {
  useEffect(() => {
    window.addEventListener("click", handler)

    return () => window.removeEventListener("click", handler)
  }, [handler])
}
