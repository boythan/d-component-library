import { render, screen } from "@testing-library/react";
import AvatarName from "./AvatarName";

describe("AvatarName", () => {
    it("renders the user's display name", () => {
        render(<AvatarName user={{ name: "Alice" }} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    it("prefers fullName over name", () => {
        render(<AvatarName user={{ name: "Alice", fullName: "Alice Smith" }} />);
        expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    });

    it("renders avatar image when user has avatar src", () => {
        render(<AvatarName user={{ name: "Alice", avatar: "https://example.com/alice.jpg" }} />);
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/alice.jpg");
    });

    it("renders initials avatar when no avatar src", () => {
        render(<AvatarName user={{ name: "Alice" }} />);
        expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("renders subLabel when provided", () => {
        render(<AvatarName user={{ name: "Alice" }} subLabel="Admin" />);
        expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
        const handler = vi.fn();
        const { container } = render(<AvatarName user={{ name: "Alice" }} onClick={handler} />);
        (container.firstChild as HTMLElement).click();
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
