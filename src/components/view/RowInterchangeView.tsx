import React from "react";
import ClassNames from "classnames";

export interface IRowsKey {
    id: string | number;
    label: string | number;
    renderLabel?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
    renderContent?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
}

export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey>;
    variant?: "background" | "border";
    boldLabel?: boolean;
}

const RowInterchangeView: React.FC<RowInterchangeViewProps> = ({
    dataSource = {},
    keyList = [],
    variant = "background",
    boldLabel = false,
    className,
    classNameRow,
    classNameLabel,
    classNameContent,
}) => {
    const wrapperClass = ClassNames(className);
    return (
        <div className={wrapperClass}>
            {keyList.map((row, index) => {
                const rowClass = ClassNames(
                    "d-flex align-items-start w-100 justify-content-between py-3 px-3",
                    {
                        "bg-light-gray": index % 2 && variant === "background",
                        "border-top": index !== 0 && variant === "border",
                    },
                    classNameRow
                );
                const labelClass = ClassNames("text-small w-100", { "font-weight-bold": boldLabel }, classNameLabel);
                const contentClass = ClassNames("w-100 text", classNameContent);
                const { id, label, renderLabel, renderContent } = row;
                let labelView;
                let content;
                labelView = label;
                if (typeof renderLabel === "function") {
                    labelView = renderLabel(id, row, dataSource);
                }
                content = dataSource?.[id] ?? "N/A";
                if (typeof renderContent === "function") {
                    content = renderContent(id, row, dataSource);
                }
                const contentView = <div className={contentClass}>{content}</div>;
                return (
                    <div className={rowClass} key={index}>
                        <div className={labelClass}>{labelView}</div>
                        {contentView}
                    </div>
                );
            })}
        </div>
    );
};

export default RowInterchangeView;
