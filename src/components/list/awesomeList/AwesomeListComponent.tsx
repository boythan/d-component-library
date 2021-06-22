/* eslint-disable max-len */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// import AwesomeListMode from "./AwesomeListMode";
import AwesomeListMode from "../shared/Mode";
import InfiniteScroll from "./InfiniteScroll";
import PagingView from "./PagingView";
import EmptyView from "../shared/EmptyView";

export interface IPaging {
    pageIndex: number;
    pageSize: number;
}

const DEFAULT_PAGING_DATA: IPaging = {
    pageIndex: 1,
    pageSize: 20,
};

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

class AwesomeListComponent extends Component<AwesomeListComponentProps, any> {
    static propTypes = {
        source: PropTypes.func,
        transformer: PropTypes.func,
        renderItem: PropTypes.func,

        isPaging: PropTypes.bool,
        isReverse: PropTypes.bool,
        className: PropTypes.string,
        classNameInfinityScroll: PropTypes.string,

        pagingProps: PropTypes.any,
        emptyView: PropTypes.any,
    };

    static defaultProps = {
        source: () => Promise.resolve([]),
        transformer: (response: any) => {
            return response;
        },

        isPaging: false,
        isReverse: false,
        className: "",
        classNameInfinityScroll: "",

        pagingProps: null,
        emptyView: "No data",
    };

    pagingData: any;

    unmounted: any;

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            emptyMode: AwesomeListMode.EMPTY,
            loading: false,
            hasMoreData: true,
        };
        this.unmounted = undefined;
    }

    // componentDidMount() {
    //     !this.state.loading &&
    //         this.setState({ loading: true }, () => {
    //             this.start();
    //         });
    // }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.unmounted = false;
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    // eslint-disable-next-line react/sort-comp
    isNoMoreData(newData: any) {
        const { isPaging } = this.props;
        if (!newData || !Array.isArray(newData) || !isPaging) return true;
        return this.pagingData ? newData.length < this.pagingData.pageSize : false;
    }

    /** ************************************************** LOAD DATA  *************************************************** */

    start() {
        const { hasMoreData, data } = this.state;
        const { source, transformer, isReverse, pagingProps } = this.props;
        if (!hasMoreData) {
            return;
        }
        /**
         * if the first load in paging list, construct to pagingData,
         */
        if (!this.pagingData) {
            this.pagingData = pagingProps || DEFAULT_PAGING_DATA;
        }
        source(this.pagingData)
            .then(async (response) => {
                this.pagingData = {
                    ...this.pagingData,
                    pageIndex: this.pagingData.pageIndex + 1,
                };
                const data = await transformer(response);
                const hasMoreData = !this.isNoMoreData(data);

                if (!Array.isArray(data)) {
                    return;
                }

                if (_.isEmpty(data) && data.length === 0) {
                    this.setState({
                        data: [],
                        emptyMode: AwesomeListMode.EMPTY,
                        hasMoreData,
                        loading: false,
                    });
                    return;
                }

                this.setState((state: any) => ({
                    data: isReverse ? [...data, ...state.data] : state.data.concat(data),
                    emptyMode: AwesomeListMode.HIDDEN,
                    hasMoreData,
                    loading: false,
                }));
            })
            .catch(() => {
                if (this.unmounted) return;
                /**
                 * if the first loading
                 * display emptyView with error mode
                 */
                if (this.pagingData.pageIndex === DEFAULT_PAGING_DATA.pageIndex) {
                    this.setState({
                        emptyMode: AwesomeListMode.ERROR,
                        data: [],
                        hasMoreData: false,
                        loading: false,
                    });
                } else {
                    this.setState({
                        emptyMode: AwesomeListMode.HIDDEN,
                        hasMoreData: false,
                        loading: false,
                    });
                }
            });
    }

    refresh() {
        const { loading } = this.state;
        if (loading) return;

        this.isNoMoreData = () => false;
        this.pagingData = null;
        this.setState(
            {
                data: [],
                emptyMode: AwesomeListMode.PROGRESS,
                hasMoreData: true,
                loading: true,
            },
            () => this.start()
        );
    }

    pagingRetry = () => {
        const { loading } = this.state;
        if (loading) return;

        this.setState(
            {
                emptyMode: AwesomeListMode.HIDDEN,
                hasMoreData: true,
                loading: true,
            },
            () => this.start()
        );
    };

    render() {
        const { data, hasMoreData, loading, emptyMode } = this.state;
        const { renderItem, styleContainer, isReverse, className, classNameInfinityScroll, emptyView } = this.props;
        return (
            <div className={`d-awesome-list ${className}`} style={{ ...styleContainer }}>
                <InfiniteScroll
                    threshold={1}
                    pageStart={0}
                    loadMore={() => {
                        return (
                            // eslint-disable-next-line operator-linebreak
                            !loading &&
                            this.setState({ loading: true }, () => {
                                this.start();
                            })
                        );
                    }}
                    hasMore={hasMoreData}
                    isReverse={isReverse}
                    loader={<PagingView onClickRetry={this.pagingRetry} />}
                    useWindow={false}
                    className={classNameInfinityScroll}
                >
                    {data.map((item: any, index: any) => renderItem(item, index))}
                </InfiniteScroll>
                <EmptyView mode={emptyMode} emptyText={emptyView} />
            </div>
        );
    }
}

export default AwesomeListComponent;
