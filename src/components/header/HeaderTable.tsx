import ClassNames from "classnames";
import React from "react";
import Button from "../button/Button";
import InputTextSearch from "../input/InputTextSearch";

export interface HeaderTableProps {
    className?: string;
    label: string;
    onChangeText: any;

    placeholder?: string;
    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    customView?: any;
}
const HeaderTable = ({
    className = "",
    label = "",
    placeholder = "Search",
    onChangeText,
    onClickNew,
    onClickExport,
    onClickFilter,
    customView,
}: HeaderTableProps) => {
    return (
        <div className={ClassNames("w-100", className)}>
            <div className="d-flex justify-content-between mb-3">
                <div className="h4">{label}</div>
                <div className="d-flex">
                    {onClickNew && <Button iconName="add" content="New" onClick={onClickNew} className="mr-3" />}
                    {onClickExport && <Button iconName="cloud_download" content="Export" onClick={onClickExport} />}
                </div>
            </div>
            <div className="flex-center-y">
                <InputTextSearch className="w-100 mr-3 bg-white" placeholder={placeholder} onChange={onChangeText} />
                {customView && customView()}
                {onClickFilter && <Button iconName="filter_list" onClick={onClickFilter} />}
            </div>
        </div>
    );
};

export default HeaderTable;
