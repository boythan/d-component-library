/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// react
// third-party
import ClassNames from "classnames";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Button, { ButtonProps } from "../button/Button";
import InputTextSearch from "../input/InputTextSearch";
import Popover from "./Popover";
import EmptyView from "../list/shared/EmptyView";
import PopoverMode from "../list/shared/Mode";

const DEFAULT_PAGING_DATA = {
    pageIndex: 1,
    pageSize: 10,
};

const DEFAULT_DATA_LIST = {
    data: [],
    emptyMode: PopoverMode.PROGRESS,
    refreshing: false,
};

export interface PopoverListProps extends ButtonProps {
    source: (paging: any) => Promise<any>;
    transformer: (data: any) => any;
    renderItem?: (item: any, index: any) => React.ReactNode;
    renderContentHeader?: () => React.ReactNode;
    renderContentFooter?: () => React.ReactNode;
    setRef?: (ref: any) => void;
    onChange?: (value: any) => void;
    customView?: () => React.ReactNode | React.ReactNode;
    onClickItem?: (item: any, index: any) => void;
    onCreateNew?: () => void;
    buttonText?: string;
    buttonIconName?: ButtonProps["iconName"];
    buttonVariant?: ButtonProps["variant"];
    isClickOpen?: boolean;
    placeHolder?: string;
    loadMoreText?: string;
    emptyText?: string;
}

const PopoverList: React.FC<PopoverListProps> = ({
    source,
    transformer,
    renderItem,
    renderContentHeader = () => <div />,
    renderContentFooter = () => <div />,
    setRef,
    onChange,
    customView,
    onClickItem,
    onCreateNew,
    buttonText,
    buttonVariant = "trans",
    buttonIconName,
    isClickOpen = true,
    loadMoreText = "Load More",
    emptyText,
    className,
}) => {
    const [dataList, setDataList] = useState(DEFAULT_DATA_LIST);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const wrapperClass = ClassNames("d-popover-list", className);

    const pagingData = useRef(DEFAULT_PAGING_DATA);
    const noMoreData = useRef(false);
    const listRef = useRef({ refresh: () => refresh() });

    const isArray = (array: any) => {
        return Array.isArray(array);
    };

    const isNoMoreData = (newData: any) => {
        if (!newData || !isArray(newData)) return true;
        return pagingData ? newData.length < pagingData.current.pageSize : false;
    };

    useEffect(() => {
        setRef && setRef(listRef.current);
        onLoadData();
    }, []);

    const refresh = () => {
        noMoreData.current = false;
        pagingData.current = DEFAULT_PAGING_DATA;
        onLoadData();
    };

    function onLoadData() {
        if (noMoreData.current) {
            setShowLoadMore(false);
            return;
        }

        source(pagingData.current)
            .then(async (response: any) => {
                pagingData.current = {
                    ...pagingData.current,
                    pageIndex: pagingData.current.pageIndex + 1,
                };
                const data = await transformer(response);

                noMoreData.current = isNoMoreData(data);

                if (!noMoreData.current) {
                    setShowLoadMore(true);
                } else {
                    setShowLoadMore(false);
                }

                if (!isArray(data)) {
                    // eslint-disable-next-line no-throw-literal
                    throw "Data is not an array";
                }

                if (_.isEmpty(data) && dataList.data.length === 0) {
                    setDataList({
                        data: [],
                        emptyMode: PopoverMode.EMPTY,
                        refreshing: false,
                    });
                    return;
                }
                const newData = dataList.data.concat(data);
                setDataList({
                    data: newData,
                    emptyMode: PopoverMode.HIDDEN,
                    refreshing: false,
                });
            })
            .catch(() => {});
    }

    const onClickLoadMore = () => {
        onLoadData();
    };

    const onClickItemList = (item: any, index: any) => {
        setOpenPopover(false);
        onClickItem && onClickItem(item, index);
    };

    const onClickCreateNewHandle = () => {
        setOpenPopover(false);
        onCreateNew && onCreateNew();
    };

    const renderItemList = (item: any, index: any) => {
        let content = item?.name || item?.label;
        if (renderItem) {
            content = renderItem(item, index);
        }
        return (
            <div className="renderItemList" onClick={() => onClickItemList(item, index)} key={index + Math.random()}>
                {content}
            </div>
        );
    };

    const mainViewPopover = () => {
        if (customView) {
            if (typeof customView === "function") {
                return customView();
            }
            return customView;
        }
        return (
            <InputTextSearch
                onChange={(event: any) => {
                    if (!event.target.value.trim()) {
                        return;
                    }
                    !isClickOpen && setOpenPopover(true);
                    onChange && onChange(event.target.value);
                }}
            />
        );
    };
    const renderContent = () => {
        return (
            <div className="d-popover-list__dropdown">
                {renderContentHeader()}
                {buttonText && (
                    <div className="d-flex w-100 justify-content-end">
                        <Button
                            content={buttonText}
                            iconName={buttonIconName}
                            variant={buttonVariant}
                            onClick={() => {
                                onClickCreateNewHandle();
                            }}
                        />
                    </div>
                )}
                {dataList.data.map((item, index) => renderItemList(item, index))}
                <EmptyView mode={dataList.emptyMode} emptyText={emptyText} />
                {showLoadMore && (
                    <Button className="d-popover-list__footer" onClick={() => onClickLoadMore()} variant="trans">
                        {loadMoreText}
                    </Button>
                )}
                {renderContentFooter()}
            </div>
        );
    };
    return (
        <Popover
            content={renderContent()}
            className={wrapperClass}
            open={openPopover}
            onClose={() => setOpenPopover(false)}
            onOpen={() => setOpenPopover(true)}
        >
            {mainViewPopover()}
        </Popover>
    );
};

export default PopoverList;
XMLHttpRequest;
