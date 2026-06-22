import { render, act } from "@testing-library/react";
import { createRef } from "react";
import DialogComponent from "./DialogComponent";

describe("DialogComponent", () => {
    it("renders without crashing", () => {
        const ref = createRef<any>();
        const { container } = render(<DialogComponent ref={ref} />);
        expect(container).toBeInTheDocument();
    });

    it("exposes showConfirm via ref", () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        expect(typeof ref.current?.showConfirm).toBe("function");
    });

    it("exposes showWarning via ref", () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        expect(typeof ref.current?.showWarning).toBe("function");
    });

    it("exposes showInfo via ref", () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        expect(typeof ref.current?.showInfo).toBe("function");
    });

    it("exposes showError via ref", () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        expect(typeof ref.current?.showError).toBe("function");
    });

    it("showConfirm executes without throwing", async () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        await act(async () => {
            ref.current.showConfirm("Confirm Title", "Are you sure?", vi.fn(), vi.fn());
        });
    });

    it("showWarning executes without throwing", async () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        await act(async () => {
            ref.current.showWarning("Warning Title", "This is a warning", vi.fn());
        });
    });

    it("showInfo executes without throwing", async () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        await act(async () => {
            ref.current.showInfo("Info Title", "Some information", vi.fn());
        });
    });

    it("showError executes without throwing", async () => {
        const ref = createRef<any>();
        render(<DialogComponent ref={ref} />);
        await act(async () => {
            ref.current.showError("Error Title", "Something went wrong", vi.fn());
        });
    });
});
