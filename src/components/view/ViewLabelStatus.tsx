import classNames from "classnames";
import find from "lodash/find";
import isUndefined from "lodash/isUndefined";
import React, { CSSProperties } from "react";
import ColorUtils from "../../utils/ColorUtils";

export interface ViewLabelStatusProps {
    color?: string;
    content?: string;
    className?: string;
    style?: CSSProperties;
    listStatus?: any[];
    status?: any;
    getValue?: (item: any) => any;
    getLabel?: (item: any) => any;
}
const ViewLabelStatus = ({
    color = "#000000",
    content,
    className = "",
    style = {},
    listStatus,
    status,
    getValue = (item) => item?.id,
    getLabel = (item) => item?.label,
}: ViewLabelStatusProps) => {
    const classNameContainer = classNames("inline-flex items-center px-2.5 py-1.5 rounded-full", className);
    let colorStatus = "#000000";
    let labelStatus;

    if (color) {
        colorStatus = color;
    }
    if (content) {
        labelStatus = content;
    }
    if (listStatus && listStatus?.length > 0 && !isUndefined(status)) {
        try {
            const foundStatus = find(listStatus, (item) => getValue(item) === status);
            if (foundStatus) {
                colorStatus = foundStatus?.color;
                labelStatus = getLabel(foundStatus);
            }
        } catch (error) {
            console.error({ error });
        }
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
            <div className="w-2 h-2 rounded-full" style={styleLabelDot} />
            <span className="text-xs ml-2 font-base" style={styleLabelContent}>
                {labelStatus}
            </span>
        </div>
    );
};

export default ViewLabelStatus;
