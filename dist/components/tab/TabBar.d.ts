import React from "react";
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
declare const TabBar: React.FC<TabBarProps>;
export default TabBar;
