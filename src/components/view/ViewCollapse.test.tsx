import { render, screen } from "@testing-library/react";
import ViewCollapse from "./ViewCollapse";

describe("ViewCollapse", () => {
    it("renders the label", () => {
        render(<ViewCollapse label="Details">Content</ViewCollapse>);
        expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("renders children when open by default", () => {
        render(<ViewCollapse label="Section">Child content</ViewCollapse>);
        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("shows required asterisk when required is true", () => {
        render(<ViewCollapse label="Required Section" required>Content</ViewCollapse>);
        const label = screen.getByText("Required Section");
        expect(label.className).toContain("after:content-['*']");
    });

    it("applies custom className", () => {
        const { container } = render(<ViewCollapse label="Test" className="my-collapse">Content</ViewCollapse>);
        expect(container.querySelector(".my-collapse")).toBeInTheDocument();
    });
});
