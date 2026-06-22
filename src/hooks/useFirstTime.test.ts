import { renderHook } from "@testing-library/react";
import useFirstTime from "./useFirstTime";

describe("useFirstTime", () => {
    it("returns true on the first render", () => {
        const { result } = renderHook(() => useFirstTime());
        expect(result.current).toBe(true);
    });

    it("returns false after the component mounts (subsequent render)", () => {
        const { result, rerender } = renderHook(() => useFirstTime());
        rerender(); // triggers re-render after mount effect has run
        expect(result.current).toBe(false);
    });
});
