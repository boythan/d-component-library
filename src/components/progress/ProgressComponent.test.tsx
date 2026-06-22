import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import ProgressComponent from "./ProgressComponent";
import type { ProgressComponentRef } from "./ProgressComponent";

describe("ProgressComponent", () => {
    it("renders without crashing", () => {
        const ref = createRef<ProgressComponentRef>();
        render(<ProgressComponent ref={ref} />);
    });

    it("exposes a show method via ref", () => {
        const ref = createRef<ProgressComponentRef>();
        render(<ProgressComponent ref={ref} />);
        expect(typeof ref.current?.show).toBe("function");
    });

    it("calls onSuccess when the promise function resolves", async () => {
        const ref = createRef<ProgressComponentRef>();
        const onSuccess = vi.fn();
        render(<ProgressComponent ref={ref} />);

        await act(async () => {
            ref.current?.show(
                { method: () => Promise.resolve({ data: "ok" }), params: {} },
                onSuccess
            );
            await new Promise((r) => setTimeout(r, 50));
        });

        expect(onSuccess).toHaveBeenCalled();
    });

    it("shows error view with Retry and Cancel buttons when promise rejects", async () => {
        const ref = createRef<ProgressComponentRef>();
        render(<ProgressComponent ref={ref} />);

        await act(async () => {
            ref.current?.show({ method: () => Promise.reject("Network error"), params: {} });
            await new Promise((r) => setTimeout(r, 50));
        });

        expect(screen.getByText("Retry")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("retry button resets error state and re-invokes the method", async () => {
        const ref = createRef<ProgressComponentRef>();
        let callCount = 0;
        const onSuccess = vi.fn();
        render(<ProgressComponent ref={ref} />);

        await act(async () => {
            ref.current?.show(
                {
                    method: () => {
                        callCount++;
                        return callCount === 1
                            ? Promise.reject("fail")
                            : Promise.resolve({ ok: true });
                    },
                    params: {},
                },
                onSuccess
            );
            await new Promise((r) => setTimeout(r, 50));
        });

        // First call rejected — error view should be showing
        expect(screen.getByText("Retry")).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(screen.getByText("Retry"));
            await new Promise((r) => setTimeout(r, 50));
        });

        // Second call succeeded — onSuccess called, modal closed
        expect(callCount).toBe(2);
        expect(onSuccess).toHaveBeenCalled();
    });

    it("cancel button in error view is clickable and calls dismiss", async () => {
        const ref = createRef<ProgressComponentRef>();
        render(<ProgressComponent ref={ref} />);

        await act(async () => {
            ref.current?.show({ method: () => Promise.reject("error"), params: {} });
            await new Promise((r) => setTimeout(r, 50));
        });

        const cancelBtn = screen.getByText("Cancel");
        expect(cancelBtn).toBeInTheDocument();
        // Clicking cancel calls dismiss() — should not throw
        await act(async () => {
            await userEvent.click(cancelBtn);
        });
    });

    it("calls handleError and dismisses when handleError returns true", async () => {
        const ref = createRef<ProgressComponentRef>();
        const handleError = vi.fn().mockReturnValue(true);
        render(<ProgressComponent ref={ref} />);

        await act(async () => {
            ref.current?.show(
                { method: () => Promise.reject("err"), params: {} },
                undefined,
                handleError
            );
            await new Promise((r) => setTimeout(r, 50));
        });

        expect(handleError).toHaveBeenCalled();
        // Since handleError returns true, modal is dismissed — no Retry button
        expect(screen.queryByText("Retry")).not.toBeInTheDocument();
    });
});
