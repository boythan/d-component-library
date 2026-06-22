import { render, screen } from "@testing-library/react";
import ViewRowInterchange from "./ViewRowInterchange";

const data = { name: "Alice", age: 30 };
const keyList = [
    { id: "name" as const, label: "Full Name" },
    { id: "age" as const, label: "Age" },
];

describe("ViewRowInterchange", () => {
    it("renders row labels", () => {
        render(<ViewRowInterchange dataSource={data} keyList={keyList} />);
        expect(screen.getByText("Full Name")).toBeInTheDocument();
        expect(screen.getByText("Age")).toBeInTheDocument();
    });

    it("renders data values from dataSource", () => {
        render(<ViewRowInterchange dataSource={data} keyList={keyList} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("30")).toBeInTheDocument();
    });

    it("renders N/A when value is missing", () => {
        render(<ViewRowInterchange dataSource={{}} keyList={keyList} />);
        expect(screen.getAllByText("N/A")).toHaveLength(2);
    });

    it("renders custom content via renderContent", () => {
        const keys = [{ id: "name" as const, label: "Name", renderContent: () => <span>Custom</span> }];
        render(<ViewRowInterchange dataSource={data} keyList={keys} />);
        expect(screen.getByText("Custom")).toBeInTheDocument();
    });

    it("skips hidden rows", () => {
        const keys = [
            { id: "name" as const, label: "Name" },
            { id: "age" as const, label: "Age", hidden: true },
        ];
        render(<ViewRowInterchange dataSource={data} keyList={keys} />);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.queryByText("Age")).not.toBeInTheDocument();
    });
});
