import { useState } from "react"

export function useDefault<T>(defaultValue: T, initialValue?: T | (() => T) | null | undefined) {
  const [value, setValue] = useState<T | null | undefined>(initialValue ?? defaultValue)

  return [value, setValue] as const
}
