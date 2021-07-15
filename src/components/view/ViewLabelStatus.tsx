import classNames from "classnames";
import React from "react";
import ColorUtils from "../../utils/ColorUtils";

export interface ViewLabelStatusProps {
    color?: string;
    content: string;
    className?: string;
}
const ViewLabelStatus = ({ color = "#000000", content, className = "" }: ViewLabelStatusProps) => {
    const classNameContainer = classNames("d-view-label-status", className);
    const styleLabelContainer = {
        backgroundColor: ColorUtils.hexToRGB(color, 0.2),
    };
    const styleLabelDot = {
        backgroundColor: color,
    };
    const styleLabelContent = {
        color,
    };
    return (
        <div className={classNameContainer} style={styleLabelContainer}>
            <div className="d-view-label-status__dot" style={styleLabelDot} />
            <text className="text-xx-small ml-3" style={styleLabelContent}>
                {content}
            </text>
        </div>
    );
};

export default ViewLabelStatus;
