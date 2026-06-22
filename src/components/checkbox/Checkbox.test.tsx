import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
    it("renders label text", () => {
        render(<Checkbox label="Accept terms" />);
        expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("renders without label", () => {
        render(<Checkbox />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("is checked when checked prop is true", () => {
        render(<Checkbox checked onChange={vi.fn()} />);
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("is unchecked when checked prop is false", () => {
        render(<Checkbox checked={false} onChange={vi.fn()} />);
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("calls onChange when clicked", async () => {
        const handler = vi.fn();
        render(<Checkbox onChange={handler} />);
        await userEvent.click(screen.getByRole("checkbox"));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is set", () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("renders as radio when variant is radio", () => {
        render(<Checkbox variant="radio" label="Option A" />);
        expect(screen.getByRole("radio")).toBeInTheDocument();
    });

    it("renders radio label text", () => {
        render(<Checkbox variant="radio" label="Option A" />);
        expect(screen.getByText("Option A")).toBeInTheDocument();
    });
});
