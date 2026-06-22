import { render, screen } from "@testing-library/react";
import ArrowItem from "./ArrowItem";

describe("ArrowItem", () => {
    it("renders the label text", () => {
        render(<ArrowItem label="Step 1" />);
        expect(screen.getByText("Step 1")).toBeInTheDocument();
    });

    it("applies background color via style", () => {
        const { container } = render(<ArrowItem color="#FF0000" label="Test" />);
        expect(container.firstChild).toHaveStyle({ backgroundColor: "#FF0000" });
    });

    it("renders custom label from a function", () => {
        render(<ArrowItem customLabel={() => <span>Custom Label</span>} />);
        expect(screen.getByText("Custom Label")).toBeInTheDocument();
    });

    it("renders custom label as a ReactElement", () => {
        render(<ArrowItem customLabel={<span>Element Label</span>} />);
        expect(screen.getByText("Element Label")).toBeInTheDocument();
    });

    it("applies isActive class when active", () => {
        const { container } = render(<ArrowItem label="Active" isActive />);
        expect(container.querySelector(".arrow-content-active")).toBeInTheDocument();
    });

    it("applies arrow-content-first class when isFirst", () => {
        const { container } = render(<ArrowItem label="First" isFirst />);
        expect(container.querySelector(".arrow-content-first")).toBeInTheDocument();
    });
});
