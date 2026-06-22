import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header", () => {
    it("renders page title", () => {
        render(<Header title="My Page" />);
        expect(screen.getByText("My Page")).toBeInTheDocument();
    });

    it("renders save button when onSave is provided", () => {
        render(<Header title="My Page" onSave={vi.fn()} saveText="Save" />);
        expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    it("calls onSave when save button is clicked", async () => {
        const handler = vi.fn();
        render(<Header title="My Page" onSave={handler} saveText="Save" />);
        await userEvent.click(screen.getByRole("button", { name: /save/i }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders delete button when onDelete is provided", () => {
        render(<Header title="My Page" onDelete={vi.fn()} deleteText="Delete" />);
        expect(screen.getAllByRole("button").some(b => b.textContent?.includes("Delete"))).toBe(true);
    });

    it("calls onDelete when delete button is clicked", async () => {
        const handler = vi.fn();
        render(<Header title="My Page" onDelete={handler} deleteText="Delete" />);
        const deleteBtn = screen.getAllByRole("button").find(b => b.textContent?.includes("Delete"))!;
        await userEvent.click(deleteBtn);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders custom left content", () => {
        render(<Header customLeft={() => <div>Custom Left</div>} />);
        expect(screen.getByText("Custom Left")).toBeInTheDocument();
    });

    it("renders custom right content", () => {
        render(<Header customRight={() => <div>Custom Right</div>} />);
        expect(screen.getByText("Custom Right")).toBeInTheDocument();
    });
});
