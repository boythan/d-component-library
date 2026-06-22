import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderTable from "./HeaderTable";

describe("HeaderTable", () => {
    it("renders the label", () => {
        render(<HeaderTable label="Users" onChangeText={vi.fn()} />);
        expect(screen.getByText("Users")).toBeInTheDocument();
    });

    it("renders the search input", () => {
        render(<HeaderTable label="Users" onChangeText={vi.fn()} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders New button when onClickNew is provided", () => {
        render(<HeaderTable label="Users" onChangeText={vi.fn()} onClickNew={vi.fn()} />);
        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("calls onClickNew when New button is clicked", async () => {
        const handler = vi.fn();
        render(<HeaderTable label="Users" onChangeText={vi.fn()} onClickNew={handler} />);
        await userEvent.click(screen.getByText("New"));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("renders Import button when onClickImport is provided", () => {
        render(<HeaderTable label="Users" onChangeText={vi.fn()} onClickImport={vi.fn()} />);
        expect(screen.getByText("Import")).toBeInTheDocument();
    });

    it("renders Export button when onClickExport is provided", () => {
        render(<HeaderTable label="Users" onChangeText={vi.fn()} onClickExport={vi.fn()} />);
        expect(screen.getByText("Export")).toBeInTheDocument();
    });

    it("does not render New button when onClickNew is not provided", () => {
        render(<HeaderTable label="Users" onChangeText={vi.fn()} />);
        expect(screen.queryByText("New")).not.toBeInTheDocument();
    });
});
