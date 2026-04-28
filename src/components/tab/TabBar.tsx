/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
// react
// third-party‚
import ClassNames from "classnames";
import _ from "lodash";
import React from "react";
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
    getItemProps?: (props: {
        item: ITabItem;
        isActive?: boolean;
        index?: any;
        className?: string;
        size?: ButtonProps["size"];
    }) => React.HTMLAttributes<HTMLDivElement> & ButtonProps; // remember to return min-width for tab item in order for scroll in horizontal mode to work
    value?: ITabItem | null;
    className?: string;
    classNameItem?: string;
    variant?: "horizontal" | "vertical";
    activeIndicator?: "top" | "bottom" | "left" | "right" | "none" | "fill";
    minWidthItem?: string | number;
    isScroll?: boolean;
    hideScrollBar?: boolean;
}

const TabBar: React.FC<TabBarProps<ITabItem>> = ({
    dataSource = [],
    value,
    className,
    classNameItem,
    variant = "horizontal",
    activeIndicator = "bottom",
    onChange,
    getLabel,
    getItemProps,
    isScroll = false,
    minWidthItem = 200,
    hideScrollBar = true,
}) => {
    const wrapperClass = ClassNames(
        "bg-transparent w-full",
        {
            flex: variant === "horizontal",
            "flex-col": variant === "vertical",
            "flex-wrap": !isScroll && variant === "horizontal",
            "overflow-x-auto scrollbar-hide": isScroll && hideScrollBar && variant === "horizontal",
            "overflow-x-auto": isScroll && !hideScrollBar && variant === "horizontal",
        },
        className,
    );
    const activateScroll = isScroll && variant === "horizontal";
    const activeIndex = _.findIndex(dataSource, (item) => item?.id === value?.id);

    return (
        <div className={wrapperClass}>
            {dataSource.map((tabItem, index) => {
                const isSelect = index === activeIndex;
                const leftActive = index === activeIndex - 1;
                const rightActive = index === activeIndex + 1 && activeIndex >= 0;

                // Base style for all items
                const baseItemClass =
                    "font-normal border-[0.5px] border-[#ececec] text-sm px-4 py-2 cursor-pointer transition-colors";

                // Specific logic for horizontal/vertical and active/inactive states
                const itemClass = ClassNames(
                    baseItemClass,
                    {
                        // Active State (Horizontal)
                        "font-semibold text-primary bg-white border-0 border-t-[0.5px] border-t-[#ececec] first:border-l-[0.5px] first:border-l-[#ececec] last:border-r-[0.5px] last:border-r-[#ececec]":
                            isSelect && variant === "horizontal",

                        // Active State (Vertical)
                        "font-semibold text-primary bg-white border-0": isSelect && variant === "vertical",

                        // Inactive State
                        "bg-muted text-main hover:bg-white hover:text-main": !isSelect,

                        // Indicators
                        "border-b-[3px] border-b-primary": isSelect && activeIndicator === "bottom",
                        "!border-t-[3px] !border-t-primary": isSelect && activeIndicator === "top", // ! important to override border-0 if needed logic
                        "border-l-[3px] border-l-primary": isSelect && activeIndicator === "left",
                        "border-r-[3px] border-r-primary": isSelect && activeIndicator === "right",
                        "bg-primary text-white hover:text-white": isSelect && activeIndicator === "fill",

                        // Horizontal Specifics (borders for adjacent active items)
                        "border-b-0": variant === "vertical" && isSelect, // Remove bottom border for active vertical
                        "w-full py-4": variant === "vertical", // Vertical sizing
                    },
                    classNameItem,
                );

                let label = tabItem?.label ?? "N/A";
                const icon = tabItem?.iconName ?? undefined;

                if (getLabel) {
                    label = getLabel(tabItem);
                }
                let buttonProps: any = {};
                if (getItemProps) {
                    buttonProps = getItemProps({ item: tabItem, isActive: isSelect, index, className: itemClass });
                }
                return (
                    <Button
                        className={itemClass}
                        onClick={() => onChange && onChange(tabItem)}
                        key={index}
                        variant="trans" // Keep variant trans as it likely just removes default button styles
                        iconName={icon}
                        style={{ minWidth: activateScroll ? `${minWidthItem}px` : undefined }}
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
