import { act, renderHook } from "@testing-library/react"
import { expect, suite, test } from "vitest"

import { useCycle } from "./index.js"

suite("useCycle", () => {
  test("return values", () => {
    const modes = ["low", "medium", "high"]
    const { result } = renderHook(() => useCycle(...modes))

    expect(result.current[0]).toBe(modes[0])
    expect(typeof result.current[1]).toBe("function")
  })

  test("cycle", () => {
    const modes = ["low", "medium", "high"]
    const { result } = renderHook(() => useCycle(...modes))

    act(() => {
      result.current[1]()
    })

    expect(result.current[0]).toBe(modes[1])
  })

  test("cycle should reset to first element", () => {
    const modes = [1, 2, 3]
    const { result } = renderHook(() => useCycle(...modes))

    act(() => {
      result.current[1]()
      result.current[1]()
      result.current[1]()
    })

    expect(result.current[0]).toBe(modes[0])
  })
})
