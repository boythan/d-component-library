import { render, screen } from "@testing-library/react";
import WrapperComponent from "./WrapperComponent";

describe("WrapperComponent", () => {
    it("renders the provided element", () => {
        render(<WrapperComponent element={<div data-testid="wrapper" />} />);
        expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    });

    it("passes children into the cloned element", () => {
        render(
            <WrapperComponent element={<div data-testid="wrapper" />}>
                <span>Inner content</span>
            </WrapperComponent>
        );
        expect(screen.getByText("Inner content")).toBeInTheDocument();
    });

    it("merges extra props into the cloned element", () => {
        render(
            <WrapperComponent element={<div />} props={{ "data-testid": "merged", className: "extra" }}>
                Content
            </WrapperComponent>
        );
        expect(screen.getByTestId("merged")).toHaveClass("extra");
    });
});
