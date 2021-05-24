export default TableAwesomeComponentUpdated;
declare class TableAwesomeComponentUpdated extends React.Component<any, any, any> {
    static propTypes: {
        source: PropTypes.Requireable<(...args: any[]) => any>;
        rowKey: PropTypes.Requireable<(...args: any[]) => any>;
        transformer: PropTypes.Requireable<(...args: any[]) => any>;
        renderFooter: PropTypes.Requireable<(...args: any[]) => any>;
        isScroll: PropTypes.Requireable<boolean>;
        columns: PropTypes.Validator<any[]>;
        isPagination: PropTypes.Requireable<boolean>;
        defaultPagination: PropTypes.Requireable<object>;
        setCurrentPage: PropTypes.Requireable<(...args: any[]) => any>;
        tableLayout: PropTypes.Requireable<string>;
        showSelectColumn: PropTypes.Requireable<boolean>;
        keyTableLayout: PropTypes.Requireable<string>;
        tableClassName: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        rowKey: (item: any) => any;
        source: Promise<never[]>;
        transformer: (response: any) => any;
        columns: never[];
        isPagination: boolean;
        defaultPagination: null;
        isScroll: boolean;
        tableClassName: string;
        setCurrentPage: (page: any) => any;
        tableLayout: string;
        showSelectColumn: boolean;
        keyTableLayout: string;
    };
    constructor(props: any);
    components: {
        header: {
            cell: (props: any) => JSX.Element;
        };
    };
    getDefaultPagination: () => false | {
        pageIndex: number;
        showQuickJumper: boolean;
        showTotal: (total: any) => JSX.Element;
        pageSizeOptions: string[];
        showSizeChanger: boolean;
        pageSize: number;
    } | {
        current: any;
        pageSize: any;
    };
    unmounted: boolean | undefined;
    /** **************************************************HANDLE SEARCH FUNCTION *************************************************** */
    getColumnSearchProps: (dataIndex: any) => {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: {
            setSelectedKeys: any;
            selectedKeys: any;
            confirm: any;
            clearFilters: any;
        }) => JSX.Element;
        filterIcon: (filtered: any) => JSX.Element;
        onFilter: (value: any, record: any) => any;
        onFilterDropdownVisibleChange: (visible: any) => void;
        render: (text: any) => any;
    };
    searchInput: Input | null | undefined;
    handleSearch: (selectedKeys: any, confirm: any, dataIndex: any) => void;
    handleReset: (clearFilters: any) => void;
    getDefaultTableLayout: () => void;
    /** ************************************************** TABLE CONTROL *************************************************** */
    handleResize: (index: any) => (e: any, { size }: {
        size: any;
    }) => void;
    handleSelectTableLayout: (item: any) => Promise<void>;
    handleTableChange: (pagination: any, filters: any, sorter: any) => void;
    start(): void;
    refresh(): void;
    refreshData(): void;
    refreshKeepPaging(paging: any): void;
    getDataList(): never[];
}
import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
