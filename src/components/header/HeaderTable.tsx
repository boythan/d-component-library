import ClassNames from "classnames";
import React, { CSSProperties } from "react";
import Badge, { BadgeProps } from "../elements/badge/Badge";
import Button from "../button/Button";
import InputTextSearch from "../input/InputTextSearch";

export interface HeaderTableProps {
    className?: string;
    classNameTop?: string;
    style?: CSSProperties;
    label?: string;
    onChangeText: any;
    onSubmitSearch?: any;
    searchValue?: string;

    placeholder?: string;
    disabledSearch?: boolean;

    showAddNew?: boolean;
    showExport?: boolean;
    showFilter?: boolean;
    showImport?: boolean;

    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    onClickImport?: any;

    customView?: any;
    customButtons?: any;
    customFilterButton?: (() => React.ReactElement) | React.ReactElement;
    customExportButton?: (() => React.ReactElement) | React.ReactElement;
    customImportButton?: (() => React.ReactElement) | React.ReactElement;

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
    onSubmitSearch,
    searchValue,

    onClickNew,
    onClickExport,
    onClickFilter,
    onClickImport,

    showAddNew = true,
    showExport = true,
    showFilter = true,
    showImport = true,

    customView,
    customButtons,
    customFilterButton,
    customExportButton,
    customImportButton,

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
                    {customButtons && customButtons()}
                    {onClickNew && showAddNew && (
                        <Button iconName="add" content="New" onClick={onClickNew} className="ml-3" />
                    )}
                    {onClickImport && showImport && (
                        <Button iconName="cloud_upload" content="Import" onClick={onClickImport} className="ml-3" />
                    )}
                    {customImportButton &&
                        (typeof customImportButton === "function" ? customImportButton() : customImportButton)}

                    {onClickExport && showExport && (
                        <Button iconName="cloud_download" content="Export" onClick={onClickExport} className="ml-3" />
                    )}

                    {customExportButton &&
                        (typeof customExportButton === "function" ? customExportButton() : customExportButton)}
                </div>
            </div>
            <div className="flex-center-y">
                {customView && <div className="header-table__custom-view-container">{customView()}</div>}
                <InputTextSearch
                    className="w-100 mr-3 bg-white"
                    placeholder={placeholder}
                    onChange={onChangeText}
                    disabled={disabledSearch}
                    onSubmit={onSubmitSearch}
                    {...(searchValue ? { value: searchValue } : {})}
                />
                {onClickFilter && showFilter && button}
                {customFilterButton &&
                    (typeof customFilterButton === "function" ? customFilterButton() : customFilterButton)}
            </div>
        </div>
    );
};

export default HeaderTable;
