import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
    it("shows initials from text prop", () => {
        render(<Avatar text="John" />);
        expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("shows two initials when both text and secondText provided", () => {
        render(<Avatar text="John" secondText="Doe" />);
        expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("renders image when src provided", () => {
        render(<Avatar src="https://example.com/photo.jpg" alt="John Doe" />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
        expect(img).toHaveAttribute("alt", "John Doe");
    });

    it("renders placeholder when no src or text", () => {
        render(<Avatar />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "images/placeholder.png");
    });

    it("applies circle variant class by default", () => {
        const { container } = render(<Avatar />);
        expect(container.firstChild).toHaveClass("rounded-full");
    });

    it("applies square variant class", () => {
        const { container } = render(<Avatar variant="square" />);
        expect(container.firstChild).toHaveClass("rounded-none");
    });

    it("applies custom background color", () => {
        const { container } = render(<Avatar color="#FF0000" />);
        expect(container.firstChild).toHaveStyle({ backgroundColor: "#FF0000" });
    });

    it("applies small size class", () => {
        const { container } = render(<Avatar size="small" />);
        expect(container.firstChild).toHaveClass("w-12");
    });
});
