import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Rating from "./Rating";

describe("Rating", () => {
    it("renders the correct number of stars", () => {
        const { container } = render(<Rating value={3} range={5} />);
        const icons = container.querySelectorAll(".material-icons");
        expect(icons).toHaveLength(5);
    });

    it("renders custom range count", () => {
        const { container } = render(<Rating value={2} range={3} />);
        const icons = container.querySelectorAll(".material-icons");
        expect(icons).toHaveLength(3);
    });

    it("calls onChange with star index when clicked", async () => {
        const handler = vi.fn();
        const { container } = render(<Rating value={2} range={5} onChange={handler} />);
        const icons = container.querySelectorAll(".material-icons");
        await userEvent.click(icons[3] as HTMLElement); // Click 4th star
        expect(handler).toHaveBeenCalledWith(4);
    });

    it("does not call onChange when onChange is not provided", async () => {
        const { container } = render(<Rating value={3} range={5} />);
        const icons = container.querySelectorAll(".material-icons");
        // Should not throw when clicked
        await userEvent.click(icons[0] as HTMLElement);
    });
});
