import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";

describe("Card", () => {
    it("renders children", () => {
        render(<Card>Card body</Card>);
        expect(screen.getByText("Card body")).toBeInTheDocument();
    });

    it("renders title", () => {
        render(<Card title="My Card" />);
        expect(screen.getByText("My Card")).toBeInTheDocument();
    });

    it("renders subTitle", () => {
        render(<Card title="My Card" subTitle="A subtitle" />);
        expect(screen.getByText("A subtitle")).toBeInTheDocument();
    });

    it("renders sideText as a button", () => {
        render(<Card title="My Card" sideText="View All" />);
        expect(screen.getByRole("button", { name: /view all/i })).toBeInTheDocument();
    });

    it("calls onClick when sideText button is clicked", async () => {
        const handler = vi.fn();
        render(<Card title="My Card" sideText="View All" onClick={handler} />);
        await userEvent.click(screen.getByRole("button", { name: /view all/i }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders custom header", () => {
        render(<Card customHeader={() => <div>Custom Header</div>} />);
        expect(screen.getByText("Custom Header")).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(<Card className="my-card" />);
        expect(container.firstChild).toHaveClass("my-card");
    });
});
