/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import { SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Input,
    InputRef,
    Table,
    TableColumnGroupType,
    TableColumnType,
    TablePaginationConfig,
    TableProps,
} from "antd";
import { SorterResult } from "antd/es/table/interface";
import ClassNames from "classnames";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import map from "lodash/map";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { isArray, isString, transformColumn } from "../../utils/AwesomeTableUtils";
import LayoutManagerColumnButton from "./layoutManager/LayoutManagerColumnButton";
import LayoutManagerViewSelect from "./layoutManager/LayoutManagerViewSelect";
import { ILayoutTableManager } from "./layoutManager/LayoutTableManager";
import ResizableTitle from "./ResizableTitle";

export const INIT_PAGINATION = {
    pageIndex: 1,
    pageSize: 10,
    showQuickJumper: true,
    showTotal: (total: any) => (
        <div className="text-sm text-gray-500 flex items-center h-full">{`Total ${total} items`}</div>
    ),
    pageSizeOptions: ["10", "20", "50", "100", "200"],
    showSizeChanger: true,
};

export interface IPaginationProps extends TablePaginationConfig {
    pageIndex?: number;
}

interface MyTableColumnType extends TableColumnType<any> {
    columnId?: string;
    mobileTitle?: string;
    hidden?: boolean;
    titleTooltip?: any;
    isDefault?: boolean;
    isSearch?: boolean;
}

interface MyTableColumnGroupType extends TableColumnGroupType<any> {
    columnId?: string;
    mobileTitle?: string;
    hidden?: boolean;
    titleTooltip?: any;
    isDefault?: boolean;
    isSearch?: boolean;
}

export type IColumnsProps = (MyTableColumnGroupType | MyTableColumnType)[];

export interface AwesomeTableComponentProps extends TableProps<any> {
    source?: (pagination: { pageIndex?: number; pageSize?: number }, sorter?: SorterResult<any>) => Promise<any>;
    transformer?: (res: any) => Array<any>;
    columns: IColumnsProps;
    baseColumnProps?: any;

    rowKey?: (item: any) => any;
    renderFooter?: TableProps<any>["footer"];
    setCurrentPage?: (paging?: any) => void;
    getTotalItems?: (res: any) => number;

    onSelectionView?: (props?: any) => React.ReactNode;
    selectingRows?: Array<any>;

    isScroll?: boolean;
    isPagination?: boolean;
    defaultPagination?: IPaginationProps | null;

    showSelectColumn?: boolean;
    keyTableLayout?: string;

    classNameTable?: string;
    bordered?: boolean;
}

export interface AwesomeTableComponentRef {
    refresh: () => void;
    refreshData: () => void;
    refreshKeepPaging: (paging: any) => void;
    getDataList: () => any[];
}

const DEFAULT_BASE_COLUMN_PROPS = {};

