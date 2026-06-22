import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

const items = [
    { title: "Home", url: "/home" },
    { title: "Users", url: "/users" },
    { title: "John Doe", url: "/users/1" },
];

describe("Breadcrumb", () => {
    it("renders all breadcrumb item titles", () => {
        render(<Breadcrumb breadcrumb={items} />);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders non-last items as anchor links", () => {
        render(<Breadcrumb breadcrumb={items} />);
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/home");
        expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute("href", "/users");
    });

    it("does not render the last item as a link", () => {
        render(<Breadcrumb breadcrumb={items} />);
        expect(screen.queryByRole("link", { name: "John Doe" })).not.toBeInTheDocument();
    });

    it("renders a single-item breadcrumb without links", () => {
        render(<Breadcrumb breadcrumb={[{ title: "Home", url: "/" }]} />);
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
    });
});
