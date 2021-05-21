// react
import React from "react";
// third-party
import ClassNames from "classnames";
// application
import Button from "../button/Button";
// data stubs
import "./VerticalTabView.scss";

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
}

const TabBar: React.FC<TabBarProps> = ({
    dataSource = [],
    value,
    onChange,
    className,
    classNameTabItem,
    getLabel,
    variant = "horizontal",
}) => {
    const wrapperClass = ClassNames(
        `d-tab-bar d-tab-bar__${variant}`,
        { "d-flex flex-wrap": variant === "horizontal" },
        className
    );
    return (
        <div className={wrapperClass}>
            {dataSource.map((tabItem, index) => {
                const isSelect = value?.id === tabItem?.id;
                const itemClass = ClassNames(classNameTabItem, "d-tab-bar__item text-small", {
                    // "d-tab-bar__item-active text-primary": isSelect,
                    "d-tab-bar__item-active": isSelect,
                    "text-gray": !isSelect,
                });
                let label = tabItem?.label ?? "N/A";
                const icon = tabItem?.iconName ?? undefined;

                if (getLabel) {
                    label = getLabel(tabItem);
                }
                return (
                    <Button
                        className={itemClass}
                        onClick={() => onChange && onChange(tabItem)}
                        key={index}
                        variant="trans"
                        content={label as any}
                        iconName={icon}
                    />
                );
            })}
        </div>
    );
};

export default TabBar;
