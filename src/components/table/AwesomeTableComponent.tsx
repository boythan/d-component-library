/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
// react
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
import { SorterResult } from "antd/lib/table/interface";
// third-party
import ClassNames from "classnames";
import _ from "lodash";
import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import { isArray, isString, transformColumn } from "../../utils/AwesomeTableUtils";
import LayoutManagerColumnButton from "./layoutManager/LayoutManagerColumnButton";
import LayoutManagerViewSelect from "./layoutManager/LayoutManagerViewSelect";
// data stubs
import { ILayoutTableManager } from "./layoutManager/LayoutTableManager";
// application
import ResizableTitle from "./ResizableTitle";

export const INIT_PAGINATION = {
    pageIndex: 1,
    pageSize: 10,
    showQuickJumper: true,
    showTotal: (total: any) => <div className="captionText">{`Total ${total} items`}</div>,
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
}

interface MyTableColumnGroupType extends TableColumnGroupType<any> {
    columnId?: string;
    mobileTitle?: string;
    hidden?: boolean;
    titleTooltip?: any;
}

export type IColumnsProps = (MyTableColumnGroupType | MyTableColumnType)[];

export interface AwesomeTableComponentProps extends TableProps<any> {
    source: (pagination: { pageIndex?: number; pageSize?: number }, sorter?: SorterResult<any>) => Promise<any>;
    transformer: (res: any) => Array<any>;
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
    defaultPagination?: IPaginationProps;

    showSelectColumn?: boolean;
    keyTableLayout?: string;

    classNameTable?: string;
}

export interface AwesomeTableComponentState {
    data: Array<any>;
    loading: boolean;
    total: number;

    searchText: "";
    searchedColumn: "";

    filteredInfo: any;

    pagination: IPaginationProps | false;
    sorter: any;

    columns: TableProps<any>["columns"];
    selectedColumns: string[];
}

class AwesomeTableComponent extends Component<AwesomeTableComponentProps, AwesomeTableComponentState> {
    static defaultProps = {
        rowKey: (item: any) => {
            if (item.id) {
                return item.id;
            }

            if (isString(item)) return item;
            return Math.random();
        },
        source: () => Promise.resolve([]),
        transformer: (response: any) => {
            return response;
        },

        // eslint-disable-next-line react/default-props-match-prop-types
        columns: [],
        baseColumnProps: {},
        isPagination: true,
        defaultPagination: null,
        isScroll: true,
        border: true,
        classNameTable: "",

        setCurrentPage: (page: any) => {
            return page;
        },
        getTotalItems: (response: any) => response?.data?.data?.pagination?.items ?? 0,
        tableLayout: "auto",

        showSelectColumn: false,
        keyTableLayout: "",
    };

    components = {
        header: {
            cell: ResizableTitle,
        },
    };

    unmounted: boolean | undefined;

    searchInput: InputRef | null | undefined;

    constructor(props: any) {
        super(props);

        const tableColumns = transformColumn(props.columns, props.baseColumnProps);
        const selectedColumns = _.map(
            _.filter(tableColumns, (item) => item.isDefault),
            (item) => item.id
        );

        this.state = {
            data: [],
            loading: true,
            total: 0,

            searchText: "",
            searchedColumn: "",

            filteredInfo: null,

            pagination: this.getDefaultPagination(),
            sorter: null,

            columns: tableColumns,
            selectedColumns,
        };
    }

