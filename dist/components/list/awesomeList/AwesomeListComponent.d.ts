import React, { Component } from "react";
import PropTypes from "prop-types";
interface IPaging {
    pageIndex: number;
    pageSize: number;
}
export interface AwesomeListComponentProps {
    source: (paging: any) => Promise<any>;
    transformer: (response: any) => Array<any> | any;
    renderItem: (item: any, index: any) => React.ReactNode;
    isPaging?: boolean;
    isReverse?: boolean;
    className?: string;
    classNameInfinityScroll?: string;
    styleContainer?: any;
    pagingProps?: IPaging;
    emptyView?: any;
}
declare class AwesomeListComponent extends Component<AwesomeListComponentProps, any> {
    static propTypes: {
        source: PropTypes.Requireable<(...args: any[]) => any>;
        transformer: PropTypes.Requireable<(...args: any[]) => any>;
        renderItem: PropTypes.Requireable<(...args: any[]) => any>;
        isPaging: PropTypes.Requireable<boolean>;
        isReverse: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        classNameInfinityScroll: PropTypes.Requireable<string>;
        pagingProps: PropTypes.Requireable<any>;
        emptyView: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        source: () => Promise<never[]>;
        transformer: (response: any) => any;
        isPaging: boolean;
        isReverse: boolean;
        className: string;
        classNameInfinityScroll: string;
        pagingProps: null;
        emptyView: string;
    };
    pagingData: any;
    unmounted: any;
    constructor(props: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    isNoMoreData(newData: any): boolean;
    /** ************************************************** LOAD DATA  *************************************************** */
    start(): void;
    refresh(): void;
    pagingRetry: () => void;
    render(): JSX.Element;
}
export default AwesomeListComponent;
