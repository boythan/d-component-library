import { render, screen } from "@testing-library/react";
import EmptyView from "./EmptyView";
import Mode from "./Mode";

describe("EmptyView", () => {
    it("renders nothing when mode is HIDDEN", () => {
        const { container } = render(<EmptyView mode={Mode.HIDDEN} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders default empty text in EMPTY mode", () => {
        render(<EmptyView mode={Mode.EMPTY} />);
        expect(screen.getByText("No result")).toBeInTheDocument();
    });

    it("renders custom emptyText in EMPTY mode", () => {
        render(<EmptyView mode={Mode.EMPTY} emptyText="Nothing here" />);
        expect(screen.getByText("Nothing here")).toBeInTheDocument();
    });

    it("renders custom renderEmptyView function in EMPTY mode", () => {
        render(<EmptyView mode={Mode.EMPTY} renderEmptyView={() => <span>Custom empty</span>} />);
        expect(screen.getByText("Custom empty")).toBeInTheDocument();
    });

    it("renders Loading in PROGRESS mode", () => {
        render(<EmptyView mode={Mode.PROGRESS} />);
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders error text in ERROR mode", () => {
        render(<EmptyView mode={Mode.ERROR} />);
        expect(screen.getByText("No result")).toBeInTheDocument();
    });

    it("renders filterEmptyText in FILTER_EMPTY mode", () => {
        render(<EmptyView mode={Mode.FILTER_EMPTY} filterEmptyText="No matches" />);
        expect(screen.getByText("No matches")).toBeInTheDocument();
    });
});
