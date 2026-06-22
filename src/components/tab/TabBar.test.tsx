import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TabBar from "./TabBar";

const tabs = [
    { id: 1, label: "Overview" },
    { id: 2, label: "Details" },
    { id: 3, label: "Settings" },
];

describe("TabBar", () => {
    it("renders all tab labels", () => {
        render(<TabBar dataSource={tabs} />);
        expect(screen.getByText("Overview")).toBeInTheDocument();
        expect(screen.getByText("Details")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("calls onChange with the clicked tab item", async () => {
        const handler = vi.fn();
        render(<TabBar dataSource={tabs} onChange={handler} />);
        await userEvent.click(screen.getByText("Details"));
        expect(handler).toHaveBeenCalledWith(tabs[1]);
    });

    it("renders empty without crashing when dataSource is empty", () => {
        render(<TabBar dataSource={[]} />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("uses getLabel function when provided", () => {
        render(<TabBar dataSource={tabs} getLabel={(item) => `Tab: ${item.label}`} />);
        expect(screen.getByText("Tab: Overview")).toBeInTheDocument();
    });

    it("renders in vertical variant", () => {
        const { container } = render(<TabBar dataSource={tabs} variant="vertical" />);
        expect(container.firstChild).toHaveClass("flex-col");
    });
});