    getDefaultPagination = () => {
        const { isPagination, defaultPagination } = this.props;
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

    UNSAFE_componentWillMount() {
        this.unmounted = false;
    }

    componentDidMount() {
        this.start();
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        const { columns } = this.props;
        if (nextProps?.columns !== columns) {
            this.setState({ columns: transformColumn(nextProps.columns, nextProps.baseColumnProps) });
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    /** ***************************************HANDLE SEARCH FUNCTION ********************************************** */

    getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: any) => (
            // <Icons type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: any, record: any) => {
            return record?.[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()) ?? false;
        },

        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => {
                    if (this.searchInput) {
                        this.searchInput.select();
                    }
                });
            }
        },
        // eslint-disable-next-line no-confusing-arrow
        render: (text: any) => {
            const { searchedColumn, searchText } = this.state;
            if (searchedColumn === dataIndex) {
                return (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                );
            }
            return text;
        },
    });

    handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters: any) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    /** *************************************** TABLE CONTROL *********************************************** */
    handleResize = (index: any) => {
        return (e: any, { size }: any) => {
            this.setState(({ columns = [] }) => {
                const nextColumns = [...columns];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size?.width,
                };
                return { columns: nextColumns };
            });
        };
    };

    onChangeTableLayout = async (layoutItem: ILayoutTableManager) => {
        if (layoutItem?.id) {
            this.setState({ selectedColumns: layoutItem.columnsIds });
        } else {
            this.onChangeTableLayoutDefault();
        }
    };

    onChangeTableLayoutDefault = () => {
        const { columns } = this.state;
        const columnsDefault = _.filter(columns, (item) => (item as any).isDefault);
        const columnIdsDefault = _.map(columnsDefault, (item) => (item as any).id);
        this.setState({ selectedColumns: columnIdsDefault });
    };

    handleTableChange = (paging: IPaginationProps, filters: any, sorter: any) => {
        const { setCurrentPage } = this.props;
        const { pagination } = this.state;
        const { current, pageSize } = paging;
        const { field, order } = sorter;
        const paramSorter = { field, order };
        if (typeof setCurrentPage === "function") {
            setCurrentPage({ pageIndex: current, pageSize });
        }
        this.setState(
            {
                // eslint-disable-next-line react/no-access-state-in-setstate
                pagination: { ...pagination, pageIndex: current, pageSize },
                sorter: paramSorter?.field ? paramSorter : undefined,
                loading: true,
            },
            () => this.start()
        );
    };

    start() {
        const { source, transformer, getTotalItems } = this.props;
        const { pagination, sorter } = this.state;

        source(
            {
                pageIndex: typeof pagination !== "boolean" ? pagination?.pageIndex ?? 1 : 1,
                pageSize: typeof pagination !== "boolean" ? pagination?.pageSize ?? 10 : 10,
            },
            sorter
        )
            .then((response) => {
                const data = transformer(response);
                if (!isArray(data)) {
                    // eslint-disable-next-line no-throw-literal
                    throw "Data is not an array";
                }

                // eslint-disable-next-line react/destructuring-assignment
                if (_.isEmpty(data) && this.state.data.length === 0) {
                    this.setState({
                        data: [],
                        loading: false,
                    });
                    return;
                }

                this.setState({
                    data,
                    loading: false,
                    total: (getTotalItems && getTotalItems(response)) || 0,
                });
            })
            .catch(() => {
                if (this.unmounted) return;
                this.setState({ loading: false });
            });
    }

    refresh() {
        this.setState(
            {
                loading: true,
                filteredInfo: null,
                // eslint-disable-next-line react/destructuring-assignment
                pagination: this.props.isPagination ? INIT_PAGINATION : false,
            },
            () => this.start()
        );
    }

    refreshData() {
        this.setState(
            {
                loading: true,
                filteredInfo: null,
            },
            () => this.start()
        );
    }

    refreshKeepPaging(paging: any) {
        this.setState(
            {
                loading: true,
                filteredInfo: null,
                pagination: { ...INIT_PAGINATION, ...paging },
            },
            () => this.start()
        );
    }

    getDataList() {
        return this.state.data;
    }

    getColumns() {
        const { filteredInfo, columns = [], selectedColumns = [] } = this.state;
        const { showSelectColumn } = this.props;

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
                    ...this.getColumnSearchProps(column.dataIndex),
                };
            }
            return column;
        });

        const columnsResizable = columnsSearchFilter.map((col: any, index: number) => ({
            ...col,
            onHeaderCell: (column: any) => ({
                width: column?.width,
                onResize: this.handleResize(index),
            }),
        }));

        let columnsSelected = columnsResizable;

        if (showSelectColumn) {
            columnsSelected = columnsResizable.filter((item: any) => selectedColumns.includes(item.id));
        }
        return columnsSelected;
    }

    /** ************************************************** RENDER *************************************************** */

    render() {
        const { total, pagination, data, loading, columns, selectedColumns = [] } = this.state;

        // eslint-disable-next-line operator-linebreak
        const {
            rowKey,
            isScroll,
            classNameTable,
            tableLayout,
            showSelectColumn,
            className,
            onSelectionView,
            selectingRows,
            bordered = true,
            keyTableLayout,
        } = this.props;

        const showSelectionView = onSelectionView && selectingRows && selectingRows?.length > 0;
        const showFuncRow = showSelectColumn || showSelectionView;

        const paginationResult = pagination ? { ...pagination, current: pagination.pageIndex, total } : false;

        const wrapperClass = ClassNames(
            "d-table-awesome-component",
            { "d-table-awesome-component__no-border": !bordered },
            className
        );
        const funcRowClass = ClassNames("d-table-awesome-component__select-column my-2 w-100", {
            "d-flex justify-content-between align-items-center my-3": showSelectionView,
        });

        return (
            <div className={wrapperClass}>
                {showFuncRow && (
                    <div className={funcRowClass}>
                        {showSelectionView && onSelectionView && onSelectionView(selectingRows)}
                        <div className="flex-center-y">
                            <LayoutManagerViewSelect
                                selectedColumns={selectedColumns}
                                tableKey={keyTableLayout}
                                onChangeLayout={this.onChangeTableLayout}
                            />
                            <LayoutManagerColumnButton
                                dataSource={columns as any[]}
                                onChange={(selectedColumns) => this.setState({ selectedColumns })}
                                values={selectedColumns}
                                onChangeLayout={this.onChangeTableLayout}
                                onClickReset={this.onChangeTableLayoutDefault}
                                tableKey={keyTableLayout ?? ""}
                            />
                        </div>
                    </div>
                )}
                <Table
                    rowKey={rowKey}
                    dataSource={data}
                    loading={loading}
                    onChange={this.handleTableChange}
                    rowClassName={() => "d-table-awesome-component__row"}
                    pagination={paginationResult}
                    scroll={isScroll ? { y: "1000" } : {}}
                    tableLayout={tableLayout}
                    bordered={bordered}
                    components={this.components}
                    {...this.props}
                    className={`d-table-awesome-component__table ${classNameTable}`}
                    // columns props always has to be in last position in order for Resizable table to work
                    columns={this.getColumns()}
                />
            </div>
        );
    }
}

export default AwesomeTableComponent;

export const { Summary, ColumnGroup, Column, defaultProps, SELECTION_ALL, SELECTION_NONE, SELECTION_INVERT } = Table;
