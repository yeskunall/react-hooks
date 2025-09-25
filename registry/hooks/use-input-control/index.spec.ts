import { act, renderHook } from "@testing-library/react"
import { describe, expect, suite, test } from "vitest"

import { useInputControl } from "./index.js"

suite("useInputControl", () => {
  test("return values", () => {
    const { result } = renderHook(() => useInputControl(""))

    expect(typeof result.current.value).toBe("string")
    expect(result.current.dirty).toBe(false)
    expect(result.current.touched).toBe(false)
    expect(result.current.different).toBe(false)
    expect(typeof result.current.handleChange).toBe("function")
    expect(typeof result.current.handleBlur).toBe("function")
    expect(typeof result.current.reset).toBe("function")
  })

  describe("value", () => {
    test("initial value", () => {
      const { result } = renderHook(() => useInputControl("initial value"))

      expect(result.current.value).toBe("initial value")
    })

    test("value can be changed", () => {
      const value = "new value"
      const { result } = renderHook(() => useInputControl("initial value"))

      act(() =>
        result.current.handleChange({
          target: { value },
          currentTarget: { value },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.value).toBe(value)
    })
  })

  describe("different", () => {
    test("different value", () => {
      const value = "new value"
      const { result } = renderHook(() => useInputControl("initial value"))

      act(() =>
        result.current.handleChange({
          target: { value },
          currentTarget: { value },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.different).toBe(true)
    })

    test("back to initial value", () => {
      const initialValue = "initial value"
      const value = "new value"
      const { result } = renderHook(() => useInputControl(initialValue))

      act(() =>
        result.current.handleChange({
          target: { value },
          currentTarget: { value },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.different).toBe(true)

      act(() =>
        result.current.handleChange({
          target: { value: initialValue },
          currentTarget: { value: initialValue },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.different).toBe(false)
    })

    test("does not rely on initial argument", () => {
      const initialValue = "initial value"
      const newValue = "new value"
      const { result, rerender } = renderHook(
        ({ initialValue }) => useInputControl(initialValue),
        {
          initialProps: { initialValue },
        },
      )

      act(() =>
        result.current.handleChange({
          target: { value: newValue },
          currentTarget: { value: newValue },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.different).toBe(true)

      rerender({ initialValue: newValue })

      expect(result.current.different).toBe(true)
    })
  })

  describe("dirty", () => {
    test("different value", () => {
      const value = "new value"
      const { result } = renderHook(() => useInputControl("initial value"))

      act(() =>
        result.current.handleChange({
          target: { value },
          currentTarget: { value },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.dirty).toBe(true)
    })

    test("back to initial value", () => {
      const initialValue = "initial value"
      const value = "new value"
      const { result } = renderHook(() => useInputControl(initialValue))

      act(() =>
        result.current.handleChange({
          target: { value },
          currentTarget: { value },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.dirty).toBe(true)

      act(() =>
        result.current.handleChange({
          target: { value: initialValue },
          currentTarget: { value: initialValue },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      )

      expect(result.current.dirty).toBe(true)
    })
  })

  describe("touched", () => {
    test("initial", () => {
      const { result } = renderHook(() => useInputControl("initial value"))

      expect(result.current.touched).toBe(false)
    })

    test("handleBlur", () => {
      const { result } = renderHook(() => useInputControl("initial value"))

      expect(result.current.touched).toBe(false)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      act(() => result.current.handleBlur({} as any))

      expect(result.current.touched).toBe(true)
    })
  })

  test("reset", () => {
    const initialValue = "initial value"
    const newValue = "new value"
    const { result } = renderHook(() => useInputControl(initialValue))

    act(() => {
      result.current.handleChange({
        target: { value: newValue },
        currentTarget: { value: newValue },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current.handleBlur({} as any)
    })

    expect(result.current.value).toBe(newValue)
    expect(result.current.different).toBe(true)
    expect(result.current.dirty).toBe(true)
    expect(result.current.touched).toBe(true)

    act(() => {
      result.current.reset()
    })

    expect(result.current.value).toBe(initialValue)
    expect(result.current.different).toBe(false)
    expect(result.current.dirty).toBe(false)
    expect(result.current.touched).toBe(false)
  })

  test("reset uses the latest initialValue if it changes", () => {
    const { rerender, result } = renderHook(
      ({ initialValue }) => useInputControl(initialValue),
      { initialProps: { initialValue: "initial value" } },
    )

    act(() => {
      result.current.handleChange({
        target: { value: "changed" },
        currentTarget: { value: "changed" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    })

    rerender({ initialValue: "updated initial" })
    act(() => {
      result.current.reset()
    })
    expect(result.current.value).toBe("initial value")
  })

  test("integration", async () => {
    const initialValue = "initial value"
    const { result } = renderHook(() => useInputControl(initialValue))

    expect(result.current.value).toBe(initialValue)
    expect(result.current.dirty).toBe(false)
    expect(result.current.touched).toBe(false)
    expect(result.current.different).toBe(false)

    const newValue = "new value"

    act(() => {
      result.current.handleChange({
        target: { value: newValue },
        currentTarget: { value: newValue },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    })

    expect(result.current.value).toBe(newValue)
    expect(result.current.dirty).toBe(true)
    expect(result.current.touched).toBe(false)
    expect(result.current.different).toBe(true)

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current.handleBlur({} as any)
    })

    expect(result.current.value).toBe(newValue)
    expect(result.current.dirty).toBe(true)
    expect(result.current.touched).toBe(true)
    expect(result.current.different).toBe(true)

    act(() => {
      result.current.handleChange({
        target: { value: initialValue },
        currentTarget: { value: initialValue },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    })

    expect(result.current.value).toBe(initialValue)
    expect(result.current.dirty).toBe(true)
    expect(result.current.touched).toBe(true)
    expect(result.current.different).toBe(false)

    act(() => {
      result.current.reset()
    })

    expect(result.current.value).toBe(initialValue)
    expect(result.current.dirty).toBe(false)
    expect(result.current.touched).toBe(false)
    expect(result.current.different).toBe(false)
  })
})
