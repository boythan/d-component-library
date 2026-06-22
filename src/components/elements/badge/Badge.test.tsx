import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
    it("renders children content", () => {
        render(<Badge><span>Content</span></Badge>);
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders index value in index variant", () => {
        render(<Badge variant="index" index={7}><span>Icon</span></Badge>);
        expect(screen.getByText("7")).toBeInTheDocument();
    });

    it("does not render index badge when no index provided", () => {
        render(<Badge variant="index"><span>Icon</span></Badge>);
        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
        const handler = vi.fn();
        const { container } = render(<Badge onClick={handler}><span>Content</span></Badge>);
        (container.firstChild as HTMLElement).click();
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("applies custom className", () => {
        const { container } = render(<Badge className="my-badge"><span>X</span></Badge>);
        expect(container.firstChild).toHaveClass("my-badge");
    });
});