const AwesomeTableComponent = forwardRef<AwesomeTableComponentRef, AwesomeTableComponentProps>((props, ref) => {
    const {
        source = () => Promise.resolve([]),
        transformer = (response: any) => response,
        columns: propColumns = [],
        baseColumnProps = DEFAULT_BASE_COLUMN_PROPS,
        rowKey = (item: any) => {
            if (item.id) {
                return item.id;
            }
            if (isString(item)) return item;
            return Math.random();
        },
        setCurrentPage = (page: any) => page,
        getTotalItems = (response: any) => response?.data?.data?.pagination?.items ?? 0,
        isPagination = true,
        defaultPagination = null,
        isScroll = true,
        classNameTable = "",
        tableLayout = isScroll ? "fixed" : "auto",
        showSelectColumn = false,
        keyTableLayout = "",
        onSelectionView,
        selectingRows,
        className,
        bordered = true,
    } = props;

    const getDefaultPagination = () => {
        if (!isPagination) {
            return false;
        }
        if (defaultPagination && defaultPagination.pageIndex && defaultPagination.pageSize) {
            return {
                ...INIT_PAGINATION,
                current: defaultPagination.pageIndex,
                pageSize: defaultPagination.pageSize,
                ...defaultPagination,
            };
        }
        return INIT_PAGINATION;
    };

    const [data, setData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [searchedColumn, setSearchedColumn] = useState<string>("");
    const [filteredInfo, setFilteredInfo] = useState<any>(null);
    const [pagination, setPagination] = useState<IPaginationProps | false>(getDefaultPagination());
    const [sorter, setSorter] = useState<any>(null);

    // transformColumn likely needs to be re-run if props change, so we use state for columns
    const [columns, setColumns] = useState<any[]>(transformColumn(propColumns, baseColumnProps));
    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        map(
            filter(columns, (item: any) => item.isDefault),
            (item: any) => item.id
        )
    );

    const searchInput = useRef<InputRef>(null);
    const unmountedRef = useRef<boolean>(false);

    // Initial load
    useEffect(() => {
        unmountedRef.current = false;
        start();
        return () => {
            unmountedRef.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update columns when props change
    useEffect(() => {
        if (propColumns) {
            const newCols = transformColumn(propColumns, baseColumnProps);
            if (!isEqual(newCols, columns)) {
                setColumns(newCols);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propColumns, baseColumnProps]);

    const start = () => {
        const currentPagination = pagination;
        const currentSorter = sorter;

        const params = {
            pageIndex: typeof currentPagination !== "boolean" ? currentPagination?.pageIndex ?? 1 : 1,
            pageSize: typeof currentPagination !== "boolean" ? currentPagination?.pageSize ?? 10 : 10,
        };

        source(params, currentSorter)
            .then((response) => {
                const transformedData = transformer(response);
                if (!isArray(transformedData)) {
                    // eslint-disable-next-line no-throw-literal
                    throw "Data is not an array";
                }

                if (unmountedRef.current) return;

                if (isEmpty(transformedData) && data.length === 0) {
                    setData([]);
                    setLoading(false);
                    return;
                }

                setData(transformedData);
                setLoading(false);
                setTotal((getTotalItems && getTotalItems(response)) || 0);
            })
            .catch(() => {
                if (unmountedRef.current) return;
                setLoading(false);
            });
    };

    // Need to use refs or state in start?
    // The `start` function captures `pagination` and `sorter` from closure.
    // However, since `start` is called from effects and imperative handles, we need to be careful about stale state.
    // In Class component, `this.state` is always fresh.
    // Here, `start` closes over the state values when defined.
    // WE MUST USE REFS for pagination and sorter if we want
    // `start` to be stable or just rely on `start` being recreated.
    // Or we pass params to start()?
    // Let's use Refs for state accessed in async/callbacks to emulate "this.state" behavior or pass arguments.
    // The original `start()` read from `this.state`.
    // Let's trust that we can call start with current state, but `refresh` sets state then calls start.
    // So `start` should probably just depend on state, but we need to trigger it after state update.
    // `useEffect` on pagination/sorter change?
    // Usage in `handleTableChange` calls `start` after `setState` callback.
    // Let's separate "fetchData" that takes params.

    const fetchData = (fetchPagination: IPaginationProps | false, fetchSorter: any) => {
        // setLoading(true);
        // Don't always set loading here if we want to control it from outside?
        // Original start didn't set loading true, handleTableChange did.

        const params = {
            pageIndex: typeof fetchPagination !== "boolean" ? fetchPagination?.pageIndex ?? 1 : 1,
            pageSize: typeof fetchPagination !== "boolean" ? fetchPagination?.pageSize ?? 10 : 10,
        };

        source(params, fetchSorter)
            .then((response) => {
                if (unmountedRef.current) return;
                const transformedData = transformer(response);
                if (!isArray(transformedData)) throw "Data is not an array";

                if (isEmpty(transformedData) && data.length === 0) {
                    setData([]);
                    setLoading(false);
                    return;
                }
                setData(transformedData);
                setTotal((getTotalItems && getTotalItems(response)) || 0);
                setLoading(false);
            })
            .catch(() => {
                if (unmountedRef.current) return;
                setLoading(false);
            });
    };

    // We can't easily rely on `useEffect` for all `start` calls because `refresh` also triggers it.
    // Let's use a ref to track if we should fetch, or just call `fetchData` directly with the new state.

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div className="p-2">
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    className="w-[188px] mb-2 block"
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    className="w-[90px] mr-2"
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" className="w-[90px]">
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value: any, record: any) => {
            return record?.[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()) ?? false;
        },
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => {
                    searchInput.current?.select();
                });
            }
        },
        render: (text: any) => {
            if (searchedColumn === dataIndex) {
                return (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                );
            }
            return text;
        },
    });

    const handleResize = (index: number) => {
        return (e: any, { size }: any) => {
            setColumns((prevColumns) => {
                const nextColumns = [...prevColumns];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size?.width,
                };
                return nextColumns;
            });
        };
    };

    const onChangeTableLayoutDefault = () => {
        const columnsDefault = filter(columns, (item: any) => item.isDefault);
        const columnIdsDefault = map(columnsDefault, (item: any) => item.id);
        setSelectedColumns(columnIdsDefault);
    };

    const onChangeTableLayout = async (layoutItem: ILayoutTableManager) => {
        if (layoutItem?.id) {
            setSelectedColumns(layoutItem.columnsIds);
        } else {
            onChangeTableLayoutDefault();
        }
    };

    const handleTableChange = (paging: any, filters: any, sorterResult: any) => {
        const { current, pageSize: newPageSize } = paging;
        // Handle both single sorter and multiple sorters (though code only handled single before)
        const { field, order } = sorterResult;
        const paramSorter = { field, order };

        const newPagination = {
            ...(typeof pagination === "object" ? pagination : {}),
            pageIndex: current,
            pageSize: newPageSize,
        };

        if (typeof setCurrentPage === "function") {
            setCurrentPage({ pageIndex: current, pageSize: newPageSize });
        }

        setPagination(newPagination);
        setSorter(paramSorter?.field ? paramSorter : undefined);
        setLoading(true);

        // Fetch using new values directly to ensure closure correctness
        fetchData(newPagination, paramSorter?.field ? paramSorter : undefined);
    };

    useImperativeHandle(ref, () => ({
        refresh: () => {
            setLoading(true);
            setFilteredInfo(null);
            const newPagination = isPagination ? INIT_PAGINATION : false;
            setPagination(newPagination);
            fetchData(newPagination, sorter);
        },
        refreshData: () => {
            setLoading(true);
            setFilteredInfo(null);
            fetchData(pagination, sorter);
        },
        refreshKeepPaging: (paging: any) => {
            setLoading(true);
            setFilteredInfo(null);
            const newPagination = { ...INIT_PAGINATION, ...paging };
            setPagination(newPagination);
            fetchData(newPagination, sorter);
        },
        getDataList: () => data,
    }));

    const getColumns = () => {
        const columnsSearchFilter = columns.map((columnParams: any) => {
            let column = columnParams;
            if (column.filters && column.filters.length > 0) {
                column = {
                    ...column,
                    filteredValue: filteredInfo && column.dataIndex ? filteredInfo[column.dataIndex] : null,
                };
            }

            if (column.isSearch) {
                column = {
                    ...column,
                    ...getColumnSearchProps(column.dataIndex),
                };
            }
            return column;
        });

        const columnsResizable = columnsSearchFilter.map((col: any, index: number) => ({
            ...col,
            onHeaderCell: (column: any) => ({
                width: column?.width,
                onResize: handleResize(index),
            }),
        }));

        let columnsSelected = columnsResizable;

        if (showSelectColumn) {
            columnsSelected = columnsResizable.filter((item: any) => selectedColumns.includes(item.id));
        }
        return columnsSelected;
    };

    const showSelectionView = onSelectionView && selectingRows && selectingRows?.length > 0;
    const showFuncRow = showSelectColumn || showSelectionView;
    const paginationResult = pagination ? { ...pagination, current: pagination.pageIndex || 1, total } : false;

    // Tailwind classes
    const wrapperClass = ClassNames(
        "bg-white", // Assuming basic background
        { "border-none": !bordered },
        className
    );

    const funcRowClass = ClassNames("my-2 w-full", {
        "flex justify-between items-center my-3": showSelectionView,
    });

    return (
        <div className={wrapperClass}>
            {showFuncRow && (
                <div className={funcRowClass}>
                    {showSelectionView && onSelectionView && onSelectionView(selectingRows)}
                    <div className="flex justify-end items-center gap-2">
                        <LayoutManagerViewSelect
                            selectedColumns={selectedColumns}
                            tableKey={keyTableLayout}
                            onChangeLayout={onChangeTableLayout}
                        />
                        <LayoutManagerColumnButton
                            dataSource={columns as any[]}
                            onChange={(vals) => setSelectedColumns(vals)}
                            values={selectedColumns}
                            onChangeLayout={onChangeTableLayout}
                            onClickReset={onChangeTableLayoutDefault}
                            tableKey={keyTableLayout ?? ""}
                            classNames="min-w-[500px]"
                        />
                    </div>
                </div>
            )}
            <Table
                rowKey={rowKey}
                dataSource={data}
                loading={loading}
                onChange={handleTableChange}
                rowClassName={() => "align-middle whitespace-nowrap"} // d-table-awesome-component__row
                pagination={paginationResult}
                scroll={isScroll ? { y: "1000px", x: "max-content" } : {}}
                tableLayout={tableLayout}
                bordered={bordered}
                components={{
                    header: {
                        cell: ResizableTitle,
                    },
                }}
                {...props}
                className={`w-full ${classNameTable}`}
                columns={getColumns()}
            />
        </div>
    );
});

export default AwesomeTableComponent;

export const { Summary, ColumnGroup, Column, SELECTION_ALL, SELECTION_NONE, SELECTION_INVERT } = Table;
