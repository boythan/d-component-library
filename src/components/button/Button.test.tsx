import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
    it("renders children text", () => {
        render(<Button>Save</Button>);
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("renders content prop text", () => {
        render(<Button content="Submit" />);
        expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
        const handler = vi.fn();
        render(<Button onClick={handler}>Click me</Button>);
        await userEvent.click(screen.getByRole("button"));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
        const handler = vi.fn();
        render(<Button disabled onClick={handler}>Click me</Button>);
        await userEvent.click(screen.getByRole("button"));
        expect(handler).not.toHaveBeenCalled();
    });

    it("applies disabled attribute", () => {
        render(<Button disabled>Save</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("applies small size class", () => {
        render(<Button size="small">Save</Button>);
        expect(screen.getByRole("button").className).toContain("h-8");
    });

    it("applies large size class", () => {
        render(<Button size="large">Save</Button>);
        expect(screen.getByRole("button").className).toContain("h-12");
    });

    it("renders prefix element", () => {
        render(<Button prefixElement={() => <span data-testid="prefix">*</span>}>Save</Button>);
        expect(screen.getByTestId("prefix")).toBeInTheDocument();
    });

    it("renders suffix element", () => {
        render(<Button suffixElement={() => <span data-testid="suffix">*</span>}>Save</Button>);
        expect(screen.getByTestId("suffix")).toBeInTheDocument();
    });

    it("has button type by default", () => {
        render(<Button>Save</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
});
