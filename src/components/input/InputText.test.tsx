import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "./InputText";

describe("InputText", () => {
    it("renders label text", () => {
        render(<InputText label="Email" />);
        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("renders placeholder", () => {
        render(<InputText placeholder="Enter email" />);
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    it("shows error message", () => {
        render(<InputText error="This field is required" />);
        expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("does not show error element when no error", () => {
        render(<InputText label="Email" />);
        expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    });

    it("calls onChange when user types", async () => {
        const handler = vi.fn();
        render(<InputText onChange={handler} />);
        await userEvent.type(screen.getByRole("textbox"), "hello");
        expect(handler).toHaveBeenCalled();
    });

    it("renders controlled value", () => {
        render(<InputText value="test@example.com" onChange={vi.fn()} />);
        expect(screen.getByRole("textbox")).toHaveValue("test@example.com");
    });

    it("renders as textarea when multiple is true", () => {
        render(<InputText multiple label="Notes" />);
        expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA");
    });

    it("is disabled when disabled prop is set", () => {
        render(<InputText disabled />);
        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});
