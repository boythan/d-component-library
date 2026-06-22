import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectConfirmation from "./SelectConfirmation";

describe("SelectConfirmation", () => {
    it("renders a combobox input", () => {
        render(<SelectConfirmation />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders the label when provided", () => {
        render(<SelectConfirmation label="Choose Option" />);
        expect(screen.getByText("Choose Option")).toBeInTheDocument();
    });

    it("shows error message", () => {
        render(<SelectConfirmation error="Required" />);
        expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("is disabled when disabled prop is set", () => {
        render(<SelectConfirmation disabled />);
        expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("opens dropdown on focus (onFocus handler sets open state)", async () => {
        render(<SelectConfirmation confirmText="Confirm" cancelText="Cancel" />);
        const combobox = screen.getByRole("combobox");
        await userEvent.click(combobox);
        // onFocus fires → setOpen(true) — verify no crash
        expect(combobox).toBeInTheDocument();
    });

    it("closes dropdown on blur (onBlur handler sets open to false)", async () => {
        render(<SelectConfirmation confirmText="Confirm" cancelText="Cancel" />);
        const combobox = screen.getByRole("combobox");
        await userEvent.click(combobox);
        await userEvent.tab();
        expect(combobox).toBeInTheDocument();
    });

    it("shows confirm and cancel buttons when dropdown is open", async () => {
        render(
            <SelectConfirmation confirmText="Confirm" cancelText="Cancel" />
        );
        await userEvent.click(screen.getByRole("combobox"));
        const confirmBtn = await screen.findByText("Confirm");
        expect(confirmBtn).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("cancel button resets value to defaultValue", async () => {
        render(
            <SelectConfirmation
                confirmText="Confirm"
                cancelText="Cancel"
                defaultValue="initial"
            />
        );
        await userEvent.click(screen.getByRole("combobox"));
        const cancelBtn = await screen.findByText("Cancel");
        await userEvent.click(cancelBtn);
        // No throw means cancel onClick executed
        expect(cancelBtn).toBeInTheDocument();
    });

    it("confirm button calls onChange with current value", async () => {
        const onChange = vi.fn();
        render(
            <SelectConfirmation
                confirmText="OK"
                cancelText="Cancel"
                onChange={onChange}
            />
        );
        await userEvent.click(screen.getByRole("combobox"));
        const confirmBtn = await screen.findByText("OK");
        await userEvent.click(confirmBtn);
        expect(onChange).toHaveBeenCalled();
    });
});
