import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Collapse from "./Collapse";

describe("Collapse", () => {
    it("renders the label", () => {
        render(<Collapse label="Section Title">Content</Collapse>);
        expect(screen.getByText("Section Title")).toBeInTheDocument();
    });

    it("renders children", () => {
        render(<Collapse label="Section">Child content</Collapse>);
        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("renders 'N/A' when no label provided", () => {
        render(<Collapse label="">Content</Collapse>);
        expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    it("renders toggle button", () => {
        render(<Collapse label="Section">Content</Collapse>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders custom icon when customIcon provided", () => {
        render(
            <Collapse label="Section" customIcon={<span data-testid="custom-icon">▶</span>}>
                Content
            </Collapse>
        );
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("inner element has collapse-opened class on initial render", () => {
        const { container } = render(<Collapse label="Section">Content</Collapse>);
        expect(container.querySelector(".collapse-opened")).toBeInTheDocument();
    });

    it("open={false} removes collapse-opened class", async () => {
        const { container } = render(<Collapse label="Section" open={false}>Content</Collapse>);
        await act(async () => {});
        expect(container.querySelector(".collapse-opened")).not.toBeInTheDocument();
    });

    it("open={true} keeps collapse-opened class", async () => {
        const { container } = render(<Collapse label="Section" open={true}>Content</Collapse>);
        await act(async () => {});
        expect(container.querySelector(".collapse-opened")).toBeInTheDocument();
    });

    it("clicking the toggle button removes the collapse-opened class", async () => {
        const { container } = render(<Collapse label="Section">Content</Collapse>);
        expect(container.querySelector(".collapse-opened")).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button"));
        expect(container.querySelector(".collapse-opened")).not.toBeInTheDocument();
    });

    it("clicking the toggle button twice re-opens (adds class back)", async () => {
        const { container } = render(<Collapse label="Section">Content</Collapse>);
        await userEvent.click(screen.getByRole("button")); // collapse
        await userEvent.click(screen.getByRole("button")); // expand
        expect(container.querySelector(".collapse-opened")).toBeInTheDocument();
    });

    it("uses customRender function instead of default layout", () => {
        const customRender = vi.fn(() => <div data-testid="custom-render">Custom</div>);
        render(<Collapse label="Section" customRender={customRender}>Content</Collapse>);
        expect(screen.getByTestId("custom-render")).toBeInTheDocument();
        expect(customRender).toHaveBeenCalled();
    });

    it("applies custom className to outer wrapper", () => {
        const { container } = render(<Collapse label="Section" className="my-collapse">Content</Collapse>);
        expect(container.firstChild).toHaveClass("my-collapse");
    });
});
