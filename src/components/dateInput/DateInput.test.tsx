import { render, screen } from "@testing-library/react";
import DateInput from "./DateInput";

describe("DateInput", () => {
    it("renders a date input", () => {
        const { container } = render(<DateInput />);
        expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("renders the label when provided", () => {
        render(<DateInput label="Start Date" />);
        expect(screen.getByText("Start Date")).toBeInTheDocument();
    });

    it("shows error message", () => {
        render(<DateInput error="Date is required" />);
        expect(screen.getByText("Date is required")).toBeInTheDocument();
    });

    it("shows required asterisk when required prop is set", () => {
        render(<DateInput label="Date" required />);
        const label = screen.getByText("Date");
        expect(label.className).toContain("after:content-['*']");
    });

    it("renders range picker when isRangePicker is true", () => {
        const { container } = render(<DateInput isRangePicker />);
        const inputs = container.querySelectorAll("input");
        expect(inputs.length).toBeGreaterThanOrEqual(2);
    });
});
