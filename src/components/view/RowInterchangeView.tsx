import React from "react";
import ClassNames from "classnames";

export interface IRowsKey {
    id: string | number;
    label: string | number;
}

export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey>;
    getLabel?: (label: IRowsKey["label"], row: IRowsKey, data: any) => any;
    getContent?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
    variant?: "background" | "border";
}

const RowInterchangeView: React.FC<RowInterchangeViewProps> = ({
    dataSource = {},
    keyList = [],
    getLabel,
    getContent,
    variant = "background",
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
                const labelClass = ClassNames("text-x-small w-100", classNameLabel);
                const contentClass = ClassNames("w-100 text", classNameContent);
                const { id, label } = row;
                let labelView;
                let content;
                labelView = row.label;
                if (getLabel) {
                    labelView = getLabel(label, row, dataSource);
                }
                content = dataSource?.[id] ?? "N/A";
                if (getContent) {
                    content = getContent(id, row, dataSource);
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
