import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon", () => {
    it("renders the icon name as text content", () => {
        render(<Icon name="home" />);
        expect(screen.getByText("home")).toBeInTheDocument();
    });

    it("applies material-icons class", () => {
        render(<Icon name="home" />);
        expect(screen.getByText("home").className).toContain("material-icons");
    });

    it("applies small size class", () => {
        render(<Icon name="home" size="small" />);
        expect(screen.getByText("home").className).toContain("text-sm");
    });

    it("applies large size class", () => {
        render(<Icon name="home" size="large" />);
        expect(screen.getByText("home").className).toContain("text-lg");
    });

    it("applies custom className", () => {
        render(<Icon name="home" className="my-class" />);
        expect(screen.getByText("home").className).toContain("my-class");
    });

    it("applies color via style", () => {
        render(<Icon name="home" color="#FF0000" />);
        expect(screen.getByText("home")).toHaveStyle({ color: "#FF0000" });
    });
});
