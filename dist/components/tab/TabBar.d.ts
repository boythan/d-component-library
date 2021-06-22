import React from "react";
import { ButtonProps } from "../button/Button";
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
    }) => React.HTMLAttributes<HTMLDivElement> & ButtonProps;
    value?: ITabItem | null;
    className?: string;
    classNameItem?: string;
    variant?: "horizontal" | "vertical";
    isScroll?: boolean;
    minWidthItem?: string | number;
}
declare const TabBar: React.FC<TabBarProps<ITabItem>>;
export default TabBar;
