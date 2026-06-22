import { render, screen } from "@testing-library/react";
import ViewTextError from "./ViewTextError";

describe("ViewTextError", () => {
    it("renders the error message when error is provided", () => {
        render(<ViewTextError error="This field is required" />);
        expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("renders an empty div when error is null", () => {
        const { container } = render(<ViewTextError error={null} />);
        expect(container.querySelector("span")).not.toBeInTheDocument();
    });

    it("renders an empty div when error is undefined", () => {
        const { container } = render(<ViewTextError error={undefined} />);
        expect(container.querySelector("span")).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(<ViewTextError error="Error" className="my-class" />);
        expect(container.firstChild).toHaveClass("my-class");
    });
});
