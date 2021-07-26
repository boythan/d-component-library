import classNames from "classnames";
import React, { CSSProperties } from "react";
import ColorUtils from "../../utils/ColorUtils";

export interface ViewLabelStatusProps {
    color?: string;
    content: string;
    className?: string;
    style?: CSSProperties;
    listStatus?: any[];
    status?: any;
    getValue?: (item: any) => any;
}
const ViewLabelStatus = ({
    color = "#000000",
    content,
    className = "",
    style = {},
    listStatus,
    status,
    getValue = (item) => item?.id,
}: ViewLabelStatusProps) => {
    const classNameContainer = classNames("d-view-label-status", className);
    let colorStatus = "#000000";
    let labelStatus;
    if (listStatus && listStatus?.length > 0 && status) {
        try {
            const foundStatus = listStatus?.find((item) => getValue(item) === status);
            colorStatus = foundStatus?.color;
            labelStatus = foundStatus?.label;
        } catch (error) {
            console.error({ error });
        }
    }
    if (color) {
        colorStatus = color;
    }
    if (content) {
        labelStatus = content;
    }
    const styleLabelContainer = {
        backgroundColor: ColorUtils.hexToRGB(colorStatus, 0.2),
    };
    const styleLabelDot = {
        backgroundColor: colorStatus,
    };
    const styleLabelContent = {
        color: colorStatus,
    };
    return (
        <div className={classNameContainer} style={{ ...styleLabelContainer, ...style }}>
            <div className="d-view-label-status__dot" style={styleLabelDot} />
            <text className="text-xx-small ml-3" style={styleLabelContent}>
                {labelStatus}
            </text>
        </div>
    );
};

export default ViewLabelStatus;
