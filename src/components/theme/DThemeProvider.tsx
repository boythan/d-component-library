import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import React, { CSSProperties, createContext, useContext } from "react";

export interface DThemeProviderProps {
    children: React.ReactNode;
    /** Same as ConfigProvider's theme prop. colorPrimary inside token will also set --color-primary for Tailwind. */
    theme?: ThemeConfig;
}

/** Default used by DThemeProvider when no colorPrimary is supplied via `theme` prop. */
const DEFAULT_PRIMARY = "#2196f3";
export interface DThemeContextValue {
    colorPrimary: string;
}

export const DThemeContext = createContext<DThemeContextValue>({
    colorPrimary: DEFAULT_PRIMARY,
});

/** Hook to read the current theme's primary color. */
export const useDTheme = (): DThemeContextValue => useContext(DThemeContext);

const DThemeProvider: React.FC<DThemeProviderProps> = ({ children, theme }) => {
    const colorPrimary = theme?.token?.colorPrimary ?? DEFAULT_PRIMARY;
    const colorBorder = theme?.token?.colorBorder ?? "#ECECEC";

    const cssVars = {
        "--color-primary": colorPrimary,
        "--default-border-color": colorBorder,
    } as CSSProperties;

    const mergedTheme: ThemeConfig = {
        ...theme,
        token: {
            colorBorder: "#ECECEC",
            colorBorderSecondary: "#ECECEC",
            ...theme?.token,
        },
        components: {
            Modal: { contentPadding: 0 } as any,
            ...theme?.components,
        },
    };

    return (
        <DThemeContext.Provider value={{ colorPrimary }}>
            <StyleProvider layer>
                <ConfigProvider theme={mergedTheme}>
                    <div style={cssVars}>{children}</div>
                </ConfigProvider>
            </StyleProvider>
        </DThemeContext.Provider>
    );
};

export default DThemeProvider;
