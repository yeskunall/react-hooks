import { act, renderHook } from "@testing-library/react"
import { describe, expect, suite, test } from "vitest"

import { useDefault } from "./index.js"

suite("useDefault", () => {
  describe("return values", () => {
    test("default value", () => {
      const { result } = renderHook(() => useDefault(0))

      expect(result.current[0]).toBe(0)
      expect(result.current[1]).toBeTypeOf("function")
    })

    describe("initial value", () => {
      test("initial value as T", () => {
        const { result } = renderHook(() => useDefault(0, 1))

        expect(result.current[0]).toBe(1)
        expect(result.current[1]).toBeTypeOf("function")
      })

      test("initial value as (() => T)", () => {
        const { result } = renderHook(() => useDefault(0, () => -1))

        expect(result.current[0]).toBe(-1)
        expect(result.current[1]).toBeTypeOf("function")
      })
    })

    test("integration", () => {
      const { result } = renderHook(() => useDefault("Anonymous"))

      expect(result.current[0]).toBe("Anonymous")
      act(() => {
        result.current[1]("Alice")
      })
      expect(result.current[0]).toBe("Alice")

      act(() => {
        result.current[1]("Bob")
      })
      expect(result.current[0]).toBe("Bob")

      act(() => {
        result.current[1](null)
      })
      expect(result.current[0]).toBe("Anonymous")
    })
  })
})
