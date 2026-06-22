import ColorUtils from "./ColorUtils";

describe("ColorUtils.hexToRGB", () => {
    it("converts red hex to rgba with default alpha 1", () => {
        expect(ColorUtils.hexToRGB("#FF0000")).toBe("rgba(255, 0, 0, 1)");
    });

    it("converts green hex to rgba with custom alpha", () => {
        expect(ColorUtils.hexToRGB("#00FF00", 0.5)).toBe("rgba(0, 255, 0, 0.5)");
    });

    it("converts black", () => {
        expect(ColorUtils.hexToRGB("#000000", 1)).toBe("rgba(0, 0, 0, 1)");
    });

    it("converts white", () => {
        expect(ColorUtils.hexToRGB("#FFFFFF")).toBe("rgba(255, 255, 255, 1)");
    });

    it("handles alpha 0", () => {
        expect(ColorUtils.hexToRGB("#123456", 0)).toBe("rgba(18, 52, 86, 0)");
    });
});
