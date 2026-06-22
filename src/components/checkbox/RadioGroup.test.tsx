import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioGroup from "./RadioGroup";

const items = [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
    { id: "maybe", label: "Maybe" },
];

describe("RadioGroup", () => {
    it("renders a radio for each data source item", () => {
        render(<RadioGroup dataSource={items} />);
        expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("renders labels for each item", () => {
        render(<RadioGroup dataSource={items} />);
        expect(screen.getByText("Yes")).toBeInTheDocument();
        expect(screen.getByText("No")).toBeInTheDocument();
    });

    it("marks the selected item as checked", () => {
        render(<RadioGroup dataSource={items} value="no" />);
        const radios = screen.getAllByRole("radio");
        expect(radios[1]).toBeChecked();
    });

    it("calls onChange with the selected id when a radio is clicked", async () => {
        const handler = vi.fn();
        render(<RadioGroup dataSource={items} value="yes" onChange={handler} />);
        await userEvent.click(screen.getAllByRole("radio")[2]);
        expect(handler).toHaveBeenCalledWith("maybe");
    });

    it("renders group label when provided", () => {
        render(<RadioGroup dataSource={items} label="Answer" />);
        expect(screen.getByText("Answer")).toBeInTheDocument();
    });

    it("shows error message when error prop is set", () => {
        render(<RadioGroup dataSource={items} error="Required" />);
        expect(screen.getByText("Required")).toBeInTheDocument();
    });
});
