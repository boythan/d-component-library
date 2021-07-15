import React, { CSSProperties } from "react";
import ClassNames from "classnames";
import ObjectUtils from "../../utils/ObjectUtils";

export interface IRowsKey<T> {
    id: keyof T;
    label: string | number;
    renderLabel?: (props: { id: IRowsKey<T>["id"]; data: any; row?: IRowsKey<T> }) => any;
    renderContent?: (props: { id: IRowsKey<T>["id"]; data: any; row?: IRowsKey<T> }) => any;
}

export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey<any>>;
    variant?: "background" | "border" | "dashed" | "none";
    boldLabel?: boolean;
    Messages?: any;
    style?: CSSProperties;
    styleContent?: CSSProperties;
    styleLabel?: CSSProperties;
}

const ViewRowInterchange: React.FC<RowInterchangeViewProps> = ({
    dataSource = {},
    keyList = [],
    variant = "background",
    boldLabel = false,
    className,
    classNameRow,
    classNameLabel,
    classNameContent,
    Messages,
    style,
    styleLabel,
    styleContent,
}) => {
    const wrapperClass = ClassNames(className);
    return (
        <div className={wrapperClass}>
            {keyList.map((row, index) => {
                const rowClass = ClassNames(
                    "d-flex align-items-start w-100 justify-content-between py-3",
                    {
                        "px-3": variant === "background",
                        "bg-light-gray": index % 2 && variant === "background",
                        "border-top": index !== 0 && variant === "border",
                        "border-top-dashed": index !== 0 && variant === "dashed",
                    },
                    classNameRow
                );
                const labelClass = ClassNames("text-small w-100", { "font-weight-bold": boldLabel }, classNameLabel);
                const contentClass = ClassNames("w-100 text", classNameContent);
                const { id, label, renderLabel, renderContent } = row;
                let labelView;
                let content;
                labelView = label;
                if (Messages) {
                    labelView = Messages[label];
                }
                if (typeof renderLabel === "function") {
                    labelView = renderLabel({ id, data: dataSource, row });
                }
                content = dataSource?.[id] ?? "N/A";
                if (typeof id === "string" && id.includes(".")) {
                    content = ObjectUtils.getValueFromStringKey(dataSource, id);
                }
                if (typeof renderContent === "function") {
                    content = renderContent({ id, data: dataSource, row });
                }
                const contentView = (
                    <div className={contentClass} style={styleContent}>
                        {content}
                    </div>
                );
                return (
                    <div className={rowClass} key={`${id as string} + ${index}`} style={style}>
                        <div className={labelClass} style={styleLabel}>
                            {labelView}
                        </div>
                        {contentView}
                    </div>
                );
            })}
        </div>
    );
};

export default ViewRowInterchange;
