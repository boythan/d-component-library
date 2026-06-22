import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxGroup from "./CheckboxGroup";

const items = [
    { id: "a", label: "Option A" },
    { id: "b", label: "Option B" },
    { id: "c", label: "Option C" },
];

describe("CheckboxGroup", () => {
    it("renders a checkbox for each data source item", () => {
        render(<CheckboxGroup dataSource={items} />);
        expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    });

    it("renders labels for each item", () => {
        render(<CheckboxGroup dataSource={items} />);
        expect(screen.getByText("Option A")).toBeInTheDocument();
        expect(screen.getByText("Option B")).toBeInTheDocument();
    });

    it("marks controlled checked items", () => {
        render(<CheckboxGroup dataSource={items} value={["a", "c"]} />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
        expect(checkboxes[2]).toBeChecked();
    });

    it("calls onChange when a checkbox is toggled", async () => {
        const handler = vi.fn();
        render(<CheckboxGroup dataSource={items} value={[]} onChange={handler} />);
        await userEvent.click(screen.getAllByRole("checkbox")[0]);
        expect(handler).toHaveBeenCalled();
    });

    it("renders group label when provided", () => {
        render(<CheckboxGroup dataSource={items} label="Preferences" />);
        expect(screen.getByText("Preferences")).toBeInTheDocument();
    });

    it("renders select-all buttons when showSelectAll is true", () => {
        render(<CheckboxGroup dataSource={items} showSelectAll selectAllText="Select All" deSelectAllText="Clear" />);
        expect(screen.getByRole("button", { name: "Select All" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });

    it("calls onChange with all ids when select-all is clicked", async () => {
        const handler = vi.fn();
        render(
            <CheckboxGroup
                dataSource={items}
                value={[]}
                onChange={handler}
                showSelectAll
                selectAllText="Select All"
                deSelectAllText="Clear"
            />
        );
        await userEvent.click(screen.getByRole("button", { name: "Select All" }));
        expect(handler).toHaveBeenCalledWith(["a", "b", "c"]);
    });
});
