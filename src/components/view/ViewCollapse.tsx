/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import classNames from "classnames";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

export interface ViewCollapseProps {
    label: string;
    children: any;
    className?: any;
    customLeftView?: any;
    defaultOpen?: any;
    extra?: boolean;
}
const { Panel } = Collapse;

const ViewCollapse = ({
    label = "Title",
    children,
    className,
    defaultOpen = 1,
    extra,
    customLeftView,
}: ViewCollapseProps) => {
    const classContainerName = classNames("card-container collapse-view-container", className);
    const customRightViewClass = classNames({
        "ant-collapse-header_custom-right-view-extra": !!extra,
        "ant-collapse-header_custom-right-view": !extra,
    });
    return (
        <Collapse
            className={classContainerName}
            defaultActiveKey={defaultOpen}
            expandIconPosition="right"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
            <Panel
                header={
                    <div>
                        {customLeftView && <div className={customRightViewClass}>{customLeftView}</div>}
                        <h5 className="collapse-view__header-title">{label}</h5>
                    </div>
                }
                key="1"
                extra={extra}
            >
                {children}
            </Panel>
        </Collapse>
    );
};

export default ViewCollapse;
