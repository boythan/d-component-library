import React from "react";
import ClassNames from "classnames";

export interface IRowsKey {
    id: string | number;
    label: string | number;
}

export interface RowInterchangeViewProps {
    className?: string;
    dataSource: any;
    keyList: Array<IRowsKey>;
    getLabel?: (label: IRowsKey["label"], row: IRowsKey, data: any) => any;
    getContent?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
}

const RowInterchangeView: React.FC<RowInterchangeViewProps> = ({
    dataSource = {},
    keyList = [],
    className,
    getLabel,
    getContent,
}) => {
    const wrapperClass = ClassNames(className);
    return (
        <div className={wrapperClass}>
            {keyList.map((row, index) => {
                const rowClass = ClassNames("d-flex align-items-center w-100 justify-content-between py-2 px-3", {
                    "bg-light-gray": index % 2,
                });
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
                const contentView = <label className="d-block text">{content}</label>;
                return (
                    <div className={rowClass} key={index}>
                        <div className="w-100">
                            <div className="d-block text-x-small">{labelView}</div>
                        </div>
                        <div className="w-100 text">{contentView}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default RowInterchangeView;
