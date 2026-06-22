import { render, screen } from "@testing-library/react";
import InputColor from "./InputColor";

describe("InputColor", () => {
    it("renders a color input element", () => {
        const { container } = render(<InputColor />);
        expect(container.querySelector('input[type="color"]')).toBeInTheDocument();
    });

    it("renders the label when provided", () => {
        render(<InputColor label="Brand Color" />);
        expect(screen.getByText("Brand Color")).toBeInTheDocument();
    });

    it("shows the error message", () => {
        render(<InputColor error="Color is required" />);
        expect(screen.getByText("Color is required")).toBeInTheDocument();
    });

    it("disables the input when disabled prop is set", () => {
        const { container } = render(<InputColor disabled />);
        expect(container.querySelector('input[type="color"]')).toBeDisabled();
    });

    it("displays the current value as text", () => {
        render(<InputColor value="#FF0000" onChange={() => {}} />);
        expect(screen.getByText("#FF0000")).toBeInTheDocument();
    });
});
