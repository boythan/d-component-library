import React from "react";
import { TabBarProps, ITabItem } from "../../../components/tab/TabBar";
interface NewTabBarItemsProps extends ITabItem {
    name?: string;
    subTitle?: string;
    iconName?: string;
}
export interface TestTabBarProps extends Omit<TabBarProps<NewTabBarItemsProps>, "dataSource"> {
    [key: string]: any;
}
declare const TestTabBar: React.FC<TestTabBarProps>;
export default TestTabBar;
