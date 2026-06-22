import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
    it("renders children content when open", () => {
        render(<Modal open={true} onClose={vi.fn()}>Modal content</Modal>);
        expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("renders title when provided", () => {
        render(<Modal open={true} onClose={vi.fn()} title="Confirm Action">Content</Modal>);
        expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    });

    it("renders save button", () => {
        render(<Modal open={true} onClose={vi.fn()} saveText="Confirm">Content</Modal>);
        expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    });

    it("calls onSave when save button is clicked", async () => {
        const handler = vi.fn();
        render(<Modal open={true} onClose={vi.fn()} onSave={handler} saveText="Save">Content</Modal>);
        await userEvent.click(screen.getByRole("button", { name: "Save" }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders cancel button when hasCancelButton is true", () => {
        render(<Modal open={true} onClose={vi.fn()} hasCancelButton cancelText="Cancel">Content</Modal>);
        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    it("calls onClose when close icon is clicked", async () => {
        const handler = vi.fn();
        render(<Modal open={true} onClose={handler} hasCloseIcon>Content</Modal>);
        const closeBtn = screen.getAllByRole("button").find(b => b.querySelector('.material-icons')?.textContent === 'close');
        if (closeBtn) await userEvent.click(closeBtn);
        expect(handler).toHaveBeenCalled();
    });
});
