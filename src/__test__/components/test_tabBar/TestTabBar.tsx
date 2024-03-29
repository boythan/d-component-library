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
        <div className="my-4 bg-muted">
            <TabBar
                dataSource={SELECT_DATA}
                onChange={(tab) => setSelectedTab(tab)}
                value={selectedTab}
                activeIndicator="bottom"
                getItemProps={({ item, isActive, className }) => {
                    if (isActive) {
                        return {
                            // className: "border-primary bg-white",
                            suffixElement: () => (
                                <Badge variant="index" index="+99" size="xx-large" classNameBadge="ml-3" />
                            ),
                            // style: { borderTop: "3px solid red" },
                        };
                    }
                    return {
                        className: `${className} bg`,
                    };
                }}
                isScroll
            />
            <div style={{ height: "200px", width: "100%", backgroundColor: "gainsboro" }} />
            {/* <TabBar
                dataSource={ATTRIBUTE_INPUT_TYPE}
                onChange={(tab) => setSelectedTab(tab)}
                value={selectedTab}
                variant="vertical"
                activeIndicator="fill"
            /> */}
        </div>
    );
};

export default TestTabBar;
