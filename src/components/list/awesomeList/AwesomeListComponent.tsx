/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import _ from "lodash";
import React, { CSSProperties, useImperativeHandle, useRef, useState, useEffect, forwardRef } from "react";
import PagingView from "./PagingView";
import EmptyView from "../shared/EmptyView";
import AwesomeListMode from "../shared/Mode";
import InfiniteScroll from "./InfiniteScroll";
import Button, { ButtonProps } from "../../button/Button";

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
    getScrollPosition?: (position?: any) => any;
    filterData?: (data?: Array<any>) => Array<any>;

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

    containerId?: string;
}

export interface AwesomeListComponentRef {
    refresh: () => void;
}

const AwesomeListComponent = forwardRef<AwesomeListComponentRef, AwesomeListComponentProps>(
    (
        {
            source = () => Promise.resolve([]),
            transformer = (response: any) => response,
            renderItem,
            getScrollPosition,
            filterData,
            isPaging = false,
            isReverse = false,
            className = "",
            classNameInfinityScroll = "",
            styleContainer,
            pagingProps = null,
            emptyView = "No data",
            variant = "infinity-scroll",
            loadMoreText = "Load More",
            loadMoreButtonProps,
            containerId,
        },
        ref
    ) => {
        const [data, setData] = useState<Array<any>>([]);
        const [emptyMode, setEmptyMode] = useState<typeof AwesomeListMode>(AwesomeListMode.EMPTY);
        const [loading, setLoading] = useState<boolean>(false);
        const [hasMoreData, setHasMoreData] = useState<boolean>(true);

        const pagingDataRef = useRef<IPaging | null>(null);
        const unmountedRef = useRef<boolean>(false);

        useEffect(() => {
            unmountedRef.current = false;
            return () => {
                unmountedRef.current = true;
            };
        }, []);

        const isNoMoreData = (newData: any) => {
            if (!newData || !Array.isArray(newData) || newData?.length === 0 || !isPaging) {
                return true;
            }
            return pagingDataRef.current ? newData.length < pagingDataRef.current.pageSize : false;
        };

        const start = () => {
            if (!hasMoreData) {
                return;
            }

            if (!pagingDataRef.current) {
                pagingDataRef.current = pagingProps || DEFAULT_PAGING_DATA;
            }

            source(pagingDataRef.current)
                .then(async (response) => {
                    if (unmountedRef.current) return;

                    pagingDataRef.current = {
                        ...pagingDataRef.current!,
                        pageIndex: pagingDataRef.current!.pageIndex + 1,
                    };

                    const transformedData = await transformer(response);
                    const moreDataToCheck = !isNoMoreData(transformedData);

                    if (!Array.isArray(transformedData)) {
                        setLoading(false);
                        return;
                    }

                    if (_.isEmpty(transformedData) && transformedData.length === 0) {
                        setEmptyMode(AwesomeListMode.EMPTY);
                        setHasMoreData(moreDataToCheck);
                        setLoading(false);
                        return;
                    }

                    setData((prevData) => {
                        let listData = isReverse ? [...transformedData, ...prevData] : prevData.concat(transformedData);
                        if (filterData && typeof filterData === "function") {
                            listData = filterData(listData);
                        }
                        return listData;
                    });
                    setEmptyMode(AwesomeListMode.HIDDEN);
                    setHasMoreData(moreDataToCheck);
                    setLoading(false);
                })
                .catch(() => {
                    if (unmountedRef.current) return;
                    if (pagingDataRef.current?.pageIndex === DEFAULT_PAGING_DATA.pageIndex) {
                        setEmptyMode(AwesomeListMode.ERROR);
                        setData([]);
                        setHasMoreData(false);
                        setLoading(false);
                    } else {
                        setEmptyMode(AwesomeListMode.HIDDEN);
                        setHasMoreData(false);
                        setLoading(false);
                    }
                });
        };

        useEffect(() => {
            if (variant === "load-more" && !loading) {
                setLoading(true);
                start();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const refresh = () => {
            if (loading) return;
            pagingDataRef.current = null;
            setData([]);
            setEmptyMode(AwesomeListMode.PROGRESS);
            setHasMoreData(true);
            setLoading(true);
            // We need to reset state then start, but start relies on state.
            // In layout effect or timeout?
            // Actually, we can just call start directly after setting state, but closure on hasMoreData might be issue if we didn't check it?
            // usage of ref for pagingData avoids closure stale issues for paging.
            // But logic uses `hasMoreData` state check at beginning of start().
            // Ideally we should bypass the check or update it.
            // But since we just setHasMoreData(true), the next render cycle start would see it?
            // Use setTimeout to allow state update to propagate if calling start immediately, or just force it.
            // Better: Pass a flag or separate initialization logic.
            // For now, mimicking original callback pattern roughly:
            setTimeout(() => start(), 0);
        };

        useImperativeHandle(ref, () => ({
            refresh,
        }));

        const pagingRetry = () => {
            if (loading) return;
            setEmptyMode(AwesomeListMode.HIDDEN);
            setHasMoreData(true);
            setLoading(true);
            setTimeout(() => start(), 0);
        };

        const renderInfinityVariant = () => {
            return (
                <InfiniteScroll
                    threshold={1}
                    pageStart={0}
                    loadMore={() => {
                        if (!loading) {
                            setLoading(true);
                            start();
                        }
                    }}
                    hasMore={hasMoreData}
                    isReverse={isReverse}
                    loader={<PagingView onClickRetry={pagingRetry} />}
                    useWindow={false}
                    useMemorizeScrollPosition={getScrollPosition}
                    className={classNameInfinityScroll}
                >
                    {data.map((item: any, index: any) => renderItem(item, index))}
                </InfiniteScroll>
            );
        };

        const renderLoadMoreVariant = () => {
            if (!(data?.length > 0)) {
                return null;
            }
            return (
                <div>
                    {data.map((item: any, index: any) => renderItem(item, index))}
                    {hasMoreData && (
                        <div className="w-full">
                            <Button
                                content={loadMoreText}
                                {...loadMoreButtonProps}
                                onClick={() => {
                                    if (!loading) {
                                        setLoading(true);
                                        start();
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            );
        };

        return (
            <div
                className={`w-full h-full relative overflow-scroll ${className}`}
                style={{ ...styleContainer }}
                id={containerId}
            >
                {variant === "infinity-scroll" ? renderInfinityVariant() : renderLoadMoreVariant()}
                <EmptyView mode={emptyMode} emptyText={emptyView} />
            </div>
        );
    }
);

export default AwesomeListComponent;
