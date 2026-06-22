import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputTextPassword from "./InputTextPassword";

describe("InputTextPassword", () => {
    it("renders a password input by default", () => {
        const { container } = render(<InputTextPassword />);
        expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
    });

    it("renders the visibility toggle icon", () => {
        render(<InputTextPassword />);
        expect(screen.getByText("visibility")).toBeInTheDocument();
    });

    it("toggles to text input when visibility icon is clicked", async () => {
        const { container } = render(<InputTextPassword />);
        await userEvent.click(screen.getByText("visibility"));
        expect(container.querySelector('input[type="password"]')).not.toBeInTheDocument();
    });

    it("shows visibility_off icon after toggle", async () => {
        render(<InputTextPassword />);
        await userEvent.click(screen.getByText("visibility"));
        expect(screen.getByText("visibility_off")).toBeInTheDocument();
    });

    it("renders label when provided", () => {
        render(<InputTextPassword label="Password" />);
        expect(screen.getByText("Password")).toBeInTheDocument();
    });

    it("shows error message when error prop is set", () => {
        render(<InputTextPassword error="Too short" />);
        expect(screen.getByText("Too short")).toBeInTheDocument();
    });
});
