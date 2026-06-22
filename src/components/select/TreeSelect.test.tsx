import { render, screen } from "@testing-library/react";
import TreeSelect from "./TreeSelect";

describe("TreeSelect", () => {
    it("renders without crashing", () => {
        render(<TreeSelect value={[]} />);
    });

    it("renders the label when provided", () => {
        render(<TreeSelect value={[]} label="Department" />);
        expect(screen.getByText("Department")).toBeInTheDocument();
    });

    it("shows the error message", () => {
        render(<TreeSelect value={[]} error="Please select a department" />);
        expect(screen.getByText("Please select a department")).toBeInTheDocument();
    });

    it("renders the tree select input", () => {
        render(<TreeSelect value={[]} />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
});
