import React, { useEffect, useRef, useCallback } from "react";

export interface InfiniteScrollProps {
    children: React.ReactNode;
    element?: string;
    hasMore?: boolean;
    initialLoad?: boolean;
    isReverse?: boolean;
    loader?: React.ReactNode;
    loadMore: (page: number) => void;
    pageStart?: number;
    getScrollParent?: () => HTMLElement | null;
    threshold?: number;
    useCapture?: boolean;
    useWindow?: boolean;
    useMemorizeScrollPosition?: (scrollTop: number) => void;
    [key: string]: any;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    children,
    element = "div",
    hasMore = false,
    initialLoad = true,
    isReverse = false,
    loader = null,
    loadMore,
    pageStart = 0,
    getScrollParent = null,
    threshold = 250,
    useCapture = false,
    useWindow = true,
    useMemorizeScrollPosition,
    ...props
}) => {
    const scrollComponentRef = useRef<HTMLElement | null>(null);
    const pageLoadedRef = useRef(pageStart);
    const loadMoreRef = useRef(false);
    const beforeScrollHeightRef = useRef(0);
    const beforeScrollTopRef = useRef(0);
    const optionsRef = useRef<any>(null);

    const isPassiveSupported = useCallback(() => {
        let passive = false;

        const testOptions = {
            // eslint-disable-next-line getter-return
            get passive() {
                passive = true;
                return passive;
            },
        };

        try {
            document.addEventListener("test" as any, null as any, testOptions as any);
            document.removeEventListener("test" as any, null as any, testOptions as any);
        } catch (e) {
            // ignore
        }
        return passive;
    }, []);

    const eventListenerOptions = useCallback(() => {
        if (isPassiveSupported()) {
            return {
                useCapture,
                passive: true,
            };
        }
        return {
            passive: false,
        };
    }, [useCapture, isPassiveSupported]);

    const getParentElement = useCallback((el: HTMLElement | null) => {
        const scrollParent = getScrollParent && getScrollParent();
        if (scrollParent != null) {
            return scrollParent;
        }
        return el && el.parentNode;
    }, [getScrollParent]);

    const calculateTopPosition = useCallback((el: any): any => {
        if (!el) {
            return 0;
        }
        return el.offsetTop + calculateTopPosition(el.offsetParent);
    }, []);

    const calculateOffset = useCallback((el: any, scrollTop: any) => {
        if (!el) {
            return 0;
        }
        return calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
    }, [calculateTopPosition]);

    const mousewheelListener = useCallback((e: any) => {
        // Prevents Chrome hangups
        if (e.deltaY === 1 && !isPassiveSupported()) {
            e.preventDefault();
        }
    }, [isPassiveSupported]);

    const scrollListener = useCallback(() => {
        const el = scrollComponentRef.current;
        const scrollEl = window as any;
        const parentNode = getParentElement(el) as HTMLElement;
        
        if (!parentNode) return;

        const scrollTop = parentNode.scrollTop;

        if (useMemorizeScrollPosition) {
            //eslint-disable-next-line
            useMemorizeScrollPosition(scrollTop);
        }

        let offset;
        if (useWindow) {
            const doc = document.documentElement || document.body.parentNode || document.body;
            const scrollTopValue = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : (doc as any).scrollTop;
            if (isReverse) {
                offset = scrollTopValue;
            } else {
                offset = calculateOffset(el, scrollTopValue);
            }
        } else if (isReverse) {
            offset = parentNode.scrollTop;
        } else {
            offset = parentNode.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
        }

        // Here we make sure the element is visible as well as checking the offset
        if (offset < Number(threshold) && el && el.offsetParent !== null) {
            beforeScrollHeightRef.current = parentNode.scrollHeight;
            beforeScrollTopRef.current = parentNode.scrollTop;
            // Call loadMore after detachScrollListener to allow for non-async loadMore functions
            if (typeof loadMore === "function") {
                pageLoadedRef.current += 1;
                loadMore(pageLoadedRef.current);
                loadMoreRef.current = true;
            }
        }
    }, [useWindow, isReverse, threshold, loadMore, useMemorizeScrollPosition, getParentElement, calculateOffset]);

    const detachScrollListener = useCallback(() => {
        let scrollEl: any = window;
        const el = scrollComponentRef.current;
        if (useWindow === false) {
            scrollEl = getParentElement(el);
        }

        if (!scrollEl) return;

        const options = optionsRef.current ? optionsRef.current : useCapture;
        scrollEl.removeEventListener("scroll", scrollListener, options);
        scrollEl.removeEventListener("resize", scrollListener, options);
    }, [useWindow, useCapture, scrollListener, getParentElement]);

    const detachMousewheelListener = useCallback(() => {
        let scrollEl: any = window;
        const el = scrollComponentRef.current;
        if (useWindow === false && el) {
            scrollEl = el.parentNode;
        }

        if (!scrollEl) return;

        const options = optionsRef.current ? optionsRef.current : useCapture;
        scrollEl.removeEventListener("mousewheel", mousewheelListener, options);
    }, [useWindow, useCapture, mousewheelListener]);

    const attachScrollListener = useCallback(() => {
        const el = scrollComponentRef.current;
        const parentElement = getParentElement(el);

        if (!hasMore || !parentElement) {
            return;
        }

        let scrollEl: any = window;
        if (useWindow === false) {
            scrollEl = parentElement;
        }

        const options = optionsRef.current ? optionsRef.current : useCapture;
        scrollEl.addEventListener("mousewheel", mousewheelListener, options);
        scrollEl.addEventListener("scroll", scrollListener, options);
        scrollEl.addEventListener("resize", scrollListener, options);

        if (initialLoad) {
            scrollListener();
        }
    }, [hasMore, useWindow, useCapture, initialLoad, mousewheelListener, scrollListener, getParentElement]);

    // Initialize options
    useEffect(() => {
        optionsRef.current = eventListenerOptions();
    }, [eventListenerOptions]);

    // Mount effect
    useEffect(() => {
        attachScrollListener();
        return () => {
            detachScrollListener();
            detachMousewheelListener();
        };
    }, [attachScrollListener, detachScrollListener, detachMousewheelListener]);

    // Update effect for reverse scroll
    useEffect(() => {
        if (isReverse && loadMoreRef.current) {
            const el = scrollComponentRef.current;
            const parentElement = getParentElement(el) as HTMLElement;
            if (parentElement) {
                const newScrollTop =
                    parentElement.scrollHeight - beforeScrollHeightRef.current + beforeScrollTopRef.current;
                parentElement.scrollTop = newScrollTop;
                loadMoreRef.current = false;
            }
        }
    }, [isReverse, getParentElement, children]);

    // Re-attach scroll listener when hasMore changes
    useEffect(() => {
        attachScrollListener();
    }, [hasMore, attachScrollListener]);

    const childrenArray = [children];
    if (hasMore && loader) {
        isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
    }

    return React.createElement(
        element,
        {
            ...props,
            ref: scrollComponentRef,
        },
        childrenArray
    );
};

export default InfiniteScroll;
