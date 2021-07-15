/* eslint-disable react/jsx-wrap-multilines */
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import classNames from "classnames";
import React from "react";

export interface ViewCollapseProps {
    label: any;
    children: any;
    className?: any;
    defaultOpen?: any;
    extra?: boolean;
}
const { Panel } = Collapse;

const ViewCollapse = ({ label = "Title", children, className, defaultOpen = 1, extra }: ViewCollapseProps) => {
    const classContainerName = classNames("card-container d-collapse-view__container", className);

    return (
        <Collapse
            className={classContainerName}
            defaultActiveKey={defaultOpen}
            expandIconPosition="right"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
            <Panel header={<h5 className="d-collapse-view__header-title">{label}</h5>} key="1" extra={extra}>
                {children}
            </Panel>
        </Collapse>
    );
};

export default ViewCollapse;
