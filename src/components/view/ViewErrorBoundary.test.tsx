import { render, screen } from "@testing-library/react";
import ViewErrorBoundary from "./ViewErrorBoundary";

const ThrowError = () => {
    throw new Error("Test error");
};

describe("ViewErrorBoundary", () => {
    beforeEach(() => {
        vi.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders children normally", () => {
        render(
            <ViewErrorBoundary>
                <span>Safe content</span>
            </ViewErrorBoundary>
        );
        expect(screen.getByText("Safe content")).toBeInTheDocument();
    });

    it("shows fallback UI when a child throws", () => {
        render(
            <ViewErrorBoundary>
                <ThrowError />
            </ViewErrorBoundary>
        );
        expect(screen.getByText("Something went wrong!!!")).toBeInTheDocument();
    });
});
