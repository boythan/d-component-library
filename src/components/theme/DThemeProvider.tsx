import { ConfigProvider } from "antd";
import type { ConfigProviderProps } from "antd/es/config-provider";
import { StyleProvider } from "@ant-design/cssinjs";
import React, { CSSProperties } from "react";

export interface DThemeProviderProps {
    children: React.ReactNode;
    /** Same as ConfigProvider's theme prop. colorPrimary inside token will also set --color-primary for Tailwind. */
    theme?: ConfigProviderProps["theme"];
}

const DEFAULT_PRIMARY = "#de0d0c";

const DThemeProvider: React.FC<DThemeProviderProps> = ({ children, theme }) => {
    const colorPrimary = (theme as any)?.token?.colorPrimary ?? DEFAULT_PRIMARY;

    const cssVars = {
        "--color-primary": colorPrimary,
    } as CSSProperties;

    return (
        <StyleProvider layer>
            <ConfigProvider theme={theme}>
                <div style={cssVars}>{children}</div>
            </ConfigProvider>
        </StyleProvider>
    );
};

export default DThemeProvider;
