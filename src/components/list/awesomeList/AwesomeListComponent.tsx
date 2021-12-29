/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
import _ from "lodash";
import React, { Component, CSSProperties } from "react";
import PropTypes from "prop-types";
import Button, { ButtonProps } from "../../button/Button";
import EmptyView from "../shared/EmptyView";
// import AwesomeListMode from "./AwesomeListMode";
import AwesomeListMode from "../shared/Mode";
import InfiniteScroll from "./InfiniteScroll";
import PagingView from "./PagingView";

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
    styleContainer?: CSSProperties;

    pagingProps?: IPaging;
    emptyView?: any;

    variant?: "infinity-scroll" | "load-more";
    loadMoreText?: string;
    loadMoreButtonProps?: ButtonProps;
}

export interface AwesomeListComponentState {
    data: Array<any>;
    emptyMode: typeof AwesomeListMode;
    loading: boolean;
    hasMoreData: boolean;
}

class AwesomeListComponent extends Component<AwesomeListComponentProps, AwesomeListComponentState> {
    // static propTypes = {
    //     source: PropTypes.func,
    //     transformer: PropTypes.func,
    //     renderItem: PropTypes.func,

    //     isPaging: PropTypes.bool,
    //     isReverse: PropTypes.bool,
    //     className: PropTypes.string,
    //     classNameInfinityScroll: PropTypes.string,

    //     pagingProps: PropTypes.any,
    //     emptyView: PropTypes.any,
    //     variant: PropTypes.string,
    //     loadMoreText: PropTypes.string,
    // };

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
        variant: "infinity-scroll",
        loadMoreText: "Load More",
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

    componentDidMount() {
        const { loading } = this.state;
        const { variant } = this.props;
        !loading &&
            variant === "load-more" &&
            this.setState({ loading: true }, () => {
                this.start();
            });
    }

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

    renderInfinityVariant = () => {
        const { data, hasMoreData, loading } = this.state;
        const { renderItem, isReverse, classNameInfinityScroll } = this.props;
        return (
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
        );
    };

    renderLoadMoreVariant = () => {
        const { data, hasMoreData, loading } = this.state;
        const { renderItem, loadMoreText, loadMoreButtonProps } = this.props;
        if (!(data?.length > 0)) {
            return null;
        }
        return (
            <div>
                {data.map((item: any, index: any) => renderItem(item, index))}
                {hasMoreData && (
                    <div className="w-100">
                        <Button
                            content={loadMoreText}
                            {...loadMoreButtonProps}
                            onClick={() => {
                                return (
                                    // eslint-disable-next-line operator-linebreak
                                    !loading &&
                                    this.setState({ loading: true }, () => {
                                        this.start();
                                    })
                                );
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    render() {
        const { emptyMode } = this.state;
        const { styleContainer, className, emptyView, variant } = this.props;
        return (
            <div className={`d-awesome-list ${className}`} style={{ ...styleContainer }}>
                {variant === "infinity-scroll" ? this.renderInfinityVariant() : this.renderLoadMoreVariant()}
                <EmptyView mode={emptyMode} emptyText={emptyView} />
            </div>
        );
    }
}

export default AwesomeListComponent;
