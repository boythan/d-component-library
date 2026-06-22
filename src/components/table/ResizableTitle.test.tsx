import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResizableTitle from "./ResizableTitle";

describe("ResizableTitle", () => {
    it("renders a plain th when no width is provided", () => {
        const { container } = render(
            <table>
                <thead>
                    <tr>
                        <ResizableTitle>Header</ResizableTitle>
                    </tr>
                </thead>
            </table>
        );
        expect(container.querySelector("th")).toBeInTheDocument();
        expect(screen.getByText("Header")).toBeInTheDocument();
    });

    it("renders a th with Resizable wrapper when width is provided", () => {
        const { container } = render(
            <table>
                <thead>
                    <tr>
                        <ResizableTitle width={150} onResize={vi.fn()}>
                            Resizable Header
                        </ResizableTitle>
                    </tr>
                </thead>
            </table>
        );
        expect(container.querySelector("th")).toBeInTheDocument();
        expect(screen.getByText("Resizable Header")).toBeInTheDocument();
    });

    it("applies inline width style when width is provided", () => {
        const { container } = render(
            <table>
                <thead>
                    <tr>
                        <ResizableTitle width={200} onResize={vi.fn()}>
                            Header
                        </ResizableTitle>
                    </tr>
                </thead>
            </table>
        );
        const th = container.querySelector("th");
        expect(th?.style.width).toBe("200px");
    });

    it("resize handle click does not propagate to parent", async () => {
        const parentClick = vi.fn();
        const { container } = render(
            <table>
                <thead>
                    <tr onClick={parentClick}>
                        <ResizableTitle width={200} onResize={vi.fn()}>
                            Header
                        </ResizableTitle>
                    </tr>
                </thead>
            </table>
        );
        const handle = container.querySelector(".react-resizable-handle");
        if (handle) {
            await userEvent.click(handle as HTMLElement);
            expect(parentClick).not.toHaveBeenCalled();
        }
    });
});
