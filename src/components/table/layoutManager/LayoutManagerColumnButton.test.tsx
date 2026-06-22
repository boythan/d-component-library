import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LayoutManagerColumnButton from "./LayoutManagerColumnButton";

const defaultProps = {
    dataSource: [
        { id: "name", title: "Name" },
        { id: "age", title: "Age" },
    ],
    values: ["name"],
    tableKey: "test-table",
    onChange: vi.fn(),
    onClickReset: vi.fn(),
    onChangeLayout: vi.fn(),
};

describe("LayoutManagerColumnButton", () => {
    it("renders the Column button", () => {
        render(<LayoutManagerColumnButton {...defaultProps} />);
        expect(screen.getByText("Column")).toBeInTheDocument();
    });

    it("renders the settings icon button", () => {
        render(<LayoutManagerColumnButton {...defaultProps} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("opens popover with column checkboxes when button is clicked", async () => {
        const { container } = render(<LayoutManagerColumnButton {...defaultProps} />);
        // The Popover's trigger div wraps the Column button; clicking it opens the popover
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        expect(screen.getByText("Reset")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("shows column checkboxes in the popover", async () => {
        const { container } = render(<LayoutManagerColumnButton {...defaultProps} />);
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Age")).toBeInTheDocument();
    });

    it("calls onClickReset when Reset button is clicked", async () => {
        const onClickReset = vi.fn();
        const { container } = render(
            <LayoutManagerColumnButton {...defaultProps} onClickReset={onClickReset} />
        );
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        await userEvent.click(screen.getByText("Reset"));
        expect(onClickReset).toHaveBeenCalledTimes(1);
    });

    it("calls onChangeLayout when Cancel button is clicked", async () => {
        const onChangeLayout = vi.fn();
        const { container } = render(
            <LayoutManagerColumnButton {...defaultProps} onChangeLayout={onChangeLayout} />
        );
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        await userEvent.click(screen.getByText("Cancel"));
        expect(onChangeLayout).toHaveBeenCalledTimes(1);
    });
});
