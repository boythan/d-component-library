export default TablePrint;
declare class TablePrint extends React.Component<any, any, any> {
    static propTypes: {
        containerStyle: PropTypes.Requireable<object>;
        tableStyle: PropTypes.Requireable<object>;
        dataSource: PropTypes.Requireable<any[]>;
        rowKey: PropTypes.Requireable<(...args: any[]) => any>;
        renderFooter: PropTypes.Requireable<(...args: any[]) => any>;
        isScroll: PropTypes.Requireable<boolean>;
        columns: PropTypes.Validator<any[]>;
        isPagination: PropTypes.Requireable<object>;
        scroll: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        rowKey: (item: any) => any;
        dataSource: never[];
        columns: never[];
        isPagination: boolean;
        isScroll: boolean;
        tableClassName: string;
        tableLayout: string;
        scroll: {};
    };
    constructor(props: any);
}
import React from "react";
import PropTypes from "prop-types";
