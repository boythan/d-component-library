import ClassNames from "classnames";
import React, { CSSProperties } from "react";
import Badge, { BadgeProps } from "../badge/Badge";
import Button from "../button/Button";
import InputTextSearch from "../input/InputTextSearch";

export interface HeaderTableProps {
    className?: string;
    classNameTop?: string;
    style?: CSSProperties;
    label?: string;
    onChangeText: any;

    placeholder?: string;
    disabledSearch?: boolean;

    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    onClickImport?: any;
    customView?: any;

    isFiltered?: boolean;
    badgeColor?: BadgeProps["color"];
}
const HeaderTable = ({
    className = "",
    classNameTop,
    style,
    label = "",

    placeholder = "Search",
    onChangeText,
    disabledSearch = false,

    onClickNew,
    onClickExport,
    onClickFilter,
    onClickImport,
    customView,
    isFiltered = false,
    badgeColor = "secondary",
}: HeaderTableProps) => {
    let button = <Button iconName="filter_list" onClick={onClickFilter} />;
    if (isFiltered) {
        button = (
            <Badge color={badgeColor}>
                <Button iconName="filter_list" onClick={onClickFilter} />
            </Badge>
        );
    }
    return (
        <div className={ClassNames("w-100", className)} style={style}>
            <div className={ClassNames("d-flex justify-content-between mb-3", classNameTop)}>
                <div className="h4">{label}</div>
                <div className="d-flex">
                    {onClickNew && <Button iconName="add" content="New" onClick={onClickNew} className="ml-3" />}
                    {onClickImport && (
                        <Button iconName="cloud_upload" content="Import" onClick={onClickImport} className="ml-3" />
                    )}
                    {onClickExport && (
                        <Button iconName="cloud_download" content="Export" onClick={onClickExport} className="ml-3" />
                    )}
                </div>
            </div>
            <div className="flex-center-y">
                {customView && <div className="header-table__custom-view-container">{customView()}</div>}
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
