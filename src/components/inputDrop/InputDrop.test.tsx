import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputDrop from "./InputDrop";

const noop = () => {};

describe("InputDrop", () => {
    it("renders the label", () => {
        render(
            <InputDrop
                label="Category"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div />}
            />
        );
        expect(screen.getAllByText("Category").length).toBeGreaterThan(0);
    });

    it("shows the error message", () => {
        render(
            <InputDrop
                label="Category"
                error="Selection required"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div />}
            />
        );
        expect(screen.getByText("Selection required")).toBeInTheDocument();
    });

    it("renders the badge count when valueLength is greater than 0", () => {
        render(
            <InputDrop
                label="Items"
                valueLength={3}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div />}
            />
        );
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders displayValue when provided", () => {
        render(
            <InputDrop
                label="Items"
                displayValue="Custom Display"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div />}
            />
        );
        expect(screen.getByText("Custom Display")).toBeInTheDocument();
    });

    it("opens popover when trigger is clicked, showing Apply button", async () => {
        const { container } = render(
            <InputDrop
                label="Items"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div data-testid="drop-content">Content</div>}
            />
        );
        // The Popover wraps children in a clickable div; click to open
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        expect(screen.getByText("Apply")).toBeInTheDocument();
    });

    it("calls onClickApply and closes popover when Apply is clicked", async () => {
        const onClickApply = vi.fn();
        const { container } = render(
            <InputDrop
                label="Items"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={onClickApply}
                content={() => <div />}
            />
        );
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        const applyBtn = screen.getByText("Apply");
        await userEvent.click(applyBtn);
        expect(onClickApply).toHaveBeenCalledTimes(1);
        // After clicking Apply, popover closes — Apply button disappears
        expect(screen.queryByText("Apply")).not.toBeInTheDocument();
    });

    it("calls onClickSelectAll when Select All is clicked after opening", async () => {
        const onClickSelectAll = vi.fn();
        const { container } = render(
            <InputDrop
                label="Items"
                valueLength={0}
                onClickSelectAll={onClickSelectAll}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div />}
            />
        );
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        const selectAllBtn = screen.getByText("Select All");
        await userEvent.click(selectAllBtn);
        expect(onClickSelectAll).toHaveBeenCalledTimes(1);
    });

    it("uses default content function when no content prop is provided", async () => {
        const { container } = render(
            <InputDrop
                label="Items"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
            />
        );
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        // Default content renders without error and Apply button is visible
        expect(screen.getByText("Apply")).toBeInTheDocument();
    });

    it("closes popover when clicking outside (onClose handler)", async () => {
        const { container } = render(
            <InputDrop
                label="Items"
                valueLength={0}
                onClickSelectAll={noop}
                onClickClearAll={noop}
                onClickApply={noop}
                content={() => <div />}
            />
        );
        const triggerDiv = container.querySelector(".w-full.h-full.flex.items-center");
        if (triggerDiv) {
            await userEvent.click(triggerDiv as HTMLElement);
        }
        expect(screen.getByText("Apply")).toBeInTheDocument();
        // Click outside the popover container — triggers Popover's mousedown handler → onClose
        await userEvent.click(document.body);
        expect(screen.queryByText("Apply")).not.toBeInTheDocument();
    });
});
