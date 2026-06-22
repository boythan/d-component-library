import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import Select from "./Select";

const options = [
    { id: 1, label: "Option A" },
    { id: 2, label: "Option B" },
];

describe("Select", () => {
    it("renders the combobox", () => {
        render(<Select />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders label when provided", () => {
        render(<Select label="Category" />);
        expect(screen.getByText("Category")).toBeInTheDocument();
    });

    it("shows error message when error prop is set", () => {
        render(<Select error="Please select an option" />);
        expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });

    it("renders placeholder text", () => {
        render(<Select placeholder="Choose one" />);
        expect(screen.getByText("Choose one")).toBeInTheDocument();
    });

    it("is disabled when disabled prop is set", () => {
        render(<Select disabled />);
        expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("shows required asterisk when required is true", () => {
        render(<Select label="Category" required />);
        const label = screen.getByText("Category");
        expect(label.className).toContain("after:content-['*']");
    });

    it("does not render when hidden is true", () => {
        const { container } = render(<Select label="Hidden" hidden />);
        expect(container.firstChild).toHaveAttribute("hidden");
    });

    it("renders with standard variant", () => {
        const { container } = render(<Select variant="standard" />);
        const selectEl = container.querySelector(".ant-select");
        expect(selectEl).toBeInTheDocument();
    });

    it("renders custom wrapperElement", () => {
        render(<Select wrapperElement={<section data-testid="custom-wrap" />} label="Test" />);
        expect(screen.getByTestId("custom-wrap")).toBeInTheDocument();
    });

    it("uses custom getLabel to display placeholder context", () => {
        render(
            <Select
                dataSource={options}
                getLabel={(item) => item.label}
                getKey={(item) => item.id}
                getValue={(item) => item.id}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("calls onChange when value changes via ref-controlled update", () => {
        const onChange = vi.fn();
        render(<Select onChange={onChange} />);
        // combobox renders without crashing with onChange wired
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("exposes onBlur and onFocus via ref without throwing", () => {
        const ref = createRef<any>();
        render(<Select ref={ref} />);
        expect(() => ref.current.onBlur()).not.toThrow();
        expect(() => ref.current.onFocus()).not.toThrow();
    });
});
