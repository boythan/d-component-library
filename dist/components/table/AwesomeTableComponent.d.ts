import { Input, TablePaginationConfig, TableProps } from "antd";
import { Component } from "react";
export interface IPaginationProps extends TablePaginationConfig {
    pageIndex?: number;
}
export declare type IColumnsProps = TableProps<any>["columns"];
export interface AwesomeTableComponentProps extends TableProps<any> {
    source: (pagination: IPaginationProps, sorter?: any) => Promise<any>;
    transformer: (res: any) => Array<any>;
    columns: IColumnsProps;
    rowKey?: (item: any) => any;
    renderFooter?: TableProps<any>["footer"];
    setCurrentPage?: (paging?: any) => void;
    getTotalItems?: (res: any) => number;
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
declare class AwesomeTableComponent extends Component<AwesomeTableComponentProps, AwesomeTableComponentState> {
    static defaultProps: {
        rowKey: (item: any) => any;
        source: Promise<never[]>;
        transformer: (response: any) => any;
        columns: never[];
        isPagination: boolean;
        defaultPagination: null;
        isScroll: boolean;
        classNameTable: string;
        setCurrentPage: (page: any) => any;
        getTotalItems: (response: any) => any;
        tableLayout: string;
        showSelectColumn: boolean;
        keyTableLayout: string;
    };
    components: {
        header: {
            cell: (props: any) => JSX.Element;
        };
    };
    unmounted: boolean | undefined;
    searchInput: Input | null | undefined;
    constructor(props: any);
    getDefaultPagination: () => false | {
        pageIndex: number;
        pageSize: number;
        showQuickJumper: boolean;
        showTotal: (total: any) => JSX.Element;
        pageSizeOptions: string[];
        showSizeChanger: boolean;
    } | {
        current: number;
        pageSize: number;
    };
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    /** **************************************************HANDLE SEARCH FUNCTION *************************************************** */
    getColumnSearchProps: (dataIndex: any) => {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => JSX.Element;
        filterIcon: (filtered: any) => JSX.Element;
        onFilter: (value: any, record: any) => any;
        onFilterDropdownVisibleChange: (visible: any) => void;
        render: (text: any) => any;
    };
    handleSearch: (selectedKeys: any, confirm: any, dataIndex: any) => void;
    handleReset: (clearFilters: any) => void;
    getDefaultTableLayout: () => void;
    /** ************************************************** TABLE CONTROL *************************************************** */
    handleResize: (index: any) => (e: any, { size }: any) => void;
    handleSelectTableLayout: (item: any) => Promise<void>;
    handleTableChange: (paging: IPaginationProps, filters: any, sorter: any) => void;
    start(): void;
    refresh(): void;
    refreshData(): void;
    refreshKeepPaging(paging: any): void;
    getDataList(): any[];
    getColumns(): any[];
    /** ************************************************** RENDER *************************************************** */
    render(): JSX.Element;
}
export default AwesomeTableComponent;
