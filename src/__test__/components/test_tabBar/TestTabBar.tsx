import React, { useState } from "react";
import Badge from "../../../components/badge/Badge";
import TabBar from "../../../components/tab/TabBar";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";

export interface TestTabBarProps {
    [key: string]: any;
}

const TestTabBar: React.FC<TestTabBarProps> = ({ id }) => {
    const [selectedTab, setSelectedTab] = useState<any>();
    return (
        <div className="my-4">
            <TabBar
                dataSource={ATTRIBUTE_INPUT_TYPE}
                onChange={(tab) => setSelectedTab(tab)}
                value={selectedTab}
                // tabBarItemProps={(item, isActive) => {
                //     if (isActive) {
                //         return {
                //             className: "border-primary bg-white w-100",
                //             suffixElement: () => (
                //                 <Badge variant="index" index="+99" size="xx-large" classNameBadge="ml-3" />
                //             ),
                //             style: { borderTop: "3px solid red" },
                //         };
                //     }
                //     return {
                //         className: "bg-muted w-100",
                //     };
                // }}
                isScroll
            />
            {/* <TabBar
                dataSource={ATTRIBUTE_INPUT_TYPE}
                onChange={(tab) => setSelectedTab(tab)}
                value={selectedTab}
                variant="vertical"
                tabBarItemProps={(item, isActive) => {
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
            /> */}
        </div>
    );
};

export default TestTabBar;
