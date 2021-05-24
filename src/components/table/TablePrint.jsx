/* eslint-disable react/static-property-placement */
/* eslint-disable react/default-props-match-prop-types */
import { Table } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { calculateDefaultExpandedRowKeys, isString } from "./TableAwesomeUtils";
import "./TablePrint.scss";

const INIT_PAGNITION = {
    current: 1,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: (total) => <div className="captionText">{`Total ${total} items`}</div>,
};

class TablePrint extends Component {
    static propTypes = {
        containerStyle: PropTypes.object,
        tableStyle: PropTypes.object,

        dataSource: PropTypes.array,
        rowKey: PropTypes.func,
        renderFooter: PropTypes.func,

        isScroll: PropTypes.bool,
        columns: PropTypes.array.isRequired,
        isPagination: PropTypes.object,
        scroll: PropTypes.object,
    };

    static defaultProps = {
        rowKey: (item) => {
            if (item.id) {
                return item.id;
            }

            if (isString(item)) return item;
            return new Date();
        },
        dataSource: [],

        columns: [],
        isPagination: true,
        isScroll: true,

        tableClassName: "",
        tableLayout: "fixed",
        scroll: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            currentDataSource: [],
            loading: true,
            refreshing: false,
            total: 0,

            searchText: "",
            searchedColumn: "",

            filteredInfo: null,
            sortedInfo: null,
        };
    }

    /** ************************************************** RENDER *************************************************** */

    render() {
        const { columns, rowKey, renderFooter, tableClassName, tableLayout, dataSource = [] } = this.props;
        const { data } = this.state;

        return (
            // eslint-disable-next-line no-use-before-define
            <div style={styles.mainContainer} className="tablePrintContainer">
                <Table
                    columns={columns}
                    rowKey={rowKey}
                    dataSource={dataSource}
                    rowClassName={(record, index) => {
                        return "rowPrintTable";
                    }}
                    className={`tablePrint ${tableClassName}`}
                    pagination={false}
                    tableLayout={tableLayout}
                    expandable={{
                        defaultExpandAllRows: true,
                        // eslint-disable-next-line max-len
                        expandedRowKeys: calculateDefaultExpandedRowKeys(data), // the key in this props will be compare to the rowKeys , if the keys exist in both array => the row will be expand
                        // defaultExpandedRowKeys:calculateDefaultExpandedRowKeys(this.state.data),
                    }}
                    {...this.props}
                    // handlePageChange
                />
            </div>
        );
    }
}

export default TablePrint;

const styles = {
    mainContainer: {
        height: "100%",
        width: "100%",
        flex: 1,
        backgroundColor: "white",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "row",
        margin: 0,
        width: "100%",
    },
    controlContainer: {
        paddingTop: 16,
        paddingBottom: 16,
    },
};
