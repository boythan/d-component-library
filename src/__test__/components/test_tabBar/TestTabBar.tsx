import React, { useState } from "react";
import Badge from "../../../components/elements/badge/Badge";
import TabBar, { TabBarProps, ITabItem } from "../../../components/tab/TabBar";
import { ATTRIBUTE_INPUT_TYPE, SELECT_DATA } from "../../data/TestConstant";

interface NewTabBarItemsProps extends ITabItem {
    name?: string;
    subTitle?: string;
    iconName?: string;
}

export interface TestTabBarProps extends Omit<TabBarProps<NewTabBarItemsProps>, "dataSource"> {
    [key: string]: any;
}

const TestTabBar: React.FC<TestTabBarProps> = ({ id }) => {
    const [selectedTab, setSelectedTab] = useState<any>();
    return (
        <div className="my-4">
            <TabBar
                dataSource={SELECT_DATA}
                onChange={(tab) => setSelectedTab(tab)}
                value={selectedTab}
                getItemProps={({ item, isActive }) => {
                    if (isActive) {
                        return {
                            className: "border-primary bg-white",
                            suffixElement: () => (
                                <Badge variant="index" index="+99" size="xx-large" classNameBadge="ml-3" />
                            ),
                            style: { borderTop: "3px solid red" },
                        };
                    }
                    return {
                        className: "bg-muted",
                    };
                }}
                // isScroll
            />
            <TabBar
                dataSource={ATTRIBUTE_INPUT_TYPE}
                onChange={(tab) => setSelectedTab(tab)}
                value={selectedTab}
                variant="vertical"
                getItemProps={({ item, isActive }) => {
                    if (isActive) {
                        return {
                            className: "border-primary bg-white w-100 p-3",
                            suffixElement: () => (
                                <Badge variant="index" index="+99" size="xx-large" classNameBadge="ml-3" />
                            ),
                            style: { borderTop: "3px solid red" },
                        };
                    }
                    return {
                        // className: "bg-muted",
                    };
                }}
            />
        </div>
    );
};

export default TestTabBar;
