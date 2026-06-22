import { render, screen } from "@testing-library/react";
import DThemeProvider from "./DThemeProvider";

describe("DThemeProvider", () => {
    it("renders children", () => {
        render(
            <DThemeProvider>
                <span>App content</span>
            </DThemeProvider>
        );
        expect(screen.getByText("App content")).toBeInTheDocument();
    });

    it("renders without custom theme", () => {
        render(
            <DThemeProvider>
                <div data-testid="child" />
            </DThemeProvider>
        );
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("renders with a custom theme token", () => {
        render(
            <DThemeProvider theme={{ token: { colorPrimary: "#123456" } }}>
                <span>Themed</span>
            </DThemeProvider>
        );
        expect(screen.getByText("Themed")).toBeInTheDocument();
    });
});
