import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PagingView from "./PagingView";
import AwesomeListMode from "../shared/Mode";

describe("PagingView", () => {
    it("renders an empty div in HIDDEN mode", () => {
        const { container } = render(<PagingView mode={AwesomeListMode.HIDDEN} />);
        expect(container.firstChild?.textContent).toBe("");
    });

    it("renders error message in ERROR mode", () => {
        render(<PagingView mode={AwesomeListMode.ERROR} />);
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    it("calls onClickRetry when error area is clicked", async () => {
        const handler = vi.fn();
        render(<PagingView mode={AwesomeListMode.ERROR} onClickRetry={handler} />);
        await userEvent.click(screen.getByText(/error/i));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders loading indicator in PROGRESS mode", () => {
        render(<PagingView mode={AwesomeListMode.PROGRESS} />);
        expect(screen.getByRole("status")).toBeInTheDocument();
    });
});
