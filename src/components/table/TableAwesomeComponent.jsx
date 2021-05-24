/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
// react
import React, { Component } from "react";

// third-party
import { Table, Input, Button } from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// application
import SelectColumnModal, { SelectLayoutView } from "../modal/SelectColumnModal";
import ResizableTitle from "./ResizableTitle";
// data stubs
import "./TableAwesome.scss";
import { isArray, isString } from "./TableAwesomeUtils";
import LayoutTableManager from "./layoutManager/LayoutTableManager";

const INIT_PAGINATION = {
    pageIndex: 1,
    showQuickJumper: true,
    showTotal: (total) => <div className="captionText">{`Total ${total} items`}</div>,
    pageSizeOptions: ["10", "20", "50"],
    showSizeChanger: true,
    pageSize: 10,
};

class TableAwesomeComponentUpdated extends Component {
    static propTypes = {
        source: PropTypes.func,
        rowKey: PropTypes.func,
        transformer: PropTypes.func,
        renderFooter: PropTypes.func,

        isScroll: PropTypes.bool,
        columns: PropTypes.array.isRequired,
        isPagination: PropTypes.bool,
        defaultPagination: PropTypes.object,

        setCurrentPage: PropTypes.func,
        tableLayout: PropTypes.string,
        showSelectColumn: PropTypes.bool,
        keyTableLayout: PropTypes.string,
        tableClassName: PropTypes.string,
    };

    static defaultProps = {
        rowKey: (item) => {
            if (item.id) {
                return item.id;
            }

            if (isString(item)) return item;
            return Math.random();
        },
        source: Promise.resolve([]),
        transformer: (response) => {
            return response;
        },

        // eslint-disable-next-line react/default-props-match-prop-types
        columns: [],
        isPagination: true,
        defaultPagination: null,
        isScroll: true,
        tableClassName: "",

        setCurrentPage: (page) => {
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

    constructor(props) {
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps?.columns !== this.props.columns) {
            this.setState({ columns: nextProps.columns });
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    /** **************************************************HANDLE SEARCH FUNCTION *************************************************** */

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
        filterIcon: (filtered) => (
            // <Icons type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) => {
            return record?.[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()) ?? false;
        },

        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        // eslint-disable-next-line no-confusing-arrow
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    getDefaultTableLayout = () => {
        const { keyTableLayout, showSelectColumn, columns } = this.props;
        if (keyTableLayout && showSelectColumn) {
            const tableLayout = LayoutTableManager.getLayout(keyTableLayout);
            if (!_.isEmpty(tableLayout)) {
                const listTableLayout = [];
                const tableKey = Object.keys(tableLayout);
                tableKey.forEach((key) => {
                    listTableLayout.push({ ...tableLayout[key], name: key });
                });
                const defaultLayout = listTableLayout.find((item) => item?.default);
                if (!_.isEmpty(defaultLayout)) {
                    const defaultIndex = defaultLayout?.data?.map((item) => item?.dataIndex);
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

    handleResize = (index) => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size?.width,
            };
            return { columns: nextColumns };
        });
    };

    handleSelectTableLayout = async (item) => {
        const { keyTableLayout } = this.props;
        const listLayout = LayoutTableManager.getLayout(keyTableLayout);
        const saveLayout = { data: item.data, default: true };
        const newTableLayout = {};
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

    handleTableChange = (pagination, filters, sorter) => {
        const { current, pageSize } = pagination;
        const { field, order } = sorter;
        const paramSorter = { field, order };
        this.props.setCurrentPage({ pageIndex: current, pageSize });
        this.setState(
            {
                // eslint-disable-next-line react/no-access-state-in-setstate
                pagination: { ...this.state.pagination, pageIndex: current, pageSize },
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

    refreshKeepPaging(paging) {
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
            columns,
            selectedColumns,
            tableLayoutList,
            selectedLayout,
        } = this.state;

        const { rowKey, isScroll, tableClassName, tableLayout, showSelectColumn, keyTableLayout } = this.props;

        const columnsResult = columns.map((columnParams) => {
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

        const columnResizable = columnsResult.map((col, index) => ({
            ...col,
            onHeaderCell: (column) => ({
                width: column?.width,
                onResize: this.handleResize(index),
            }),
        }));

        let columnSelected = columnResizable;

        if (showSelectColumn) {
            const selectedIndex = selectedColumns.map((item) => item?.dataIndex);
            columnSelected = columnResizable.filter((item) => selectedIndex.includes(item.dataIndex));
        }

        const paginationResult = pagination ? { ...pagination, current: pagination.pageIndex, total } : false;
        return (
            <div className="tableAwesomeComponent">
                {showSelectColumn && (
                    <div className="tableAwesomeComponent-selectColumn m-2">
                        {!_.isEmpty(tableLayoutList) && (
                            <SelectLayoutView
                                listLayout={tableLayoutList}
                                onClickItem={this.handleSelectTableLayout}
                                selectedLayout={selectedLayout}
                                showBorder
                            />
                        )}
                        <SelectColumnModal
                            options={this.props.columns}
                            setSelectedColumns={(column) => this.setState({ selectedColumns: column })}
                            keyTable={keyTableLayout}
                            refreshLayout={() => this.getDefaultTableLayout()}
                        />
                    </div>
                )}
                <Table
                    rowKey={rowKey}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    rowClassName={() => {
                        return "rowAwesomeTable";
                    }}
                    className={`tableAwesome ${tableClassName}`}
                    pagination={paginationResult}
                    scroll={isScroll ? { y: 500 } : {}}
                    tableLayout={tableLayout}
                    bordered
                    components={this.components}
                    {...this.props}
                    // columns props always has to be in last positon in order for Resizable table to work
                    columns={columnSelected}
                />
            </div>
        );
    }
}

export default TableAwesomeComponentUpdated;
