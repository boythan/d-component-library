import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popover from "./Popover";

describe("Popover", () => {
    it("shows content when open is true", () => {
        render(
            <Popover open={true} onOpen={vi.fn()} onClose={vi.fn()} content={<span>Popover body</span>}>
                <button>Trigger</button>
            </Popover>
        );
        expect(screen.getByText("Popover body")).toBeInTheDocument();
    });

    it("hides content when open is false", () => {
        render(
            <Popover open={false} onOpen={vi.fn()} onClose={vi.fn()} content={<span>Popover body</span>}>
                <button>Trigger</button>
            </Popover>
        );
        expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
    });

    it("always renders children", () => {
        render(
            <Popover open={false} onOpen={vi.fn()} onClose={vi.fn()}>
                <button>Trigger</button>
            </Popover>
        );
        expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();
    });

    it("calls onOpen when trigger is clicked while closed", async () => {
        const onOpen = vi.fn();
        render(
            <Popover open={false} onOpen={onOpen} onClose={vi.fn()}>
                <button>Trigger</button>
            </Popover>
        );
        await userEvent.click(screen.getByRole("button", { name: "Trigger" }));
        expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when trigger is clicked while open", async () => {
        const onClose = vi.fn();
        render(
            <Popover open={true} onOpen={vi.fn()} onClose={onClose}>
                <button>Trigger</button>
            </Popover>
        );
        await userEvent.click(screen.getByRole("button", { name: "Trigger" }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
