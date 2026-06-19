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
    const colorBorder = (theme as any)?.token?.colorBorder ?? "#ECECEC";

    const cssVars = {
        "--color-primary": colorPrimary,
        "--default-border-color": colorBorder,
    } as CSSProperties;

    const mergedTheme: ConfigProviderProps["theme"] = {
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
        <StyleProvider layer>
            <ConfigProvider theme={mergedTheme}>
                <div style={cssVars}>{children}</div>
            </ConfigProvider>
        </StyleProvider>
    );
};

export default DThemeProvider;
