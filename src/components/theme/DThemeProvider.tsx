import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import React, { CSSProperties, createContext, useContext } from "react";

export type DShape = "flat" | "rounded" | "pilled";

export interface DThemeProviderProps {
    children: React.ReactNode;
    /** Same as ConfigProvider's theme prop. colorPrimary inside token will also set --color-primary for Tailwind. */
    theme?: ThemeConfig;
    /** Default shape applied to shape-aware components (e.g. Button) unless overridden via their own `shape` prop. */
    shape?: DShape;
}

/** Default used by DThemeProvider when no colorPrimary is supplied via `theme` prop. */
const DEFAULT_PRIMARY = "#2196f3";
/** Default used by DThemeProvider when no shape is supplied via `shape` prop. */
const DEFAULT_SHAPE: DShape = "rounded";
export interface DThemeContextValue {
    colorPrimary: string;
    shape: DShape;
}

export const DThemeContext = createContext<DThemeContextValue>({
    colorPrimary: DEFAULT_PRIMARY,
    shape: DEFAULT_SHAPE,
});

/** Hook to read the current theme's primary color. */
export const useDTheme = (): DThemeContextValue => useContext(DThemeContext);

const DThemeProvider: React.FC<DThemeProviderProps> = ({ children, theme, shape = DEFAULT_SHAPE }) => {
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
        // No global Modal override: d-react-components' Modal removes its own padding per instance
        // (see Modal.tsx), so plain antd Modals in the app keep antd's default padding.
        components: {
            ...theme?.components,
        },
    };

    return (
        <DThemeContext.Provider value={{ colorPrimary, shape }}>
            <StyleProvider layer>
                <ConfigProvider theme={mergedTheme}>
                    <div style={cssVars}>{children}</div>
                </ConfigProvider>
            </StyleProvider>
        </DThemeContext.Provider>
    );
};

export default DThemeProvider;
