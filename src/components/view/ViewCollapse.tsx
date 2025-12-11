/* eslint-disable react/jsx-wrap-multilines */
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps } from "antd";
import classNames from "classnames";
import React from "react";

export interface ViewCollapseProps {
    label: any;
    children: any;
    className?: any;
    defaultOpen?: any;
    extra?: boolean;
    required?: boolean;
    style?: React.CSSProperties;
    styles?: CollapseProps["styles"];
    classNames?: CollapseProps["classNames"];
}
const { Panel } = Collapse;

const ViewCollapse = ({
    label = "Title",
    children,
    className,
    defaultOpen = 1,
    extra,
    required,
    style,
    styles,
    classNames: antdClassNames,
}: ViewCollapseProps) => {
    const classContainerName = classNames("[&_.ant-collapse-header]:!items-center", className);
    const labelClass = classNames("text-sm font-medium m-0", {
        "after:content-['*'] after:text-red-500 after:ml-1": required,
    });
    return (
        <Collapse
            className={classContainerName}
            defaultActiveKey={defaultOpen}
            expandIconPlacement="end"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={style}
            styles={styles}
            classNames={antdClassNames}
        >
            <Panel header={<h5 className={labelClass}>{label}</h5>} key="1" extra={extra}>
                {children}
            </Panel>
        </Collapse>
    );
};

export default ViewCollapse;
