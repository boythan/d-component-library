import { renderHook } from "@testing-library/react";
import useDeepEffect from "./useDeepEffect";

describe("useDeepEffect", () => {
    it("calls the effect on initial mount", () => {
        const callback = vi.fn();
        renderHook(() => useDeepEffect(callback, [{ x: 1 }]));
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("does not re-run when deps are deeply equal objects", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ deps }) => useDeepEffect(callback, deps), {
            initialProps: { deps: [{ x: 1 }] as any[] },
        });
        rerender({ deps: [{ x: 1 }] }); // same deep value, new reference
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("re-runs when deps change deeply", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ deps }) => useDeepEffect(callback, deps), {
            initialProps: { deps: [{ x: 1 }] as any[] },
        });
        rerender({ deps: [{ x: 2 }] });
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("works with primitive deps", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ val }) => useDeepEffect(callback, [val]), {
            initialProps: { val: 1 },
        });
        rerender({ val: 1 }); // same value
        expect(callback).toHaveBeenCalledTimes(1);
        rerender({ val: 2 });
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
