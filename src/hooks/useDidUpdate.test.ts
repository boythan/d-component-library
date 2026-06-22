import { renderHook } from "@testing-library/react";
import useDidUpdate from "./useDidUpdate";

describe("useDidUpdate", () => {
    it("does not call callback on initial mount", () => {
        const callback = vi.fn();
        renderHook(() => useDidUpdate(callback, [0]));
        expect(callback).not.toHaveBeenCalled();
    });

    it("calls callback when dependency changes", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ dep }) => useDidUpdate(callback, [dep]), {
            initialProps: { dep: 0 },
        });
        rerender({ dep: 1 });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("calls callback on each subsequent change", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ dep }) => useDidUpdate(callback, [dep]), {
            initialProps: { dep: 0 },
        });
        rerender({ dep: 1 });
        rerender({ dep: 2 });
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("does not call callback when dependency is unchanged", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ dep }) => useDidUpdate(callback, [dep]), {
            initialProps: { dep: "same" },
        });
        rerender({ dep: "same" });
        expect(callback).not.toHaveBeenCalled();
    });
});
