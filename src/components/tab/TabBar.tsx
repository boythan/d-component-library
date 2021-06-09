/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

export interface TabBarProps<T extends ITabItem> {
    dataSource: Array<T>;
    onChange?: (item: ITabItem) => void;
    getLabel?: (item: ITabItem) => any;
    value?: ITabItem | null;
    className?: string;
    classNameItem?: string;
    variant?: "horizontal" | "vertical";
    tabBarItemProps?: (item: ITabItem, active?: boolean) => React.HTMLAttributes<HTMLDivElement> & ButtonProps; // remember to return min-width for tab item in order for scroll in horizontal mode to work
    isScroll?: boolean;
    minWidthItem?: string;
}

const TabBar: React.FC<TabBarProps<ITabItem>> = ({
    dataSource = [],
    value,
    onChange,
    className,
    classNameItem,
    getLabel,
    variant = "horizontal",
    tabBarItemProps,
    isScroll = false,
    minWidthItem = "200px",
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
                const itemClass = ClassNames(
                    "d-tab-bar__item text-small",
                    {
                        "d-tab-bar__item-active": isSelect,
                    },
                    classNameItem
                );
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
                        iconName={icon}
                        style={{ minWidth: activateScroll ? minWidthItem : undefined }}
                        {...buttonProps}
                    >
                        {label}
                    </Button>
                );
            })}
        </div>
    );
};

export default TabBar;
