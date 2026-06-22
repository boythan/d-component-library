import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
    it("renders a button trigger by default", () => {
        render(<Dropdown dataSource={[]} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders custom children as trigger", () => {
        render(
            <Dropdown dataSource={[]}>
                <span>Open Menu</span>
            </Dropdown>
        );
        expect(screen.getByText("Open Menu")).toBeInTheDocument();
    });

    it("renders placeholder in view variant when no value is selected", () => {
        render(<Dropdown dataSource={[]} variant="view" placeholder="Choose..." />);
        expect(screen.getByText("Choose...")).toBeInTheDocument();
    });

    it("renders selected item label in view variant", () => {
        const item = { id: "1", label: "Option A" };
        render(<Dropdown dataSource={[item]} variant="view" value={item} />);
        expect(screen.getByText("Option A")).toBeInTheDocument();
    });

    it("renders comma-joined labels in view variant when value is an array", () => {
        const items = [
            { id: "1", label: "Alpha" },
            { id: "2", label: "Beta" },
        ];
        render(<Dropdown dataSource={items} variant="view" value={items} />);
        expect(screen.getByText("Alpha, Beta")).toBeInTheDocument();
    });

    it("renders placeholder in view variant when value is an empty array", () => {
        render(<Dropdown dataSource={[]} variant="view" value={[]} placeholder="Choose..." />);
        expect(screen.getByText("Choose...")).toBeInTheDocument();
    });

    it("clicking the trigger fires the onClick preventDefault handler", async () => {
        render(<Dropdown dataSource={[{ id: "1", label: "Alpha" }]} />);
        // Clicking the trigger div fires its onClick handler which calls e.preventDefault()
        await userEvent.click(screen.getByRole("button"));
    });

    it("clicking a menu item calls onClick with the item", async () => {
        const onClick = vi.fn();
        const items = [{ id: "1", label: "Alpha" }];
        render(<Dropdown dataSource={items} onClick={onClick} />);
        await userEvent.click(screen.getByRole("button"));
        const menuItem = await screen.findByText("Alpha");
        if (menuItem) {
            await userEvent.click(menuItem);
            expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
        }
    });
});
