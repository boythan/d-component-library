/* eslint-disable import/prefer-default-export */
import { filter, includes, map, uniqBy } from "lodash";
import { useEffect, useState } from "react";

export const TABLE_SELECT_OPTION = {
    SELECT_ALL_THIS_PAGE: "selectAllThisPage",
    DESELECT_ALL_THIS_PAGE: "deSelectAllThisPage",
    SELECT_ALL_OF_ALL_PAGE: "selectAllOfAllPage",
    DESELECT_ALL_OF_ALL_PAGE: "deSelectAllOfAllPage",
};

export function useTableSelectionOption(onChange: any, onSelectAllOfAllPage: any) {
    const [tableMetaData, setTableMetaData] = useState<any>({
        totalDataLength: 0,
        listSelected: [],
        currentPageData: [],
    });
    const { listSelected, totalDataLength, currentPageData } = tableMetaData;

    const currentPageSelected = filter(currentPageData, (item: any) =>
        includes(
            map(listSelected, (itemSelected: any) => itemSelected.id),
            item.id
        ));

    const onUpdateTableMetaData = (newValue: any) => {
        setTableMetaData({ ...tableMetaData, ...newValue });
    };

    const onChangeOption = (optionSelect: any, rowsKey: any) => {
        if (optionSelect === TABLE_SELECT_OPTION.SELECT_ALL_OF_ALL_PAGE) {
            if (onSelectAllOfAllPage) {
                onSelectAllOfAllPage();
            }
            return;
        }

        let selectedResult: any = [];
        switch (optionSelect) {
        case TABLE_SELECT_OPTION.DESELECT_ALL_THIS_PAGE:
            selectedResult = filter(listSelected, (item: any) => !includes(rowsKey, item.id));
            break;

        case TABLE_SELECT_OPTION.SELECT_ALL_THIS_PAGE:
            selectedResult = uniqBy([...listSelected, ...currentPageData], (item: any) => item.id);
            break;

        default:
            break;
        }
        onUpdateTableMetaData({ listSelected: selectedResult });
        onChange(selectedResult);
    };

    const TableSelectionOptions = [
        {
            key: TABLE_SELECT_OPTION.DESELECT_ALL_THIS_PAGE,
            text: "De-select all on this page",
            onSelect: (rowKeys: any) => onChangeOption(TABLE_SELECT_OPTION.DESELECT_ALL_THIS_PAGE, rowKeys),
            getVisible: () => currentPageSelected?.length > 0,
        },
        {
            key: TABLE_SELECT_OPTION.DESELECT_ALL_OF_ALL_PAGE,
            text: "De-select all of all page",
            onSelect: (rowKeys: any) => onChangeOption(TABLE_SELECT_OPTION.DESELECT_ALL_OF_ALL_PAGE, rowKeys),
            getVisible: () => listSelected?.length > 0,
        },
        {
            key: TABLE_SELECT_OPTION.SELECT_ALL_THIS_PAGE,
            text: "Select all on this page",
            onSelect: (rowKeys: any) => {
                onChangeOption(TABLE_SELECT_OPTION.SELECT_ALL_THIS_PAGE, rowKeys);
            },
            getVisible: () => currentPageData?.length > currentPageSelected?.length,
        },
        {
            key: TABLE_SELECT_OPTION.SELECT_ALL_OF_ALL_PAGE,
            text: "Select all of all page",
            onSelect: (rowKeys: any) => onChangeOption(TABLE_SELECT_OPTION.SELECT_ALL_OF_ALL_PAGE, rowKeys),
            getVisible: () => totalDataLength > listSelected?.length,
        },
    ];

    const [selectionOptions, setSelectionOptions] = useState(TableSelectionOptions);

    const onChangeOptionSelected = () => {
        const optionList = map(TableSelectionOptions, (item) => ({
            ...item,
            isVisible: item.getVisible(),
        }));
        const result = filter(optionList, (option) => option.isVisible);
        setSelectionOptions(result);
    };

    useEffect(() => {
        onChangeOptionSelected();
    }, [tableMetaData]);

    return [selectionOptions, tableMetaData, onUpdateTableMetaData];
}
