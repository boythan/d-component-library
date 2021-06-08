import React from "react";
import { ButtonProps } from "../button/Button";
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
    tabBarItemProps?: (item: ITabItem, active?: boolean) => React.HTMLAttributes<HTMLDivElement> & ButtonProps;
    isScroll?: boolean;
    minWidthTabItem?: string;
}
declare const TabBar: React.FC<TabBarProps>;
export default TabBar;
