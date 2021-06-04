import ClassNames from "classnames";
import React from "react";
import Badge from "../badge/Badge";
import Button from "../button/Button";
import InputTextSearch from "../input/InputTextSearch";

export interface HeaderTableProps {
    className?: string;
    label: string;
    onChangeText: any;

    placeholder?: string;
    disabledSearch?: boolean;

    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    customView?: any;

    isFiltered?: boolean;
}
const HeaderTable = ({
    className = "",
    label = "",

    placeholder = "Search",
    onChangeText,
    disabledSearch = false,

    onClickNew,
    onClickExport,
    onClickFilter,
    customView,
    isFiltered = false,
}: HeaderTableProps) => {
    let button = <Button iconName="filter_list" onClick={onClickFilter} />;
    if (isFiltered) {
        button = (
            <Badge color="secondary">
                <Button iconName="filter_list" onClick={onClickFilter} />
            </Badge>
        );
    }
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
                {customView && customView()}
                <InputTextSearch
                    className="w-100 mr-3 bg-white"
                    placeholder={placeholder}
                    onChange={onChangeText}
                    disabled={disabledSearch}
                />
                {onClickFilter && button}
            </div>
        </div>
    );
};

export default HeaderTable;
