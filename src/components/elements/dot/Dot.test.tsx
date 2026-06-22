import { render, screen } from "@testing-library/react";
import Dot from "./Dot";

describe("Dot", () => {
    it("renders without crashing", () => {
        const { container } = render(<Dot />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders children content", () => {
        render(<Dot>3</Dot>);
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders index content", () => {
        render(<Dot index={5} />);
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("applies rounded-full class", () => {
        const { container } = render(<Dot />);
        expect(container.firstChild).toHaveClass("rounded-full");
    });

    it("applies theme color class for success", () => {
        const { container } = render(<Dot color="success" />);
        expect(container.firstChild).toHaveClass("bg-success");
    });

    it("applies custom color via style for non-theme colors", () => {
        const { container } = render(<Dot color="#FF0000" />);
        expect(container.firstChild).toHaveStyle({ backgroundColor: "#FF0000" });
    });

    it("applies custom className", () => {
        const { container } = render(<Dot className="my-dot" />);
        expect(container.firstChild).toHaveClass("my-dot");
    });
});
