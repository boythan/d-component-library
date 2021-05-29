/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/static-property-placement */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
// react
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, TablePaginationConfig, TableProps } from "antd";
// third-party
import ClassNames from "classnames";
import _ from "lodash";
import React, { Component } from "react";
import Highlighter from "react-highlight-words";
// application
import ResizableTitle from "./ResizableTitle";
import SelectColumnModal, { SelectLayoutView } from "./layoutManager/SelectColumnModal";
// data stubs
import LayoutTableManager from "./layoutManager/LayoutTableManager";
import { isArray, isString } from "./AwesomeTableUtils";

const INIT_PAGINATION = {
    pageIndex: 1,
    pageSize: 10,
    showQuickJumper: true,
    showTotal: (total: any) => <div className="captionText">{`Total ${total} items`}</div>,
    pageSizeOptions: ["10", "20", "50"],
    showSizeChanger: true,
};

export interface IPaginationProps extends TablePaginationConfig {
    pageIndex?: number;
    // pageSize: number;
    // showQuickJumper?: boolean;
    // showTotal?: (total: any) => React.ReactNode;
    // pageSizeOptions?: Array<string>;
    // showSizeChanger?: boolean;
}

export interface AwesomeTableComponentProps extends TableProps<any> {
    source: (pagination: IPaginationProps | false, sorter?: any) => Promise<any>;
    transformer: (res: any) => Array<any>;
    columns: Array<any>;

    rowKey?: (item: any) => any;
    renderFooter?: TableProps<any>["footer"];
    setCurrentPage?: (paging?: any) => void;

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
    selectedColumns: TableProps<any>["columns"];

    tableLayoutList: any;
    selectedLayout: any;
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
        source: Promise.resolve([]),
        transformer: (response: any) => {
            return response;
        },

        // eslint-disable-next-line react/default-props-match-prop-types
        columns: [],
        isPagination: true,
        defaultPagination: null,
        isScroll: true,
        classNameTable: "",

        setCurrentPage: (page: any) => {
            return page;
        },
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

    searchInput: Input | null | undefined;

    constructor(props: any) {
        super(props);

        this.state = {
            data: [],
            loading: true,
            total: 0,

            searchText: "",
            searchedColumn: "",

            filteredInfo: null,

            pagination: this.getDefaultPagination(),
            sorter: null,

            columns: props.columns,
            selectedColumns: props.columns,
            tableLayoutList: {},
            selectedLayout: null,
        };
    }

    getDefaultPagination = () => {
        const { isPagination, defaultPagination } = this.props;
        if (!isPagination) {
            return false;
        }
        if (defaultPagination && defaultPagination.pageIndex && defaultPagination.pageSize) {
            return { current: defaultPagination.pageIndex, pageSize: defaultPagination.pageSize };
        }
        return INIT_PAGINATION;
    };

    UNSAFE_componentWillMount() {
        this.unmounted = false;
    }

