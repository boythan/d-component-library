import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
    it("renders with status role", () => {
        render(<Loading />);
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("has accessible sr-only text", () => {
        render(<Loading />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("applies small size class", () => {
        render(<Loading size="small" />);
        expect(screen.getByRole("status").className).toContain("w-4");
    });

    it("applies large size class", () => {
        render(<Loading size="large" />);
        expect(screen.getByRole("status").className).toContain("w-8");
    });

    it("applies custom className", () => {
        render(<Loading className="my-spinner" />);
        expect(screen.getByRole("status").className).toContain("my-spinner");
    });
});
