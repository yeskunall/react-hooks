import { act, renderHook } from "@testing-library/react"
import { describe, expect, suite, test } from "vitest"

import { useCounter } from "./index.js"

suite("useCounter", () => {
  test("return values", () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)
    expect(typeof result.current.increment).toBe("function")
    expect(typeof result.current.decrement).toBe("function")
    expect(typeof result.current.reset).toBe("function")
    expect(typeof result.current.set).toBe("function")
  })

  test("initial value", () => {
    const { result } = renderHook(() => useCounter(3))

    expect(result.current.count).toBe(3)
  })

  describe("decrement", () => {
    test("decrement", () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.decrement()
      })
      expect(result.current.count).toBe(-1)
    })

    test("decrement with delta", () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.decrement(3)
      })
      expect(result.current.count).toBe(-3)
    })
  })

  describe("increment", () => {
    test("increment", () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.increment()
      })
      expect(result.current.count).toBe(1)
    })

    test("increment with delta", () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.increment(3)
      })
      expect(result.current.count).toBe(3)
    })
  })

  test("reset", () => {
    const { result } = renderHook(() => useCounter(3))

    act(() => {
      result.current.decrement()
      result.current.decrement()
      result.current.reset()
    })
    expect(result.current.count).toBe(3)
  })

  describe("setCount", () => {
    test("direct", () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.set(5)
      })
      expect(result.current.count).toBe(5)
    })

    test("can increment from current value", () => {
      const { result } = renderHook(() => useCounter(5))

      act(() => {
        result.current.set(x => x + 2)
      })
      expect(result.current.count).toBe(7)
    })
  })

  test("integration", () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.set(x => x + 2)
    })
    expect(result.current.count).toBe(7)

    act(() => {
      result.current.increment()
    })
    expect(result.current.count).toBe(8)

    act(() => {
      result.current.decrement()
    })
    expect(result.current.count).toBe(7)

    act(() => {
      result.current.reset()
    })
    expect(result.current.count).toBe(5)
  })
})
