import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderBlock from "./HeaderBlock";

describe("HeaderBlock", () => {
    it("renders title", () => {
        render(<HeaderBlock title="Section" />);
        expect(screen.getByText("Section")).toBeInTheDocument();
    });

    it("renders divider line by default", () => {
        const { container } = render(<HeaderBlock title="Section" />);
        expect(container.querySelector(".border-t")).toBeInTheDocument();
    });

    it("hides divider line when showLine is false", () => {
        const { container } = render(<HeaderBlock title="Section" showLine={false} />);
        expect(container.querySelector(".border-t")).not.toBeInTheDocument();
    });

    it("renders navigation arrows when showArrow is true", () => {
        render(<HeaderBlock title="Section" showArrow />);
        expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("calls onPrevious when left arrow is clicked", async () => {
        const handler = vi.fn();
        render(<HeaderBlock title="Section" showArrow onPrevious={handler} />);
        const [prevBtn] = screen.getAllByRole("button");
        await userEvent.click(prevBtn);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("calls onNext when right arrow is clicked", async () => {
        const handler = vi.fn();
        render(<HeaderBlock title="Section" showArrow onNext={handler} />);
        const [, nextBtn] = screen.getAllByRole("button");
        await userEvent.click(nextBtn);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders custom right content", () => {
        render(<HeaderBlock title="Section" customRight={<span>Custom</span>} />);
        expect(screen.getByText("Custom")).toBeInTheDocument();
    });
});
