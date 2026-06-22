import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ViewTextarea from "./ViewTextarea";

const SHORT = "Short text";
const LONG = "A".repeat(201);

describe("ViewTextarea", () => {
    it("renders short text in full", () => {
        render(<ViewTextarea>{SHORT}</ViewTextarea>);
        expect(screen.getByText(SHORT)).toBeInTheDocument();
    });

    it("truncates long text and shows ellipsis", () => {
        render(<ViewTextarea>{LONG}</ViewTextarea>);
        expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("does not show ellipsis for short text", () => {
        render(<ViewTextarea>{SHORT}</ViewTextarea>);
        expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("shows show-more toggle for long text", () => {
        render(<ViewTextarea showMoreText="Show More">{LONG}</ViewTextarea>);
        expect(screen.getByText("Show More")).toBeInTheDocument();
    });

    it("expands content when show-more is clicked", async () => {
        render(<ViewTextarea showMoreText="Show More" showLessText="Show Less">{LONG}</ViewTextarea>);
        await userEvent.click(screen.getByText("Show More"));
        expect(screen.getByText("Show Less")).toBeInTheDocument();
    });

    it("collapses content when show-less is clicked", async () => {
        render(<ViewTextarea showMoreText="Show More" showLessText="Show Less">{LONG}</ViewTextarea>);
        await userEvent.click(screen.getByText("Show More"));
        await userEvent.click(screen.getByText("Show Less"));
        expect(screen.getByText("Show More")).toBeInTheDocument();
    });

    it("respects custom limitedLength", () => {
        const text = "A".repeat(51);
        render(<ViewTextarea limitedLength={50} showMoreText="Show More">{text}</ViewTextarea>);
        expect(screen.getByText("Show More")).toBeInTheDocument();
    });
});
