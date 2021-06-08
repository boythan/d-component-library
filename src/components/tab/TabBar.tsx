/* eslint-disable max-len */
// react
import React from "react";
// third-party
import ClassNames from "classnames";
// application
import Button, { ButtonProps } from "../button/Button";
// data stubs

export interface ITabItem {
    id: string | number;
    label?: string | number;
    iconName?: string;
    [key: string]: any;
}

export interface TabBarProps {
    dataSource: Array<ITabItem>;
    onChange?: (item: ITabItem) => void;
    getLabel?: (item: ITabItem) => any;
    value?: ITabItem | null;
    className?: string;
    classNameTabItem?: string;
    variant?: "horizontal" | "vertical";
    tabBarItemProps?: (item: ITabItem, active?: boolean) => React.HTMLAttributes<HTMLDivElement> & ButtonProps; // remember to return min-width for tab item in order for scroll in horizontal mode to work
    isScroll?: boolean;
    minWidthTabItem?: string;
}

const TabBar: React.FC<TabBarProps> = ({
    dataSource = [],
    value,
    onChange,
    className,
    classNameTabItem,
    getLabel,
    variant = "horizontal",
    tabBarItemProps,
    isScroll = false,
    minWidthTabItem = "200px",
}) => {
    const wrapperClass = ClassNames(
        `d-tab-bar d-tab-bar__${variant}`,
        {
            "d-flex ": variant === "horizontal",
            "flex-wrap": !isScroll && variant === "horizontal",
        },
        className
    );
    const activateScroll = isScroll && variant === "horizontal";
    return (
        <div className={wrapperClass} style={{ overflowX: activateScroll ? "scroll" : undefined }}>
            {dataSource.map((tabItem, index) => {
                const isSelect = value?.id === tabItem?.id;
                const itemClass = ClassNames(classNameTabItem, "d-tab-bar__item text-small", {
                    "d-tab-bar__item-active": isSelect,
                });
                let label = tabItem?.label ?? "N/A";
                const icon = tabItem?.iconName ?? undefined;

                if (getLabel) {
                    label = getLabel(tabItem);
                }
                let buttonProps: any = {};
                if (tabBarItemProps) {
                    buttonProps = tabBarItemProps(tabItem, isSelect);
                }
                return (
                    <Button
                        className={itemClass}
                        onClick={() => onChange && onChange(tabItem)}
                        key={index}
                        variant="trans"
                        content={label as any}
                        iconName={icon}
                        style={{ minWidth: activateScroll ? minWidthTabItem : undefined }}
                        {...buttonProps}
                    />
                );
            })}
        </div>
    );
};

export default TabBar;
