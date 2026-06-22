import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputTextSearch from "./InputTextSearch";

describe("InputTextSearch", () => {
    it("renders a text input", () => {
        render(<InputTextSearch />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders the search icon prefix", () => {
        render(<InputTextSearch />);
        expect(screen.getByText("search")).toBeInTheDocument();
    });

    it("renders placeholder text", () => {
        render(<InputTextSearch placeholder="Search..." />);
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("renders controlled value", () => {
        render(<InputTextSearch value="hello" onChange={vi.fn()} />);
        expect(screen.getByRole("textbox")).toHaveValue("hello");
    });

    it("calls onChange when user types", async () => {
        const handler = vi.fn();
        render(<InputTextSearch onChange={handler} />);
        await userEvent.type(screen.getByRole("textbox"), "react");
        expect(handler).toHaveBeenCalled();
    });

    it("is disabled when disabled prop is set", () => {
        render(<InputTextSearch disabled />);
        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});