    componentDidMount() {
        this.start();
        this.getDefaultTableLayout();
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        const { columns } = this.props;
        if (nextProps?.columns !== columns) {
            this.setState({ columns: nextProps.columns });
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    /** **************************************************HANDLE SEARCH FUNCTION *************************************************** */

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

    getDefaultTableLayout = () => {
        const { keyTableLayout, showSelectColumn, columns } = this.props;
        if (keyTableLayout && showSelectColumn) {
            const tableLayout = LayoutTableManager.getLayout(keyTableLayout);
            if (!_.isEmpty(tableLayout)) {
                const listTableLayout: any = [];
                const tableKey = Object.keys(tableLayout);
                tableKey.forEach((key) => {
                    listTableLayout.push({ ...tableLayout[key], name: key });
                });
                const defaultLayout = listTableLayout.find((item: any) => item?.default);
                if (!_.isEmpty(defaultLayout)) {
                    const defaultIndex = defaultLayout?.data?.map((item: any) => item?.dataIndex);
                    const defaultColumns = columns.filter((item) => defaultIndex.includes(item.dataIndex));
                    this.setState({
                        selectedColumns: defaultColumns,
                        tableLayoutList: tableLayout,
                        selectedLayout: defaultLayout,
                    });
                }
            }
        }
    };

    /** ************************************************** TABLE CONTROL *************************************************** */

    handleResize = (index: any) => (e: any, { size }: any) => {
        this.setState(({ columns = [] }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size?.width,
            };
            return { columns: nextColumns };
        });
    };

    handleSelectTableLayout = async (item: any) => {
        const { keyTableLayout } = this.props;
        const listLayout = LayoutTableManager.getLayout(keyTableLayout);
        const saveLayout = { data: item.data, default: true };
        const newTableLayout: any = {};
        const listLayoutKey = Object.keys(listLayout);
        listLayoutKey.forEach((key) => {
            if (key === item.name) {
                newTableLayout[key] = saveLayout;
            } else {
                newTableLayout[key] = { ...listLayout[key], default: false };
            }
        });
        await LayoutTableManager.saveTableLayout(newTableLayout, keyTableLayout);
        this.getDefaultTableLayout();
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
                sorter: paramSorter,
            },
            () => this.start()
        );
    };

    start() {
        const { source, transformer } = this.props;
        const { pagination, sorter } = this.state;

        source(pagination, sorter)
            .then((response) => {
                const data = transformer(response);
                if (!isArray(data)) {
                    // eslint-disable-next-line no-throw-literal
                    throw "Data is not an array";
                }

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
                    total: response?.data?.data?.pagination?.items ?? 0,
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
                // eslint-disable-next-line no-nested-ternary
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

    /** ************************************************** RENDER *************************************************** */

    render() {
        const {
            filteredInfo,
            total,
            pagination,
            columns = [],
            selectedColumns = [],
            tableLayoutList,
            selectedLayout,
            data,
            loading,
        } = this.state;

        const {
            rowKey,
            isScroll,
            classNameTable,
            tableLayout,
            showSelectColumn,
            keyTableLayout,
            className,
        } = this.props;

        const columnsResult = columns.map((columnParams: any) => {
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

        const columnResizable = columnsResult.map((col: any, index: number) => ({
            ...col,
            onHeaderCell: (column: any) => ({
                width: column?.width,
                onResize: this.handleResize(index),
            }),
        }));

        let columnSelected = columnResizable;

        if (showSelectColumn) {
            const selectedIndex = selectedColumns.map((item: any) => item?.dataIndex);
            columnSelected = columnResizable.filter((item: any) => selectedIndex.includes(item.dataIndex));
        }

        const paginationResult = pagination ? { ...pagination, current: pagination.pageIndex, total } : false;

        const wrapperClass = ClassNames("d-table-awesome-component", className);
        return (
            <div className={wrapperClass}>
                {showSelectColumn && (
                    <div className="d-table-awesome-component__select-column m-2">
                        {!_.isEmpty(tableLayoutList) && (
                            <SelectLayoutView
                                listLayout={tableLayoutList}
                                onClickItem={this.handleSelectTableLayout}
                                selectedLayout={selectedLayout}
                                showBorder
                            />
                        )}
                        <SelectColumnModal
                            // eslint-disable-next-line react/destructuring-assignment
                            options={this.props.columns}
                            setSelectedColumns={(column: any) => this.setState({ selectedColumns: column })}
                            keyTable={keyTableLayout}
                            refreshLayout={() => this.getDefaultTableLayout()}
                        />
                    </div>
                )}
                <Table
                    rowKey={rowKey}
                    dataSource={data}
                    loading={loading}
                    onChange={this.handleTableChange}
                    rowClassName={() => {
                        return "d-table-awesome-component__row";
                    }}
                    pagination={paginationResult}
                    scroll={isScroll ? { y: 500 } : {}}
                    tableLayout={tableLayout}
                    bordered
                    components={this.components}
                    {...this.props}
                    className={`d-table-awesome-component__table ${classNameTable}`}
                    // columns props always has to be in last positon in order for Resizable table to work
                    columns={columnSelected}
                />
            </div>
        );
    }
}

export default AwesomeTableComponent;