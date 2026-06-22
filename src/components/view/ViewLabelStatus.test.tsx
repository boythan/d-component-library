import { render, screen } from "@testing-library/react";
import ViewLabelStatus from "./ViewLabelStatus";

describe("ViewLabelStatus", () => {
    it("renders content prop text", () => {
        render(<ViewLabelStatus content="Active" />);
        expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders label from listStatus matching status", () => {
        const statuses = [
            { id: 1, label: "Active", color: "#00FF00" },
            { id: 2, label: "Inactive", color: "#FF0000" },
        ];
        render(<ViewLabelStatus listStatus={statuses} status={1} />);
        expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(<ViewLabelStatus content="Active" className="my-status" />);
        expect(container.firstChild).toHaveClass("my-status");
    });

    it("renders a dot indicator", () => {
        const { container } = render(<ViewLabelStatus content="Active" color="#00FF00" />);
        const dot = container.querySelector(".rounded-full");
        expect(dot).toBeInTheDocument();
    });
});
