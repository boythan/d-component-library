import { renderHook } from "@testing-library/react";
import usePrevious from "./usePrevious";

describe("usePrevious", () => {
    it("returns null on first render", () => {
        const { result } = renderHook(() => usePrevious(42));
        expect(result.current).toBeNull();
    });

    it("returns the previous value after rerender", () => {
        const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
            initialProps: { val: 1 },
        });
        rerender({ val: 2 });
        expect(result.current).toBe(1);
    });

    it("tracks multiple value changes", () => {
        const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
            initialProps: { val: "a" },
        });
        rerender({ val: "b" });
        expect(result.current).toBe("a");
        rerender({ val: "c" });
        expect(result.current).toBe("b");
    });

    it("works with object values", () => {
        const obj1 = { x: 1 };
        const obj2 = { x: 2 };
        const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
            initialProps: { val: obj1 },
        });
        rerender({ val: obj2 });
        expect(result.current).toBe(obj1);
    });
});
