import { render, screen } from "@testing-library/react";
import ViewTimeline from "./ViewTimeline";

const items = [
    { label: "Step 1", detail: "First step details" },
    { label: "Step 2", detail: "Second step details" },
];

describe("ViewTimeline", () => {
    it("renders labels from dataSource using default getLabel", () => {
        render(<ViewTimeline dataSource={items} />);
        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("renders content from getContent", () => {
        render(<ViewTimeline dataSource={items} getContent={(item) => item.detail} />);
        expect(screen.getByText("First step details")).toBeInTheDocument();
    });

    it("uses custom getLabel function", () => {
        render(<ViewTimeline dataSource={items} getLabel={(item) => `Event: ${item.label}`} />);
        expect(screen.getByText("Event: Step 1")).toBeInTheDocument();
    });

    it("renders empty dataSource without crashing", () => {
        render(<ViewTimeline dataSource={[]} />);
    });

    it("renders custom view via customView prop", () => {
        render(<ViewTimeline dataSource={items} customView={(item) => <span>{`Custom: ${item.label}`}</span>} />);
        expect(screen.getByText("Custom: Step 1")).toBeInTheDocument();
    });
});
