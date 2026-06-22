import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderDetail from "./HeaderDetail";

describe("HeaderDetail", () => {
    it("renders the title", () => {
        render(<HeaderDetail title="Order #123" listButton={[]} />);
        expect(screen.getByText("Order #123")).toBeInTheDocument();
    });

    it("renders the subTitle", () => {
        render(<HeaderDetail title="Order" subTitle="Created today" listButton={[]} />);
        expect(screen.getByText("Created today")).toBeInTheDocument();
    });

    it("renders a user's display name when user is provided", () => {
        render(<HeaderDetail title="Order" user={{ name: "Alice" } as any} listButton={[]} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    it("renders action buttons from listButton", () => {
        const buttons = [{ id: "save", label: "Save", icon: "save" }];
        render(<HeaderDetail title="Order" listButton={buttons} />);
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("calls onButtonClick when a button is clicked", async () => {
        const handler = vi.fn();
        const buttons = [{ id: "save", label: "Save", icon: "save" }];
        render(<HeaderDetail title="Order" listButton={buttons} onButtonClick={handler} />);
        await userEvent.click(screen.getByText("Save"));
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
