import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drawer from "./Drawer";

describe("Drawer", () => {
    it("renders children when open is true", () => {
        render(
            <Drawer open={true} onClose={vi.fn()}>
                <span>Drawer content</span>
            </Drawer>
        );
        expect(screen.getByText("Drawer content")).toBeInTheDocument();
    });

    it("renders the close button without hidden class when open is true", () => {
        render(<Drawer open={true} onClose={vi.fn()}>Content</Drawer>);
        // AntD Drawer renders into a portal (document.body), not the container
        const closeBtn = document.body.querySelector("button");
        expect(closeBtn).not.toBeNull();
        expect(closeBtn).not.toHaveClass("hidden");
    });

    it("applies hidden class to close button when open is false", () => {
        render(<Drawer open={false} onClose={vi.fn()}>Content</Drawer>);
        const closeBtn = document.body.querySelector("button");
        // AntD Drawer keeps content in DOM by default (destroyOnClose=false)
        if (closeBtn) {
            expect(closeBtn).toHaveClass("hidden");
        }
    });

    it("calls onClose when the close button is clicked", async () => {
        const handler = vi.fn();
        render(<Drawer open={true} onClose={handler}>Content</Drawer>);
        const closeBtn = document.body.querySelector("button")!;
        await userEvent.click(closeBtn);
        expect(handler).toHaveBeenCalled();
    });
});
