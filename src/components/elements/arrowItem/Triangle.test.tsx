import { render } from "@testing-library/react";
import Triangle from "./Triangle";

describe("Triangle", () => {
    it("renders without crashing", () => {
        const { container } = render(<Triangle color="#FF0000" secondaryColor="white" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("has zero width and height for CSS triangle effect", () => {
        const { container } = render(<Triangle color="#FF0000" secondaryColor="white" />);
        const el = container.firstChild as HTMLElement;
        expect(el.style.width).toBe("0px");
        expect(el.style.height).toBe("0px");
    });

    it("applies borderRight for default right position", () => {
        const { container } = render(<Triangle color="#FF0000" secondaryColor="white" />);
        const el = container.firstChild as HTMLElement;
        expect(el.style.borderRight).toBeTruthy();
    });

    it("applies borderLeft for left position", () => {
        const { container } = render(<Triangle position="left" color="#FF0000" secondaryColor="white" />);
        const el = container.firstChild as HTMLElement;
        expect(el.style.borderLeft).toBeTruthy();
    });
});
