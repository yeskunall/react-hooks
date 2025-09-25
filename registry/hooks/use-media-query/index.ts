import { useCallback, useSyncExternalStore } from "react"

/**
 * Subscribe and respond to media query changes.
 *
 * @param `query` - Media query to match. It must be a [valid CSS media query string](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
 * @returns Boolean indicating whether the media query currently matches
 *
 * @example
 * ```tsx
 * function Component() {
 *   const isMobile = useMediaQuery("(max-width: 768px)")
 *
 *   return (
 *     <div>
 *       {isMobile ? "Viewing on mobile" : "Viewing on desktop"}
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * function DarkModeIndicator() {
 *   const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
 *
 *   return (
 *     <span>{prefersDark ? "Dark mode" : "Light mode"}</span>
 *   )
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((callback: () => void) => {
    const match = window.matchMedia(query)

    match.addEventListener("change", callback)

    return () => match.removeEventListener("change", callback)
  }, [query])

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    throw Error("useMatchMedia is a client-only hook")
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
