import { renderHook, act } from "@testing-library/react";
import useForceUpdate, { useForceUpdateConstraint } from "./useForceUpdate";

describe("useForceUpdate", () => {
    it("returns a function", () => {
        const { result } = renderHook(() => useForceUpdate());
        expect(typeof result.current).toBe("function");
    });

    it("returned function is stable across renders", () => {
        const { result, rerender } = renderHook(() => useForceUpdate());
        const first = result.current;
        rerender();
        expect(result.current).toBe(first);
    });

    it("calling the update function triggers a re-render", () => {
        let renderCount = 0;
        const { result } = renderHook(() => {
            renderCount++;
            return useForceUpdate();
        });
        const countBefore = renderCount;
        act(() => {
            result.current();
        });
        expect(renderCount).toBeGreaterThan(countBefore);
    });
});

describe("useForceUpdateConstraint", () => {
    it("returns true on the initial render", () => {
        const { result } = renderHook(() => useForceUpdateConstraint("initial"));
        expect(result.current).toBe(true);
    });

    it("returns true after constraint changes (resets to true after brief false)", async () => {
        const { result, rerender } = renderHook(({ val }) => useForceUpdateConstraint(val), {
            initialProps: { val: "a" },
        });
        expect(result.current).toBe(true);
        await act(async () => {
            rerender({ val: "b" });
        });
        // After the double-effect cycle (false → true), should settle on true
        expect(result.current).toBe(true);
    });

    it("is stable when constraint does not change", () => {
        const { result, rerender } = renderHook(() => useForceUpdateConstraint("same"));
        rerender();
        expect(result.current).toBe(true);
    });
});
