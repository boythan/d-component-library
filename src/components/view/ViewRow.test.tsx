import { render, screen } from "@testing-library/react";
import ViewRow from "./ViewRow";

describe("ViewRow", () => {
    it("renders children", () => {
        render(<ViewRow>Hello</ViewRow>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("renders label", () => {
        render(<ViewRow label="Name">John</ViewRow>);
        expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders children from a render function", () => {
        render(<ViewRow>{() => <span>Dynamic</span>}</ViewRow>);
        expect(screen.getByText("Dynamic")).toBeInTheDocument();
    });

    it("does not render label element when label not provided", () => {
        render(<ViewRow>Content</ViewRow>);
        expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(<ViewRow className="my-row">Content</ViewRow>);
        expect(container.firstChild).toHaveClass("my-row");
    });
});
